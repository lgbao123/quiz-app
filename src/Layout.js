import React from 'react'
import App from './App';
import User from './Components/User/User';
import Admin from './Components/Admin/Admin';
import HomePage from './Components/HomePage/HomePage';
import DashBoard from './Components/Admin/Content/DashBoard';
import ManageUser from './Components/Admin/Content/ManageUser';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
function Layout() {
   return (
      <>
         <Routes>
            <Route path='/' element={<App />} >
               <Route index element={<HomePage />} />
               <Route path='/user' element={<User />} />
            </Route>
            <Route path='/admin' element={<Admin />} >
               <Route index element={<DashBoard />} />
               <Route path='manage-user' element={<ManageUser />} />
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />

         </Routes>
         <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
         />
         {/* Same as */}
         <ToastContainer />
      </>
   )
}

export default Layout