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

### Contract on Polygon:

**1) CrypticVault Contract :** https://mumbai.polygonscan.com/address/0xF7CbDe3831E18067794C615CF6a633Ee719F4D14

## It includes:

**1) Sign In with Admin and Member:** Admin can create token from login with admin which will be used for membership. and in login with member, member can login with admin address which will check that member have that admin's nft or not.

<img width="1440" alt="login" src="https://user-images.githubusercontent.com/54347081/180590440-5aef269d-1289-4edb-af1e-3d094333265b.png">

**2) Decentralized Encrypted Storage :**

<img width="1430" alt="drive" src="https://user-images.githubusercontent.com/54347081/180590470-650ce8ea-f6c4-4e05-8830-5bd37adf8bc6.png">

**3) Members:**

<img width="1440" alt="members" src="https://user-images.githubusercontent.com/54347081/180590486-08beb960-2f91-4e11-a358-c240cbc3649d.png">

**4) Emergency Alert:**

<img width="1440" alt="alert" src="https://user-images.githubusercontent.com/54347081/180590504-c721bf6b-3df4-4a11-8753-1c55760d5877.png">

**5) Access Permission:**

<img width="1440" alt="access" src="https://user-images.githubusercontent.com/54347081/180590533-a0af52cc-434e-462f-b8e4-b754433f63dc.png">

**6) Encrypted Notes:**

<img width="1439" alt="notes" src="https://user-images.githubusercontent.com/54347081/180590554-dbb39725-4bbd-4a1f-b6d1-76b18e676bdf.png">

**6) Encrypted Email:**

### Blockchain: Polygon

https://github.com/mansijoshi17/CrypticVault-live-/blob/master/hardhat.config.js

```require("dotenv").config({ path: "./.env" });
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
```


