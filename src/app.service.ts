import { Injectable } from '@nestjs/common';
import { BigNumber, ethers } from 'ethers';
import * as tokenJson from './assets/MyTOken.json'
import * as dotenv from "dotenv";
import { ReturnTokens } from './dtos/ReturnTokens.dto';
dotenv.config();

const TOKEN_CONTRACT_ADDRESS = '0xDC05b06677CdE4660f5D3fCfED7Ac5Ab09693e2D';
const BALLOT_CONTRACT_ADDRESS = '0xa38932E2408EAA4D286e7E77770204f4DdC02969';

@Injectable()
export class AppService {
  provider: ethers.providers.BaseProvider;
  contract: ethers.Contract;
  wallet: ethers.Wallet;

  constructor() {
    this.provider = new ethers.providers.AlchemyProvider('goerli', process.env.ALCHEMY_API_KEY);
    this.wallet = new ethers.Wallet(process.env.PRIVATE_KEY, this.provider).connect(this.provider);
    this.contract = new ethers.Contract(
      TOKEN_CONTRACT_ADDRESS,
      tokenJson.abi,
      this.provider
    );
  }

  getContractAddress(): string {
    return TOKEN_CONTRACT_ADDRESS;
  }

  async getTotalSupply(): Promise<number> {
    const totalSupplyBN = await this.contract.totalSupply();
    const totalSupplyString = ethers.utils.formatEther(totalSupplyBN);
    return parseFloat(totalSupplyString);
  }

  async getAllowance(from: string, to: string): Promise<number> {
    const allowanceBN = await this.contract.allowance();
    const allowanceString = ethers.utils.formatEther(allowanceBN);
    return parseFloat(allowanceString);
  }

  async getTransaction(hash: string): Promise<any> {
    return this.provider.getTransaction(hash);
  }

  async requestTokens(address: string, amount: string): Promise<ReturnTokens> {
    const mintTx = await this.contract.connect(this.wallet).mint(address, ethers.utils.parseUnits(amount));
    const receipt = await mintTx.wait();
    return new ReturnTokens(receipt.transactionHash, address, amount);
  }
}
