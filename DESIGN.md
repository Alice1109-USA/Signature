# Signature color system

Reference: the local `/Users/hanzhao/Documents/Labelle/styles.css`.
Scope: all 17 existing pages, preserving content and the single-row label layout.

The site uses warm light surfaces, readable dark text, and restrained purple actions.
Gold is decorative or used as light text on dark surfaces, never small text on white.

| Role | Color | Use |
| --- | --- | --- |
| Canvas | `#FAF7F4` | Main page and alternating pricing rows |
| Surface | `#FFFFFF` | Cards, forms, dropdowns |
| Warm section | `#F5EDE6` | Facial section and closing booking sections |
| Information | `#F3EFF6` | Insurance notes and icon backgrounds |
| Primary | `#4A3558` | Buttons, links, labels, pricing headers |
| Dark | `#362645` | Footer and primary hover |
| Text | `#1C1410` | Main text and headings |
| Secondary | `#5E5E5E` | Descriptions and placeholders on light surfaces |
| On dark | `#F3EFF6` | Secondary text on purple surfaces |
| Gold | `#C9A96E` | Dividers and price badges with dark text |
| Light gold | `#E8D5B0` | Photo labels and dark-surface hover text |
| Border | `#E8E4E0` | Noninteractive separators |
| Control border | `#8A7C91` | Input boundaries |

`styles.css` supplies the base palette and existing layout. `palette.css` supplies
semantic tokens, component states and responsive refinements, loaded after it on
every page. Preserve this order. Text over photography requires a dark overlay;
its visual result still needs browser review, even when solid color pairs pass.

Keep Playfair Display headings and Inter body text. Preserve business content,
links, existing images, and responsive layout during color-only changes.
