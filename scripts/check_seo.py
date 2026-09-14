"""Read-only checks for the static site's SEO migration."""
import json
import re
from collections import defaultdict
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
BASE = "https://www.signature-spa.com"

class Page(HTMLParser):
    def __init__(self, text):
        super().__init__(convert_charrefs=True)
        self.links, self.ids, self.images, self.meta, self.h1s = [], [], [], {}, []
        self.canonical = None
        self.title = ""
        self.capture = None
        self.divs = 0
        self.redirect = False
        self.feed(text)
        self.schemas = [json.loads(s) for s in re.findall(r'<script type="application/ld\+json">([\s\S]*?)</script>', text)]
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "a": self.links.append(a.get("href", ""))
        if "id" in a: self.ids.append(a["id"])
        if tag == "img": self.images.append(a)
        if tag == "meta":
            self.meta[a.get("name", a.get("property", ""))] = a.get("content", "")
            if a.get("http-equiv", "").lower() == "refresh": self.redirect = True
        if tag == "link" and a.get("rel") == "canonical": self.canonical = a.get("href")
        if tag == "div": self.divs += 1
        if tag == "title": self.capture = "title"
        if tag == "h1": self.capture = "h1"; self.h1s.append("")
    def handle_endtag(self, tag):
        if tag == "div": self.divs -= 1
        if tag in ("title", "h1"): self.capture = None
    def handle_data(self, data):
        if self.capture == "title": self.title += data
        if self.capture == "h1": self.h1s[-1] += data

def run():
    pages = {p.name: Page(p.read_text()) for p in ROOT.glob("*.html")}
    errors, warnings = [], []
    titles, descriptions = defaultdict(list), defaultdict(list)
    canonical = {}
    for name, p in pages.items():
        if p.redirect: continue
        if len(p.h1s) != 1: errors.append(f"{name}: H1 count {len(p.h1s)}")
        if p.divs: errors.append(f"{name}: div balance {p.divs}")
        if len(p.ids) != len(set(p.ids)): errors.append(f"{name}: duplicate IDs")
        if name != "404.html":
            if not p.canonical: errors.append(f"{name}: missing canonical")
            else:
                if p.canonical in canonical: errors.append(f"{name}: duplicate canonical")
                canonical[p.canonical] = name
            titles[p.title].append(name)
            descriptions[p.meta.get("description", "")].append(name)
        for a in p.images:
            if "alt" not in a: errors.append(f"{name}: missing image ALT")
            if not a.get("width") or not a.get("height"): warnings.append(f"{name}: image dimensions missing: {a.get('src')}")
            if a.get("src", "").startswith("./") and not (ROOT / a["src"]).exists(): errors.append(f"{name}: missing image {a['src']}")
        for href in p.links:
            u = urlsplit(href)
            if u.scheme or u.netloc: continue
            target = unquote(u.path)
            if target.startswith("./"): target = target[2:]
            elif target.startswith("/"): target = target[1:]
            if not target: target = name if href.startswith("#") else "index.html"
            if "." not in target: target += ".html"
            if target not in pages:
                errors.append(f"{name}: missing target {href}")
                continue
            if pages[target].redirect: errors.append(f"{name}: link to legacy redirect {href}")
            if u.fragment and unquote(u.fragment) not in pages[target].ids: errors.append(f"{name}: missing anchor {href}")
        for schema in p.schemas:
            if schema.get("@context") != "https://schema.org": errors.append(f"{name}: schema context")
            for node in schema.get("@graph", [schema]):
                if not node.get("@type"): errors.append(f"{name}: schema type missing")
    for field, groups in (("title", titles), ("description", descriptions)):
        for value, names in groups.items():
            if not value or len(names) > 1: errors.append(f"{field}: empty/duplicate {names}")
    ns = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    urls = [n.text for n in ET.parse(ROOT / "sitemap.xml").findall(".//s:loc", ns)]
    if len(urls) != len(set(urls)): errors.append("Sitemap has duplicate URLs")
    for url in urls:
        if url not in canonical: errors.append(f"Sitemap noncanonical URL: {url}")
    for url in canonical:
        if url not in urls: errors.append(f"Canonical URL absent from sitemap: {url}")
    redirects = json.loads((ROOT / "vercel.json").read_text())["redirects"]
    sources = [r["source"] for r in redirects]
    if len(sources) != len(set(sources)): errors.append("Duplicate redirect sources")
    for r in redirects:
        dest = r["destination"].split("#")[0]
        if dest in sources: errors.append(f"Redirect chain: {r['source']} -> {dest}")
        if BASE + dest not in canonical: errors.append(f"Redirect destination not canonical: {dest}")
    return {"canonical_pages": len(canonical), "redirect_pages": sum(p.redirect for p in pages.values()), "sitemap_urls": len(urls), "server_redirects": len(redirects), "errors": errors, "warnings": sorted(set(warnings))}

if __name__ == "__main__":
    result = run()
    print(json.dumps(result, indent=2))
    raise SystemExit(bool(result["errors"]))
