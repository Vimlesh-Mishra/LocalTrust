require("@nomicfoundation/hardhat-toolbox"); // No need for @nomiclabs/hardhat-ethers)

module.exports = {
  solidity: "0.8.24", 
  networks: {
    hardhat: {},
    localhost: {  // Add this block
      url: "http://127.0.0.1:7545",
      accounts: ["0xab8e6a98a56af29a7e0e8acdc2f8d5e430c1e4fd123ed71c737044e4cc2b4155"],
    },
  }
};
