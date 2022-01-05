import abi from '../utils/SpaceCockNFT.json';
import dotenv from 'dotenv';
dotenv.config();

const contractAddress = '0x238f47c35619076f6B8432416B04B67aaCF678F4';
const contractABI = abi.abi;

export default {
	contractAddress,
	contractABI,
}
