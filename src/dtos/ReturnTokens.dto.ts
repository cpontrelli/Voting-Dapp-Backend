import { BigNumber } from "ethers";

export class ReturnTokens {
    txHash: string;
    address: string;
    amount: string
    
    constructor(txHash: string, address: string, amount: string) {
        this.txHash = txHash;
        this.address = address;
        this.amount = amount;
    }
}