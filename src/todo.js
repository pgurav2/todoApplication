import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { auth, db } from "./firebase";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";
import { useNavigate } from "react-router-dom";

export default function Todo() {
  const [todo, settodo] = useState("");
  const [list, setlist] = useState([]);
  const [isedit, setisedit] = useState(false);
  const [tempid, settempid] = useState("");

  const navigate = useNavigate();
  const signout = () => {
    // e.preventDefault();
    signOut(auth)
      .then((data) => {
        console.log("pratiksha", data);
        alert("SignOut successfully");
        navigate("/");
      })
      .catch((error) => {
        alert("An error happened");
      });
  };

  useEffect(() => {
    console.log(auth);
    auth.onAuthStateChanged((user) => {
      if (user) {
        onValue(ref(db, `/${auth.currentUser.uid}`), (dbData) => {
          console.log("useeffecttttttttttttttttttttttt");

          setlist([]);
          // console.log(dbData)
          // console.log("dddddddddd",dbData.val());
          const data = dbData?.val();
          //   console.log(Object.values(data));
          if (data !== null) {
            console.log("ddddd", Object.values(data));
            let _list = [];
            Object?.values(data)?.map(
              (item) => _list.push(item)

              // setlist((oldarr) => [...oldarr, item])
            );
            setlist(_list);
          }
        });
      } else if (!user) {
        navigate("/");
      }
    });
  }, []);

  const writetolist = () => {
    const uidd = uid();
    set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
      todo: todo,
      uid: uidd,
    });

    settodo("");
  };
  const handleDelete = (id) => {
    remove(ref(db, `/${auth.currentUser.uid}/${id}`), {});
  };

  const handleUpdate = (value) => {
    console.log(value);
    settodo(value.todo);
    settempid(value.uid);
    setisedit(true);
  };
  const handleConfirm = () => {
    update(ref(db, `/${auth.currentUser.uid}/${tempid}`), {
      todo: todo,
      tempid: tempid,
    });

    settodo("");
    setisedit(false);
  };

  return (
    <div>
      <p>TODO</p>
      <input
        type="text"
        value={todo}
        onChange={(e) => {
          settodo(e.target.value);
        }}
      />

      {console.log(list)}
      <div>
        {list?.reverse()?.map((item, index) => (
          <div key={"list" + index}>
            <p>{index + 1 + ". " + item.todo}</p>
            <button onClick={() => handleDelete(item.uid)}>delete</button>
            <button onClick={() => handleUpdate(item)}>update</button>
          </div>
        ))}
      </div>
      {isedit ? (
        <div>
          <button onClick={() => todo !== "" && handleConfirm()}>
            Confirm
          </button>
        </div>
      ) : (
        <div>
          <button onClick={() => todo !== "" && writetolist()}>Add</button>
        </div>
      )}

      {/* <button onClick={writetolist}>ADD</button> */}
      <button onClick={signout}>Sign Out</button>
    </div>
  );
}
