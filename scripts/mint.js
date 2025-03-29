// Import the Hardhat Runtime Environment
const hre = require("hardhat");

// Define an asynchronous function to execute the main logic
async function main() {
    // Address of the deployed NFT contract
    const contractAddress = "0xFA3ed7EA55b13A6914ff0310B2C0a9bEE1dfCF83";

    // URI pointing to the metadata of the NFT stored on IPFS
    const metadataURI = "ipfs://bafkreiahv4b2mubgr24ody3s7hszkqrodawr3rh4c2msmfonsqjbehpodu";

    // Define the price for the NFT in ethers (0.1 ether)
    const price = hre.ethers.parseUnits("0.1", "ether");

    // Retrieve the list of signers (accounts) from Hardhat
    const [deployer] = await hre.ethers.getSigners();

    // Obtain a contract instance to interact with the deployed NFT contract
    const nftContract = await hre.ethers.getContractAt("LocalTrustNFT", contractAddress);

    // Log message indicating the start of the minting process
    console.log("Minting NFT...");

    // Call the mintNFT function of the contract to mint a new NFT
    const txn = await nftContract.mintNFT(metadataURI, price);

    // Wait for the transaction to be mined
    await txn.wait();

    // Log message indicating successful minting of the NFT
    console.log("NFT Minted Successfully!");
}

// Execute the main function and handle any errors that may occur
main().catch((error) => {
    // Log any errors to the console
    console.error(error);

    // Exit the process with a non-zero status code to indicate failure
    process.exit(1);
});

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//hello world
//hello
//
//
//
//
//
//
//hello world
//hello
//
//
//
//
//
//
//hello world
//hello
//
//
//
//
//
//
//hello world
//hello
//
//
//
//
//
//
//hello world
//hello
//
//
//hello world
//hello
//
//
//
//
//
//
//hello world
//hello//
//
//hello world
//hello
//
//
//
//
//
//
//hello world
//hello//
//
//hello world
//hello
//
//
//
//
//
//
//hello world
//hello//
//
//hello world
//hello
//
//
//
//
//
//
//hello world
//hello//
//
//hello world
//hello
//
//
//
//
//
//mountaindew
//hello world
//hello
console.log("Hello world")
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//hello world
//hello
//
//
//
//
//
//
//hello world
//hello
//
//
//
//
//
//
//hello world
//hello
//
//
//
//
//
//
//hello world
//hello
//
//
//
//
//
//
//hello world
//hello
//
//
//hello world
//hello
//
//
//
//
//
//
//hello world
//hello//
//
//hello world
//hello
//
//
//
//
//
//
//hello world
//hello//
//
//hello world
//hello
//
//
//
//
//
//
//hello world
//hello//
//
//hello world
//hello
//
//
//
//
//
//
//hello world
//hello//
//
//hello world
//hello
//
//
//
//
//
//mountaindew
//hello world
//hello
console.log("Hello world")
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//hello world
//hello
//
//
//
//
//
//
//hello world
//hello
//
//
//
//
//
//
//hello world
//hello
//
//
//
//
//
//
//hello world
//hello
//
//
//
//
//
//
//hello world
//hello
//
//
//hello world
//hello
//
//
//
//
//
//
//hello world
//hello//
//
//hello world
//hello
//
//
//
//
//
//
//hello world
//hello//
//
//hello world
//hello
//
//
//
//
//
//
//hello world
//hello//
//
//hello world
//hello
//
//
//
//
//
//
//hello world
//hello//
//
//hello world
//hello
//
//
//
//
//
//mountaindew
//hello world
//hello
console.log("Hello world")