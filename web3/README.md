## Getting Started

You can Create a new project using this Command:

```bash
npx thirdweb create --contract --template hardhat-javascript-starter
```

See the smart contract in `contracts/CrowdFunding.sol`.

# About ThirdWeb

With ThirdWeb you don't have to write deploy scripts (but Yes! you must write tests) in order to deploy the contract on the blockchain because thirdweb already covered that for you. Isn't That Cool!?

In order to deploy your smart contract simply add ypur privatekey and rpc url of testnet or mainnet and run the thirdweb deploy command from below.

To add functionality to your contracts, you can use the `@thirdweb-dev/contracts` package which provides base contracts and extensions to inherit. The package is already installed with this project. Head to our [Contracts Extensions Docs](https://portal.thirdweb.com/contractkit) to learn more.

## Building the project

After any changes to the contract, run:

```bash
npm run build
# or
yarn build
```

to compile your contracts. This will also detect the [Contracts Extensions Docs](https://portal.thirdweb.com/contractkit) detected on your contract.

## Deploying Contracts

When you're ready to deploy your contracts, just run one of the following command to deploy you're contracts:

```bash
npm run deploy
# or
yarn deploy
```

## Releasing Contracts

If you want to release a version of your contracts publicly, you can use one of the followings command:

```bash
npm run release
# or
yarn release
```

## Join our Discord!

For any questions, suggestions, join our discord at [https://discord.gg/thirdweb](https://discord.gg/thirdweb).
