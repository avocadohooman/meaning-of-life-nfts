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

	string baseSvg = "<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMin meet' viewBox='0 0 350 350'><style>.base { fill: white; font-family: serif; font-size: 20px; }</style><rect width='100%' height='100%' fill='black' /><text x='50%' y='30%' class='base' dominant-baseline='middle' text-anchor='middle'>";
	string lineBreakStart = "<tspan x='50%' dy='1em'>"; 
	string lineBreakEnd= "</tspan>"; 
	string lineBreakStartSpace = "<tspan x='50%' dy='1.5em'>"; 
	string questionPartOne = "What is the answer to life,";
	string questionPartTwo = "the universe, and everything?";
	string[] firstWords = ["Failure, ", "Freedom, ", "Belief, ", "Ghost, ", "Holiday, ", "Patience, ", "Calm, ", "Angel, ", "Faith, ", "Peace, "];
	string[] secondWords = ["Explosion, and ", "Fish, and ", "Computer, and ", "Nuts, and ", "Planet, and ", "Cemetery, and ", "Yacht, and ", "Lobster, and ", "Train, and ", "Dance, and"];
	string[] thirdWords = ["Gun", "Cellar", "Cow", "Fireplace", "Motorbike", "Spider", "Car", "Pipe", "Glasses", "Brrom"];	

	// We need to pass the name of our NFTs token and its symbol.
	constructor() ERC721 ("SpaceCockNFT", "SPACE") {
		console.log('This is my NFT contract.');
	}

  	// I create a function to randomly pick a word from each array.
	function pickRandomFirstWord(uint256 tokenId) public view returns (string memory) {
		/* 
			abi.encodePacked combines three strings: 'FIRST', block.timestamp and tokendId and 
			passes this string to random();
		*/
		console.log('abi.encodePacked(arg)', string(abi.encodePacked("FIRST",Strings.toString(block.timestamp), Strings.toString(tokenId))));
		uint256 rand = random(string(abi.encodePacked("FIRST",Strings.toString(block.timestamp), Strings.toString(tokenId))));
		console.log('rand', rand);
    	// Squash the # between 0 and the length of the array to avoid going out of bounds.
		rand = rand % firstWords.length;
		console.log('Squashed rand', rand);
		return firstWords[rand];
	}

	function pickRandomSecondWord(uint256 tokenId) public view returns (string memory) {
		/* 
			abi.encodePacked combines three strings: 'Second', block.timestamp and tokendId and 
			passes this string to random();
		*/
		console.log('abi.encodePacked(arg)', string(abi.encodePacked("SECOND",Strings.toString(block.timestamp), Strings.toString(tokenId))));
		uint256 rand = random(string(abi.encodePacked("SECOND",Strings.toString(block.timestamp), Strings.toString(tokenId))));
		console.log('rand', rand);
    	// Squash the # between 0 and the length of the array to avoid going out of bounds.
		rand = rand % secondWords.length;
		console.log('Squashed rand', rand);
		return secondWords[rand];
	}

	function pickRandomThirdWord(uint256 tokenId) public view returns (string memory) {
		/* 
			abi.encodePacked combines three strings: 'THIRD', block.timestamp and tokendId and 
			passes this string to random();
		*/
		uint256 rand = random(string(abi.encodePacked("THIRD",Strings.toString(block.timestamp), Strings.toString(tokenId))));
    	// Squash the # between 0 and the length of the array to avoid going out of bounds.
		rand = rand % thirdWords.length;
		return thirdWords[rand];
	}

	/*
		Pure functions ensure that they not read or modify the state. A function can be declared as pure.
		Internal functions and state variables can only be accessed internally (i.e. from within the current 
		contract or contracts deriving from it), without using this.
	*/
	function random(string memory input) internal pure returns (uint256) {
		//	Keccak256 is a cryptographic function built into solidity. This function takes in any amount of inputs and converts it to a unique 32 byte hash
		return uint256(keccak256(abi.encodePacked((input))));
	}

  	// A function our user will hit to get their NFT.
	function makeAnEpicNFT() public {
		/*
			we're using _tokenIds to keep track of the NFTs unique identifier, and it's just a number! 
			It's automatically initialized to 0 when we declare private _tokenIds. 
			So, when we first call makeAnEpicNFT, newItemId is 0. When we run it again, newItemId will be 1, and so on!
		*/
		uint256 newItemId = _tokenIds.current();

		// we go and pick one random word from each array
		string memory firstWord = pickRandomFirstWord(newItemId);
		string memory secondWord = pickRandomSecondWord(newItemId);
		string memory thirdWord = pickRandomThirdWord(newItemId);

		// I concatenate it all together, and then close the <text> and <svg> tags.
		string memory finalSvg = string(abi.encodePacked(baseSvg,lineBreakStart,questionPartOne, lineBreakEnd, lineBreakStart, questionPartTwo, lineBreakEnd,lineBreakStartSpace, firstWord,secondWord,thirdWord,lineBreakEnd, "</text></svg>"));

		console.log("\n--------------------");
		console.log(finalSvg);
		console.log("--------------------\n");

     	// Actually mint the NFT to the sender using msg.sender.
		_safeMint(msg.sender, newItemId);

    	// Set the NFTs data.
		_setTokenURI(newItemId, "data:application/json;base64,ewogICAgIm5hbWUiOiAiRXBpY0xvcmRIYW1idXJnZXIiLAogICAgImRlc2NyaXB0aW9uIjogIkFuIE5GVCBmcm9tIHRoZSBoaWdobHkgYWNjbGFpbWVkIHNxdWFyZSBjb2xsZWN0aW9uIiwKICAgICJpbWFnZSI6ICJkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUI0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtY2lJSEJ5WlhObGNuWmxRWE53WldOMFVtRjBhVzg5SW5oTmFXNVpUV2x1SUcxbFpYUWlJSFpwWlhkQ2IzZzlJakFnTUNBek5UQWdNelV3SWo0TkNpQWdJQ0E4YzNSNWJHVStMbUpoYzJVZ2V5Qm1hV3hzT2lCM2FHbDBaVHNnWm05dWRDMW1ZVzFwYkhrNklITmxjbWxtT3lCbWIyNTBMWE5wZW1VNklERTBjSGc3SUgwOEwzTjBlV3hsUGcwS0lDQWdJRHh5WldOMElIZHBaSFJvUFNJeE1EQWxJaUJvWldsbmFIUTlJakV3TUNVaUlHWnBiR3c5SW1Kc1lXTnJJaUF2UGcwS0lDQWdJRHgwWlhoMElIZzlJalV3SlNJZ2VUMGlOVEFsSWlCamJHRnpjejBpWW1GelpTSWdaRzl0YVc1aGJuUXRZbUZ6Wld4cGJtVTlJbTFwWkdSc1pTSWdkR1Y0ZEMxaGJtTm9iM0k5SW0xcFpHUnNaU0krUlhCcFkweHZjbVJJWVcxaWRYSm5aWEk4TDNSbGVIUStEUW84TDNOMlp6ND0iCn0=");

    	// Increment the counter for when the next NFT is minted.
		_tokenIds.increment();
		console.log("An NFT w/ ID %s has been minted to %s", newItemId, msg.sender);
	}
}
