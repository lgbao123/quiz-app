import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import _ from 'lodash'
function ModalViewUser(props) {
   const { show, setShow, dataView } = props;
   const [email, setEmail] = useState('')
   const [password, setPassWord] = useState('')
   const [username, setUserName] = useState("")
   const [role, setRole] = useState("USER")
   // const [userImage, setUserImage] = useState('')
   const [previewimageuser, setPreviewImageUser] = useState('')


   const handleClose = () => {
      setShow(false);
      setEmail('');
      setPassWord('');
      setUserName('');
      setRole('USER');
      // setUserImage('');
      props.setDataView({});

   }



   // Clean URL previewimage
   useEffect(() => {
      return () => {
         previewimageuser && URL.revokeObjectURL(previewimageuser)
      }
   }, [previewimageuser])


   // handle update data
   useEffect(() => {
      // check emty dataUpdate ( object) trước khi set  nếu ko lần đầu sẽ set undefined cho các state 
      if (!_.isEmpty(dataView)) {

         setEmail(dataView.email);
         setUserName(dataView.username);
         setRole(dataView.role)
         if (dataView.image) {
            setPreviewImageUser(dataView.image)
         } else { setPreviewImageUser('') }
      }
      // console.log(dataUpdate.role);
   }, [dataView])
   return (
      <>
         {/* <Button variant="primary" onClick={handleShow}>
            Launch static backdrop modal
         </Button> */}

         <Modal
            className='modal-section'
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size="xl"
         >
            <Modal.Header closeButton>
               <Modal.Title>View User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <Form >
                  <Row className="mb-3">
                     <Form.Group as={Col} md={6} controlId="formGridEmail" className='mb-3'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email}
                           onChange={(e) => setEmail(e.target.value)} disabled />
                        <Form.Control.Feedback type="invalid">
                           Invalid Email
                        </Form.Control.Feedback>
                     </Form.Group>
                     <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password}
                           onChange={(e) => setPassWord(e.target.value)} disabled />
                        <Form.Control.Feedback type="invalid">
                           Invalid Password
                        </Form.Control.Feedback>
                     </Form.Group>
                  </Row>

                  <Row className="mb-3">
                     <Form.Group as={Col} md={6} className='mb-3' controlId="formGridUserName">
                        <Form.Label>Username</Form.Label>
                        <Form.Control value={username}
                           onChange={(e) => setUserName(e.target.value)} disabled />
                        <Form.Control.Feedback type="invalid">
                           Invalid Username
                        </Form.Control.Feedback>
                     </Form.Group>


                     <Form.Group as={Col} controlId="formGridRole">
                        <Form.Label>Role</Form.Label>
                        <Form.Select value={role} onChange={(e) => setRole(e.target.value)} disabled>
                           <option>USER</option>
                           <option>ADMIN</option>
                        </Form.Select>
                     </Form.Group>

                  </Row>
                  {/* <Row>
                     <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="file" onChange={(e) => handleUploadImage(e)} />
                     </Form.Group>
                  </Row> */}
                  <Row>
                     <div className='img-section '>
                        {previewimageuser ? (<img src={previewimageuser} alt="preview " />) : (<span>Preview Image</span>)}

                     </div>
                  </Row>
               </Form>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={handleClose}>
                  Close
               </Button>
               {/* <Button variant="primary" onClick={handleSubmitUpdateUser}>Acept</Button> */}
            </Modal.Footer>
         </Modal>
      </>
   );
}


export default ModalViewUser