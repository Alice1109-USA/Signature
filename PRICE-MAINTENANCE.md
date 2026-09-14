# Signature Wellness SPA Price Maintenance

When a service price changes, update every customer-visible and machine-readable copy in the same change.

## Required updates

1. Update the main price table in `pricing.html`.
2. Update the pricing paragraph and any price box on the matching service page.
3. If the service appears on the homepage, update its price in `index.html`.
4. Update the matching `Service` schema `offers` in that service page's JSON-LD:
   - `name`: service and duration
   - `price`: numbers only, without `$`
   - `priceCurrency`: `USD`
   - `url`: the absolute canonical service URL
5. If the site's lowest or highest published service price changes, update the LocalBusiness `priceRange` consistently in every HTML page.

## Validation after every price change

- Confirm the visible price is identical on the pricing page, homepage, and service page.
- Confirm couples prices remain labeled as the total for two guests.
- Parse every JSON-LD block and confirm there are no syntax errors.
- Confirm all Offer URLs are absolute and canonical.
- Confirm no outdated price remains in the project search results.
- Run `git diff --check` before committing.

## Important

Do not add a price to Schema until that same price is visibly published on the website. Do not add unconfirmed Head Spa or insurance reimbursement amounts.
