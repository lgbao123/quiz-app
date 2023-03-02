import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Select from 'react-select';
import { getAllQuiz, getAllUser, postAssignQuizUser } from '../../../../service/apiService';
import { toast } from 'react-toastify';
function AssignQuiz() {
   const [selectQuiz, setSelectQuiz] = useState('');
   const [selectOptionQuiz, setSelectOptionQuiz] = useState('');
   const [selectUser, setSelectUser] = useState('');
   const [selectOptionUser, setSelectOptionUser] = useState('');
   const handleSubmitAssign = async () => {
      if (selectQuiz && selectUser) {
         let res = await postAssignQuizUser(selectQuiz.value, selectUser.value);
         if (res && res.EC === 0) {
            toast.success(res.EM);
         } else {
            toast.error(res.EM);
         }
      } else {
         toast.error('Please choose quiz and user');
      }
   }
   // call api for quiz
   useEffect(() => {
      fetchQuizList();
      fetchUserList();
   }, [])
   const fetchQuizList = async () => {
      let res = await getAllQuiz();
      if (res && res.EC === 0) {
         let temp = res.DT
         temp = temp.map((quiz) => {
            return { value: quiz.id, label: `${quiz.id} - ${quiz.name}` }
         })
         setSelectOptionQuiz(temp);
      }
   }
   const fetchUserList = async () => {
      let res = await getAllUser();
      if (res && res.EC === 0) {
         let temp = res.DT
         temp = temp.map((user) => {
            return { value: user.id, label: user.email }
         })
         setSelectOptionUser(temp);
      }
   }
   return (
      <div className='assign-quiz-container p-3'>
         <Row className='mb-4'>
            <div className='col-sm-6 mb-3 mb-sm-0'>

               <label className="">Select Quiz:</label>
               <Select className='my-2  pe-0' options={selectOptionQuiz} placeholder={'Select Quiz...'} value={selectQuiz} onChange={setSelectQuiz} />
            </div>
            <div className='col-sm-6'>
               <label className="">Select User:</label>
               <Select className='my-2 pe-0' options={selectOptionUser} placeholder={'Select User...'} value={selectUser} onChange={setSelectUser} />
            </div>

         </Row>
         <button onClick={handleSubmitAssign} className='btn btn-warning'>Assign</button>
      </div>
   )
}

export default AssignQuiz