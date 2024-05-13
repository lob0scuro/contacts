import React from "react";

const ContactTable = ({ array, setArray }) => {
  const deleteUser = (id) => {
    const url = "http://127.0.0.1:5000/api/delete/" + id;
    const options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    if (confirm("Delete User?")) {
      fetch(url, options)
        .then((response) => {
          alert("User Deleted");
          setArray(array.filter((user) => user.id !== id));
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  return (
    <>
      {" "}
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {array.map((user, index) => (
            <tr key={index}>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
              <td>
                <button style={{ fontSize: "0.8rem" }}>
                  <i className="fa-solid fa-pen"></i>
                </button>
                <button
                  onClick={() => {
                    deleteUser(user.id);
                  }}
                  style={{ backgroundColor: "darkred", fontSize: "0.8rem" }}
                >
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ContactTable;
