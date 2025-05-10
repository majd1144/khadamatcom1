import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AccountSetting.css';

const AccountSettings = () => {
  const [user, setUser] = useState(null);
  const [worker, setWorker] = useState(null);
  const [isEditing, setIsEditing] = useState({});
  const [formValues, setFormValues] = useState({});
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get("http://localhost:4000/users/loggedin_user", { withCredentials: true });
        const loggedUser = userResponse.data;
        setUser(loggedUser);
        setFormValues(loggedUser);

        if (loggedUser.role === "worker") {
          const workerResponse = await axios.get(`http://localhost:4000/workers/users/${loggedUser.id}`);
          const workerData = workerResponse.data;
          setWorker(workerData);
          setFormValues(prev => ({ ...prev, ...workerData }));
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
      if (user.role === "worker" && ["jobType", "price"].includes(field)) {
        await axios.patch(`http://localhost:4000/workers/${worker.id}`, { [field]: formValues[field] });
      } else {
        await axios.patch(`http://localhost:4000/users/${user.id}`, { [field]: formValues[field] });
      }
      setIsEditing(prev => ({ ...prev, [field]: false }));
    } catch (error) {
      console.error("Failed to save:", error);
    }
  };

  const handleBecomeProvider = async () => {
    setShowProviderForm(true);
  };

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
      window.location.href = "/"; // or "/login"
    } catch (error) {
      console.error("Failed to delete account:", error);
      alert("An error occurred while trying to delete your account.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="account-settings">
      <h2>Account Settings</h2>
<br/>
      <p style={{ fontSize: '25px' }}><strong>Account Type:</strong> {user.role}</p>
<hr/>
      <div className="field-row">
        <strong>Name :</strong>
        {isEditing.name ? (
          <>
            <input name="name" value={formValues.name} onChange={handleInputChange} />
            <button onClick={() => handleSave("name")}>Save</button>
          </>
        ) : (
          <>
            <span>{user.name}</span>
            <button onClick={() => handleEditClick("name")}>Edit</button>
          </>
        )}
      </div>

      <div className="field-row">
        <strong>Email :</strong>
        {isEditing.email ? (
          <>
            <input name="email" value={formValues.email} onChange={handleInputChange} />
            <button onClick={() => handleSave("email")}>Save</button>
          </>
        ) : (
          <>
            <span>{user.email}</span>
            <button onClick={() => handleEditClick("email")}>Edit</button>
          </>
        )}
      </div>

      <div className="field-row">
        <strong>Phone:</strong>
        {isEditing.phone ? (
          <>
            <input name="phone" value={formValues.phone} onChange={handleInputChange} />
            <button onClick={() => handleSave("phone")}>Save</button>
          </>
        ) : (
          <>
            <span>{user.phone}</span>
            <button onClick={() => handleEditClick("phone")}>Edit</button>
          </>
        )}
      </div>

      <div className="field-row">
        <strong>Location:</strong>
        {isEditing.location ? (
          <>
            <input name="location" value={formValues.location} onChange={handleInputChange} />
            <button onClick={() => handleSave("location")}>Save</button>
          </>
        ) : (
          <>
            <span>{user.governorate}</span>
            <button onClick={() => handleEditClick("location")}>Edit</button>
          </>
        )}
      </div>

      {user.role === "worker" ? (
        <><div className="field-row">
  <label>Job Type : {formValues.servicecategory || ""}</label>
  <div className="field-content">
    {isEditing.jobType ? (
      <>
        <select
          name="jobType"
          value={formValues.jobType}
          onChange={handleInputChange}
        >
          <option value="">Select Job Type</option>
          {services.map((service) => (
            <option key={service.value} value={service.value}>
              {service.label}
            </option>
          ))}
        </select>
        <button onClick={() => handleSave("jobType")}>Save</button>
      </>
    ) : (
      <>
        <span>{worker?.jobType}</span>
        <button onClick={() => handleEditClick("jobType")}>Edit</button>
      </>
    )}
  </div>
</div>

          <div className="field-row">
            <strong>Price:</strong>
            {isEditing.price ? (
              <>
                <input name="price" value={formValues.price} onChange={handleInputChange} />
                <button onClick={() => handleSave("price")}>Save</button>
              </>
            ) : (
              <>
                <span>{worker?.price}</span>
                <button onClick={() => handleEditClick("price")}>Edit</button>
              </>
            )}
          </div>
        </>
      ) : (
        !showProviderForm ? (
          <button onClick={handleBecomeProvider}>Become a Worker?</button>
        ) : (
          <div>
            <h4>Became a Worker</h4>
            <div className="field-row">
  <label>Job Type: </label>
  <div className="field-content">
    <select
      name="jobType"
      value={formValues.jobType || "KKnjnj"}
      onChange={handleInputChange}
    >
      <option value="">Select Job Type</option>
      {services.map((service) => (
        <option key={service.value} value={service.value}>
          {service.label}
        </option>
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
        )
      )}

      {/* Delete Account Section */}
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
