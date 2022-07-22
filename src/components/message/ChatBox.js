import { Send } from "@mui/icons-material";
import {
    Avatar,
    Box,
    Button,
    CircularProgress,
    Container,
    Divider,
    Fab,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    TextField,
    Typography,
} from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useCallback, useEffect, useRef, useState } from "react";
// import Page from "src/components/Page";
// import { AppWeeklySales } from "src/sections/@dashboard/app";
import { makeStyles } from "@mui/styles";
// import { useMoralis, useMoralisCloudFunction } from "react-moralis";
import { useParams } from "react-router-dom";
// import moment from "moment"; 
import UserList from "./UserList";
import { Client } from '@xmtp/xmtp-js'
import { ChatBoxContext } from "src/context/ChatBoxContext";
import Blockies from 'react-blockies'

// import { Conversation } from '@xmtp/xmtp-js/dist/types/src/conversations'




const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    chatSection: {
        width: "100%",
        height: "75vh",
        backgroundColor: '#fff',
        boxShadow: "0 1px 2px 0 rgb(145 158 171 / 24%)",
        borderRight: "1px solid #e0e0e0",
        borderLeft: "1px solid #e0e0e0",
        borderBottom: "1px solid #e0e0e0",
        borderRadius: "16px",
    },
    headBG: {
        backgroundColor: "#e0e0e0",
    },
    borderRight500: {
        borderRight: "1px solid #e0e0e0",
    },
    messageArea: {
        height: "60vh",
        overflowY: "auto",
    },
    senderMsgBox: {
        borderRadius: "0px 15px 15px 20px",
        background: "#eee",
        padding: "10px",
        width: '50%',
        float: 'left',
        height: 'auto',
        textAlign: 'left',
    },
    recieveMsgBox: {
        borderRadius: "20px 15px 0 15px",
        background: "aliceblue",
        padding: "10px",
        width: '50%',
        float: 'right',
        height: 'auto',
        textAlign: 'left',
    },
});

function ChatBox() {
    const { id } = useParams();
    const chatboxContext = React.useContext(ChatBoxContext);
    const {
        userList,
        messageList, currentUser, setPeerAddress, handleSend,
        loading,isUpdate ,updateMessage} = chatboxContext;

    const classes = useStyles();
    const [message, setMessage] = useState("");
    const [userId, setUserId] = useState("");

    const [open, setOpen] = React.useState(false);
    const [userAddress, setUserAddress] = useState("");
    const [isSelected, setIsSelected] = useState("")
    const [userMessage, setUserMessage] = useState("")


 const messagesEndRef = useRef(null)

  const scrollToMessagesEndRef = useCallback(() => { 
      (messagesEndRef.current)?.scrollIntoView({ behavior: 'smooth' })
  }, [messagesEndRef]) 
   

  const hasMessages = messageList.length > 0

  useEffect(() => {
    if (!hasMessages) return
    const initScroll = () => {
      scrollToMessagesEndRef()
    }
    initScroll()
  }, [currentUser, hasMessages, scrollToMessagesEndRef,updateMessage])



    // useEffect(()=>{
    //         console.log(messageList,"messageList");
    // },[messageList])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddUser = async () => {
        setPeerAddress(userAddress);
        setOpen(false); 
    }

    const chatUser = async (e) => {
        setPeerAddress(e)
        setUserId(e);
        setIsSelected(e);
    }

    async function sendMessage() { 
            handleSend(message); 
            setMessage("");
        } 
    

    const formatDate = (date) =>
        date?.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

    const shortAddress = (addr) =>
        addr.length > 10 && addr.startsWith('0x')
            ? `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`
            : addr

    return (
        <Container maxWidth="xl">
            <Dialog open={open}
                onClose={handleClose}
                fullWidth="fullWidth"
                maxWidth="sm">
                <DialogTitle>Add New User</DialogTitle>
                <DialogContent>
                    <DialogContentText>

                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="address"
                        label="Wallet Address"
                        type="text"
                        value={userAddress}
                        fullWidth
                        onChange={(e) => setUserAddress(e.target.value)}
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="contained" color="error">Cancel</Button>
                    <Button onClick={handleAddUser} variant="contained" color="primary">Add user</Button>
                </DialogActions>
            </Dialog>


            <Box sx={{ pb: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h4" component="h2">Messages</Typography>
                <Button onClick={handleClickOpen} variant="contained" color="primary">Add New User</Button>
            </Box>
            <Grid container className={classes.chatSection}>
                <Grid item xs={3} className={classes.borderRight500}>
                    <List >
                        <ListItem button key="RemySharp" >
                            <ListItemIcon>
                                <Blockies seed={currentUser} size={10} className="rounded-full" style={{ borderRadius: '50%' }} />
                            </ListItemIcon>
                            <ListItemText
                                style={{ border: '1px solid #eee', padding: '3px 15px', borderRadius: '20px', fontWeight: 'bolder' }}
                                primary={shortAddress(currentUser)}
                            ></ListItemText>
                        </ListItem>

                    </List>
                    <Divider />
                    <Grid item xs={12} style={{ padding: "10px" }}>
                        <TextField
                            id="outlined-basic-email"
                            label="Search"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Divider />
                    <UserList isSelected={isSelected} list={userList && userList} chatUser={chatUser} load={loading} />
                </Grid>
                <Grid item xs={9}>
                    <List className={classes.messageArea}>
                        {
                            loading && <div className='text-center'><CircularProgress /></div>
                        }
                        {
                            messageList && messageList.map((msg) => {
                                return (
                                    <ListItem key={msg.id} >
                                        <Grid container>
                                            <Grid item xs={12} style={{ marginBottom: '5px' }}>

                                                <div className={currentUser == msg.recipientAddress || userId == msg.senderAddress
                                                    ? "d-flex justify-content-start"
                                                    : "d-flex justify-content-end"}>
                                                    <Blockies seed={currentUser == msg.recipientAddress || userId == msg.senderAddress ? userId : currentUser} size={10} className="rounded-full" style={{ borderRadius: '50%' }} />
                                                    <p style={{ border: '1px solid #eee', padding: '3px 15px', borderRadius: '20px', fontWeight: 'bolder' }}>
                                                        {shortAddress(currentUser == msg.recipientAddress || userId == msg.senderAddress ? userId : currentUser)}
                                                    </p>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <ListItemText
                                                    className={currentUser == msg.recipientAddress || userId == msg.senderAddress
                                                        ? classes.senderMsgBox
                                                        : classes.recieveMsgBox
                                                    }
                                                    align={
                                                        currentUser == msg.recipientAddress ||
                                                            userId == msg.senderAddress
                                                            ? "left"
                                                            : "right"
                                                    }
                                                    primary={msg.content}
                                                ></ListItemText>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <ListItemText
                                                    align={
                                                        currentUser == msg.recipientAddress ||
                                                            userId == msg.senderAddress
                                                            ? "left"
                                                            : "right"
                                                    }
                                                    secondary={formatDate(msg.sent)}
                                                ></ListItemText>
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                )
                            })

                        }
                       <div ref={messagesEndRef} />
                    </List >
                    <Divider />
                    <Grid container style={{ padding: "20px" }}>
                        <Grid item xs={11} align="left">
                            <TextField
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                id="outlined-basic-email"
                                label="Type Something"
                                fullWidth
                            />
                        </Grid>
                        <Grid xs={1} align="right">
                            <Fab color="primary" aria-label="add" onClick={sendMessage}>
                               {
                                   updateMessage == true ? <CircularProgress color="inherit"/> : <Send />
                               } 
                            </Fab>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
        // </Page>
    );
}

export default ChatBox;