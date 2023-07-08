import { useState, useEffect } from 'react';
import { get, onValue, ref, remove } from 'firebase/database';
import { fireDB } from '../firebase';
import { Link } from 'react-router-dom';
import './home.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { toast } from 'react-toastify';
//import {AddEdit} from './AddEdit.js';

const Home = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const contactsRef = ref(fireDB, 'contacts');
    onValue(contactsRef, (snapshot) => {
      if (snapshot.exists()) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
        }
    });

    return()=> {
      setData({});
    };
  }, []);

  const onDelete = (id) =>{
    if(window.confirm("Are you sure?")){
      const contactRef = ref(fireDB, `contacts/${id}`);
      remove(contactRef,(err)=>{
        if (err){
          toast.error(err);
        } else {
          toast.success("Contact Deleted");
        }
      });
    }
  }


  return (
    <div style= {{marginTop:"100px"}}> 
      <h2> My contacts</h2>
      <table className= "styled-table"> 
        <thead>
          <tr>
            <th style={{textAlign:"center"}}> Id</th>
            <th style={{textAlign:"center"}}> Name</th>
            <th style={{textAlign:"center"}}> Email</th>
            <th style={{textAlign:"center"}}> Contact</th>
            <th style={{textAlign:"center"}}> Action</th>
        </tr>
        </thead>
      
      <tbody>
        {Object.keys(data).map((id, index)=> {
          return(
            <tr key={id}>
              <th scope="row">{index + 1}</th>
              <td>{data[id].name}</td>
              <td>{data[id].email}</td>
              <td>{data[id].contact}</td>
              <td>
                <Link to={`/edit/${id}`}>
                   <button className="btn btn-edit"><i className="fa fa-edit"></i></button>
                </Link>
                <button className="btn btn-delete" onClick={()=> onDelete(id)}><i className="fa fa-trash"></i></button>
                <Link to={`/view/${id}`}>
                   <button className="btn btn-view"><i className="fa fa-eye"></i></button>
                </Link>
              </td>
            </tr>
          );
        })} 
      </tbody>
      </table>
    </div>
  ) 
}

export default Home