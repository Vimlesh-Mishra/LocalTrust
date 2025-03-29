const hre = require("hardhat");

async function main() {
    const contractAddress = "0xFA3ed7EA55b13A6914ff0310B2C0a9bEE1dfCF83"; // Update with your contract address
    const tokenId = 1; // Change this based on the NFT ID
    const price = hre.ethers.parseUnits("0.2", "ether"); // Set new price

    const [deployer] = await hre.ethers.getSigners();
    const nftContract = await hre.ethers.getContractAt("LocalTrustNFT", contractAddress);

    console.log(`Listing NFT ID ${tokenId} for sale at ${price} wei...`);
    const txn = await nftContract.listNFT(tokenId, price);
    await txn.wait();
    
    console.log("NFT listed for sale!");
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
