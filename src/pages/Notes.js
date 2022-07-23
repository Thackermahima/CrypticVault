import { CircularProgress, Divider } from "@mui/material";
import React, { useEffect } from "react";
import Masonry from "react-masonry-css";
import TakeNote from "../components/TakeNote";
import { NoteContext } from "../context/CreateNoteContext";

import Page from "../components/Page";

const PinnedNote = () => {
  const notContext = React.useContext(NoteContext);
  const { pinned_id, notes_list, removeFromNotes, removePin, loading } =
    notContext;

  if (pinned_id) {
    return (
      <div className="pinned">
        <h4>Pinned</h4>
        {notes_list
          .filter((n) => {
            return n.id === pinned_id;
          })
          .map((item, index) => (
            <p key={index} className="list-item" id="li">
              <span className="span1">
                {item.title}{" "}
                <button
                  className="pin-button"
                  onClick={(e) => removePin(item.id)}
                >
                  <img className="pin" src="/push-pin.png" />
                </button>
              </span>
              <span className="span2">{item.input}</span>
              <button
                className="list-button"
                onClick={(e) => removeFromNotes(index, item.id)}
              >
                Burn
              </button>
            </p>
          ))}
        <Divider />
      </div>
    );
  } else {
    return null;
  }
};
const Notes = () => {
  const notContext = React.useContext(NoteContext);
  const {
    pinned_id,
    notes_list,
    showPopUp,
    editNote,
    popUp_id,
    search,
    search_list,
    pinNote,
    updateNote,
    removeFromNotes,
    showNote,
    handleChangeEditNote,
    handleChangeEditTitle,
    loading,
    styles,
  } = notContext;
  return (
    <div>
      <Page title=" Notes|  Cryptic Vault">
        <TakeNote />
        <div
          className="popup"
          style={showPopUp ? styles.inputStyle : styles.inputStyle1}
        >
          <p className="text">
            <span className="edit-title">
              <input
                value={editNote.title}
                onChange={(e) => handleChangeEditTitle(e.target.value)}
              />{" "}
              <button onClick={(e) => pinNote(popUp_id)}>
                <img className="pin" src="/push-pin.png" />
              </button>
            </span>
            <input
              value={editNote.input}
              onChange={(e) => handleChangeEditNote(e.target.value)}
              className="edit-input"
            />
            <button onClick={(e) => updateNote(popUp_id)} className="close">
              Save
            </button>
            <button
              onClick={(e) => removeFromNotes(popUp_id)}
              className="delete"
            >
              Burn
            </button>
          </p>
        </div>
        <PinnedNote />
        <ul>
          {loading === true && <CircularProgress />}
          <Masonry
            breakpointCols={4}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {notes_list &&
              (!search ? notes_list : search_list)
                .filter((n) => {
                  return n.id !== pinned_id && n.id !== popUp_id;
                })
                .map((item, index) => (
                  <li key={index} className="list-item">
                    <span className="span1">
                      {item.title}{" "}
                      <button
                        className="pin-button"
                        onClick={(e) => pinNote(item.id)}
                      >
                        <img className="pin" src="/push-pin.png" />
                      </button>
                    </span>
                    <span className="span2">{item.input}</span>
                    <button
                      className="list-button"
                      onClick={(e) => showNote(item.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="list-button"
                      onClick={(e) => removeFromNotes(index, item.id)}
                    >
                      Burn
                    </button>
                  </li>
                ))}
          </Masonry>
        </ul>
      </Page>
    </div>
  );
};

export default Notes;
