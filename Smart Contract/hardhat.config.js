require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks:{
    hardhat:{},
    polygon_mumbai:{
      url:`https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_API}`,
      accounts:[`0x${process.env.PRIVATE_KEY}`],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API, 
  },
};
//0x81DEcd90B2a0171C4BDf7Bf89147AAFCe7f3a613
//0x3d945A3774F5D1CDf879B83903Ae00D2cf1ca29A