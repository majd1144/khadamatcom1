// components/admin/AdminBookings.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
axios.get("http://localhost:4000/admin/bookings")
      .then(res => setBookings(res.data))
      .catch(err => console.error("❌ Failed to load bookings:", err));
  }, []);
const handleStatusChange = async (id, status) => {
  try {
    await axios.patch(`http://localhost:4000/admin/bookings/${id}`, { status });
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  } catch (err) {
    console.error("❌ Failed to update status:", err);
  }
};

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">📦 All Bookings</h2>
      <table className="w-full border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">User</th>
            <th className="p-2">Service</th>
            <th className="p-2">Worker Type</th>
            <th className="p-2">Fee</th>
            <th className="p-2">Date</th>
            <th className="p-2">Time</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
  {bookings.map((b) => (
    <tr key={b.id} className="border-t">
      <td className="p-2">{b.user_firstname} {b.user_lastname}</td>
      <td className="p-2">{b.servicetype}</td>
      <td className="p-2">{b.worker_service}</td>
      <td className="p-2">{b.fee} JD</td>
      <td className="p-2">{b.date}</td>
      <td className="p-2">{b.time}</td>
      <td className="p-2">
        <select
          value={b.status}
          onChange={(e) => handleStatusChange(b.id, e.target.value)}
          className="border p-1"
        >
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
  );
};

export default AdminBookings;