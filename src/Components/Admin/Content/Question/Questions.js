import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Select from 'react-select';
import { RiImageAddFill } from 'react-icons/ri';
import { BsPatchPlusFill, BsPatchMinusFill } from 'react-icons/bs';
import { v4 as uuidv4 } from 'uuid';
import Lightbox from "react-awesome-lightbox";
import './Questions.scss'
import _ from 'lodash';
import { toast } from 'react-toastify';
import { getAllQuiz, getQuizWithQA, postCreateNewAnswer, postCreateNewQuetion, postUpSertQuizWithQA } from '../../../../service/apiService';
import { getBase64, urltoFile } from '../../../../utils/utils';
function Questions() {
   const [isUpdate, setIsUpdate] = useState(false);
   const [selectQuiz, setSelectQuiz] = useState('');
   const [selectOptionQuiz, setSelectOptionQuiz] = useState('');
   const [isShowPreImgae, setIsShowPreImage] = useState(false);
   const [isFirst, setIsFirst] = useState(true);
   const [dataPreImage, setDataPreImage] = useState({
      "url": "",
      "title": ""
   })

   const intialQuestion = [{
      "id": uuidv4(),
      "description": "",
      "imageFile": '',
      "imageName": "",
      "answers": [
         {
            'id': uuidv4(),
            "description": '',
            "isCorrect": false,
            "isValid": false
         },
      ],
      "isValid": false
   }]
   const [questions, setQuestions] = useState(intialQuestion)
   const handleAddOrRemoveQuestion = (type, id) => {
      if (type === 'REMOVE') {
         let questionsClone = _.cloneDeep(questions)
         questionsClone = questionsClone.filter((item) => item.id !== id)
         setQuestions([...questionsClone])
      } else {
         const questionsClone = _.cloneDeep(questions)
         const question =
         {
            "id": uuidv4(),
            "description": "",
            "imageFile": '',
            "imageName": "",
            "answers": [
               {
                  'id': uuidv4(),
                  "description": "",
                  "isCorrect": false,
                  "isValid": false
               }
            ],
            "isValid": false
         }
         const index = questionsClone.findIndex(question => question.id === id)
         questionsClone.splice(index + 1, 0, question);
         setQuestions([...questionsClone])
      }
   }
   const handleAddOrRemoveAnswer = (type, idQ, idA) => {
      if (type === 'REMOVE') {
         const questionsClone = _.cloneDeep(questions)
         questionsClone.forEach((question, index) => {
            if (question.id === idQ) {
               questionsClone[index].answers = question.answers.filter((answer) => answer.id !== idA)
            }
         })
         setQuestions([...questionsClone])
      } else {
         const questionsClone = _.cloneDeep(questions)
         const answer_new = {
            'id': uuidv4(),
            "description": "",
            "isCorrect": false,
            "isValid": false
         }
         questionsClone.forEach((question) => {
            if (question.id === idQ) {
               const index = question.answers.findIndex(item => item.id === idA)
               question.answers.splice(index + 1, 0, answer_new);
            }
         })
         setQuestions([...questionsClone])
      }
   }
   const handleOnChangeQuetion = (type, id, event) => {
      const questionsClone = _.cloneDeep(questions);
      const index = questionsClone.findIndex(question => question.id === id);
      if (index > -1) {
         if (type === 'INPUT') {
            questionsClone[index].description = event.target.value;
            questionsClone[index].description ? questionsClone[index].isValid = true : questionsClone[index].isValid = false
         }
         if (type === 'FILE') {
            if (event.target && event.target.files && event.target.files[0]) {
               questionsClone[index].imageFile = event.target.files[0];
               questionsClone[index].imageName = event.target.files[0].name;
            }
         }
      }
      setQuestions([...questionsClone])
   }
   const handleOnChangeAnswer = (type, idQ, idA, event) => {
      const questionsClone = _.cloneDeep(questions);
      const indexQ = questionsClone.findIndex(question => question.id === idQ);
      if (indexQ > -1) {
         const indexA = questionsClone[indexQ].answers.findIndex(answer => answer.id === idA)
         if (indexA > -1) {
            if (type === 'CHECKBOX') {
               questionsClone[indexQ].answers[indexA].isCorrect = event.target.checked;

            }
            if (type === 'INPUT') {
               questionsClone[indexQ].answers[indexA].description = event.target.value;
               questionsClone[indexQ].answers[indexA].description ?
                  questionsClone[indexQ].answers[indexA].isValid = true : questionsClone[indexQ].answers[indexA].isValid = false
            }
         }

      }
      setQuestions([...questionsClone])
   }
   // Submit Quiz
   const handleSubmitQuestionForQuiz = async () => {
      setIsFirst(false);
      //validate
      if (!selectQuiz) {
         toast.error('Please Choose Quiz')
         return
      }
      if (questions.some((question) => question.answers.every((answer) => answer.isCorrect === false))) {
         toast.error('Please Choose Correct Answer')
         return
      }
      if (
         questions.every((question) => question.isValid === true) &&
         questions.every((question) => question.answers.every((answer) => answer.isValid === true))
      ) {
         if (isUpdate) {
            // call api for Update
            const cloneQuestions = _.cloneDeep(questions);
            for (let i = 0; i < cloneQuestions.length; i++) {
               cloneQuestions[i].isValid = true;
               delete cloneQuestions[i].imageName
               delete cloneQuestions[i].isValid
               if (cloneQuestions[i].imageFile) {
                  cloneQuestions[i].imageFile = (await getBase64(cloneQuestions[i].imageFile)).split(',')[1]
               }
               for (let j = 0; j < cloneQuestions[i].answers.length; j++) {
                  delete cloneQuestions[i].answers[j].isValid
               }

            }
            // console.log(cloneQuestions);
            const data = {
               "quizId": selectQuiz.value,
               "questions": cloneQuestions
            }
            // console.log(data);
            let res = await postUpSertQuizWithQA(data)
            if (res && res.EC === 0) {
               toast.success(res.EM);
               fetchQuizSelected();

            }

         } else {
            // call api for Create
            let check = true
            for (const question of questions) {
               let res = await postCreateNewQuetion(+selectQuiz.value, question.description, question.imageFile)
               if (res && res.EC === 0) {
                  for (const answer of question.answers) {
                     await postCreateNewAnswer(answer.description, answer.isCorrect, res.DT.id)
                  }
               } else { check = false }

            }
            if (check) {
               toast.success('Create succes');
               // setQuestions(intialQuestion);
               fetchQuizSelected();

            }
         }

      }


   }
   // Preview Img
   const handlePreviewImage = (question) => {
      setIsShowPreImage(true);
      setDataPreImage({
         "url": URL.createObjectURL(question.imageFile),
         "title": question.imageName
      })
   }
   // Clean up
   useEffect(() => {
      return () => {
         if (dataPreImage.url) {
            URL.revokeObjectURL(dataPreImage.url)
         }
      }
   }, [dataPreImage])
   // call api for quiz
   useEffect(() => {
      fetchQuizList();
   }, [])
   const fetchQuizList = async () => {
      let res = await getAllQuiz();
      if (res && res.EC === 0) {
         let temp = res.DT
         temp = temp.map((quiz) => {
            return { value: quiz.id, label: `${quiz.id} - ${quiz.description}` }
         })
         setSelectOptionQuiz(temp);
      }
   }
   //call api for selected quiz 
   useEffect(() => {
      fetchQuizSelected();
   }, [selectQuiz])
   const fetchQuizSelected = async () => {
      if (selectQuiz) {
         let res = await getQuizWithQA(selectQuiz.value);
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
                     cloneQuestions[i].answers[j].isCorrect = Boolean(cloneQuestions[i].answers[j].isCorrect)
                  }

               }
               console.log(cloneQuestions);
               setQuestions(cloneQuestions)
               setIsUpdate(true);
            } else {
               console.log(1234564);
               setQuestions(intialQuestion);
               setIsUpdate(false);
            }
            setIsFirst(true)

         }
      }
   }
   return (

      <div className='questions-container container mt-5'>
         <h2 className='mb-5'>Manage Question <hr /></h2>

         <Row className='mb-4'>
            <label className="">Select Quiz:</label>
            <Select className='my-2 col-6 pe-0' options={selectOptionQuiz} placeholder={'Quiz type ...'} value={selectQuiz} onChange={setSelectQuiz} />

         </Row>
         <Row>
            {questions && questions.length && questions.map((question, index) => {
               return (
                  <div key={question.id} className='questions-main'>
                     <div className='question-section row mb-3 mb-sm-0'>
                        <div className='col-6'>
                           <label className="form-label"><b>Add Quetions {index + 1}:</b></label>
                           <FloatingLabel
                              controlId="floatingInput2"
                              label={`Question ${index + 1} 's description`}
                              className="mb-3"
                           >
                              <Form.Control
                                 // isInvalid={desc || isFirst ? false : true}
                                 type="text" placeholder="Description"
                                 onChange={(e) => handleOnChangeQuetion('INPUT', question.id, e)}
                                 value={question.description}
                                 isInvalid={question.isValid || isFirst ? false : true}
                              />
                           </FloatingLabel>
                        </div>
                        <div className='col-6 btn-group align-items-sm-center flex-column flex-sm-row gap-sm-3 pt-3'>
                           <div className='col-xxl-4 input-file d-flex align-items-center gap-2'>
                              <label htmlFor={question.id} className="form-label"><RiImageAddFill /> </label>
                              <div className='span-div'>
                                 <span> {question.imageFile ?

                                    <span className='pre-img-span'
                                       onClick={() => handlePreviewImage(question)}>{question.imageName}
                                    </span> :
                                    '0 File is upload'}
                                 </span>
                              </div>

                              <input type='file' id={question.id} hidden onChange={(e) => handleOnChangeQuetion('FILE', question.id, e)} />
                           </div>
                           <div className='col d-flex gap-2'>
                              <BsPatchPlusFill onClick={() => handleAddOrRemoveQuestion('ADD', question.id)} className='add-icon text-primary' />

                              {questions.length > 1 &&
                                 <BsPatchMinusFill onClick={() => handleAddOrRemoveQuestion('REMOVE', question.id)} className='minus-icon text-danger' />}
                           </div>

                        </div>
                     </div>
                     {
                        question && question.answers && question.answers.length && question.answers.map((answer, index) => {
                           return (
                              <div key={answer.id} className='answer-section row ms-3'>
                                 <div className='col-7 d-flex align-items-center gap-3'>
                                    <div className="mb-3 icon-check">
                                       <input type="checkbox" className="form-check-input"
                                          checked={answer.isCorrect}
                                          onChange={(e) => handleOnChangeAnswer('CHECKBOX', question.id, answer.id, e)}
                                       />
                                    </div>
                                    <FloatingLabel
                                       controlId="floatingInput2"
                                       label={`Answer ${index + 1} `}
                                       className="mb-3 col"
                                    >
                                       <Form.Control
                                          // isInvalid={desc || isFirst ? false : true}
                                          type="text" placeholder="Description"
                                          value={answer.description}
                                          onChange={(e) => handleOnChangeAnswer('INPUT', question.id, answer.id, e)}
                                          isInvalid={answer.isValid || isFirst ? false : true}
                                       />
                                    </FloatingLabel>
                                 </div>
                                 <div className='col btn-group align-items-center pb-3 '>

                                    <div className='col d-flex gap-2'>
                                       <BsPatchPlusFill onClick={() => handleAddOrRemoveAnswer("ADD", question.id, answer.id)} className='add-icon text-primary' />
                                       {question.answers.length > 1 &&
                                          <BsPatchMinusFill onClick={() => handleAddOrRemoveAnswer("REMOVE", question.id, answer.id)} className='minus-icon text-danger' />}
                                    </div>

                                 </div>
                              </div>
                           )

                        })
                     }


                  </div>

               )
            })}

         </Row >
         <button className='mt-3 btn btn-warning' onClick={handleSubmitQuestionForQuiz}>Save Change</button>
         {
            isShowPreImgae &&
            <Lightbox
               image={dataPreImage.url}
               title={dataPreImage.title}
               onClose={() => { setIsShowPreImage(false) }}

            />
         }
      </div >
   )
}

export default Questions