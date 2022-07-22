import { Client, Conversation, Message, Stream } from '@xmtp/xmtp-js'
import { ethers } from "ethers";
import React, { useState, createContext, useEffect, useCallback } from "react";
import Web3Modal from "web3modal";

export const ChatBoxContext = createContext(undefined);

export const ChatBoxContextProvider = (props) => {


    const [signer, setSigner] = useState()
    const [xmtp, setXmtp] = useState()
    const [userList, setUserList] = useState([]);
    const [messageList, setMessageList] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);
    const [currentUser, setCurrentUser] = useState(false);
    const [conversation, setConversation] = useState();
    const [stream, setStream] = useState()
    const [loading, setLoading] = useState(false)
    const [peerAddress, setPeerAddress] = useState("")
    const [updateMesg, setUpdateMesg] = useState(false)
    const [updateMessage, setUpdateMessage] = useState(false);
    

    useEffect(() => {
        async function connectWallet() {
            setLoading(true)
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            // const usr = signer.getAddress();
            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            });
            setCurrentUser(accounts[0]);
            setSigner(signer);
            const xmtp = await Client.create(signer);
            setXmtp(xmtp);
            const list = await xmtp.conversations.list();
            setUserList(list);
            setLoading(false)
        }
        connectWallet();
    }, [isUpdate])


    useEffect(() => {
        const getConvo = async () => { 
            if (!xmtp) {
                return
            }
            setConversation(await xmtp.conversations.newConversation(peerAddress))
        }
        getConvo()
    }, [xmtp, peerAddress])

    useEffect(() => {
        const closeStream = async () => {
            if (!stream) return
            await stream.return()
        }
        closeStream()
    }, [peerAddress])

    useEffect(() => {
        const getList = async () => {
             await xmtp.conversations.newConversation(peerAddress)
            const lst = await xmtp.conversations.list();
            setUserList(lst); 
        }
        if(xmtp){
            getList() 
        }
    }, [conversation,peerAddress])

    useEffect(() => { 
        listMessages()
    }, [conversation, loading, updateMessage])

    const listMessages = async () => { 
        if (!conversation) return  
        const msgs = await conversation.messages({ pageSize: 100 })
        setMessageList(msgs); 
    }  

    useEffect(() => {
        const streamMessages = async () => {   
            if (!conversation) return
            const demoStream = await conversation.streamMessages()
            setStream(demoStream)
            var array = [];
            for await (const msg of demoStream) {
                array.push(msg) ;  
            }  
            setMessageList(array);  
        }
        streamMessages()
    }, [conversation, loading, updateMessage,peerAddress]) 
 
    const handleSend = useCallback(
        async (message) => {
            if (!conversation) return
            // setLoading(true);
            setUpdateMessage(true);
            await conversation.send(message);  
            // setLoading(false);
            setUpdateMessage(false);
        },

        [conversation]
    )






    return (
        <ChatBoxContext.Provider
            value={{
                signer,
                xmtp,
                userList,
                messageList,
                setIsUpdate,
                setMessageList,
                currentUser,
                setPeerAddress,
                handleSend,
                loading,
                updateMesg,
                updateMessage
            }}
            {...props}
        >
            {props.children}
        </ChatBoxContext.Provider>
    );
};