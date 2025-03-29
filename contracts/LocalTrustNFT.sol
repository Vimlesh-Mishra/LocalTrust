// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LocalTrustNFT is ERC721URIStorage, Ownable {
    uint256 private _tokenIds;

    // Add `initialOwner` and pass it to `Ownable`
    constructor(address initialOwner) Ownable(initialOwner) ERC721("LocalTrustNFT", "LTNFT") {}

    function mintNFT(address recipient, string memory tokenURI) public onlyOwner returns (uint256) {
        _tokenIds++;
        uint256 newItemId = _tokenIds;
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        return newItemId;
    }
}
