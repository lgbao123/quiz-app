import React from 'react'
import imgQ from '../../assets/question.png'
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'
function Question(props) {
   const { data, isFinish, isShowResult } = props;
   const handleCheck = (isCorrect, isSelected) => {
      if (!isCorrect && !isSelected) {
         return false
      }
      // if (isCorrect && isSelected) {
      //    return 'correct'
      // }
      // if (isCorrect && !isSelected) {
      //    return 'correct'
      // }
      // if (!isCorrect && isSelected) {
      //    return 'incorrect'
      // }
      return true;

   }
   return (
      <>
         <div className='quizz-content mt-3'>
            {data &&
               <>
                  {data.image ?
                     (<div className='img-div '><img className="card-img" src={`data:image/jpeg;base64,${data.image}`} alt='question' /></div>) :
                     (<div className='img-div '><img className="card-img" src={imgQ} alt='question' /></div>)
                  }

                  <p className="question-title fw-bold my-3">Question {+data.idQuestion}:  <span className="fw-normal">{data.description} ?</span> </p>
                  {data.answers && data.answers.length && data.answers.map((item) => {
                     return (
                        <div key={`question${data.idQuestion}-answers${item.id}`} className="form-check card-text ms-4 mb-3">
                           <input
                              className="form-check-input" type="checkbox"
                              id={`question${data.idQuestion}-answers${item.id}`}
                              onChange={() => props.handleCheckBox(data.idQuestion, item.id)}
                              checked={item.isSelected}
                              disabled={isFinish ? true : false}
                           />
                           <label className="form-check-label" htmlFor={`question${data.idQuestion}-answers${item.id}`}>
                              <p className="card-text"> {item.description}</p>
                           </label>
                           {isFinish && isShowResult && ((!item.isCorrect && !item.isSelected) ? false : (!item.isCorrect && item.isSelected) ?
                              <label className='incorrect'><AiOutlineClose /></label> :
                              <label className='correct'><AiOutlineCheck /></label>)
                           }

                        </div>
                     )
                  })}

               </>


            }
            {/* <div className='img-div'><img className="card-img-top" alt="Card " /></div> */}

         </div></>
   )
}

export default Question