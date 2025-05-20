// components/admin/AdminUsers.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

useEffect(() => {
  axios.get("http://localhost:4000/users")  // ← هذا الصحيح
    .then(res => setUsers(res.data))
    .catch(err => console.error("❌ Failed to load users:", err));
}, []);


  const handleRoleChange = async (id, newRole) => {
    try {
      await axios.patch(`http://localhost:4000/admin/users/${id}`, { role: newRole });
      setUsers(prev => prev.map(u => u.id === id ? { ...u, role: newRole } : u));
    } catch (err) {
      console.error("❌ Failed to update role:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:4000/admin/users/${id}`);
      setUsers(prev => prev.filter(u => u.id !== id));
    } catch (err) {
      console.error("❌ Failed to delete user:", err);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">👥 All Users</h2>
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Governorate</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
        {users.map(user => (
  <tr key={user.id} className="border-t">
    <td className="p-2">{user.firstname} {user.lastname}</td>
    <td className="p-2">{user.email}</td>
    <td className="p-2">
      <select
        value={user.role}
        onChange={e => handleRoleChange(user.id, e.target.value)}
        className="border rounded p-1"
      >
        <option value="client">Client</option>
        <option value="worker">Worker</option>
        <option value="admin">Admin</option>
      </select>
    </td>
    <td className="p-2">{user.governorate}</td>
    <td className="p-2">
      <button
        onClick={() => handleDelete(user.id)}
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

export default AdminUsers;