import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import './AccountSetting.css';

const AccountSettings = () => {
  const [isProvider, setIsProvider] = useState(false);

  const initialValues = {
    name: '',
    email: '',
    phone: '',
    location: '',
    password: '',
    jobType: '',
    price: '',
    availableHours: '',
  };

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className="account-settings">
      <h2>Account Settings</h2>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {() => (
          <Form>
            <label>Name:</label>
            <Field name="name" type="text" />

            <label>Email:</label>
            <Field name="email" type="email" />

            <label>Phone Number:</label>
            <Field name="phone" type="tel" />

            <label>Location:</label>
            <Field name="location" type="text" />

            <label>Password:</label>
            <Field name="password" type="password" />

            <div className="provider-toggle">
              <label>
                <input
                  type="checkbox"
                  checked={isProvider}
                  onChange={() => setIsProvider(!isProvider)}
                />
                Become a Provider?
              </label>
            </div>

            {isProvider && (
              <div className="provider-fields">
                <label>Job Type:</label>
                <Field name="jobType" type="text" />

                <label>Price:</label>
                <Field name="price" type="number" />

                <label>Available Hours:</label>
                <Field name="availableHours" type="text" />
              </div>
            )}

            <button type="submit">Save Changes</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AccountSettings;
