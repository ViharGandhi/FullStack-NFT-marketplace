// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const Nftmarketplace = await hre.ethers.getContractFactory('NFTmarketplace');
  const nft =await Nftmarketplace.deploy();
  await nft.deployed()
  console.log(`Your contract address is ${nft.address}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
//0x67F66023726b1A8E194bddeF3C7Fbf5f0372b31E