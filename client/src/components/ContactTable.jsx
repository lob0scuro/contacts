import React from "react";

const ContactTable = ({ array }) => {
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
        })
        .catch((error) => {
          alert(error);
        });
    }
  };
  return (
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
              <button>Update</button>
              <button
                onClick={() => {
                  deleteUser(user.id);
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ContactTable;
