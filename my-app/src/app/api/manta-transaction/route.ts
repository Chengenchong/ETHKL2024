import { NextResponse } from 'next/server';
import { ethers } from 'ethers';
import { ZKSbtSDK } from "@zksbt/jssdk";

const ZKSBT_CONTRACT = '0xa44155ffbcE68C9C848f8Ea6F28C40311085125E';
const MANTA_RPC = 'https://manta-pacific.calderachain.xyz/http'; // Replace with actual Manta RPC URL

let sdk: any = null;

export async function POST(request: Request) {
  const { action, recipient, amount, privateKey } = await request.json();

  if (!sdk) {
    try {
      const provider = new ethers.providers.JsonRpcProvider(MANTA_RPC);
      const wallet = new ethers.Wallet(privateKey, provider);
      sdk = await ZKSbtSDK.create(wallet, ZKSBT_CONTRACT);
    } catch (error) {
      return NextResponse.json({ error: 'Failed to initialize SDK' }, { status: 500 });
    }
  }

  switch (action) {
    case 'getBalance':
      try {
        const balance = await sdk.wallet.getBalance();
        return NextResponse.json({ balance: ethers.utils.formatEther(balance) });
      } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch balance' }, { status: 500 });
      }

    case 'sendTransaction':
      if (!recipient || !amount) {
        return NextResponse.json({ error: 'Recipient and amount are required' }, { status: 400 });
      }
      try {
        // Note: This is a placeholder. Replace with the actual method from ZKSbtSDK
        const tx = await sdk.sendTransaction(recipient, ethers.utils.parseEther(amount));
        await tx.wait();
        return NextResponse.json({ message: 'Transaction sent', hash: tx.hash });
      } catch (error) {
        return NextResponse.json({ error: 'Transaction failed' }, { status: 500 });
      }

    default:
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  }
}