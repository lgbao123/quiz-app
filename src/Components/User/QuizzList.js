import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getQuizzByUser } from '../../service/apiService';
import PerfectScrollbar from 'react-perfect-scrollbar'
import './QuizzList.scss'
function QuizzList() {
   const navigate = useNavigate();
   const [quizzList, setQuizzList] = useState([]);
   useEffect(() => {
      fetchGetQuizz();
   }, []);
   const fetchGetQuizz = async () => {
      let res = await getQuizzByUser();
      if (res && res.EC === 0) {
         setQuizzList(res.DT);
      }


   }
   return (
      <div className='quizz-list-container px-lg-5 px-md-3'>
         <PerfectScrollbar>

            <div className="row  ">
               {quizzList && quizzList.length > 0 && quizzList.map((item, index) => {
                  return (
                     <div key={`quizz-${item.id}`} className="col-xxl-4 col-md-6 mt-5 ">
                        <div className="card">
                           <div className='img-div'><img className="card-img-top" src={`data:image/jpeg;base64,${item.image}`} alt="Card " /></div>
                           <div className="card-body">
                              <h5 className="card-title">Quiz {index + 1}</h5>
                              <p className="card-text">{item.description}</p>
                           </div>
                           <div className="card-footer d-flex justify-content-between align-items-center">
                              <button onClick={() => navigate(`/quizz/${item.id}`, { 'state': { 'desc': item.description } })} className="btn btn-primary">Start now</button>
                              <small className="text-muted">Last updated 3 mins ago</small>
                           </div>
                        </div>
                     </div>
                  )
               })}
               {quizzList && quizzList.length === 0 && <div className='mt-4'>You don't have any quizz now ...</div>}

            </div>
         </PerfectScrollbar>

      </div>

   )
}

export default QuizzList