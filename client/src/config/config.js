import abi from '../utils/SpaceCockNFT.json';
import dotenv from 'dotenv';
dotenv.config();

const contractAddress = '0xfC6e7cC84928F519a9fED36088292d0b7B3b1Bf2';
const contractABI = abi.abi;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	contractAddress,
	contractABI,
}
