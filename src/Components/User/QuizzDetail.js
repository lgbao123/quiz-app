import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { getQuestionById, postSubmitAnswers } from '../../service/apiService';
import _ from 'lodash';
import './QuizzDetail.scss'
import Question from './Question';
import ModalQuizzResult from './ModalQuizzResult';

function QuizzDetail() {
   const [showResultModal, setShowResultModal] = useState(false);
   const [dataResultModal, setDataResultModal] = useState({});
   const params = useParams();
   const QuizzId = params.id;
   const location = useLocation();
   const [questionList, setQuestionList] = useState([]);
   const [index, setIndex] = useState(0);
   useEffect(() => {
      fetchQuestion(QuizzId);
   }, [QuizzId]);
   const handlePrev = () => {
      if (index > 0) {
         setIndex(index - 1);
      }
   }
   const handleNext = () => {
      if (index < questionList.length - 1) {
         setIndex(index + 1);
      }
   }
   const handleFinish = async () => {
      //    {
      //       "quizId": 1,
      //       "answers": [
      //           { 
      //               "questionId": 1,
      //               "userAnswerId": [3]
      //           },
      //           { 
      //               "questionId": 2,
      //               "userAnswerId": [6]
      //           }
      //       ]
      //   }
      const answers = questionList && questionList.length > 0 && questionList.map((question) => {
         let userAnswerId = [];
         question.answers.forEach((answer) => {
            if (answer.isSelected) {
               userAnswerId.push(answer.id)
            }
         })
         return {
            "questionId": +question.idQuestion,
            "userAnswerId": userAnswerId
         }
      })
      let payload = {
         "quizId": +QuizzId,
         "answers": answers || []
      }
      let res = await postSubmitAnswers(payload);
      if (res && res.EC === 0) {
         setDataResultModal(res.DT)
         console.log('check', res);
         setShowResultModal(true);
      }
      // console.log(payload);
   }
   const handleCheckBox = (qId, aId) => {
      console.log('aid', aId);
      console.log(qId);
      let questionListCLone = _.cloneDeep(questionList);
      const question = questionListCLone.find((item) => item.idQuestion === qId)
      question && question.answers && question.answers.forEach((item) => {
         if (item.id === aId) {
            item.isSelected = !item.isSelected
         }
      })
      const tempindex = questionListCLone.findIndex((item) => item.idQuestion === qId)
      tempindex > -1 && (questionListCLone[tempindex] = question);
      setQuestionList(questionListCLone);


   }
   const fetchQuestion = async (id) => {
      let res = await getQuestionById(id);
      if (res && res.EC === 0) {
         const data = _.chain(res.DT)
            .groupBy("id")
            .map((values, key) => {
               let desc = '';
               let img = '';
               let ans = values.reduce((acc, item) => {
                  item.answers.isSelected = false;
                  return [...acc, item.answers]
               }, [])
               values.forEach((item, index) => {
                  if (index === 0) {
                     desc = item.description;
                     img = item.image
                  }
               })
               return ({ "idQuestion": key, "description": desc, "image": img, "answers": ans })
            })
            .value()
         setQuestionList(data);
      }
   }
   return (
      <div className='quizz-detail-container container-md '>

         <div className="row  ">
            <div className="col-md-8 col-sm-12 mt-5 px-0">
               <div className="card">
                  <div className="card-body">
                     <h4 className="quizz-title">Quiz {QuizzId} :{location.state.desc}</h4>
                     <hr></hr>

                     <Question
                        data={questionList && questionList.length ? questionList[index] : []}
                        handleCheckBox={handleCheckBox}
                     />
                  </div>
                  <div className="card-footer d-flex justify-content-center gap-3 align-items-center">
                     <button onClick={handlePrev} className="btn btn-secondary">Prev</button>
                     <button onClick={handleNext} className="btn btn-primary">Next</button>
                     <button onClick={handleFinish} className="btn btn-warning">Finish</button>
                  </div>
               </div>
            </div>
            <div className="col-md-4 mt-5 ">
               <div className="card">
                  <div className='img-div'><img className="card-img-top" alt="Card " /></div>
                  <div className="card-body">
                     <h5 className="card-title">Quizz index + </h5>
                     <p className="card-text">item.description</p>
                  </div>
                  <div className="card-footer d-flex justify-content-between align-items-center">
                     <button className="btn btn-primary">Start now</button>
                     <small className="text-muted">Last updated 3 mins ago</small>
                  </div>
               </div>
            </div>
            {/* {quizzList && quizzList.length === 0 && <div className='mt-4'>You don't have any quizz now ...</div>} */}

         </div>
         <ModalQuizzResult
            show={showResultModal}
            setShow={setShowResultModal}
            dataResultModal={dataResultModal}
         />

      </div>
   )
}

export default QuizzDetail