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
import QuizzList from './Components/User/QuizzList';
import QuizzDetail from './Components/User/QuizzDetail';
const NotFound = () => {
   return (
      <div className='container mt-3 alert alert-danger'>404 NOT FOUND
      </div>)
}
function Layout() {
   return (
      <>
         <Routes>
            <Route path='/' element={<App />} >
               <Route index element={<HomePage />} />
               <Route path='/user' element={<QuizzList />} />
            </Route>
            <Route path='/quizz/:id' element={<QuizzDetail />} />
            <Route path='/admin' element={<Admin />} >
               <Route index element={<DashBoard />} />
               <Route path='manage-user' element={<ManageUser />} />
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path="*" element={<NotFound />} />
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