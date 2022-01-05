
const main = async () => {
	/* 
		This will actually compile our contract and generate the necessary 
		files we need to work with our contract under the artifacts directory.
	*/
	const nftContractFactory = await hre.ethers.getContractFactory('SpaceCockNFT');
	/* 
		Here hardhat creates a local ETH blockchain just for this contract, and deploys it.
		After the script is done, it destroys that local network. It will be destroyed, 
		so we run the contract every time on a fresh blockchain.
	*/
	const nftContract = await nftContractFactory.deploy();
	await nftContract.deployed();
	console.log('NFT Contract deployed to: ', nftContract.address);

	let nftCount;
	nftCount = await nftContract.getTotalMintedNFTs();

	// call the function
	let txn = await nftContract.makeAnEpicNFT();
	await txn.wait();

	txn = await nftContract.makeAnEpicNFT();
	await txn.wait();

	nftCount = await nftContract.getTotalMintedNFTs();
}


const runMain = async () => {
	try {
		await main();
		process.exit(0);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
}

runMain();
