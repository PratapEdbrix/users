"use client"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Sidebar } from 'primereact/sidebar';
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { useRef, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import "./globals.css";
import { log } from 'console';

export default function Home() {
  const [data, setData] = useState([]);
  const toast = useRef(null);
  const [visibleRight, setVisibleRight] = useState(false);

  const [form, setForm] = useState(
    {
      firstname: "",
      lastname: "",
      email: "",
      number: ""
    });

  function handleChange(e) {
    setForm({ ...form, [e.target.id]: e.target.value });
  }

  const total = data.length;


  function handleSubmit(e) {
    e.preventDefault();

    if (data.some((item) => item.email === form.email)) {
      alert("Email already exists. Please use a unique email.");
      return;
    }
    setData([...data, form]);
    setForm({
      firstname: "",
      lastname: "",
      email: "",
      number: ""
    });
    alert("User Added Successfully")
    setVisibleRight(false);

   
  }

  return (
    <div className='card '>
      <h1 className='text-center font-bold text-4xl mt-3'>User Model</h1>
      <div className="card">
        <div className='flex flex-row justify-between'>

          <div className='  m-6 ml-16 mb-0'>
            <h3>Total Data : {total}</h3>
          </div>
          <div className=" m-6 mr-16 mb-0">
            <Button label='Add' onClick={() => setVisibleRight(true)} />
          </div>
        </div>

        <Sidebar visible={visibleRight} position="right" onHide={() => setVisibleRight(false)}>
          <div className="card flex flex-col align-items-center gap-3">
            <label htmlFor="firstname">First Name</label>
            <InputText id="firstname" value={form.firstname} onChange={handleChange} />

            <label htmlFor="lastname">Last Name</label>
            <InputText id="lastname" value={form.lastname} onChange={handleChange} />

            <label htmlFor="email">Email</label>
            <InputText id="email" value={form.email} onChange={handleChange} />

            <label htmlFor="number">Mobile Number</label>
            <InputText id="number" value={form.number} onChange={handleChange} />
          </div>

          <div className='flex flex-row justify-center gap-8 mt-20'>
            <Button label="Cancel" icon="pi pi-times" onClick={() => setVisibleRight(false)} />
            <Button label="Submit" icon="pi pi-check" onClick={(e) => handleSubmit(e)} />
          </div>
        </Sidebar>
      </div>

      <div className="card m-14 shadow-2xl">
        <DataTable value={data} tableStyle={{ minWidth: '50rem' }}>
          <Column field="firstname" header="First Name"></Column>
          <Column field="lastname" header="Last Name"></Column>
          <Column field="email" header="Email"></Column>
          <Column field="number" header="Mobile Number"></Column>
        </DataTable>
      </div>
    </div>
  );
}
