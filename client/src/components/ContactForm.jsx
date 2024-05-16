import React, { useEffect, useState } from "react";
import axios from "axios";

const ContactForm = ({ array, setArray }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = "http://127.0.0.1:5000/api/create_user";

    const content = {
      first_name: firstName,
      last_name: lastName,
      email: email,
    };

    const config = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    };

    fetch(url, config)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //console.log(data);
        setArray((prevArray) => [...prevArray, data]);
      })
      .catch((error) => {
        alert("Fetch error: ", error);
      });

    setFirstName("");
    setLastName("");
    setEmail("");
  };

  return (
    <form
      style={{
        width: "fit-content",
        marginLeft: "auto",
      }}
      onSubmit={handleSubmit}
    >
      <div style={{ textAlign: "end", width: "fit-content", padding: "5px" }}>
        <legend style={{ fontWeight: "800" }}>Create Contact</legend>
        <br />
        <div>
          <label>First Name: </label>

          <input
            type="text"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Last Name: </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <br />

        <input
          style={{ fontSize: "1.2rem", fontWeight: "600" }}
          type="submit"
          value="Submit"
        />
      </div>
    </form>
  );
};

export default ContactForm;
