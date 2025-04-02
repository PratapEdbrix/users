"use client";
import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Sidebar } from "primereact/sidebar";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

function UserCrud() {
  const [userlist, setuserlist] = useState([]);
  const [visible, setVisible] = useState(false);
  const [showUpdatebutton, setshowupdatebutton] = useState(false);
  const [viewdata, setviewdata] = useState(false);

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
    if (showUpdatebutton) {
      setuserlist((prev) => {
        const arr = [...prev];
        arr.forEach((user) => {
          if (user.email === userdata.email) {
            (user.firstName = userdata.firstName),
              (user.lastName = userdata.lastName),
              (user.email = userdata.email),
              (user.phoneNumber = userdata.phoneNumber);
          }
        });
        return arr;
      });
      setVisible(false);
      toast.success("Successfully Updated User", {
        position: "bottom-center",
      });
    } else {
      const emailExists = userlist.some(
        (user) => user.email === userdata.email
      );

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
              value={userdata.firstName}
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
              value={userdata.lastName}
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
              value={userdata.email}
              onChange={handleChange}
              type="email"
              required
              disabled={showUpdatebutton}
            />
            <label htmlFor="email">Email</label>
          </FloatLabel>
          <FloatLabel>
            <InputText
              id="phoneNumber"
              className="w-full"
              value={userdata.phoneNumber}
              onChange={handleChange}
              maxLength={10}
              keyfilter="int"
              required
            />
            <label htmlFor="phoneNumber">Phone Number</label>
          </FloatLabel>
          <Button
            label={showUpdatebutton ? "Update" : "Create"}
            type="submit"
          />
        </form>
      </Sidebar>
      <div className="w-[80%] mx-auto my-5 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h1 className=" text-3xl">Total Users: {userlist.length}</h1>
          <Button
            label="Create User"
            onClick={() => {
              setVisible(true);
              setshowupdatebutton(false);
              setuserdata({
                firstName: "",
                lastName: "",
                email: "",
                phoneNumber: "",
              });
            }}
            className=" mb-5 w-fit"
          />
        </div>
        <DataTable value={userlist} tableStyle={{ minWidth: "50rem" }}>
          <Column header="First Name" sortable field="firstName"></Column>
          <Column header="Last Name" sortable field="lastName"></Column>
          <Column header="Email" field="email"></Column>
          <Column header="Phone Number" field="phoneNumber"></Column>
          <Column
            header="Actions"
            body={(rowData) => (
              <>
                <Button
                  icon={PrimeIcons.PENCIL}
                  title="Edit"
                  onClick={() => {
                    setVisible(true);
                    setshowupdatebutton(true);
                    setuserdata({
                      ...userdata,
                      firstName: rowData.firstName,
                      lastName: rowData.lastName,
                      email: rowData.email,
                      phoneNumber: rowData.phoneNumber,
                    });
                  }}
                />{" "}
                <Button
                  icon={PrimeIcons.TRASH}
                  title="Delete"
                  onClick={() => {
                    if (
                      window.confirm("Do you want to remove user from list?")
                    ) {
                      setuserlist((prev) =>
                        prev.filter((x) => x.email !== rowData.email)
                      );
                      toast.success("Successfully removed user from list", {
                        position: "bottom-center",
                      });
                    }
                  }}
                />{" "}
                <Button
                  icon={PrimeIcons.EYE}
                  title="View"
                  onClick={() => {
                    setviewdata(true);
                    setuserdata({
                      ...userdata,
                      firstName: rowData.firstName,
                      lastName: rowData.lastName,
                      email: rowData.email,
                      phoneNumber: rowData.phoneNumber,
                    });
                  }}
                />
              </>
            )}
          />
        </DataTable>
        <Dialog
          header="User Details"
          visible={viewdata}
          onHide={() => {
            setviewdata(false);
          }}
        >
          <>
            <p className="text-xl">
              <b>First Name :</b> {userdata.firstName}
            </p>
            <p className="text-xl">
              <b>Last Name:</b> {userdata.lastName}
            </p>
            <p className="text-xl">
              <b>Email:</b> {userdata.email}
            </p>
            <p className="text-xl">
              <b>Phone Number:</b> {userdata.phoneNumber}
            </p>
          </>
        </Dialog>
      </div>
    </>
  );
}

export default UserCrud;
