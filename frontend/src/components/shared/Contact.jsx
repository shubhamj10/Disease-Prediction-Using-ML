import React, { useState } from 'react';
import emailjs from 'emailjs-com';
// import './Contact.css';

const Contact = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      const templateParams = {
        firstName,
        lastName,
        email,
        message,
      };

      emailjs.send('service_cvfcjt5', 'template_ogxaxnc', templateParams, 'OeKX5AIVyuAXJUURZ')
        .then((response) => {
          console.log('Email sent successfully!', response.status, response.text);
          setSuccess(true);
          resetForm();
        }, (error) => {
          console.error('Failed to send email. Error:', error);
          setSuccess(false);
        }).finally(() => {
          setLoading(false);
        });
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!firstName) errors.firstName = 'First name is required.';
    if (!lastName) errors.lastName = 'Last name is required.';
    if (!email) {
      errors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid.';
    }
    if (!message) errors.message = 'Message is required.';
    return errors;
  };

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setMessage('');
    setErrors({});
  };

  return (
    <form id='contact' className="max-w-md mx-auto" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="firstName" className="block mt-10 mb-1">First Name:</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.firstName && <p className="text-red-500">{errors.firstName}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="lastName" className="block mb-1">Last Name:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block mb-1">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="message" className="block mb-1">Message:</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.message && <p className="text-red-500">{errors.message}</p>}
      </div>
      <button
        type="submit"
        disabled={loading}
        className="border border-black p-3 w-32 mb-10 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        {loading ? 'Sending...' : 'Send'}
      </button>
      {success && <p className="text-green-500 mt-4">Message sent successfully!</p>}
    </form>
  );
};

export default Contact;
