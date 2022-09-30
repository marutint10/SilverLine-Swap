const HDWalletProvider = require("@truffle/hdwallet-provider");
// const fs = require("fs");
// const mnemonic = fs
//   .readFileSync(".secret")
//   .toString()
//   .trim();

const mnemonic =
  "bottom seven okay purse fragile step exotic wait vessel better tape animal";

module.exports = {
  contracts_directory: "./src/contracts/",
  contracts_build_directory: "./src/abis/",
  networks: {
    // development: {
    //   host: "127.0.0.1",
    //   port: 8545,
    //   network_id: "*",
    // },
    testnet: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://data-seed-prebsc-1-s1.binance.org:8545`
        ),
      network_id: 97,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    bsc: {
      provider: () =>
        new HDWalletProvider(mnemonic, `https://bsc-dataseed1.binance.org`),
      network_id: 56,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
  },

  mocha: {
    timeout: 100000,
  },

  compilers: {
    solc: {
      version: "^0.8.13",
    },
  },
};
