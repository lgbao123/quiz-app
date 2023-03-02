import React from 'react'
import imgQ from '../../assets/question.png'

function Question(props) {
   const { data } = props;
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
                           />
                           <label className="form-check-label" htmlFor={`question${data.idQuestion}-answers${item.id}`}>
                              <p className="card-text"> {item.description}</p>
                           </label>
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