// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

// We first import some OpenZeppelin Contracts.
// OpenZeppelin implements for us the EIP-721 standard for us, so we don't need to do it
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

// We inherit the contract we imported. This means we'll have access
// to the inherited contract's methods.
contract SpaceCockNFT is ERC721URIStorage {

	// Magic given to us by OpenZeppelin to help us keep track of tokenIds.
	using Counters for Counters.Counter;
	Counters.Counter private _tokenIds;
	
	// We need to pass the name of our NFTs token and its symbol.
	constructor() ERC721 ("SpaceCockNFT", "SPACE") {
		console.log('This is my NFT contract.');
	}

  	// A function our user will hit to get their NFT.
	function makeAnEpicNFT() public {
		/*
			we're using _tokenIds to keep track of the NFTs unique identifier, and it's just a number! 
			It's automatically initialized to 0 when we declare private _tokenIds. 
			So, when we first call makeAnEpicNFT, newItemId is 0. When we run it again, newItemId will be 1, and so on!
		*/
		uint256 newItemId = _tokenIds.current();

     	// Actually mint the NFT to the sender using msg.sender.
		_safeMint(msg.sender, newItemId);

    	// Set the NFTs data.
		_setTokenURI(newItemId, 'https://jsonkeeper.com/b/1FT8');

    	// Increment the counter for when the next NFT is minted.
		_tokenIds.increment();
		console.log("An NFT w/ ID %s has been minted to %s", newItemId, msg.sender);
	}
}
