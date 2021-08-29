import React, { useState, useEffect, Fragment } from "react";
import List from "./components/List";
import Alert from "./components/Alert";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Pagination from '@material-ui/lab/Pagination';


const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  console.log("listlistlist", list);
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list")));
  } else {
    return [];
  }
};
function App() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [language, setLanguage] = useState("");
  const [lastName, setLastName] = useState("");

  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  const handleSubmit = (e) => {
    console.log("item", e);
    e.preventDefault();
    if (!name) {
      showAlert(true, "danger", "please enter value");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          console.log("item", item);
          if (item.id === editID) {
            return {
              ...item,
              id: id,
              title: name,
              email: email,
              lastName: lastName,
              language: language,
            };
          }
          return item;
        })
      );
      setName("");
      setEmail("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "success", "value changed");
    } else {
      showAlert(true, "success", "item added to the list");
      const newItem = {
        id: id,
        title: name,
        email: email,
        lastName: lastName,
        language: language,
      };

      setList([...list, newItem]);
      setName("");
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };
  const clearList = () => {
    showAlert(true, "danger", "empty list");
    setList([]);
  };
  const removeItem = (id) => {
    showAlert(true, "danger", "item removed");
    setList(list.filter((item) => item.id !== id));
  };
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }

  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const useStyles = makeStyles((theme) => ({
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    root: {
      '& > *': {
        marginTop: theme.spacing(2),
      },
    },
  }));
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Fragment>
      <section className="section-center">
        <form className="grocery-form" onSubmit={handleSubmit}>
          {alert.show && (
            <Alert {...alert} removeAlert={showAlert} list={list} />
          )}

          <div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              <div class="container">
                <form id="contact" action="" method="post">
                  <h3>Contact Form</h3>
                  <fieldset>
                    <input
                      placeholder="Your id"
                      type="text"
                      tabindex="1"
                      required
                      autofocus
                      value={id}
                      onChange={(e) => setId(e.target.value)}
                    />
                  </fieldset>
                  <fieldset>
                    <input
                      placeholder="Your name"
                      type="text"
                      tabindex="1"
                      required
                      autofocus
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </fieldset>
                  <fieldset>
                    <input
                      placeholder="Your Last name"
                      type="text"
                      tabindex="1"
                      required
                      autofocus
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </fieldset>
                  <fieldset>
                    <input
                      placeholder="Your Email Address"
                      type="email"
                      tabindex="2"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </fieldset>
                  <fieldset>
                    <input
                      placeholder="Your Language"
                      type="tel"
                      tabindex="3"
                      required
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                    />
                  </fieldset>
                  <fieldset>
                    <button
                      name="submit"
                      type="submit"
                      id="contact-submit"
                      data-submit="...Sending"
                      onSubmit={handleSubmit}
                    >
                      Submit
                    </button>
                  </fieldset>
                </form>
              </div>
            </Modal>
            <button type="button" onClick={handleOpen} className="submit-btn">
              {isEditing ? "edit" : "Add Now!"}
            </button>
            {/* <button type="submit" className="submit-btn">
            {isEditing ? "edit" : "Submit!"}
          </button> */}
          </div>
        </form>
        {list.length > 0 && (
          <div className="grocery-container">
            <List items={list} removeItem={removeItem} editItem={editItem} />
            <button className="clear-btn" onClick={clearList}>
              clear items
            </button>
          </div>
        )}
        <div className={classes.root}>
          <Pagination count={5} variant="outlined" shape="rounded" />
        </div>
      </section>
    </Fragment>
  );
}

export default App;
