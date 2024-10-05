import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import styles from './NFTMintingForm.module.css';

const NFT_CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
const NFT_CONTRACT_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "initialOwner",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "uri",
        "type": "string"
      }
    ],
    "name": "safeMint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
  // Add other functions from your ABI here
];

const NFTMintingForm: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [minting, setMinting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState('');
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);

  useEffect(() => {
    const initializeContract = async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          setSigner(signer);
          const nftContract = new ethers.Contract(NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI, signer);
          setContract(nftContract);
        } catch (error) {
          console.error("Failed to initialize contract:", error);
          setError("Failed to connect to the blockchain. Please make sure MetaMask is installed and connected to the correct network.");
        }
      } else {
        setError("Please install MetaMask to use this application.");
      }
    };

    initializeContract();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const uploadToIPFS = async (file: File): Promise<string> => {
    // In a real application, you'd upload to IPFS here
    // For this example, we'll just return a dummy URL
    return `https://ipfs.io/ipfs/dummy_hash_${file.name}`;
  };

  const createMetadata = async (imageUrl: string): Promise<string> => {
    const metadata = {
      name,
      description,
      image: imageUrl
    };
    // In a real application, you'd upload this metadata to IPFS
    // For this example, we'll just return a dummy URL
    return `https://ipfs.io/ipfs/dummy_metadata_hash`;
  };

  const mintNFT = async (tokenURI: string) => {
    if (!contract) {
      setError("Contract not initialized. Please try again.");
      return;
    }

    try {
      if (signer !== null) {
        const address = await signer.getAddress();
        const mintTx = await contract.safeMint(address, tokenURI);
        setStatus('Minting... Please wait for transaction confirmation.');
        await mintTx.wait();
        setStatus('NFT minted successfully!');
      }
    } catch (err: any) {
      console.error(err);
      setError(`Error minting NFT: ${err.message}`);
    }
  };

  const handleMint = async () => {
    setMinting(true);
    setError(null);
    setStatus('');

    if (!file || !name) {
      setError('Please provide both an image and a name for your NFT.');
      setMinting(false);
      return;
    }

    try {
      setStatus('Uploading image to IPFS...');
      const imageUrl = await uploadToIPFS(file);
      
      setStatus('Creating metadata...');
      const metadataUrl = await createMetadata(imageUrl);
      
      setStatus('Minting NFT...');
      await mintNFT(metadataUrl);
    } catch (err: any) {
      console.error(err);
      setError(`Error during minting process: ${err.message}`);
    } finally {
      setMinting(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Mint Your NFT</h1>
      <div className={styles.form}>
        <div className={styles.fileInput}>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className={styles.hiddenInput}
            id="file-upload"
          />
          <label htmlFor="file-upload" className={styles.fileLabel}>
            {file ? file.name : 'Choose an image file'}
          </label>
        </div>
        
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter NFT name"
          className={styles.input}
        />
        
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter NFT description"
          className={styles.textarea}
        />
        
        <button
          onClick={handleMint}
          disabled={minting}
          className={styles.button}
        >
          {minting ? 'Minting...' : 'Mint NFT'}
        </button>
        
        {status && <p className={styles.status}>{status}</p>}
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

export default NFTMintingForm;