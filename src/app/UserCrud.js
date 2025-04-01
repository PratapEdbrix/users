"use client";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Sidebar } from "primereact/sidebar";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

function UserCrud() {
  const [userlist, setuserlist] = useState([]);
  const [visible, setVisible] = useState(false);

  const [userdata, setuserdata] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  function handleChange(e) {
    setuserdata({ ...userdata, [e.target.id]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const emailExists = userlist.some((user) => user.email === userdata.email);

    if (emailExists) {
      alert("Email Already Exists");
    } else {
      setuserlist((prev) => [...prev, userdata]);
      setVisible(false);
      toast.success("Successfully Added User", {
        position: "bottom-center",
      });
    }
  }

  return (
    <>
      <ToastContainer />
      <Sidebar
        visible={visible}
        onHide={() => setVisible(false)}
        position="right"
      >
        <h2 className="text-3xl text-center">Create User</h2>
        <form className="mt-10 flex flex-col gap-10 " onSubmit={handleSubmit}>
          <FloatLabel>
            <InputText
              id="firstName"
              className="w-full"
              onChange={handleChange}
              keyfilter="alpha"
              required
            />
            <label htmlFor="firstName">First Name</label>
          </FloatLabel>
          <FloatLabel>
            <InputText
              id="lastName"
              className="w-full"
              onChange={handleChange}
              keyfilter="alpha"
              required
            />
            <label htmlFor="lastName">Last Name</label>
          </FloatLabel>
          <FloatLabel>
            <InputText
              id="email"
              className="w-full"
              onChange={handleChange}
              type="email"
              required
            />
            <label htmlFor="email">Email</label>
          </FloatLabel>
          <FloatLabel>
            <InputText
              id="phoneNumber"
              className="w-full"
              onChange={handleChange}
              maxLength={10}
              keyfilter="int"
              required
            />
            <label htmlFor="phoneNumber">Phone Number</label>
          </FloatLabel>
          <Button label="Create" type="submit" />
        </form>
      </Sidebar>
      <div className="w-[80%] mx-auto my-5 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h1 className=" text-3xl">Total Users: {userlist.length}</h1>
          <Button
            label="Create User"
            onClick={() => setVisible(true)}
            className=" mb-5 w-fit"
          />
        </div>
        <DataTable value={userlist} tableStyle={{ minWidth: "50rem" }}>
          <Column header="First Name" field="firstName"></Column>
          <Column header="Last Name" field="lastName"></Column>
          <Column header="Email" field="email"></Column>
          <Column header="Phone Number" field="phoneNumber"></Column>
        </DataTable>
      </div>
    </>
  );
}

export default UserCrud;
