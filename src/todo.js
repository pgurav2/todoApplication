import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { auth, db } from "./firebase";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";
import { useNavigate } from "react-router-dom";
import Button from "./components/button";
import "./css/todo.css";

export default function Todo() {
  const [todo, settodo] = useState("");
  const [list, setlist] = useState([]);
  const [isedit, setisedit] = useState(false);
  const [tempid, settempid] = useState("");

  const navigate = useNavigate();
  
  const signout = () => {
 
    signOut(auth)
      .then((data) => {
        console.log("pratiksha", data);
        // alert("SignOut successfully");
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
    <div className="container">
      <div className="main_container">
        <p>TODO</p>
        <div className="todo_wrapper">
          <input
            className="input_field"
            placeholder="Enter your task here"
            type="text"
            value={todo}
            onChange={(e) => {
              settodo(e.target.value);
            }}
          />
          {isedit ? (
            <div>
              <Button
                name={"CONFIRM"}
                className={"add_confirm_btn"}
                onClick={() => todo !== "" && handleConfirm()}
              />
            </div>
          ) : (
            <div>
              <Button
                name={"ADD"}
                className={"add_confirm_btn"}
                onClick={() => todo !== "" && writetolist()}
              />
            </div>
          )}
        </div>
        {/*       
    {console.log(list)} */}
        <div className={list.length > 0 ? "todolist_wrapper" : null}>
          {list?.reverse()?.map((item, index) => (
            <div key={"list" + index} className="todo_list">
              <p className="task">{index + 1 + ". " + item.todo}</p>
              <Button name={"DELETE"} onClick={() => handleDelete(item.uid)} />
              <Button name={"UPDATE"} onClick={() => handleUpdate(item)} />
            </div>
          ))}
        </div>

        <Button name={"SIGN OUT"} onClick={signout} className={"sign_out"} />
      </div>
    </div>
  );
}
