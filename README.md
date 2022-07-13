## Cryptic Vault : Your Decentralized Digital Vault!

### Key Features:

- Decentralized Storage on IPFS
- NFT based Access 
- Information Inheritance 
- Data Encryption on Top of IPFS

### Problem:

- Industry experts say that between 2.3 million and 3.7 million bitcoins have been lost. While this is for a variety of reasons, a big chunk of that lost bitcoin is from it simply disappearing with those who’ve died.
- Billions of Dollars worth of Insurance Money is Unclaimed - Family Members are unaware of Insurance, Property Documents and many more private docs.
- Role-based access to information for DAOs and Individuals.

## It includes:

**1) Role Management:** DAO admin or any individual can create roles as per their requirement like Content Team, Video Editing Team, Tech Team, etc. as per the role, NFT will be minted and assigned to members.

![role](https://user-images.githubusercontent.com/105703992/168972033-3d5493f6-bb00-4cbd-b8c6-87c5a6079d09.png)

**2) NFT Membership:** DAO admin or individual can create role based NFT drop and send it to members. By receiving role based NFT, members can log in and access only a particular area of their Dashboard as per permissions granted to their role.

![FireShot Capture 039 - Membership - Cryptic Vault - localhost](https://user-images.githubusercontent.com/105703992/168971690-e823e944-5889-4e6b-9813-310da177b4c8.png)

![FireShot Capture 040 - Members - Cryptic Vault - localhost](https://user-images.githubusercontent.com/105703992/168971785-d4b62e5d-b419-4aa5-aa93-2268bf00ac54.png)

**3) Drive:** It is a document vault for DAO or individual where they can save important documents like invoices, legal agreements copies, and images on decentralized Web3 storage via Drive.

![daodrive](https://user-images.githubusercontent.com/105703992/168972287-c18d338d-154c-497b-9f96-054f984cce7f.png)

**4) Feedback / WhistleBlower complaints:** DAO members can anonymously submit feedback and for any unethical behavior, whistleblowers can raise complaints to help DAO stay aligned with their rules and regulations and terminate the membership of bad actors.

![feedback](https://user-images.githubusercontent.com/105703992/168972418-2391d4bb-dfc3-4d9b-a6ff-34f815f16a12.png)

### Blockchain: Polygon

https://github.com/devchain17/Decentra-Tool/blob/master/hardhat.config.js

``require("dotenv").config({ path: "./.env" });
require("@nomiclabs/hardhat-waffle");

const pk_1 = process.env.REACT_APP_PRIVATE_KEY;
console.log(pk_1);
module.exports = {
solidity: "0.8.4",
networks: {
hardhat: {},
mumbai: {
url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_KEY}`,
accounts: [pk_1]
},
},
};
``

### Contract List:

**1) Bulk Mint Token Contract:** https://blockexplorer.rinkeby.boba.network/address/0x0C4DCc2dc216fF3Fe1A7A4F6c9B5D71cbA10AFC2/transactions

**1) Multi Send Token Contract:** https://blockexplorer.rinkeby.boba.network/address/0x63C2464BC8b0B22e00Df459310b728414dF6BE4e/transactions






