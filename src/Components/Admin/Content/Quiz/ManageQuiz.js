import React, { useEffect, useRef, useState } from 'react'
import './ManageQuiz.scss'

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Select from 'react-select';
import Accordion from 'react-bootstrap/Accordion';
import { getAllQuiz, postAddQuiz } from '../../../../service/apiService';
import { toast } from 'react-toastify';
import ListQuiz from './ListQuiz';
import ModalUpdateQuiz from './ModalUpdateQuiz';
import ModalDeleteQuiz from './ModalDeleteQuiz';

function ManageQuiz() {
   const options = [
      { value: 'EASY', label: 'Easy' },
      { value: 'MEDIUM', label: 'Medium' },
      { value: 'HARD', label: 'Hard' }
   ]
   const inputImgRef = useRef(null);
   const [name, setName] = useState('');
   const [desc, setDesc] = useState('');
   const [type, setType] = useState({ label: "Easy", value: "EASY" });
   const [image, setImage] = useState('');
   const [preImage, setPreImage] = useState('');
   const [isFirst, setIsFirst] = useState(true);
   const [quizList, setQuizList] = useState();
   const [showModalUpdate, setShowModalUpdate] = useState(false);
   const [dataUpdate, setDataUpdate] = useState('');
   const [showModalDelete, setShowModalDelete] = useState(false);
   const [dataDelete, setDataDelete] = useState('');
   const handleClickBtnUpdate = (quiz) => {
      setShowModalUpdate(true);
      setDataUpdate(quiz);

   }
   const handleClickBtnDelete = (quiz) => {
      setShowModalDelete(true);
      setDataDelete(quiz);

   }
   const handleAddQuiz = async () => {
      setIsFirst(false);
      if (name && desc && image) {
         let res = await postAddQuiz(desc, name, type?.value, image);
         if (res && res.EC === 0) {
            toast.success(res.EM);
            await fetchListQuiz();
            setIsFirst(true);
            setName('');
            setDesc('');
            setImage('');
            setPreImage('');
            inputImgRef.current.value = null;
         } else {
            toast.error(res.EM)
         }
      }
   }
   const handleUploadFile = (e) => {
      if (e.target && e.target.files && e.target.files[0]) {
         setImage(e.target.files[0]);
         setPreImage(URL.createObjectURL(e.target.files[0]));
      }
      else {
         setImage('');
         setPreImage('')
      }

   }
   const fetchListQuiz = async () => {
      let res = await getAllQuiz();
      if (res || res.EC === 0) {
         setQuizList(res.DT)
      }
   }
   // clean up 
   useEffect(() => {
      return () => {
         if (preImage) {
            URL.revokeObjectURL(preImage)
         }
      }
   }, [preImage])
   // Call api
   useEffect(() => {
      fetchListQuiz();
   }, [])
   return (
      <div className='manage-quiz-container mt-5 container'>
         <h2 className='mb-5'>Manage Quizzes</h2>
         <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0" className='border-0'>
               <Accordion.Header>Add New Quiz</Accordion.Header>
               <Accordion.Body className='px-0'>
                  <fieldset className="border rounded-3 p-3">
                     <legend className="float-none w-auto px-3" >Quiz</legend>
                     <Form >
                        <FloatingLabel
                           controlId="floatingInput1"
                           label="Name"
                           className="mb-3"
                        >
                           <Form.Control
                              isInvalid={name || isFirst ? false : true} type="text" placeholder="Name"
                              value={name} onChange={(e) => setName(e.currentTarget.value)} />
                        </FloatingLabel>
                        <FloatingLabel
                           controlId="floatingInput2"
                           label="Description"
                           className="mb-3"
                        >
                           <Form.Control
                              isInvalid={desc || isFirst ? false : true}
                              type="text" placeholder="Description" value={desc} onChange={(e) => setDesc(e.currentTarget.value)} />
                        </FloatingLabel>
                        <Row>
                           <Select className='my-2' options={options} placeholder={'Quiz type ...'} value={type} onChange={setType} />
                        </Row>
                        <Row>
                           <Form.Group controlId="formFile" className="my-2">
                              <Form.Label>Image</Form.Label>
                              <Form.Control
                                 isInvalid={image || isFirst ? false : true}
                                 type="file" onChange={(e) => handleUploadFile(e)} ref={inputImgRef} />
                           </Form.Group>
                        </Row>

                        <Row>
                           <div className='img-section my-3 w-md-25 '>
                              {preImage ? (<img src={preImage} alt="preview " />) : (<span>Preview Image</span>)}

                           </div>
                        </Row>
                     </Form>
                     <button className='btn btn-primary' onClick={handleAddQuiz}>Submit</button>
                  </fieldset>
               </Accordion.Body>
            </Accordion.Item>

         </Accordion>
         <ListQuiz
            quizList={quizList}
            handleClickBtnUpdate={handleClickBtnUpdate}
            handleClickBtnDelete={handleClickBtnDelete}
         />

         <ModalUpdateQuiz
            show={showModalUpdate}
            setShow={setShowModalUpdate}
            dataUpdate={dataUpdate}
            setDataUpdate={setDataUpdate}
            fetchListQuiz={fetchListQuiz}
         />
         <ModalDeleteQuiz
            show={showModalDelete}
            setShow={setShowModalDelete}
            dataDelete={dataDelete}
            setDataDelete={setDataDelete}
            fetchListQuiz={fetchListQuiz}
         />
      </div>
   )
}

export default ManageQuiz