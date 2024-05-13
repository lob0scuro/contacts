import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

import ContactTable from "./components/ContactTable";
import ContactForm from "./components/ContactForm";

function App() {
  const [array, setArray] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchAPI = async () => {
    axios
      .get("http://127.0.0.1:5000/api/get_users")
      .then((response) => {
        setArray(response.data.users);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  const closeModal = () => {
    setModalOpen(false);
  };

  const openModal = () => {
    if (!modalOpen) setModalOpen(true);
  };

  return (
    <>
      <h1>Contact Book</h1>

      {modalOpen ? (
        <div className="modal">
          <button className="close" onClick={closeModal}>
            &times;
          </button>
          <div className="modal-content">
            <ContactForm array={array} setArray={setArray} />
          </div>
        </div>
      ) : (
        <button onClick={openModal}>Create New Contact</button>
      )}
      <hr />
      <br />
      <ContactTable array={array} setArray={setArray} />
    </>
  );
}

export default App;
