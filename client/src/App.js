import React, {useEffect, useState} from "react";
import './styles/App.css';
import twitterLogo from './assets/twitter-logo.svg';
import { ethers } from "ethers";
import config from './config/config';

// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const OPENSEA_LINK = '';
const TOTAL_MINT_COUNT = 50;

const App = () => {

	const [currentAccount, setCurrentAccount] = useState('');
	const [isMinting, setIsMinting] = useState(false);


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

			if (accounts.length > 0) {
				const account = accounts[0];
				console.log('found an authorized account: ', account);
				setCurrentAccount(account);
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

			if (accounts.length > 0) {
				const account = accounts[0];
				console.log('found an authorized account: ', account);
				setCurrentAccount(account[0]);
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
				const nftTxn = await connectedContract.makeAnEpicNFT();
				console.log("Mining...please wait.")
				await nftTxn.wait();
				console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);

			} else {
				window.alert("Ethereum object doesn't exist!");
			}
		} catch (error) {
			console.log(error);
		}
		setIsMinting(true);
	}

	// Render Methods
	const renderNotConnectedContainer = () => (
		<button onClick={connectWallet}  className="cta-button connect-wallet-button">
			Connect to Wallet
		</button>
	);

	// Render Mint Button
	const renderMintContainer = () => (
		<button onClick={askContractToMintNft}  className="cta-button connect-wallet-button">
			Mint NFT
		</button>
	);

	useEffect(() => {
		checkIfWalletIsConnected();
	}, []);

	return (
		<div className="App">
			<div className="container">
			<div className="header-container">
				<p className="header gradient-text">My NFT Collection</p>
				<p className="sub-text">
				Each unique. Each beautiful. Discover your NFT today.
				</p>
				{currentAccount === "" 
					? (renderNotConnectedContainer())
					: (renderMintContainer())
				}
				
			</div>
			{/* <div className="footer-container">
				<img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
				<a
				className="footer-text"
				href={TWITTER_LINK}
				target="_blank"
				rel="noreferrer"
				>{`built on @${TWITTER_HANDLE}`}</a>
			</div> */}
			</div>
		</div>
	);
	};

export default App;
