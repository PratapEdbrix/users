"use client";

import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export default function Home() {
  const [visible, setVisible] = useState(false);
  const [users, setUsers] = useState([]);
  const [editedMode, setEditedMode] = useState(false);
  const [editedData, setEditedData] = useState(null);

  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile_number: "",
    checked: false,
  });

  function handleChange(e) {
    const { id, value } = e.target;

    if (editedMode) {
      setEditedData(({ ...editedData, [id]: value }));
    } else {
      setData(({ ...data, [id]: value }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (editedMode) {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.email === editedData.email ? { ...editedData } : user
        )
      );

      setEditedData(null);
      setEditedMode(false);
      setVisible(false);
    } else {
      const isPresent = users.some((user) => user.email === data.email);

      if (isPresent) {
        alert("Email must be unique!");
      } else {
        setUsers([...users, { ...data, checked: false }]);
        setData({ first_name: "", last_name: "", email: "", mobile_number: "", checked: false });
        setVisible(false);
      }
    }
  }

  const handleDelete = (user) => {
    setUsers(users.filter((u) => u.email !== user.email));
  };

  const handleEdit = (user) => {
    setEditedMode(true);
    setEditedData(user);
    setVisible(true);
  };

  const handleComplete = (rowData) => {
    setUsers(users.map((user) =>
        user.email === rowData.email ? { ...user, checked: !user.checked } : user
      ));
    alert(`User ${rowData.first_name} is checked`)
  };

  return (
    <>
      <h1 className="px-8 font-bold text-3xl mt-8">User List</h1>

      <div className="card flex justify-content-center">
        <Sidebar
          visible={visible}
          position="right"
          onHide={() => {
            setVisible(false);
            setEditedMode(false);
            setEditedData(null);
          }}
        >
          <h2 className="font-bold text-2xl">{editedMode ? "Edit User" : "Add User"}</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-5">
            <div>
              <label htmlFor="first_name">First Name</label>
              <InputText
                id="first_name"
                value={editedMode ? editedData.first_name : data.first_name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="last_name">Last Name</label>
              <InputText
                id="last_name"
                value={editedMode ? editedData.last_name : data.last_name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <InputText
                id="email"
                value={editedMode ? editedData.email : data.email}
                type="email"
                onChange={handleChange}
                required
                disabled={editedMode}
              />
            </div>

            <div>
              <label htmlFor="mobile_number">Mobile Number</label>
              <InputText
                id="mobile_number"
                value={editedMode ? editedData.mobile_number : data.mobile_number}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Button label={editedMode ? "Update" : "Add"} type="submit" />
            </div>
          </form>
        </Sidebar>

        <div className="flex justify-between items-center w-full px-8 mt-3">
          <div>
            <h3 className="text-2xl font-semibold">Added Users: {users.length}</h3>
          </div>
          <div>
            <Button
              label="Add User"
              icon="pi pi-user-plus"
              onClick={() => {
                setVisible(true);
                setEditedMode(false);
              }}
            />
          </div>
        </div>
      </div>

      <DataTable
        value={users}
        className="px-8 mt-5"
        rowClassName={(rowData) => (rowData.checked ? "bg-green-200" : "bg-white")}
      >
        <Column field="first_name" header="First Name"></Column>
        <Column field="last_name" header="Last Name"></Column>
        <Column field="email" header="Email"></Column>
        <Column field="mobile_number" header="Mobile"></Column>
        <Column
          header="Actions"
          body={(rowData) => (
            <div className="flex gap-2">
              <Button
                icon="pi pi-pencil"
                className="p-button-rounded p-button-success p-button-sm"
                onClick={() => handleEdit(rowData)}
              />
              <Button
                icon="pi pi-trash"
                className="p-button-rounded p-button-danger p-button-sm"
                onClick={() => handleDelete(rowData)}
              />
              <Button
                icon="pi pi-check"
                className={`p-button-rounded ${rowData.checked ? "p-button-secondary" : "p-button-primary"} p-button-sm`}
                onClick={() => handleComplete(rowData)}
              />
            </div>
          )}
        />
      </DataTable>
    </>
  );
}
