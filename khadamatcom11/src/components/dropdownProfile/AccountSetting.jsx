import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AccountSetting.css';

const AccountSettings = () => {
  const [user, setUser] = useState(null);
  const [worker, setWorker] = useState(null);
  const [isEditing, setIsEditing] = useState({});
  const [formValues, setFormValues] = useState({});
  const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '' });
  const [showProviderForm, setShowProviderForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const services = [
    { value: "Part Time Worker", label: "Part Time Worker" },
    { value: "Babysitter", label: "Babysitter" },
    { value: "Housemaid", label: "Housemaid" },
    { value: "Painter", label: "Painter" },
    { value: "Graphic Designer", label: "Graphic Designer" },
    { value: "Photographer", label: "Photographer" },
    { value: "Teacher", label: "Teacher" },
    { value: "Blacksmith", label: "Blacksmith" },
    { value: "Wall Painter", label: "Wall Painter" },
    { value: "Carpenter", label: "Carpenter" },
    { value: "Electrician Technician", label: "Electrician Technician" },
  ];

const fetchUserData = async () => {
  try {
    const userResponse = await axios.get("http://localhost:4000/users/loggedin_user", {
      withCredentials: true,
    });
    const loggedUser = userResponse.data;
    setUser(loggedUser);

    let initialFormValues = {
      name: loggedUser.name || "",
      email: loggedUser.email || "",
      phone: loggedUser.phone || "",
      governorate: loggedUser.governorate || "",
    };

    if (loggedUser.role === "worker") {
      const workerResponse = await axios.get(
        `http://localhost:4000/workers/users/${loggedUser.id}`
      );
      const workerData = workerResponse.data;
      setWorker(workerData);

      initialFormValues = {
        ...initialFormValues,
        jobType: workerData.servicecategory || "",
        price: workerData.fee || "",
      };
    }

    setFormValues(initialFormValues);
  } catch (err) {
    console.error("Error fetching data:", err);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleEditClick = (field) => {
    setIsEditing(prev => ({ ...prev, [field]: true }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

const handleSave = async (field) => {
  try {
    let updatePayload = {};
    let updatedFieldValues = {};

    // Use fallback for name if not editable or not available
    const fullName = formValues.name || `${user.firstname} ${user.lastname}`;
    const [firstname, ...rest] = fullName.trim().split(" ");
    const lastname = rest.join(" ");

    // Shared payload for worker update
    const fullWorkerPayload = {
      firstname: firstname,
      lastname: lastname,
      email: formValues.email || user.email,
      phone: formValues.phone || user.phone,
      governorate: formValues.governorate || user.governorate,
      servicecategory: formValues.jobType,
      fee: formValues.price || "",
    };

    if (field === "name") {
      updatePayload = { firstname: firstname, lastname: lastname };
      updatedFieldValues = { name: fullName };
    } else if (field === "location") {
      updatePayload = { governorate: formValues.governorate };
      updatedFieldValues = { governorate: formValues.governorate };
    } else if (user.role === "worker" && (field === "jobType" || field === "price")) {
      updatePayload = fullWorkerPayload;
      updatedFieldValues = {
        jobType: formValues.jobType,
        price: formValues.price,
      };
    } else {
      updatePayload = { [field]: formValues[field] };
      updatedFieldValues = { [field]: formValues[field] };
    }

    if (user.role === "worker" && ["jobType", "price"].includes(field)) {
      await axios.patch(`http://localhost:4000/workers/${worker.id}`, updatePayload);
    } else {
      await axios.patch(`http://localhost:4000/users/${user.id}`, updatePayload);
    }

    setFormValues((prev) => ({
      ...prev,
      ...updatedFieldValues,
    }));

    setIsEditing((prev) => ({ ...prev, [field]: false }));
    alert("Updated successfully.");
  } catch (error) {
    console.error("Failed to save:", error);
    alert("Failed to update.");
  }
};


  const handlePasswordChange = async () => {
    if (!passwords.oldPassword || !passwords.newPassword) {
      alert("Please fill in both fields.");
      return;
    }

    try {
      await axios.patch(`http://localhost:4000/users/${user.id}/password`, passwords);
      alert("Password updated successfully.");
      setPasswords({ oldPassword: '', newPassword: '' });
    } catch (err) {
      console.error("Password update failed:", err);
      alert("Password update failed.");
    }
  };

  const handleBecomeProvider = () => setShowProviderForm(true);

  const handleProviderSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:4000/workers", {
        userId: user.id,
        jobType: formValues.jobType,
        price: formValues.price,
      });
      setWorker(res.data);
      setUser(prev => ({ ...prev, role: "worker" }));
      setShowProviderForm(false);
    } catch (error) {
      console.error("Failed to become provider:", error);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (!confirmDelete) return;

    try {
      if (user.role === "worker" && worker?.id) {
        await axios.delete(`http://localhost:4000/workers/${worker.id}`);
      }
      await axios.delete(`http://localhost:4000/users/${user.id}`);
      alert("Your account has been deleted.");
      window.location.href = "/";
    } catch (error) {
      console.error("Failed to delete account:", error);
      alert("An error occurred while trying to delete your account.");
    }
  };

  if (loading || !user) return <p>Loading...</p>;

  return (
    <div className="account-settings">
      <h2>Account Settings</h2>
      <p style={{ fontSize: '25px' }}><strong>Account Type:</strong> {user.role}</p>
      <hr />

      {["name", "email", "phone", "location"].map((field) => (
        <div className="field-row" key={field}>
          <strong>{field.charAt(0).toUpperCase() + field.slice(1)}:</strong>
          {isEditing[field] ? (
            <>
              <input
                name={field === "location" ? "governorate" : field}
                value={field === "location" ? formValues.governorate : formValues[field]}
                onChange={handleInputChange}
              />
              <button onClick={() => handleSave(field)}>Save</button>
            </>
          ) : (
            <>
              <span>{field === "location" ? formValues.governorate : formValues[field]}</span>
              <button onClick={() => handleEditClick(field)}>Edit</button>
            </>
          )}
        </div>
      ))}

      {user.role === "worker" ? (
        <>
          <div className="field-row">
            <label>Job Type:</label>
            <div className="field-content">
              {isEditing.jobType ? (
                <>
                  <select name="jobType" value={formValues.jobType || ""} onChange={handleInputChange}>
                    <option value="">Select Job Type</option>
                    {services.map(service => (
                      <option key={service.value} value={service.value}>{service.label}</option>
                    ))}
                  </select>
                  <button onClick={() => handleSave("jobType")}>Save</button>
                </>
              ) : (
                <>
                  <span>{formValues.jobType}</span>
                  <button onClick={() => handleEditClick("jobType")}>Edit</button>
                </>
              )}
            </div>
          </div>

          <div className="field-row">
            <strong>Price:</strong>
            {isEditing.price ? (
              <>
                <input name="price" value={formValues.price || ""} onChange={handleInputChange} />
                <button onClick={() => handleSave("price")}>Save</button>
              </>
            ) : (
              <>
                <span>{formValues.price}</span>
                <button onClick={() => handleEditClick("price")}>Edit</button>
              </>
            )}
          </div>
        </>
      ) : !showProviderForm ? (
        <button onClick={handleBecomeProvider}>Become a Worker?</button>
      ) : (
        <div>
          <h4>Became a Worker</h4>
          <div className="field-row">
            <label>Job Type:</label>
            <div className="field-content">
              <select name="jobType" value={formValues.jobType || ""} onChange={handleInputChange}>
                <option value="">Select Job Type</option>
                {services.map((service) => (
                  <option key={service.value} value={service.value}>{service.label}</option>
                ))}
              </select>
            </div>
          </div>

          <input
            name="price"
            type="number"
            placeholder="Price"
            value={formValues.price || ""}
            onChange={handleInputChange}
          />
          <button onClick={handleProviderSubmit}>Submit</button>
        </div>
      )}

      <hr />
      <div>
        <h4>Change Password</h4>
        <input
          type="password"
          name="oldPassword"
          placeholder="Old Password"
          value={passwords.oldPassword}
          onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
        />
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={passwords.newPassword}
          onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
        />
        <button onClick={handlePasswordChange}>Update Password</button>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <hr />
        <button onClick={handleDeleteAccount} style={{ color: 'white', backgroundColor: 'red', padding: '10px', borderRadius: '5px' }}>
          Delete My Account
        </button>
      </div>
    </div>
  );
};

export default AccountSettings;
