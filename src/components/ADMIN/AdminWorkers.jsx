// components/admin/AdminWorkers.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminWorkers = () => {
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
axios.get("http://localhost:4000/workers")
      .then(res => setWorkers(res.data))
      .catch(err => console.error("❌ Failed to load workers:", err));
  }, []);

  const handleEdit = async (id, updates) => {
    try {
      await axios.patch(`http://localhost:4000/admin/workers/${id}`, updates);
      setWorkers(prev => prev.map(w => w.id === id ? { ...w, ...updates } : w));
    } catch (err) {
      console.error("❌ Failed to update worker:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this worker?")) return;
    try {
      await axios.delete(`http://localhost:4000/admin/workers/${id}`);
      setWorkers(prev => prev.filter(w => w.id !== id));
    } catch (err) {
      console.error("❌ Failed to delete worker:", err);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">🧰 All Workers</h2>
      <table className="w-full border border-gray-300">
        <thead>
  <tr className="bg-gray-200">
    <th className="p-2">Worker ID</th>
    <th className="p-2">Full Name</th>
    <th className="p-2">Email</th>
    <th className="p-2">Governorate</th>
    <th className="p-2">Service</th>
    <th className="p-2">Fee</th>
    <th className="p-2">Actions</th>
  </tr>
</thead>
<tbody>
  {workers.map(w => (
    <tr key={w.id} className="border-t">
      <td className="p-2">{w.id}</td>
      <td className="p-2">{w.firstname} {w.lastname}</td>
      <td className="p-2">{w.email}</td>
      <td className="p-2">{w.governorate}</td>
      <td className="p-2">
        <input
          value={w.servicecategory || ""}
          onChange={e => handleEdit(w.id, { servicecategory: e.target.value })}
          className="border p-1"
        />
      </td>
      <td className="p-2">
        <input
          type="number"
          value={w.fee || 0}
          onChange={e => handleEdit(w.id, { fee: e.target.value })}
          className="border p-1"
        />
      </td>
      <td className="p-2">
        <button
          onClick={() => handleDelete(w.id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
  );
};

export default AdminWorkers;