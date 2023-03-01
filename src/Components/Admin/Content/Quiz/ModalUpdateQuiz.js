import React, { useEffect, useRef, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Select from 'react-select';
import _ from 'lodash'
import { postUpdateQuiz } from '../../../../service/apiService';
import { toast } from 'react-toastify';
const options = [
   { value: 'EASY', label: 'Easy' },
   { value: 'MEDIUM', label: 'Medium' },
   { value: 'HARD', label: 'Hard' }
]
function ModalUpdateQuiz(props) {
   const { show, setShow, dataUpdate } = props;
   const inputImgRef = useRef(null);
   const [name, setName] = useState('');
   const [desc, setDesc] = useState('');
   const [type, setType] = useState({ label: "Easy", value: "EASY" });
   const [image, setImage] = useState('');
   const [preImage, setPreImage] = useState('');

   const handleClose = () => {
      setName('');
      setDesc('');
      setImage('');
      setPreImage('');
      inputImgRef.current.value = null;
      setShow(false);
      props.setDataUpdate('');
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
   const handleSubmitUpdate = async () => {

      let res = await postUpdateQuiz(dataUpdate.id, desc, name, type?.value, image);
      if (res && res.EC === 0) {
         toast.success(res.EM);
         await props.fetchListQuiz();
         handleClose();
      }
      else {
         toast.success(res.EM);
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
   // handle  update data
   useEffect(() => {
      if (!_.isEmpty(dataUpdate)) {
         setName(dataUpdate.name);
         setType({ value: dataUpdate.difficulty.toUpperCase(), label: dataUpdate.difficulty.charAt(0).toUpperCase() + dataUpdate.difficulty.slice(1) });
         setDesc(dataUpdate.description);
         if (dataUpdate.image) {
            setPreImage(`data:image/png;base64,${dataUpdate.image}`);
         }
      }
      // return (() => {

      // })
   }, [dataUpdate])
   return (
      <>


         <Modal size='lg' show={show} onHide={handleClose}>
            <Modal.Header closeButton>
               <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <fieldset className="border rounded-3 p-3">
                  <legend className="float-none w-auto px-3" >Quiz</legend>
                  <Form >
                     <FloatingLabel
                        controlId="floatingInput1"
                        label="Name"
                        className="mb-3"
                     >
                        <Form.Control
                           isInvalid={name ? false : true} type="text" placeholder="Name"
                           value={name} onChange={(e) => setName(e.currentTarget.value)} />
                     </FloatingLabel>
                     <FloatingLabel
                        controlId="floatingInput2"
                        label="Description"
                        className="mb-3"
                     >
                        <Form.Control
                           isInvalid={desc ? false : true}
                           type="text" placeholder="Description" value={desc} onChange={(e) => setDesc(e.currentTarget.value)} />
                     </FloatingLabel>
                     <Row>
                        <Select className='my-2' options={options} placeholder={'Quiz type ...'} value={type} onChange={setType} />
                     </Row>
                     <Row>
                        <Form.Group controlId="formFile" className="my-2">
                           <Form.Label>Image</Form.Label>
                           <Form.Control
                              type="file" onChange={(e) => handleUploadFile(e)} ref={inputImgRef} />
                        </Form.Group>
                     </Row>

                     <Row>
                        <div className='img-section my-3 w-md-25 '>
                           {preImage ? (<img src={preImage} alt="preview " />) : (<span>Preview Image</span>)}

                        </div>
                     </Row>
                  </Form>
                  <button className='btn btn-primary' onClick={handleSubmitUpdate}>Submit</button>
               </fieldset>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={handleClose}>
                  Close
               </Button>
               <Button variant="primary" onClick={handleSubmitUpdate}>
                  Save Changes
               </Button>
            </Modal.Footer>
         </Modal>
      </>
   )
}

export default ModalUpdateQuiz