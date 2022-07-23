## IPFS/Filecoin

##### https://github.com/mansijoshi17/CrypticVault/blob/master/src/context/Web3Storage.js

##### https://github.com/mansijoshi17/CrypticVault/blob/master/src/pages/Drive.js

##### https://github.com/mansijoshi17/CrypticVault/blob/master/src/modal/CreateMember.js

## Web3Storage.js

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

  async function storeDriveFiles(file) {
    setLoading(true);
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async function () {
      var b64 = reader.result.replace(/^data:.+;base64,/, "");
      var iv = cryptoJs.enc.Base64.parse("");
      var key = cryptoJs.SHA256("");
      var encryptedString = getEncryptData(reader.result, iv, key);
      await encryptedString.then(async (e) => {
        let files = await makeFileObjects(
          {
            file: e,
            name: file.name.substring(0, file.name.indexOf(".")).toString(),
            type: file.type,
          },
          "CrypticVault"
        );
        let cid = await storeJsonFiles(files);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const crypticVaultCon = new ethers.Contract(
          crypticVaultContract,
          crypticVault.abi,
          signer
        );

        let tansactionCreateDocument = await crypticVaultCon.storeDocuments(
          cid
        );
        let tx = await tansactionCreateDocument.wait();
        if (tx) {
          setLoading(false);
          setIsUpdated(!isUpdated);
          toast.success("Successfully Uploaded!");
        }
      });
    };
  }
```

## CreateMember.js

```
 onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const crypticVaultCon = new ethers.Contract(
          crypticVaultContract,
          crypticVault.abi,
          signer
        );
        let files = await makeFileObjects(
          values,
          "member.json",
          "application/json"
        );
        let cid = await storeJsonFiles(files);
        let tansactionCreateMember = await crypticVaultCon.createMembers(cid);
        let tx = await tansactionCreateMember.wait();
        if (tx) {
          props.setIsUpdated(!props.isUpdated);
          resetForm();
          setLoading(false);
          props.close();
          toast.success("Successfully Members created!!");
        }
      } catch (error) {
        console.log(error);
        setLoading(false);

        toast.error("Something went wrong!");
      }
    },
  });

```

## Drive.js

```

  async function onChange(e) {
    const data = e.target.files;

    try {
      if (
        data[0].type == "application/pdf" ||
        data[0].type == "application/json" ||
        data[0].type == "image/png" ||
        data[0].type == "image/jpg" ||
        data[0].type == "image/jpeg" ||
        data[0].type == "text/plain" ||
        data[0].type == "text/csv"
      ) {
        await storeDriveFiles(data[0]);
      } else {
        toast.error("Please upload pdf, json, txt, csv, png, jpg or jpeg!");
      }
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }


```
