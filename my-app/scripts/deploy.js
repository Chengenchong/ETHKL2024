const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const MantaNFT = await hre.ethers.getContractFactory("MantaNFT");
  const mantaNFT = await MantaNFT.deploy(deployer.address);

  await mantaNFT.waitForDeployment();

  console.log("MantaNFT deployed to:", await mantaNFT.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });