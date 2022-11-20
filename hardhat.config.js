// require("dotenv").config({ path: "./.env" });
// require("@nomiclabs/hardhat-waffle");

// const pk_1 = process.env.REACT_APP_PRIVATE_KEY;
// console.log(pk_1);
// module.exports = {
//   solidity: "0.8.4",
//   networks: {
//     hardhat: {},
//     mumbai: {
//       url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_KEY}`,

//       accounts: [pk_1],
//     },
//   },
// };
require("@nomicfoundation/hardhat-toolbox");
require('hardhat-deploy');
require('hardhat-deploy-ethers');
require("./tasks")
require("dotenv").config()

const PRIVATE_KEY = process.env.REACT_APP_PRIVATE_KEY
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.4",
  defaultNetwork: "wallaby",
  networks: {
    wallaby: {
      url: "https://wallaby.node.glif.io/rpc/v0",
      accounts: [PRIVATE_KEY],
    }
  },

};