import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ref, update, onValue} from 'firebase/database';
import { fireDB } from '../firebase';
import { toast } from 'react-toastify';

const EditContact = () => {
 
  const [state, setState] = useState({});
  const [data, setData] = useState({});
  const { id } = useParams();
  const { name, email, contact}= state;
  const navigate = useNavigate();

  useEffect(() => {
    const contactsRef = ref(fireDB, 'contacts');
    onValue(contactsRef, (snapshot) => {
      if (snapshot.exists()) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });

    return () => {
      setData({});
    };
  }, [id]);
 
  useEffect(() => {
    if (id && data[id]) {
      const { name, email, contact } = data[id];
      setState({ name, email, contact });
    } else {
      setState({});
    }
  }, [id, data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !contact) {
      toast.error('Please provide a value in each input field');
    } else {
      const contactRef = ref(fireDB, `contacts/${id}`);
      update(contactRef, { name, email, contact })
        .then(() => {
          toast.success('Contact updated successfully');
          navigate('/');
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

    return (
    <div style={{ marginTop: '100px' }}>
      <form
        style={{ margin: 'auto', padding: '15px', maxWidth: '400px', alignContent: 'center' }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" placeholder="Your name" value={name || ""} onChange={handleInputChange}></input>

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" placeholder="Your email" value={email || ""} onChange={handleInputChange}></input>

        <label htmlFor="contact">Contact</label>
        <input type="number" id="contact" name="contact" placeholder="Your contact number" value={contact || ""} onChange={handleInputChange}></input>
         
        <input type="submit" value={id ? 'Update' : 'Save'}  />
        
        
      </form>
    </div>
  );
};

export default EditContact;