
import { FaUser } from 'react-icons/fa'
import { BsFillQuestionCircleFill } from 'react-icons/bs'
import { GoBook } from 'react-icons/go'
import { MdQuestionAnswer } from 'react-icons/md'
import './DashBoard.scss'
import React, { useEffect, useState } from "react";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { getDashboard } from '../../../service/apiService'
function DashBoard() {
   const [dataChart, setDataChart] = useState([]);
   const [dataDash, setDataDash] = useState('');

   useEffect(() => {
      fetchDataDash();
   }, [])
   const fetchDataDash = async () => {
      let res = await getDashboard();
      if (res && res.EC === 0) {
         setDataDash(res.DT);
         const temp = [
            { name: 'Total', value: res?.DT?.users?.total },
            { name: 'User', value: res?.DT?.users?.countUsers },
            { name: 'Admin', value: res?.DT?.users?.countAdmin },

         ];
         setDataChart(temp);
      }
   }
   return (
      <div className="dashboard-container container mt-5">
         <h4 className="title">Dashboard</h4>
         <p>Welcome back, Lucy! We've missed you. 👋</p>
         <hr />
         <div className="row main gap-3">
            <div className="col left-container d-flex flex-column gap-3">
               {/* <div className="row"> */}
               <div className="col group-content ">
                  <div className="icon user"><FaUser /></div>
                  <div className="content"><span>{dataDash?.users?.total ?? 0}</span>  <span className='text-2'>Users</span> </div>
               </div>
               <div className="col  group-content">
                  <div className="icon quiz"><BsFillQuestionCircleFill /></div>
                  <div className="content"><span>{dataDash?.others?.countQuiz ?? 0}</span>  <span className='text-2'>Quizzes</span> </div>
               </div>
               {/* </div> */}
               {/* <div className="row"> */}
               <div className="col  group-content">
                  <div className="icon question"><GoBook /></div>
                  <div className="content"><span>{dataDash?.others?.countQuestions ?? 0}</span>  <span className='text-2'>Questions</span> </div>
               </div>
               <div className="col  group-content">
                  <div className="icon answer"><MdQuestionAnswer /></div>
                  <div className="content"><span>{dataDash?.others?.countAnswers ?? 0}</span>  <span className='text-2'>Answers</span> </div>
                  {/* </div> */}
               </div>



            </div>
            <div className="col col-lg-8 p-5 right-container">
               <ResponsiveContainer width="99%" height='100%' >

                  <BarChart data={dataChart}>
                     <CartesianGrid strokeDasharray="3 3" />
                     <Bar dataKey="value" fill="#8884d8" />

                     <CartesianGrid stroke="#ccc" />
                     <XAxis dataKey="name" />
                     <YAxis />
                     <Tooltip cursor={{ fill: 'transparent' }} />
                     {/* <Legend /> */}
                  </BarChart>
               </ResponsiveContainer>

            </div>




         </div>
      </div >
   )
}

export default DashBoard