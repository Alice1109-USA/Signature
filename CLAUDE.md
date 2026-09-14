# Signature Wellness SPA Website

## Architecture
- Plain HTML + CSS static site (same pattern as labelle-website / smartkteam-website)
- No framework, no build process, no node_modules
- Deploy to Vercel with `cleanUrls: true` → `page.html` serves at `/page`
- **Always use relative paths**: `./styles.css` and `./app.js` (not `/styles.css`)

## Design System
- **Navy** `#0A2896` — primary brand color: buttons, CTAs, nav (scrolled), pricing headers
- **Blue** `#006EDC` — accent: tags, links, hover states (colors sampled from the original Wix logo)
- **Cream** `#F6F8FC` / **Blush** `#EDF2FA` — alternating section backgrounds
- **Espresso** `#10151F` — body text, footer background
- Fonts: Playfair Display (headings, serif) + Inter (body, sans)
- Buttons: pill-shaped (`border-radius: 3rem`)
- Shared CSS in `./styles.css` — do not duplicate styles inline
- Logo is a placeholder monogram (navy square, "S") inline in each page's `<nav>` and footer —
  swap for the real logo file (as an `<img>`) across all 17 pages when it's provided

## Business Info
- Address: 2763 152nd Place NE, Suite 4A, Redmond, WA 98052
- Phone: (425) 543-2881
- Email: sigtherapeutics@gmail.com
- Appointment booking: Square (`https://book.squareup.com/appointments/ruv6lje3z2m25r/location/LBCJ5N7KEN97H/services`)
- Gift cards: Square (`https://app.squareup.com/gift/ML8XEWEKAC8YP/order`)
- Insurance: in-network plans billed directly; out-of-network patients receive a Superbill.
  Currently in the process of credentialing with additional providers — do not name specific
  insurers as confirmed in-network without checking with the client first.

## Site Map (17 pages — all preserve exact URLs from the original Wix site for SEO/backlinks)
| URL | File | Note |
|-----|------|------|
| `/` | index.html | |
| `/price` | price.html | was `/about-us` on Wix — renamed, approved by client |
| `/insurance-accepted-massage` | insurance-accepted-massage.html | |
| `/pip-li-injury-massage` | pip-li-injury-massage.html | |
| `/insurance-coveredmassage` | insurance-coveredmassage.html | |
| `/swedish-massage` | swedish-massage.html | |
| `/deep-tissue-massage` | deep-tissue-massage.html | |
| `/pain-relief-massage` | pain-relief-massage.html | |
| `/lymphatic-detox-massage` | lymphatic-detox-massage.html | |
| `/facial-skincare` | facial-skincare.html | |
| `/neck-shoulder-pain` | neck-shoulder-pain.html | |
| `/lower-back-pain` | lower-back-pain.html | |
| `/hips-legs-pain` | hips-legs-pain.html | |
| `/manual-lymphatic-drainage` | manual-lymphatic-drainage.html | |
| `/privacy-policy` | privacy-policy.html | new — was a Wix popup, not a real page |
| `/accessibility-statement` | accessibility-statement.html | new — was a Wix popup, not a real page |
| `/404` | 404.html | |

## Rules
- Never build pages without showing the sitemap and getting approval first
- All 17 pages share identical `<nav>`/`<footer>` markup — when editing shared content
  (phone number, address, nav links), update it across every file, not just one
- Images live in `images/` (already downloaded from Wix's CDN — no further Wix dependency)
- Domain is registered through Wix — must transfer before canceling the Wix subscription

## Next Steps (when ready to deploy)
1. `git init` (already done) and push to GitHub
2. Connect the GitHub repo to Vercel
3. Point DNS to Vercel once the client has transferred/configured the domain
4. Cancel Wix LAST, after the domain points to Vercel and the new site is confirmed live
