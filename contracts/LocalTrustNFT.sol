// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract LocalTrustNFT {
    struct NFT {
        uint256 id;
        address creator;
        address owner;
        uint256 price;
        bool forSale;
        string tokenURI; // Added for metadata
    }

    uint256 private _tokenIds;
    mapping(uint256 => NFT) public nfts;
    mapping(address => uint256[]) public ownerNFTs;

    event NFTMinted(uint256 indexed tokenId, address creator, uint256 price, string tokenURI);
    event NFTListed(uint256 indexed tokenId, uint256 price);
    event NFTSold(uint256 indexed tokenId, address buyer, uint256 price);

    // Mint a new NFT with Metadata URI
    function mintNFT(string memory tokenURI, uint256 price) public returns (uint256) {
        require(price > 0, "Price must be greater than 0");

        _tokenIds++;
        uint256 newTokenId = _tokenIds;

        nfts[newTokenId] = NFT(newTokenId, msg.sender, msg.sender, price, false, tokenURI);
        ownerNFTs[msg.sender].push(newTokenId);

        emit NFTMinted(newTokenId, msg.sender, price, tokenURI);
        return newTokenId;
    }

    // List NFT for sale
    function listNFT(uint256 tokenId, uint256 price) public {
        require(nfts[tokenId].owner == msg.sender, "Not the owner");
        require(price > 0, "Price must be greater than 0");

        nfts[tokenId].price = price;
        nfts[tokenId].forSale = true;

        emit NFTListed(tokenId, price);
    }

    // Buy NFT
    function buyNFT(uint256 tokenId) public payable {
        require(nfts[tokenId].forSale, "NFT not for sale");
        require(msg.value >= nfts[tokenId].price, "Insufficient funds");

        address previousOwner = nfts[tokenId].owner;
        nfts[tokenId].owner = msg.sender;
        nfts[tokenId].forSale = false;

        // Transfer payment to previous owner
        payable(previousOwner).transfer(msg.value);

        emit NFTSold(tokenId, msg.sender, msg.value);
    }

    // Get all NFTs owned by a user
    function getMyNFTs() public view returns (uint256[] memory) {
        return ownerNFTs[msg.sender];
    }

    // Retrieve metadata of an NFT
    function getTokenURI(uint256 tokenId) public view returns (string memory) {
        return nfts[tokenId].tokenURI;
    }
}
