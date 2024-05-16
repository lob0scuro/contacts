import { useState } from "react";

const ContactTable = ({ array, setArray }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [editMode, setEditMode] = useState(false);

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

  const updateUser = (contact) => {
    const url = "http://127.0.0.1:5000/api/update_user/" + contact.id;
    const data = {
      first_name: contact.first_name,
      last_name: contact.last_name,
      email: contact.email,
    };
    const options = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    if (
      confirm(`
      ${contact.first_name}
      ${contact.last_name}
      ${contact.email}
      confirm updated user?
    `)
    ) {
      fetch(url, options).then((response) => {
        console.log(response);
      });
    }
    setEditMode(false);
  };

  const renderUpdateForm = () => {
    const contact = array[id];
    console.log(contact);
    return (
      <>
        <div className="modal">
          <tr>
            <td>
              <input
                type="text"
                value={contact.first_name}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </td>
            <td>
              <input
                type="text"
                value={contact.lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </td>
            <td>
              <input
                type="text"
                value={contact.email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </td>
            <td>
              <button onClick={() => updateUser(contact)}></button>
            </td>
          </tr>
        </div>
      </>
    );
  };

  const renderTableRows = () => {
    return array.map((user, index) => (
      <tr key={index}>
        <td>{user.first_name}</td>
        <td>{user.last_name}</td>
        <td>{user.email}</td>
        <td>
          <button
            style={{ fontSize: "0.8rem" }}
            onClick={() => setEditMode(true)}
          >
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
    ));
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>{!editMode ? renderTableRows() : renderUpdateForm()}</tbody>
      </table>
    </>
  );
};

export default ContactTable;
