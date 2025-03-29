const hre = require("hardhat");

async function main() {
    // 🔹 Get the contract factory before deployment
    const LocalTrustNFT = await hre.ethers.getContractFactory("LocalTrustNFT");

    // 🔹 Deploy the contract
    const localTrustNFT = await LocalTrustNFT.deploy();

    // 🔹 Wait for deployment (for Ethers v6)
    await localTrustNFT.waitForDeployment();

    // 🔹 Log contract address
    console.log("Contract deployed to:", await localTrustNFT.getAddress());
}

// 🔹 Run the script and handle errors
main().catch((error) => {
    console.error(error);
    process.exit(1);
});
