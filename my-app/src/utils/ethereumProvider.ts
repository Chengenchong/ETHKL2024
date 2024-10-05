import { ethers } from 'ethers';

const SCROLL_RPC_URL = 'https://sepolia-rpc.scroll.io/';
const MANTA_RPC_URL = 'https://pacific-rpc.sepolia-testnet.manta.network/http';

const networkConfigs = {
  scroll: {
    chainId: '0x8274f', // 534351 in hexadecimal
    chainName: 'Scroll Sepolia Testnet',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrls: [SCROLL_RPC_URL],
    blockExplorerUrls: ['https://sepolia.scrollscan.com/']
  },
  manta: {
    chainId: '0x34816E', // 3441006 in hexadecimal
    chainName: 'Manta Pacific Sepolia Testnet',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrls: [MANTA_RPC_URL],
    blockExplorerUrls: ['https://pacific-explorer.sepolia-testnet.manta.network/']
  }
};

export function getProvider(network: 'scroll' | 'manta'): ethers.JsonRpcProvider {
  return new ethers.JsonRpcProvider(network === 'scroll' ? SCROLL_RPC_URL : MANTA_RPC_URL);
}

export async function connectWallet(network: 'scroll' | 'manta'): Promise<ethers.BrowserProvider | null> {
  if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.BrowserProvider(window.ethereum);

      const networkConfig = networkConfigs[network];
      
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: networkConfig.chainId }],
        });
      } catch (switchError: any) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [networkConfig],
            });
          } catch (addError) {
            console.error('Failed to add network:', addError);
            return null;
          }
        } else {
          console.error('Failed to switch network:', switchError);
          return null;
        }
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