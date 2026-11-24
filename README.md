# UTM Link Creator

A small browser tool for building consistent email campaign links. Enter the destination, brand, season, and catalog type. Optionally change the source or add a placement such as “Hero button.” Generate and copy the link.

- `utm_source`: defaults to `newsletter`
- `utm_medium`: always `email`
- `utm_campaign`: normalized `brand_season_catalog-type`
- `utm_content`: optional placement

The tool replaces those tracking parameters, preserves unrelated query values and the fragment, and accepts full HTTP(S) destinations only. A blank placement removes any previous `utm_content`. URL formatting may be re-encoded by the browser without changing other parameter values. It makes no network requests, collects no analytics, and stores no links. Existing query-based signatures may be invalidated by adding parameters; use the destination’s approved tracking approach for signed links.

Open `index.html` directly or serve the files as a static site. If clipboard permission is unavailable, the link is selected for manual copying.

Run `node --test utm.test.js` to check the URL logic.
