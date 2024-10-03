// utils/ethereumProvider.ts
import { ethers } from 'ethers';

const SCROLL_RPC_URL = 'https://sepolia-rpc.scroll.io/';  // Replace with the correct RPC URL for Scroll

let provider: ethers.JsonRpcProvider | null = null;

export function getProvider(): ethers.JsonRpcProvider {
  if (!provider) {
    provider = new ethers.JsonRpcProvider(SCROLL_RPC_URL);
  }
  return provider;
}

export async function connectWallet(): Promise<ethers.BrowserProvider | null> {
  if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.BrowserProvider(window.ethereum);
      let network = await provider.getNetwork();
      
      if (network.chainId !== BigInt(524351)) {  // Scroll's chain ID
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: '0x8274f',  // 534351 in hexadecimal
            chainName: 'Scroll Sepoila Testnet',
            nativeCurrency: {
              name: 'Ethereum',
              symbol: 'ETH',
              decimals: 18
            },
            rpcUrls: [SCROLL_RPC_URL],
            blockExplorerUrls: ['https://sepolia.scrollscan.com/']
          }]
        });
      }
      
      return provider;
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      return null;
    }
  } else {
    console.error('MetaMask is not installed');
    return null;
  }
}

// Add this to declare the ethereum property on the window object
declare global {
  interface Window {
    ethereum?: any;
  }
}