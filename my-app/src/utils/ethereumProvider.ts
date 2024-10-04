import { ethers } from 'ethers';

const SCROLL_RPC_URL = 'https://sepolia-rpc.scroll.io/';
const MANTA_RPC_URL = 'https://pacific-rpc.sepolia-testnet.manta.network/http';

let provider: ethers.JsonRpcProvider | null = null;

export function getProvider(network: 'scroll' | 'manta'): ethers.JsonRpcProvider {
  if (!provider) {
    provider = new ethers.JsonRpcProvider(network === 'scroll' ? SCROLL_RPC_URL : MANTA_RPC_URL);
  }
  return provider;
}

export async function connectWallet(network: 'scroll' | 'manta'): Promise<ethers.BrowserProvider | null> {
  if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.BrowserProvider(window.ethereum);

      const networkConfig = network === 'scroll'
        ? {
            chainId: '0x8274f', // 534351 in hexadecimal
            chainName: 'Scroll Sepolia Testnet',
            nativeCurrency: {
              name: 'Ethereum',
              symbol: 'ETH',
              decimals: 18
            },
            rpcUrls: [SCROLL_RPC_URL],
            blockExplorerUrls: ['https://sepolia.scrollscan.com/']
          }
        : {
            chainId: '0x34816E', // 3441006 in hexadecimal
            chainName: 'Manta Pacific Sepolia Testnet',
            nativeCurrency: {
              name: 'ETH',
              symbol: 'ETH',
              decimals: 18
            },
            rpcUrls: [MANTA_RPC_URL],
            blockExplorerUrls: ['https://pacific-explorer.manta.network']
          };

      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: networkConfig.chainId }],
      }).catch(async (error: any) => {
        if (error.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [networkConfig],
          });
        } else {
          throw error;
        }
      });

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