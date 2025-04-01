"use client";

import 'primereact/resources/themes/lara-light-blue/theme.css';  // Theme
import 'primereact/resources/primereact.min.css';               // Core styles
import 'primeicons/primeicons.css';


import { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export default function Home() {
  const [visible, setVisible] = useState(false);
  const [users, setUsers] = useState([]); 
 
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile_number: "",
  });

  function handleChange(e) {
    setData({ ...data, [e.target.id]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const email = data.email

    const isPresenet = users.some((user)=> user.email === email)
    console.log(isPresenet);
    
    if(isPresenet){
      alert("Add Unique mail")
    }else{
     setUsers([...users , data])
    }
   
    setData({ first_name: "", last_name: "", email: "", mobile_number: "" }); 
    setVisible(false);
  }


 

  return (
    <>
      <h1 className='px-8 font-bold text-3xl mt-8'>User List</h1>
     
      <div className="card flex justify-content-center">
        <Sidebar visible={visible} position="right" onHide={() => setVisible(false)}>
          <h2 className='font-bold text-2xl'>User Form</h2>
         

          <form onSubmit={handleSubmit}
           className='flex flex-col gap-5 mt-5'
          >
            <div>
              <label htmlFor="first_name">First Name</label>
              <InputText id="first_name" value={data.first_name} onChange={handleChange} 
              required 
              keyfilter="alpha"
              />
            </div>

            <div>
              <label htmlFor="last_name">Last Name</label>
              <InputText id="last_name" value={data.last_name} onChange={handleChange} 
              keyfilter="alpha"
              required />
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <InputText id="email" value={data.email} type="email" onChange={handleChange} required 
              
              />
            </div>

            <div>
              <label htmlFor="mobile_number">Mobile Number</label>
              <InputText id="mobile_number" value={data.mobile_number} onChange={handleChange} required 
              keyfilter="int"
              />
            </div>

            <div >
              <Button label="Add" type="submit" />
            </div>
          </form>
        </Sidebar>

     <div className='flex justify-between items-center w-full px-8 mt-3'>
     <div>
        <h3 className='text-2xl font-semibold'>Added Users : {users.length}</h3>
        </div>
        <div>
        <Button label="Add User" icon="pi pi-user-plus" onClick={() => setVisible(true)} />
        </div>
     </div>
        
      </div>

      <DataTable value={users} className='px-8 mt-5'>
        <Column field="first_name" header="First Name"></Column>
        <Column field="last_name" header="Last Name"></Column>
        <Column field="email" header="Email"></Column>
        <Column field="mobile_number" header="Mobile"></Column>
      </DataTable>
    </>
  );
}

