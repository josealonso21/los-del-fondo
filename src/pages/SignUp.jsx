import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';
import '../styles/pages/signup.scss';

const initialFields = [
  { name: 'firstName', placeholder: 'First Name', type: 'text' },
  { name: 'lastName', placeholder: 'Last Name', type: 'text' },
  { name: 'username', placeholder: 'Username', type: 'text' },
  { name: 'age', placeholder: 'Age', type: 'number' },
  { name: 'email', placeholder: 'Email', type: 'email' },
  { name: 'password', placeholder: 'Password', type: 'password' },
  { name: 'confirmPassword', placeholder: 'Confirm Password', type: 'password' },
  { name: 'phone', placeholder: 'Phone Number', type: 'tel' }
];

function SignUp({ onSignUp }) {
  const { setUserProfile } = useUser();
  const [formData, setFormData] = useState({});
  const [fields, setFields] = useState(initialFields);
  const navigate = useNavigate();

  const fillData = () => {
    for (const field of fields) {
      if (!formData[field.name]) {
        alert('Please, complete all the information');
        return false;
      }
    }
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    if (fillData()) {
      const uniqueId = Math.floor(Math.random() * 1000000);
      const profileData = { ...formData, id: uniqueId };
      setUserProfile(profileData);
      onSignUp(profileData);
      navigate(`/room/${formData.username}`, { state: profileData });
    }
  };

  return (
    <div className="signup-page">
      <div className="form-content">
        {fields.map((field) => (
          <div key={field.name} className="input-group">
            <input
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name] || ''}
              onChange={handleChange} />
          </div>
        ))}
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default SignUp;