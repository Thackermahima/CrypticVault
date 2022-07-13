import React, { useState, createContext, useEffect, useCallback } from "react";
import { ethers } from "ethers";

import { toast } from "react-toastify";
import { Web3Storage } from "web3.storage";
import { useNavigate } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";
import cryptoJs from "crypto-js";

import { crypticVaultContract } from "../config";
import crypticVault from "../abi/CrypticVault.json";

import axios from "axios";

export const Web3StorageContext = createContext(undefined);

export const Web3StorageContextProvider = (props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [docsFiles, setDocFiles] = useState([]);

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

  const getEncryptData = async (data, iv, key) => {
    var encryptedString;
    if (typeof data == "string") {
      data = data.slice();
      encryptedString = cryptoJs.AES.encrypt(data, key, {
        iv: iv,
        mode: cryptoJs.mode.CBC,
        padding: cryptoJs.pad.Pkcs7,
      });
    } else {
      encryptedString = cryptoJs.AES.encrypt(JSON.stringify(data), key, {
        iv: iv,
        mode: cryptoJs.mode.CBC,
        padding: cryptoJs.pad.Pkcs7,
      });
    }
    return encryptedString.toString();
  };

  const getDocuments = async () => {
    var iv = cryptoJs.enc.Base64.parse("");
    var key = cryptoJs.SHA256("");
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const crypticVaultCon = new ethers.Contract(
        crypticVaultContract,
        crypticVault.abi,
        signer
      );
      let arr = [];
      let cids = await crypticVaultCon.getDocuments(
        localStorage.getItem("admin")
      );
      console.log(cids);
      for (var i = 0; i < cids.length; i++) {
        const meta = await axios.get(
          `https://${cids[i]}.ipfs.infura-ipfs.io/CrypticVault`
        );

        // console.log(meta.data);
        let d = decryptData(meta.data.file, iv, key);
        const blob = base64toBlob(d, meta.data.type);
        const url = URL.createObjectURL(blob);
        arr[i] = {
          file: url,
          name: meta.data.name,
          type: meta.data.type,
        };
      }
      setDocFiles(arr);
    } catch (err) {
      console.log(err);
    }
  };

  const base64toBlob = (data, type) => {
    // Cut the prefix `data:application/pdf;base64` from the raw base 64
    const base64WithoutPrefix = data.substr(`data:${type};base64,`.length);

    const bytes = atob(base64WithoutPrefix);
    let length = bytes.length;
    let out = new Uint8Array(length);

    while (length--) {
      out[length] = bytes.charCodeAt(length);
    }
    return new Blob([out], { type: type });
  };

  function decryptData(encrypted, iv, key) {
    var decrypted = cryptoJs.AES.decrypt(encrypted, key, {
      iv: iv,
      mode: cryptoJs.mode.CBC,
      padding: cryptoJs.pad.Pkcs7,
    });
    return decrypted.toString(cryptoJs.enc.Utf8);
  }

  return (
    <Web3StorageContext.Provider
      value={{
        makeFileObjects,
        storeJsonFiles,
        storeDriveFiles,
        getDocuments,
        docsFiles,
        loading,
        isUpdated,
      }}
      {...props}
    >
      {props.children}
    </Web3StorageContext.Provider>
  );
};
