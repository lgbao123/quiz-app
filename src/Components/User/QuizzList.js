import React, { useEffect, useState } from 'react'
import { getQuizzByUser } from '../../service/apiService';
import './QuizzList.scss'
function QuizzList() {
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

         <div className="row  ">
            {quizzList && quizzList.length > 0 && quizzList.map((item, index) => {
               return (
                  <div key={`quizz-${item.id}`} className="col-xxl-4 col-md-6 mt-5 ">
                     <div className="card">
                        <div className='img-div'><img className="card-img-top" src={`data:image/jpeg;base64,${item.image}`} alt="Card image cap" /></div>
                        <div className="card-body">
                           <h5 className="card-title">Quizz {index}</h5>
                           <p className="card-text">{item.description}</p>
                        </div>
                        <div className="card-footer d-flex justify-content-between align-items-center">
                           <button className="btn btn-primary">Start now</button>
                           <small className="text-muted">Last updated 3 mins ago</small>
                        </div>
                     </div>
                  </div>
               )
            })}
            {/* <div class="col-xxl-4 col-md-6 mt-5 ">
               <div class="card">
                  <div className='img-div'><img class="card-img-top" src="https://imagekit.io/blog/content/images/2020/06/cdn-blog-banner.jpg" alt="Card image cap" /></div>
                  <div class="card-body">
                     <h5 class="card-title">Special title treatment</h5>
                     <p class="card-text">With supporting text below as a natural lead-in to additional content.
                        With supporting text below as a natural lead-in to additional
                        With supporting text below as a natural lead-in to additional
                     </p>

                  </div>
                  <div class="card-footer d-flex justify-content-between align-items-center">
                     <button class="btn btn-primary">Start now</button>
                     <small class="text-muted">Last updated 3 mins ago</small>
                  </div>
               </div>
            </div>
            <div class="col-xxl-4 col-md-6 mt-5 ">
               <div class="card">
                  <div className='img-div'><img class="card-img-top" src="https://imagekit.io/blog/content/images/2020/06/cdn-blog-banner.jpg" alt="Card image cap" /></div>
                  <div class="card-body">
                     <h5 class="card-title">Special title treatment</h5>
                     <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>

                  </div>
                  <div class="card-footer d-flex justify-content-between align-items-center">
                     <button class="btn btn-dark">Start now</button>
                     <small class="text-muted">Last updated 3 mins ago</small>
                  </div>
               </div>
            </div>
            <div class="col-xxl-4 col-md-6 mt-5 ">
               <div class="card">
                  <div className='img-div'><img class="card-img-top" src="https://imagekit.io/blog/content/images/2020/06/cdn-blog-banner.jpg" alt="Card image cap" /></div>

                  <div class="card-body">
                     <h5 class="card-title">Special title treatment</h5>
                     <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>

                  </div>
                  <div class="card-footer d-flex justify-content-between align-items-center">
                     <button class="btn btn-primary">Start now</button>
                     <small class="text-muted">Last updated 3 mins ago</small>
                  </div>
               </div>
            </div>
            <div class="col-xxl-4 col-md-6 mt-5 ">
               <div class="card">
                  <div className='img-div'><img class="card-img-top" src="https://imagekit.io/blog/content/images/2020/06/cdn-blog-banner.jpg" alt="Card image cap" /></div>
                  <div class="card-body">
                     <h5 class="card-title">Special title treatment</h5>
                     <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>

                  </div>
                  <div class="card-footer d-flex justify-content-between align-items-center">
                     <button class="btn btn-primary">Start now</button>
                     <small class="text-muted">Last updated 3 mins ago</small>
                  </div>
               </div>
            </div> */}
         </div>

      </div>

   )
}

export default QuizzList