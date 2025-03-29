const hre = require("hardhat");

async function main() {
    const contractAddress = "0xFA3ed7EA55b13A6914ff0310B2C0a9bEE1dfCF83"; // Update with your deployed contract address
    const metadataURI = "ipfs://bafkreiahv4b2mubgr24ody3s7hszkqrodawr3rh4c2msmfonsqjbehpodu"; // Correct format
    const price = hre.ethers.parseUnits("0.1", "ether"); // Convert to BigNumberish format

    const [deployer] = await hre.ethers.getSigners();
    const nftContract = await hre.ethers.getContractAt("LocalTrustNFT", contractAddress);

    console.log("Minting NFT...");
    const txn = await nftContract.mintNFT(metadataURI, price);
    await txn.wait();

    console.log("NFT Minted Successfully!");
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
