require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomiclabs/hardhat-ethers"); // Add this line if missing

module.exports = {
  solidity: "0.8.28",  // Update this line to match your contract
  networks: {
    localhost: {
      url: process.env.RPC_URL || "http://127.0.0.1:7545",
      accounts: [
        process.env.PRIVATE_KEY.startsWith("0x") 
          ? process.env.PRIVATE_KEY 
          : `0x${process.env.PRIVATE_KEY}`
      ]
    }
  }
};
