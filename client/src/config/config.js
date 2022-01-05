import abi from '../utils/SpaceCockNFT.json';
import dotenv from 'dotenv';

dotenv.config();
const contractAddress = process.env.SMART_CONTRACT_ADDRESS;
const contractABI = abi.abi;

export default {
	contractAddress,
	contractABI,
}
