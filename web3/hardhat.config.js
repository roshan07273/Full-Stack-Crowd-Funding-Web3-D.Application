/** @type import('hardhat/config').HardhatUserConfig */

require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY || "0x";
const GOERLI_RPC_URL =
  process.env.GOERLI_RPC_URL || "https://rpc.ankr.com/eth_goerli";

module.exports = {
  solidity: {
    version: "0.8.8",
    defaultNetwork: "goerli",
    networks: {
      hardhat: {},
      goerli: {
        url: GOERLI_RPC_URL,
        accounts: PRIVATE_KEY,
      },
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
