"use client";
import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { toast } from "react-toastify";

const UserData = () => {
    const [visible, setVisible] = useState(false);
    const [editUser, setEditUser] = useState(null);
    const [users, setUsers] = useState([]);

    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        email: "",
        mobile: "",
    });

    // Handle input change
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value,
        });
    };

    // Handle form submission (Add or Update)
    const handleFormSubmit = (e) => {
        e.preventDefault();

        const isEmail = users.some(user => user.email === formData.email && user.id !== editUser?.id);

        if (isEmail) {
            toast.error("email already used!use a different email.");
            return;
        }

        if (editUser) {
            // Update existing user
            setUsers(users.map(user => (user.id === editUser.id ? { ...user, ...formData } : user)));
            setEditUser(null);
            toast.success("user updated successfully!");
        } else {
            // Add new user
            const newUser = {
                id: Date.now(),
                ...formData,
            };
            setUsers([...users, newUser]);
            toast.success("user added successfully!");
        }

        setFormData({ fname: "", lname: "", email: "", mobile: "" });
        setVisible(false);
    };

    // Handle Edit
    const handleEdit = (id) => {
        const userToEdit = users.find(user => user.id === id);
        setFormData(userToEdit);
        setEditUser(userToEdit);
        setVisible(true);
    };

    // Handle Delete
    const handleDelete = (id) => {
        setUsers(users.filter(user => user.id !== id));
        toast.success("user deleted successfully!");
    };

    const showModal = () => {
        setFormData({ fname: "", lname: "", email: "", mobile: "" });
        setEditUser(null);
        setVisible(true);
    };

    const hideModal = () => {
        setVisible(false);
        setEditUser(null);
        setFormData({ fname: "", lname: "", email: "", mobile: "" });
    };
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-semibold mb-10 text-center">User Record</h1>
            <div className="absolute top-0 right-0 me-5 p-2">
                <Button label="Add User" className="p-button-primary" onClick={showModal} />
            </div>
            <DataTable value={users}>
                <Column header="Sr.No" body={(rowData, { rowIndex }) => <span>{rowIndex + 1}</span>} sortable />
                <Column field="fname" header="First Name" sortable />
                <Column field="lname" header="Last Name" sortable />
                <Column field="email" header="Email" sortable />
                <Column field="mobile" header="Mobile" sortable />
                <Column
                    header="Action"
                    body={(rowData) => (
                        <div className="flex gap-2">
                            <Button icon="pi pi-pencil" className="p-button" onClick={() => handleEdit(rowData.id)} tooltip="Edit" />
                            <Button icon="pi pi-trash" className="p-button p-button-danger" onClick={() => handleDelete(rowData.id)} tooltip="Delete" />
                        </div>
                    )}
                />
            </DataTable>


            <Dialog
                header={editUser ? "Edit User" : "Add User"}
                visible={visible}
                onHide={hideModal}
                style={{ width: "50vw" }}
            >
                <form className="space-y-4" onSubmit={handleFormSubmit}>
                    <div>
                        <label htmlFor="fname" className="block text-gray-700 text-sm font-medium">First Name</label>
                        <InputText id="fname" value={formData.fname} onChange={handleChange} placeholder="Enter your first name" required className="w-full border rounded-md px-2 py-2 text-sm" />
                    </div>
                    <div>
                        <label htmlFor="lname" className="block text-gray-700 text-sm font-medium">Last Name</label>
                        <InputText id="lname" value={formData.lname} onChange={handleChange} placeholder="Enter your last name" required className="w-full border rounded-md px-2 py-2 text-sm" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-gray-700 text-sm font-medium">Email</label>
                        <InputText id="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required className="w-full border rounded-md px-2 py-2 text-sm" />
                    </div>
                    <div>
                        <label htmlFor="mobile" className="block text-gray-700 text-sm font-medium">Mobile</label>
                        <InputText id="mobile" value={formData.mobile} onChange={handleChange} placeholder="Enter your mobile" required className="w-full border rounded-md px-2 py-2 text-sm" />
                    </div>

                    <div className="flex gap-4">
                        <Button label={editUser ? "Update" : "Submit"} type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md" />
                        <Button label="Cancel" type="button" onClick={hideModal} className="w-full bg-gray-400 hover:bg-gray-500 text-white font-semibold rounded-md" />
                    </div>
                </form>
            </Dialog>
        </div>
    );
};

export default UserData;
