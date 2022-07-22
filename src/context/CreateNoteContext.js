import React, { useState, createContext, useEffect } from "react";
import cryptoJs from 'crypto-js';
import axios from 'axios';
import { create } from 'ipfs-http-client'


export const NoteContext = createContext();

export const NoteContextProvider = (props) => {
    const [search, setSearch] = useState(null);
    const [editNote, seteditNote] = useState({ title: "", input: "" });
    const [deleted, setDeleted] = useState({ title: "", input: "" });
    const [note, setNote] = useState({ title: "", input: "" });
    const [search_list, setSearch_list] = useState([]);
    const [notes_list, setNotes_list] = useState([]);
    const [visible, setVisible] = useState(false);
    const [pinned_id, setPinned_id] = useState(null);
    const [showPopUp, setShowPopUp] = useState(false);
    const [popUp_id, setPopUp_id] = useState(null);
    const [trash_list, setTrash_list] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);
    const [noteInput, setNoteInput] = useState("");
    const [noteTitle, setNoteTitle] = useState("");
    const [loading, setLoading] = useState(false);

    const client = create('https://ipfs.infura.io:5001/api/v0')


    useEffect(() => {
        const trash_string = localStorage.getItem('trash');
        const trash_lis = JSON.parse(trash_string);
        const list_string = localStorage.getItem('list');
        const not_list = JSON.parse(list_string);  

        if (not_list != null) {
            getNoteData(not_list);
        }

        if (trash_lis != null) {
            setTrash_list(trash_lis);
        }
    }, [isUpdate])

    async function getNoteData(not_list) {
        var array = [];
        var iv = cryptoJs.enc.Base64.parse("");
        var key = cryptoJs.SHA256("test123");

        for (let index = 0; index < not_list.length; index++) {
            const element = not_list[index];
            const res = await axios.get(element.url);
            console.log(res, "res");
            var decryptTitle = decryptData(res.data.title.toString(), iv, key);
            var decryptInput = decryptData(res.data.input.toString(), iv, key);
            const decDeta = {
                id: res.data.id,
                title: decryptTitle,
                input: decryptInput,
                url: element.url
            } 
            array[index] = decDeta;

        }
        if (array != null && array != []) {
            console.log(array, "use arry");
            setNotes_list(array);
        }
    }


    function decryptData(encrypted, iv, key) {
        var decrypted = cryptoJs.AES.decrypt(encrypted, key, {
            iv: iv,
            mode: cryptoJs.mode.CBC,
            padding: cryptoJs.pad.Pkcs7
        });
        return decrypted.toString(cryptoJs.enc.Utf8);
    }



    const handleClick = () => {
        setVisible(true);
    }

    const handleSearch = (value) => {
        if (value.length > 0) {
            setSearch(value);
            const dd = notes_list.filter(note => { return (note.title.includes(value) || note.input.includes(value)) });
            setSearch_list(dd)
        }
        else {
            setSearch(null);
            setSearch_list([])
        }
    }
    const handleChangeNote = (value) => {
        setNote({ input: value, title: note.title, url: note.url });
    }

    const handleChangeTitle = (value) => {
        setNote({ input: note.input, title: value, url: note.url });
    }

    const handleChangeEditNote = (value) => {
        seteditNote({ input: value, title: editNote.title });
    }

    const handleChangeEditTitle = (value) => {
        seteditNote({ input: editNote.input, title: value });

    }

    const getEncryptData = async (data, iv, key, type) => {

        var encryptedString;
        if (typeof data == "string") {
            data = data.slice();
            encryptedString = cryptoJs.AES.encrypt(data, key, {
                iv: iv,
                mode: cryptoJs.mode.CBC,
                padding: cryptoJs.pad.Pkcs7
            });
        }
        else {
            encryptedString = cryptoJs.AES.encrypt(JSON.stringify(data), key, {
                iv: iv,
                mode: cryptoJs.mode.CBC,
                padding: cryptoJs.pad.Pkcs7
            });
        }
        // if (type == 'title') {
        //     setNoteTitle(encryptedString.toString());
        // } else {
        //     setNoteInput(encryptedString.toString());
        // }
        return encryptedString.toString();
    }


    const addToNotes = async () => {
        setLoading(true);
        var inp;
        var ttl;
        var iv = cryptoJs.enc.Base64.parse("");
        var key = cryptoJs.SHA256("test123");
        const enDataInput = getEncryptData(note.input, iv, key, 'input');
        const enDataTitle = getEncryptData(note.title, iv, key, 'input');

        await enDataInput.then((e) => {
            inp = e;
        })
        await enDataTitle.then((e) => {
            ttl = e;
        })

        if ((inp.length) > 0 || (ttl.length) > 0) {
            const enData = JSON.stringify({
                id: Date.now(),
                title: ttl,
                input: inp
            });
            const added = await client.add(enData);
            const url = `https://ipfs.infura.io/ipfs/${added.path}`;

            notes_list.unshift({
                id: Date.now(),
                url: url
            });

            setNote({ title: '', input: '' });
            setNotes_list(notes_list);
            setVisible(false);
            localStorage.setItem("list", JSON.stringify(notes_list));
            setIsUpdate(!isUpdate)
            setLoading(false);
        }
        else {
            setVisible(false);
            setIsUpdate(!isUpdate)
            setLoading(false)
        }
    }



    const removeFromNotes = (i, id) => {
        setLoading(true)
        let deleted_note = notes_list.filter(item => { return item.id === id })[0];
        trash_list.unshift(deleted_note);
        setTrash_list(trash_list);
        const notes_li = notes_list.filter((note, index) => { return index !== i; });
        if (pinned_id) {
            setNotes_list(notes_li);
            setIsUpdate(!isUpdate)
            setPinned_id(null);
        }
        else {
            setShowPopUp(false);
            setNotes_list(notes_li);
            setIsUpdate(!isUpdate)

        }
        localStorage.setItem("list", JSON.stringify(notes_li));
        localStorage.setItem("trash", JSON.stringify(trash_list));
        setIsUpdate(!isUpdate)
        setLoading(false)

    }
    const pinNote = (id) => {
        setPinned_id(id);
    }
    const removePin = () => {
        setPinned_id(null);
    }
    const showNote = (id) => {
        let edited_note = notes_list.filter(item => { return item.id === id })[0];
        seteditNote(edited_note);
        setShowPopUp(true);
        setPopUp_id(id);
        setIsUpdate(!isUpdate);
    }

    const updateNote = async (id) => {
        setLoading(true)
        var updateInput;
        var updateTitle;
        var iv = cryptoJs.enc.Base64.parse("");
        var key = cryptoJs.SHA256("test123");
        const enDataInput = getEncryptData(editNote.input, iv, key, 'input');
        const enDataTitle = getEncryptData(editNote.title, iv, key, 'input');

        await enDataInput.then((e) => { 
            updateInput = e;
        })
        await enDataTitle.then((e) => {
            updateTitle = e;
        })

        const enData = JSON.stringify({
            id: id,
            title: updateTitle,
            input: updateInput
        });
        console.log(enData, "enData");
        const added = await client.add(enData);
        const url = `https://ipfs.infura.io/ipfs/${added.path}`; 
        const nt = [{ id, url }];
        let containsOnlyOneElement = notes_list.length === 1;
        //  setNotes_list((containsOnlyOneElement ? [{ id, ...nt[0]  }] : [{ id, ...nt[0] }, ...notes_list.filter(item => item.id !== id)]));
        localStorage.setItem("list", JSON.stringify((containsOnlyOneElement ? [{ id, ...nt[0] }] : [{ id, ...nt[0] }, ...notes_list.filter(item => item.id !== id)])));

        seteditNote({
            title: "",
            input: "",
            url: ""
        });
        setShowPopUp(false);
        setPopUp_id(null);
        setIsUpdate(!isUpdate);
        setLoading(false)
    }
    const removeFromTrash = (id) => {
        setLoading(true)
        const trash_l = trash_list.filter((item) => { return item.id !== id });
        setTrash_list(trash_l);
        localStorage.setItem("trash", JSON.stringify(trash_l));
        setIsUpdate(!isUpdate)
        setLoading(false)

    }

    let styles = {
        inputStyle: {
            display: 'flex'
        },
        inputStyle1: {
            display: 'none'
        }
    };

    return (
        <NoteContext.Provider
            value={{
                pinned_id,
                notes_list,
                showPopUp,
                editNote,
                popUp_id,
                search,
                search_list,
                handleChangeNote,
                pinNote,
                updateNote,
                removeFromNotes,
                showNote,
                isUpdate,
                note,
                visible,
                handleClick,
                handleChangeTitle,
                addToNotes,
                handleChangeEditNote,
                handleChangeEditTitle,
                removePin,
                removeFromTrash,
                trash_list,
                styles,
                handleSearch,
                decryptData,
                getNoteData,
                loading,
            }}
        >
            {props.children}
        </NoteContext.Provider>
    );
};