const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contract with account:", deployer.address);

    const NFT = await ethers.getContractFactory("LocalTrustNFT");
    
    // Pass the deployer's address as the `initialOwner` argument
    const nft = await NFT.deploy(deployer.address);
    
    await nft.deployed();

    console.log("Contract deployed to:", nft.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
