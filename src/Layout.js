import React from 'react'
import App from './App';

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
import ManageQuiz from './Components/Admin/Content/Quiz/ManageQuiz';
import Questions from './Components/Admin/Content/Question/Questions';
import PrivateRouter from './routes/PrivateRouter';
const NotFound = () => {
   return (
      <div className='container mt-3 alert alert-danger'>404 NOT FOUND
      </div>)
}
function Layout() {
   return (
      <><React.Suspense fallback={<div>loading...</div>}>
         <Routes>
            <Route path='/' element={<App />} >
               <Route index element={<HomePage />} />
               <Route path='/user' element={<PrivateRouter><QuizzList /></PrivateRouter>} />
            </Route>
            <Route path='/quizz/:id' element={<PrivateRouter> <QuizzDetail /></PrivateRouter>} />
            <Route path='/admin' element={<PrivateRouter><Admin /></PrivateRouter>} >
               <Route index element={<DashBoard />} />
               <Route path='manage-user' element={<ManageUser />} />
               <Route path='manage-quizzes' element={<ManageQuiz />} />
               <Route path='manage-question' element={<Questions />} />
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path="*" element={<NotFound />} />
         </Routes>
      </React.Suspense>

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

      </>
   )
}

export default Layout