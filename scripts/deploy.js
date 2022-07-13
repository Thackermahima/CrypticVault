const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const CrypticVault = await hre.ethers.getContractFactory("CrypticVault");
  const crypticVault = await CrypticVault.deploy();
  
  console.log("CrypticVault contract address:", crypticVault.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
