import React, {useEffect, useState} from "react";
import './styles/App.css';
import { ethers } from "ethers";
import config from './config/config';

// Constants
const OPENSEA_LINK = 'https://testnets.opensea.io/collection/meaningoflife';
const TOTAL_MINT_COUNT = 42;

const App = () => {

	const [currentAccount, setCurrentAccount] = useState('');
	const [isMinting, setIsMinting] = useState(false);
	const [numberOfNFTs, setNumberOfNFTs] = useState(0);
	const [successMessage, setSuccessMessage] = useState(false);
	const [tokenId, setTokenId] = useState();

	// Here we check if a wallet is connected
	const checkIfWalletIsConnected = async () => {
		try {
			const { ethereum } = window;
			if (!ethereum) {
				window.alert("Make sure you have MetaMask!");
				return ;
			}
			console.log("We have the ehtereum object", ethereum);

			const accounts = await ethereum.request({method: 'eth_accounts'});
			const chainId = await ethereum.request({ method: 'eth_chainId' });
			console.log("Connected to chain " + chainId);

			// String, hex code of the chainId of the Rinkebey test network
			const rinkebyChainId = "0x4"; 
			if (chainId !== rinkebyChainId) {
				alert("You are not connected to the Rinkeby Test Network!");
			}
			
			if (accounts.length > 0) {
				const account = accounts[0];
				console.log('found an authorized account: ', account);
				setCurrentAccount(account);
				getNumberOfNFTsMinted();
				eventListener();
			} else {
				console.log('no authorized account found');
			}
		} catch (error) {
			console.error(error.message);
		}
	};

	/*
	* Implement your connectWallet method here
	*/
	const connectWallet = async () => {
		try {
			const { ethereum } = window;
			if (!ethereum) {
				window.alert("Make sure you have MetaMask!");
				return ;
			}
			const accounts = await ethereum.request({method: 'eth_accounts'});
			const chainId = await ethereum.request({ method: 'eth_chainId' });
			console.log("Connected to chain " + chainId);

			// String, hex code of the chainId of the Rinkebey test network
			const rinkebyChainId = "0x4"; 
			if (chainId !== rinkebyChainId) {
				alert("You are not connected to the Rinkeby Test Network!");
			}

			if (accounts.length > 0) {
				const account = accounts[0];
				console.log('found an authorized account: ', account);
				setCurrentAccount(account[0]);
				getNumberOfNFTsMinted();
				eventListener();
			} else {
				console.log('no authorized account found');
			} 
		} catch (error) {
			console.log(error);
		}
	}

	/*
	* Implement your connectWallet method here
	*/
	const askContractToMintNft = async () => {
		setIsMinting(true);
		try {
			const { ethereum } = window;

			if (ethereum) { 
				const provider = new ethers.providers.Web3Provider(ethereum);
				const signer = provider.getSigner();
				const connectedContract = new ethers.Contract(config.contractAddress, config.contractABI, signer);

				console.log("Going to pop wallet now to pay gas...")
				// Mint an NFT :)
				const nftTxn = await connectedContract.makeAnEpicNFT({gasLimit: 3000000});
				console.log("Mining...please wait.")
				await nftTxn.wait();
				console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);
				setSuccessMessage(true);
			} else {
				window.alert("Ethereum object doesn't exist!");
			}
		} catch (error) {
			console.log(error);
		}
		setIsMinting(false);
	}

	/*
		Setup event listener for minting an NFT
	*/
	const getNumberOfNFTsMinted = async () => {
		try {
			const { ethereum } = window;

			if (ethereum) { 
				const provider = new ethers.providers.Web3Provider(ethereum);
				const signer = provider.getSigner();
				const connectedContract = new ethers.Contract(config.contractAddress, config.contractABI, signer);

				let count = await connectedContract.getTotalMintedNFTs();
				console.log('total amount of NFTs minted', count.toNumber());
				setNumberOfNFTs(count.toNumber());
			} else {
				window.alert("Ethereum object doesn't exist!");
			}
		} catch (error) {
			console.log(error);
		}
	}

	const nftMinted = (from, tokenId) => {
		if (from && tokenId) {
			console.log(from, Number(tokenId))
			setTokenId(Number(tokenId));
			// alert(`Hey there! We've minted your NFT and sent it to your wallet. It may be blank right now. It can take a max of 10 min to show up on OpenSea. Here's the link: https://testnets.opensea.io/assets/${config.contractAddress}/${tokenId.toNumber()}`);	
		}
	}

	const eventListener = () => {
		try {
			const { ethereum } = window;
			if (ethereum) {
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				const signer = provider.getSigner();	
				const connectedContract = new ethers.Contract(config.contractAddress, config.contractABI, signer);

				connectedContract.on("NewEpicNFTMinted", nftMinted);
			}
		} catch (error) {
			console.log(error);
		}
	}

	// Render Methods
	const renderNotConnectedContainer = () => (
		<button onClick={connectWallet}  className="cta-button connect-wallet-button">
			Connect to Wallet
		</button>
	);

	// Render Mint Button
	const renderMintContainer = () => (
		<button onClick={askContractToMintNft}  className="mint-button mint-button-animation">
			Get Your Answer NOW
		</button>
	);


	// Render Mint Loading Button
	const renderMintLoadingContainer = () => (
		<button className="cta-button connect-wallet-button">
			⛏️⛏️ Minting your NFT... ⛏️⛏️
		</button>
	);

	// Render Mint Loading Button
	const renderExploreContainer = () => (
		<a  href={OPENSEA_LINK} target="_blank" rel="noreferrer">
			<button className="cta-button connect-wallet-button">
				Explore the Meaning of Life NFT Collection
			</button>
		</a>
	);

	// Render Mint Success Button
	const renderSuccessContainer = () => (
		<button className="cta-button mint-success-button-animation">
			🎉🎉 NFT Created! 🎉🎉
		</button>
	);

	// Render Mint Success Button
	const renderCloseContainer = () => (
		<button onClick={() => setSuccessMessage(false)} className="cta-button mint-close-button-animation">
			Close Message
		</button>
	);
	

	useEffect(() => {
		checkIfWalletIsConnected();
	}, []);

	return (
		<div className="App">
			<div className="container">
			<div className="header-container">
				<p className="header gradient-text">The Meaning of Life NFT Collection</p>
				<p className="count gradient-text">{numberOfNFTs}/{TOTAL_MINT_COUNT} NFTs created</p>
				{renderExploreContainer()}
				<p className="sub-text">
				Each unique. Each personal. <br/>Get your answer to life, <br/>the universe and everything else today.
				</p>
				{!currentAccount &&
					renderNotConnectedContainer()
				}

				{currentAccount && !isMinting && !successMessage &&
					renderMintContainer()
				}

				{currentAccount && isMinting && !successMessage &&
					renderMintLoadingContainer()
				}

				{currentAccount && successMessage && tokenId &&
					<div>
						{renderSuccessContainer()}
						<div className="success-container sub-text">
							{`Hey there! We've minted your NFT and sent it to your wallet. It may be blank right now. 
							It can take a max of 10 min to show up on OpenSea. Here's the link: `}
							<a className="gradient-text" href={`https://testnets.opensea.io/assets/${config.contractAddress}/${tokenId}`}>Click here</a>
						</div>
						{renderCloseContainer()}
					</div>
				}

			</div>
			</div>
		</div>
	);
	};

export default App;
