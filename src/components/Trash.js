import axios from 'axios';
import cryptoJs from 'crypto-js';
import React, { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import { NoteContext } from '../context/CreateNoteContext';

const Trash = () => {
  const notContext = React.useContext(NoteContext);
  const { trash_list, removeFromTrash, decryptData } = notContext;

  const [data, setData] = useState([]);

  useEffect(() => {
    getTrashData(trash_list);
  }, [trash_list])


  async function getTrashData(trash_list) {
    var array = [];
    var iv = cryptoJs.enc.Base64.parse("");
    var key = cryptoJs.SHA256("test123");

    for (let index = 0; index < trash_list.length; index++) {
      const element = trash_list[index];
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
      console.log(decDeta, "decDeta");
      array[index] = decDeta;

    }
    if (array != null && array != []) {
      console.log(array, "use arry");
      setData(array);
    }
  }
  return (
    <div>
      <ul>
        <Masonry
          breakpointCols={4}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column">
          {data && data.map((item, index) =>
            <li key={index} className="trash-item" >
              <span className="span1">{item.title}</span>
              <span className="span2">{item.input}</span>
              <button onClick={e => removeFromTrash(item.id)} className="delete-forever"><img className="del-forever" src="/del1.png" /></button>
            </li>)}
        </Masonry>
      </ul>
    </div>
  );
}

export default Trash;