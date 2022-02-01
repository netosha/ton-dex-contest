# 💎 TON DEX Contest

### [🖼 Preview](https://ton-dex.vercel.app)

## About

It's example of simple [DAPP](https://en.wikipedia.org/wiki/Decentralized_application) frontend of [DEX](https://en.wikipedia.org/wiki/Decentralized_exchange), made from scracth for [TON contest](https://github.com/newton-blockchain/TIPs/issues/42#issue-1049286754).

The interface was based on [Uniswap](https://app.uniswap.org/#/swap), [Pancakeswap](https://pancakeswap.finance), [Sushiswap](https://app.sushi.com/swap) and [TON assets](https://ton.org/brand-assets).


It contains:

* [UI for exchanging one token for another token](https://ton-dex.vercel.app/swap)
* [UI for creating a pool with two tokens](https://ton-dex.vercel.app/pool/create)
* [UI with a list of pools](https://ton-dex.vercel.app/pools)
* [UI with a pool statistics](https://ton-dex.vercel.app/pool/cb7286c3-f71e-4cdc-a34b-1d0bed5c4506)
* [UI for adding and removing liquidity from a pool](https://ton-dex.vercel.app/pool/cb7286c3-f71e-4cdc-a34b-1d0bed5c4506/manage) **(wallet should be connected)**

⚠️ Please, **keep in mind**, that idea of the whole project was to **present the concept**. Some things may be **significantly different** in the future


### Stack

As [mentioned](https://github.com/newton-blockchain/TIPs/issues/42#issue-1049286754) in contest requirements, app should be made with [Typescript](https://www.typescriptlang.org), [React](https://reactjs.org), [Redux](https://redux.js.org).

> Extra dependencies and extra code are not welcome.

We took these technologies as a basis but decided to use tools that simplify the development process.
The main idea was to use **well-known** and **well-documented** packages.

1. [NextJS](https://nextjs.org) - React with 
[SSR](https://nextjs.org/docs/basic-features/pages#server-side-rendering),
out-of-box solid webpack configuration,
built-in routing solution, and lot more useful features.

2. [Redux Toolkit](https://redux-toolkit.js.org) - Toolbox, that simplifies interaction with Redux (especially with async).

3. [Lodash](https://lodash.com) - Utility functions for common programming tasks. Almost every complex and future-rich project uses lodash. 

4. [clsx](https://github.com/lukeed/clsx#readme) - Utility for constructing className strings conditionally.
5. [Tailwind](https://tailwindcss.com) - Easy to customize, well-documented, feature-rich CSS Framework, that's simplifies styling and reduces build size.
6. [Heroicons](https://heroicons.com) - Just a simple SVG Icons. Recommended by Tailwind.

We decided not to use ready-made UI packages, due to flexibility and bundle size.
In future versions, it is likely that it will have to use a third-party library for graphs, that more suitable for financial and crypto data.

### Features

* Token picker allows adding custom contract address (if contract address is valid)
* Token picker form validation (invalid tokens, insufficient balance, etc.)
* Different behavior when wallet is not provided
* Pagination for items, that can be a lot
* Skeleton for loading components
* Balance of multiple tokens showed (and mocked as interaction directly with contract)
* Table supports ordering by column _(thanks to [lodash](https://lodash.com))_
* Mobile freindly* (except tables, but with some extra code it should be ok)


## Installation

```
yarn install
yarn build
yarn start
```

## Known issues

* **Hardcoded form validation** (and other places).

We know, that require a more elegant solution, than the one that exists now.
We differently fix it in the future, when all validation requirements will be known.

* **Redux store architecture**

Real world requirements for app can significantly change it.
We understand, that it can be changed in the future, but for now it's fits all contest requirements.

* **Incorrect representation of the contract**

Real specification of TON's like [ERC-20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) is not presented. 
Main idea was just mock async call to external source. In the future it will hugely refactored.

* **[reselect](https://github.com/reduxjs/reselect) beta instead built-in redux-toolkit**

Typescript issues. It should be fixed in future update. To learn more check [reselect's github issue](https://github.com/reduxjs/reselect/pull/545).

* **Glitches**

We admit that they may be. And there can be many of them.
Unfortunately, there was not enough time to write tests.
