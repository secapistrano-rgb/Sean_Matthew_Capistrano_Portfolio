# CSPC walkthrough images

Copied from `docs/walkthrough/images` in the local `lost-and-found-web-cspc-main` project:

- `items.png`: `03-items.png`, rendered from `app/Views/dashboard/items.php` (updated Item Management preview).
- `matches.png`: `04-matches.png`, rendered from `app/Views/matches/index.php`.
- `claims.png`: `05-claims.png`, rendered from `app/Views/claims/index.php`.

The original walkthrough states that these screens use fictional demo data and a simulated super-admin session. They are interface previews, not a live database session or verification of backend operations. The portfolio’s scenario is a separate browser-only simulation using a fixed sample match score and fictional ownership evidence.

Project source: https://github.com/secapistrano-rgb/lost-and-found-web-cspc

The distinction between claim approval and resolution is also reflected in `app/Controllers/ClaimController.php`: approving a claim accepts its match while keeping items active; resolving it marks the lost item claimed and the found item returned.

## Mobile app previews

Copied from `docs/app-walkthrough/images` in the same local web project:

- `app/report.png`: `03-report.png` (`ReportItemScreen.js`).
- `app/matches.png`: `05-matches.png` (`MatchesScreen.js` and `MatchCard.js`).
- `app/claim.png`: `06-claim.png` (`ClaimItemScreen.js`).
- `app/claims.png`: `07-claims.png` (`ClaimRequestsScreen.js`).

The app walkthrough describes these as React Native components rendered through a browser adapter with fictional records, mocked services, disabled effects, and simulated navigation. They are not native Android or iOS screenshots. Fonts, spacing, navigation, maps, permissions, and platform controls may differ on a device. The portfolio controls simulate the shared workflow; screenshots are static reference images and do not change their records when the demo advances.

Mobile source: https://github.com/secapistrano-rgb/lost-and-found-app-cspc

## Complete screen browser

`all/web/` contains twelve PNGs from `docs/walkthrough/images`, preserving their original filenames. These cover the eleven documented web steps plus the item quick-preview. The mobile-layout variant is excluded.

`all/app/` contains all twelve PNGs from `docs/app-walkthrough/images`, preserving their original filenames. These cover sign-in, home, reporting, item details, matches, ownership evidence, claims, notifications, profile, settings, feedback, and support.

Titles and explanatory captions in `public/walkthrough-catalog.js` are adapted from the corresponding walkthrough README sections. The same fictional-data and browser-preview limitations described above apply. Navigation changes reference screens only; it does not operate the underlying applications.

## User’s Guide sequence

The interactive sample case follows Appendix F, “User’s Guide,” in the user-provided `FOD-FINAL-DESTINATION-HEHE.pdf`: printed pages 212–233 (PDF pages 228–249). The student report/match/claim path appears on printed pages 212–217; staff authentication, dashboard, item management, and claim management appear on pages 223–227. The complete guide also describes account-menu and additional management modules represented in the full screen browser where previews are available.

The core demo keeps match review and proof-of-ownership submission in the student app before switching to administrator review on the website. Sample photo selection, image analysis, campus-account sign-in, reCAPTCHA, and location detection are simulated. The collection destination is the Supreme Student Council Office. The “What to Bring” list is corroborated by the app’s `ClaimItemScreen.js`: valid ID, claim-approval screenshot, Match ID, and additional identification if requested.

The final handover transition additionally follows `ClaimController.php`, distinguishing approval from resolved/claimed/returned states. The PDF itself is not published with the portfolio.

## Backpack claim preview

The current `05-claims.png` from the web walkthrough’s isolated `fixtures/claims.php` shows the blue backpack approved and awaiting pickup, with the wallet pending review. The separate wallet-approved example is excluded from the portfolio.

During interactive claim review and collection, the portfolio renders its own sample backpack record instead of a static screenshot. Its pending, approved, and resolved statuses follow the demo state. `case/backpack.svg` is copied from `docs/walkthrough/assets/backpack.svg` for that record. The full screen browser retains the original web screenshot as an explicitly described reference.

## Consistent dashboard sidebar

The Item, Claim, Match, Email, Reports, Users, Roles, Feedback, and Help & Support previews were rendered again from their PHP views using isolated fictional records after restoring the original dashboard sidebar in `app/Views/layout/main.php` and `public/assets/css/management.css`. The background image, 280px width, 70px logo, Management System heading, link styles, and user footer match Dashboard. The dashboard reference image remains unchanged.
