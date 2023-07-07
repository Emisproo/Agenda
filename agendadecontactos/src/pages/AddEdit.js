import React, { useState, useEffect} from 'react';
//import {} from "react-router-dom";
import {Navigate, useParams } from "react-router-dom";
import './AddEdit.css';
import {fireDB} from "../firebase";
import {toast} from "react-toastify";
import { getDatabase, push, ref } from "firebase/database";


const initialState = {
  name:"",
  email:"",
  contact:""
}

const AddEdit = () => {
  const [state, setState] = useState(initialState);
 

  const {name, email, contact} = state;
  const {id} = useParams();

const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !contact) {
      toast.error("Please provide a value in each input field");
    } else {
      
      const contactsRef = ref(fireDB, "contacts");
      push(contactsRef, state)
      .then(() => {
        toast.success("Contact added successfully");
        //console.log("Contact added successfully");
        setState(initialState);
      })
      .catch((err) => {
        toast.error(err);
      });
    }
};
 
  const handleInputChange = (e)=>{
    const {name, value} = e.target;
    setState({...state, [name]: value});
  };

  if (id) {
    return  <div>Editing Contact with ID: {id}</div>;
  }
  return (
    <div style={{marginTop: "100px"}}>
      <form style={{margin:"auto", padding:"15px", maxWidth: "400px", alignContent: "center"}} onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id= "name" name="name" placeholder="Your name" value={name} onChange={handleInputChange}></input>

        <label htmlFor="email">Email</label>
        <input type="email" id= "email" name="email" placeholder="Your email" value={email} onChange={handleInputChange}></input>

        <label htmlFor="contact">Contact</label>
        <input type="number" id= "contact" name="contact" placeholder="Your contact number" value={contact} onChange={handleInputChange}></input>
      
        <input type = "submit" value = "Save"/> 
      </form>
    </div>
  )
}

export default AddEdit;