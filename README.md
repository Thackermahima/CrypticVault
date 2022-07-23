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

**1) Sign In with Admin and Member:** Admin can create token from sign with admin which will be used for membership. and in login with member, member can login with admin address which will check that member have that admin's nft or not.

<img width="1440" alt="login" src="https://user-images.githubusercontent.com/54347081/180590440-5aef269d-1289-4edb-af1e-3d094333265b.png">

**2) Decentralized Encrypted Storage :** In Drive we can store different type of file which will stored encrypted on IPFS.

<img width="1430" alt="drive" src="https://user-images.githubusercontent.com/54347081/180590470-650ce8ea-f6c4-4e05-8830-5bd37adf8bc6.png">

**3) Members:** Add Members to give access of your digital vault.

<img width="1440" alt="members" src="https://user-images.githubusercontent.com/54347081/180590486-08beb960-2f91-4e11-a358-c240cbc3649d.png">

**4) Emergency Alert:** Set Emergency alert email message to notify the member about access permission.

<img width="1440" alt="alert" src="https://user-images.githubusercontent.com/54347081/180590504-c721bf6b-3df4-4a11-8753-1c55760d5877.png">

**5) Access Permission:** There are three ways to give access permission. 1) Give access right away which will transfer token and send email to the particular member right away 2) Emergency Transfer is set number of days the when transfer should be executed, if admin is not active from defined days. 3) On selected date is token should be transfered on particular date.

<img width="1440" alt="access" src="https://user-images.githubusercontent.com/54347081/180590533-a0af52cc-434e-462f-b8e4-b754433f63dc.png">

**6) Encrypted Notes:** In notes, added notes will be stored encrypted on IPFS.

<img width="1439" alt="notes" src="https://user-images.githubusercontent.com/54347081/180590554-dbb39725-4bbd-4a1f-b6d1-76b18e676bdf.png">

**6) Encrypted Email:** Encrypted email is used to create decentralised communication between two wallet address. And all the mails are encrypted.

<img width="1440" alt="Screenshot 2022-07-23 at 11 37 49 AM" src="https://user-images.githubusercontent.com/54347081/180592879-ba4e0fd1-c91e-4329-8fd2-4cbaa8f49f13.png">

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

### IPFS/Filecoin

https://github.com/mansijoshi17/CrypticVault/blob/master/Filecoin.md

```
 function getAccessToken() {
    // If you're just testing, you can paste in a token
    // and uncomment the following line:
    // return 'paste-your-token-here'

    // In a real app, it's better to read an access token from an
    // environement variable or other configuration that's kept outside of
    // your code base. For this to work, you need to set the
    // WEB3STORAGE_TOKEN environment variable before you run your code.
    return process.env.REACT_APP_WEB3STORAGE_TOKEN;
  }

  function makeStorageClient() {
    return new Web3Storage({ token: getAccessToken() });
  }

  function makeFileObjects(data, name) {
    // You can create File objects from a Blob of binary data
    // see: https://developer.mozilla.org/en-US/docs/Web/API/Blob
    // Here we're just storing a JSON object, but you can store images,
    // audio, or whatever you want!
    const obj = data;
    const blob = new Blob([JSON.stringify(obj)], { type: "application/json" });

    const files = [new File([blob], name)];
    return files;
  }

  async function storeJsonFiles(files) {
    const client = makeStorageClient();
    const cid = await client.put(files);
    console.log(
      "stored files with cid:",
      `https://${cid}.ipfs.infura-ipfs.io/`
    );
    return cid;
  }
```

### XMTP

https://github.com/mansijoshi17/CrypticVault/blob/master/src/context/ChatBoxContext.js

```
import { Client, ContentTypeText } from "@xmtp/xmtp-js";

 useEffect(() => {
    async function connectWallet() {
      setLoading(true);
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const usr = signer.getAddress();
      if (usr) {
        usr.then((res) => {
          setCurrentUser(res);
        });
      }
      setSigner(signer);
      const xmtp = await Client.create(signer);
      setXmtp(xmtp);
      const list = await xmtp.conversations.list();
      setUserList(list);
      setLoading(false);
    }
    connectWallet();
  }, [isUpdate]);

  useEffect(() => {
    const getConvo = async () => {
      if (!xmtp) {
        return;
      }
      setConversation(await xmtp.conversations.newConversation(peerAddress));
    };
    getConvo();
  }, [xmtp, peerAddress]);

  useEffect(() => {
    const closeStream = async () => {
      if (!stream) return;
      await stream.return();
    };
    closeStream();
  }, [peerAddress]);

  useEffect(() => {
    const getList = async () => {
      await xmtp.conversations.newConversation(peerAddress);
      const lst = await xmtp.conversations.list();
      setUserList(lst);
    };
    if (xmtp) {
      getList();
    }
  }, [conversation, peerAddress]);

  useEffect(() => {
    const listMessages = async () => {
      if (!conversation) return;
      const msgs = await conversation.messages({ pageSize: 100 });
      setMessageList(msgs);
    };
    listMessages();
  }, [conversation, loading, updateMessage]);

  useEffect(() => {
    const streamMessages = async () => {
      if (!conversation) return;
      const demoStream = await conversation.streamMessages();
      setStream(demoStream);
      var array = [];
      for await (const msg of demoStream) {
        array.push(msg);
      }
      setMessageList(array);
    };
    streamMessages();
  }, [conversation, loading, updateMessage]);

  const handleSend = useCallback(
    async (message) => {
      if (!conversation) return;
      setUpdateMessage(true);
      await conversation.send(message);
      setUpdateMessage(false);
    },

    [conversation]
  );


```
