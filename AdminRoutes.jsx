// import { Routes, Route } from 'react-router-dom';
// import AdminLayout from '../layouts/AdminLayout';
// import Dashboard from '../pages/admin/Dashboard';
// import AdminUsers from '../components/ADMIN/AdminUsers';
// import AdminWorkers from '../components/ADMIN/AdminWorkers';
// import AdminBookings from '../components/ADMIN/AdminBookings';
// // import AdminReports from '../components/ADMIN/AdminReports';
// import NotAuthorized from '../components/NotAuthorized';
// import AdminRoute from '../components/AdminRoute';  // استورد الملف اللي عملناه
// import AdminReviews from '../components/ADMIN/AdminReviews';
// // import AdminLayout from '../layouts/AdminLayout';
// const AdminRoutes = () => (
//   <Routes>       
//     <Route path="/not-authorized" element={<NotAuthorized />} />

//     <Route path="/admin" element={<NotAuthorized />}>
//       <Route element={<AdminRoute />}>
//         <Route index element={<Dashboard />} />
//         <Route path="users" element={<AdminUsers />} />
//         <Route path="workers" element={<AdminWorkers />} />
//         <Route path="bookings" element={<AdminBookings />} />
//         <Route path="reviews" element={<AdminReviews />} />

//       </Route>     
//          <Route path="layout" element={<AdminLayout />} />

//     </Route>
//   </Routes>
// );

// export default AdminRoutes;
import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import Dashboard from '../pages/admin/Dashboard';
import AdminUsers from '../components/ADMIN/AdminUsers';
import AdminWorkers from '../components/ADMIN/AdminWorkers';
import AdminBookings from '../components/ADMIN/AdminBookings';
// import AdminReports from '../components/ADMIN/AdminReports';
import NotAuthorized from '../components/NotAuthorized';
import AdminRoute from '../components/AdminRoute';  // استورد الملف اللي عملناه
import AdminReviews from '../components/ADMIN/AdminReviews';
// import AdminLayout from '../layouts/AdminLayout';
const AdminRoutes = () => (
  <Routes>       
    <Route path="/not-authorized" element={<NotAuthorized />} />

  <Route path="/admin" element={<AdminLayout />} >
  <Route element={<AdminRoute />} >
    <Route index element={<Dashboard />} />
    <Route path="users" element={<AdminUsers />} />
    <Route path="workers" element={<AdminWorkers />} />
    <Route path="bookings" element={<AdminBookings />} />
    <Route path="reviews" element={<AdminReviews />} />
  </Route>

    
         <Route path="layout" element={<AdminLayout />} />

    </Route>
  </Routes>
);

export default AdminRoutes;