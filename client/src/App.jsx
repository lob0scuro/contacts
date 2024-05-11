import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

import ContactTable from "./components/ContactTable";
import ContactForm from "./components/ContactForm";

function App() {
  const [array, setArray] = useState([]);

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

  return (
    <>
      <h1>Contact Book</h1>
      <ContactForm />
      <hr />
      <br />
      <ContactTable array={array} />
    </>
  );
}

export default App;
