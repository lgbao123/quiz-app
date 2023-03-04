import React, { useEffect, useState } from 'react'
import { AiOutlineCheck, AiOutlineReload } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import CountDown from './CountDown';

function RightContent(props) {
   const [show, setShow] = useState(false);

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);
   const naviagte = useNavigate();
   const { questionList, isFinish } = props;
   const [currentIndex, setCurrentIndex] = useState(0);
   const handleTimeUp = () => {
      // props.handleFinish();
   }
   const handleClicked = (index) => {
      props.setIndex(index)
   }
   const handleCheckedAnswer = (question) => {
      if (question && question.answers && question.answers.length) {
         const isUnAnswer = question.answers.every(answer => answer.isSelected === false)
         // console.log('check ques', question);
         // console.log('check is', isUnAnswer);
         if (!isUnAnswer) {
            return 'selected'
         }
      }
      return ' '
   }
   useEffect(() => {
      setCurrentIndex(props.index);
   }, [props.index])
   return (
      <div className="card right-content-container">

         <div className={"d-flex justify-content-between align-items-center p-3 header"}>
            <div className={"icon-group " + (isFinish ? " disabled" : " ")}
               onClick={props.setShowSubmitModal}
            >
               <AiOutlineCheck className='icon' />Finish
            </div>
            <div className="count-time">
               <CountDown
                  handleTimeUp={handleTimeUp}
                  isFinish={isFinish}
               />
            </div>
            <div className="icon-group"
               onClick={() => naviagte(0)}
            ><AiOutlineReload className='icon' />Renew</div>

         </div>
         <div className=" main">
            {questionList && questionList.length && questionList.map((question, index) => {
               return (
                  <div key={uuidv4()} className={'question' + (currentIndex === index ? ' clicked ' : ' ') + handleCheckedAnswer(question)}
                     onClick={() => handleClicked(index)}>
                     {index + 1}

                  </div>

               )
            })}


         </div>

      </div>
   )
}

export default RightContent