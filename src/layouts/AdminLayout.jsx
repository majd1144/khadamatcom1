import { Link, Outlet } from "react-router-dom";

const AdminLayout = () => (
  <div style={{ display: "flex", minHeight: "100vh" }}>
    {/* === الشريط الجانبي === */}
    <aside
      style={{
        width: "250px",
        background: "#2c3e50",
        color: "white",
        padding: "1rem",
      }}
    >
        
<h3>Admin Panel</h3>

  <nav style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "2rem" }}>
  <Link to="/admin" style={{ color: "white" }}>
    Dashboard
  </Link>
  <Link to="/admin/users" style={{ color: "white" }}>
    Users
  </Link>
  <Link to="/admin/workers" style={{ color: "white" }}>
    Workers
  </Link>
  <Link to="/admin/bookings" style={{ color: "white" }}>
    Bookings
  </Link>
  {/* <Link to="/admin/reports" style={{ color: "white" }}>
    Reports
  </Link> */}
  <Link to="/admin/reviews" style={{ color: "white" }}>
    Reviews
  </Link> {/* ✅ هذا هو الرابط الجديد */}
</nav>

    </aside>

    {/* === المحتوى الرئيسي يتغير حسب الراوت === */}
    <main style={{ flex: 1, padding: "1.5rem" }}>
      <Outlet />
    </main>
  </div>
);

export default AdminLayout;
