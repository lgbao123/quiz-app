import React, { useState } from 'react'

function ListQuiz(props) {

   const { quizList } = props
   return (
      <div className='list-quiz-container'>
         <h5>List Quizzes :</h5>
         <table className="table table-hover table-bordered table-responsive  ">
            <thead className="text-light bg-dark">
               <tr>
                  <th scope="col" className='col-0.5'>ID</th>
                  <th scope="col" className='col-1.5'>Name</th>
                  <th scope="col" className='col-5'>Description</th>
                  <th scope="col" className='col-2'>Type</th>
                  <th scope="col" className='col-2'>Action</th>
               </tr>
            </thead>
            <tbody>
               {quizList && quizList.length > 0 && quizList.map((element, index) => {
                  return (
                     <tr key={`data-user-${index}`}>
                        <th scope="row">{element.id}</th>
                        <td>{element.name}</td>
                        <td>{element.description}</td>
                        <td>{element.difficulty}</td>
                        <td className='d-flex mb-1 gap-3' >
                           <button type="button"
                              className="flex-fill me-1 btn btn-info "
                              onClick={() => props.handleClickBtnUpdate(element)}
                           >Update</button>
                           <button type="button"
                              className="flex-fill me-1 btn btn-danger"
                              onClick={() => props.handleClickBtnDelete(element)}
                           >Delete</button>
                        </td>
                     </tr>)
               })}
               {quizList && quizList.length === 0 && (
                  <tr>
                     <td colSpan="5">Not Found Data </td>
                     {/* <td ></td> */}
                  </tr>
               )
               }

            </tbody>
         </table>

      </div>
   )
}

export default ListQuiz