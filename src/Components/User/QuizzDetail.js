import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getQuestionById, getQuizWithQA, postSubmitAnswers } from '../../service/apiService';
import _ from 'lodash';
import './QuizzDetail.scss'
import Question from './Question';
import ModalQuizzResult from './ModalQuizzResult';
import RightContent from './Content/RightContent';
import ModalQuizzSubmit from './ModalQuizzSubmit';
import PerfectScrollbar from 'react-perfect-scrollbar'
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { urltoFile } from '../../utils/utils';
function QuizzDetail() {
   const navigate = useNavigate();
   const [questionWithAnswer, setQuestionWithAnswer] = useState([]);
   const [showResultModal, setShowResultModal] = useState(false);
   const [showSubmitModal, setShowSubmitModal] = useState(false);
   const [isFinish, setIsFinish] = useState(false);
   const [isShowResult, setIsShowResult] = useState(false);
   const [dataResultModal, setDataResultModal] = useState({});
   const params = useParams();
   const QuizzId = params.id;
   const location = useLocation();
   const [questionList, setQuestionList] = useState([]);
   const [index, setIndex] = useState(0);
   useEffect(() => {
      fetchQuestion(QuizzId);
      fetchQuizSelected(QuizzId);
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
   const handleSubmit = () => {
      setShowSubmitModal(true);
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
      const cloneQuestion = _.cloneDeep(questionList)
      // console.log('check1 : ', cloneQuestion);
      // console.log('check2 : ', questionList);
      const answers = cloneQuestion && cloneQuestion.length > 0 && cloneQuestion.map((question) => {
         let userAnswerId = [];
         let iFinalQ = questionWithAnswer.findIndex((questionF) => +questionF.id === +question.idQuestion)
         // console.log(iFinalQ);
         question.answers.forEach((answer) => {
            let iFinalA = questionWithAnswer[iFinalQ].answers.findIndex((answerF) => +answerF.id === +answer.id)
            answer.isCorrect = questionWithAnswer[iFinalQ].answers[iFinalA].isCorrect;
            if (answer.isSelected) {
               userAnswerId.push(answer.id)
            }

         })
         return {
            "questionId": +question.idQuestion,
            "userAnswerId": userAnswerId
         }
      })
      setQuestionList(cloneQuestion);
      let payload = {
         "quizId": +QuizzId,
         "answers": answers || []
      }
      let res = await postSubmitAnswers(payload);
      if (res && res.EC === 0) {
         setDataResultModal(res.DT)
         // console.log('check', res);
         setShowResultModal(true);
      }
      setShowSubmitModal(false)
      setIsFinish(true);
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
   const fetchQuizSelected = async (id) => {
      if (id) {
         let res = await getQuizWithQA(id);
         if (res && res.EC === 0) {
            if (!_.isEmpty(res.DT.qa)) {
               const cloneQuestions = res.DT.qa;

               for (let i = 0; i < cloneQuestions.length; i++) {
                  cloneQuestions[i].isValid = true;
                  if (cloneQuestions[i].imageFile) {
                     cloneQuestions[i].imageFile
                        = await urltoFile(`data:text/plain;base64,${cloneQuestions[i].imageFile}`, `quetion-${cloneQuestions[i].id}.png`, 'image/png')
                     cloneQuestions[i].imageName = `quetion-${cloneQuestions[i].id}.png`
                  }
                  for (let j = 0; j < cloneQuestions[i].answers.length; j++) {
                     cloneQuestions[i].answers[j].isValid = true
                  }

               }
               // console.log('check clone', cloneQuestions);
               setQuestionWithAnswer(cloneQuestions)
            } else {

            }


         }
      }
   }
   return (
      <PerfectScrollbar>
         <div className='quizz-detail-container container px-3 '>


            <div className="row  ">
               <Breadcrumb className='bread-crumb px-0 '>
                  <Breadcrumb.Item onClick={() => navigate('/')}>Home</Breadcrumb.Item>
                  <Breadcrumb.Item onClick={() => navigate('/user')}>
                     User
                  </Breadcrumb.Item>
                  <Breadcrumb.Item active>Quiz</Breadcrumb.Item>
               </Breadcrumb>
               <div className="col-md-8 col-sm-12 mt-5 px-0">
                  <div className="card">
                     {/* <p className='btn-back ms-3 mt-3' onClick={() => navigate('/user')}>&#60;&#60; Back to Quiz </p> */}
                     <div className="card-body">
                        <h4 className="quizz-title">Quiz {QuizzId} :{location?.state?.desc}</h4>
                        <hr></hr>

                        <Question
                           data={questionList && questionList.length ? questionList[index] : []}
                           handleCheckBox={handleCheckBox}
                           isFinish={isFinish}
                           isShowResult={isShowResult}
                        />
                     </div>
                     <div className="card-footer d-flex justify-content-center gap-3 align-items-center">
                        <button onClick={handlePrev} className="btn btn-secondary">Prev</button>
                        <button onClick={handleNext} className="btn btn-primary">Next</button>
                        <button onClick={handleSubmit} disabled={isFinish} className="btn btn-warning">Finish</button>
                     </div>
                  </div>
               </div>
               <div className="col-md-4 mt-5 ">

                  <RightContent
                     questionList={questionList}
                     handleFinish={handleFinish}
                     setIndex={setIndex}
                     index={index}
                     isFinish={isFinish}
                     setShowSubmitModal={setShowSubmitModal}

                  />
               </div>
               {/* {quizzList && quizzList.length === 0 && <div className='mt-4'>You don't have any quizz now ...</div>} */}

            </div>
            <ModalQuizzResult
               show={showResultModal}
               setShow={setShowResultModal}
               dataResultModal={dataResultModal}
               setIsShowResult={setIsShowResult}
            />
            <ModalQuizzSubmit
               show={showSubmitModal}
               setShow={setShowSubmitModal}
               handleFinish={handleFinish}
            />

         </div>
      </PerfectScrollbar>
   )
}

export default QuizzDetail