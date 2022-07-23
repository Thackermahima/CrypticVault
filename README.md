## Cryptic Vault : Your Decentralized Digital Vault!

## CrypticVault is a platform to store your data and give NFT membership-based access to your vault near and dear ones.

### Key Features:

- Decentralized Storage on IPFS
- NFT based Access
- Information Inheritance
- Data Encryption on Top of IPFS

### Problem:

1. If something happens to a person or in case of death families are not aware of a) How much crypto person is having and especially how to get access to it b) Millions of dollars worth of insurance are unclaimed because families don't know if there was any medical insurance or life insurance. c) Property will deed etc

2. no central point of failure and censorship resistance. Currently, we store our data on Dropbox, Google Drive, etc but there are chances that someone from the internal team can access our data so we have encrypted data using SHA 256 and the encrypted hash is getting stored on IPFS

3. Persistent storage: Physical copy of data may get lost or damaged due to any reason but data stored on IPFS and Pinned using Filecoin are totally secure and everlasting. Even if the big bang happens on eath, data on the File coin will be accessible from other planets through satellite node which Protocol Labs team is planning :)

## It includes:

**1) Log In with Admin or Member:** DAO admin or any individual can create roles as per their requirement like Content Team, Video Editing Team, Tech Team, etc. as per the role, NFT will be minted and assigned to members.

![role](https://user-images.githubusercontent.com/105703992/168972033-3d5493f6-bb00-4cbd-b8c6-87c5a6079d09.png)

**2) NFT Membership:** DAO admin or individual can create role based NFT drop and send it to members. By receiving role based NFT, members can log in and access only a particular area of their Dashboard as per permissions granted to their role.

![FireShot Capture 039 - Membership - Cryptic Vault - localhost](https://user-images.githubusercontent.com/105703992/168971690-e823e944-5889-4e6b-9813-310da177b4c8.png)

![FireShot Capture 040 - Members - Cryptic Vault - localhost](https://user-images.githubusercontent.com/105703992/168971785-d4b62e5d-b419-4aa5-aa93-2268bf00ac54.png)

**3) Drive:** It is a document vault for DAO or individual where they can save important documents like invoices, legal agreements copies, and images on decentralized Web3 storage via Drive.

![daodrive](https://user-images.githubusercontent.com/105703992/168972287-c18d338d-154c-497b-9f96-054f984cce7f.png)

**4) Feedback / WhistleBlower complaints:** DAO members can anonymously submit feedback and for any unethical behavior, whistleblowers can raise complaints to help DAO stay aligned with their rules and regulations and terminate the membership of bad actors.

![feedback](https://user-images.githubusercontent.com/105703992/168972418-2391d4bb-dfc3-4d9b-a6ff-34f815f16a12.png)

### Blockchain: Polygon

https://github.com/mansijoshi17/CrypticVault/blob/master/hardhat.config.js

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

### Contract on Polygon:

**1) CrypticVault Contract :** https://mumbai.polygonscan.com/address/0xF7CbDe3831E18067794C615CF6a633Ee719F4D14
