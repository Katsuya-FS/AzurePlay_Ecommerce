# AzurePlay

AzurePlay is a front-end-only demo storefront for a fictional Philippine gaming retailer. It uses React, TypeScript, Vite, React Router, CSS Modules and browser local storage. There is no server, API, database, real authentication, payment collection or fulfillment.

## Run it

```sh
npm install
npm run generate:data
npm run dev
```

Create a production bundle with `npm run build` and preview it with `npm run preview`.

## Project map

- `src/App.tsx` contains the shared shell, routes and storefront pages.
- `src/context/ShopContext.tsx` manages the cart, wishlist and signed-in session.
- `src/lib/storage.ts` wraps local storage reads and writes with safe JSON parsing and error handling.
- `src/data/` contains the static product catalog and supporting JSON data.
- `scripts/generate-products.js` regenerates the 41-product catalog.
- `src/styles/global.css` defines the design tokens and base styling; `src/styles/store.module.css` styles the interface.

## Demo account and vouchers

- Email: `demo@azureplay.ph`
- Password: `levelup123`
- Vouchers: `WELCOME10`, `LEVELUP500`, `GAMER15`

The demo credentials are also shown on the sign-in page. Registration, orders, reviews, messages, newsletter signups, recent searches, recently viewed products and comparisons are stored in this browser only.

## Local storage keys

`azp_cart`, `azp_wishlist`, `azp_user`, `azp_users`, `azp_orders`, `azp_reviews`, `azp_recent_views`, `azp_recent_searches`, and `azp_compare` store the corresponding demo state. Clearing browser storage resets the demo. Invalid or unavailable storage is handled without breaking the storefront.
