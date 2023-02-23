import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from 'axios'
function ModalCreateUser(props) {
   const { show, setShow } = props;

   const handleClose = () => {
      setShow(false);
      setEmail('');
      setPassWord('');
      setUserName('');
      setRole('USER');
      setUserImage('');

   }
   const [email, setEmail] = useState('')
   const [password, setPassWord] = useState('')
   const [username, setUserName] = useState('')
   const [role, setRole] = useState('USER')
   const [userImage, setUserImage] = useState('')
   const [previewimageuser, setPreviewImageUser] = useState('')
   const handleUploadImage = (e) => {

      if (e.target && e.target.files && e.target.files[0]) {
         setPreviewImageUser(URL.createObjectURL(e.target.files[0]))
         setUserImage(e.target.files[0])
      }
   }
   const handleSubmitCreateUser = async () => {
      //validate

      // Call API

      const data = new FormData()
      data.append("email", email)
      data.append("password", password)
      data.append("username", username)
      data.append("role", role)
      data.append("userImage", userImage)
      // console.log([...data]);
      let res = await axios.post('http://localhost:8081/api/v1/participant', data)
   }
   // Clean URL previewimage
   useEffect(() => {
      return () => {
         previewimageuser && URL.revokeObjectURL(previewimageuser)
      }
   }, [previewimageuser])

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
               <Modal.Title>Add New User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <Form>
                  <Row className="mb-3">
                     <Form.Group as={Col} md={6} controlId="formGridEmail" className='mb-3'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                     </Form.Group>

                     <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassWord(e.target.value)} />
                     </Form.Group>
                  </Row>


                  <Row className="mb-3">
                     <Form.Group as={Col} md={6} className='mb-3' controlId="formGridUserName">
                        <Form.Label>Username</Form.Label>
                        <Form.Control value={username} onChange={(e) => setUserName(e.target.value)} />
                     </Form.Group>

                     <Form.Group as={Col} controlId="formGridRole">
                        <Form.Label>Role</Form.Label>
                        <Form.Select defaultValue={role} onChange={(e) => setRole(e.target.value)}>
                           <option>USER</option>
                           <option>ADMIN</option>
                        </Form.Select>
                     </Form.Group>

                  </Row>
                  <Row>
                     <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="file" onChange={(e) => handleUploadImage(e)} />
                     </Form.Group>
                  </Row>
                  <Row>
                     <div className='img-section '>
                        {previewimageuser ? (<img src={previewimageuser} alt="search engine image" />) : (<span>Preview Image</span>)}

                     </div>
                  </Row>
               </Form>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={handleClose}>
                  Close
               </Button>
               <Button variant="primary" onClick={handleSubmitCreateUser}>Acept</Button>
            </Modal.Footer>
         </Modal>
      </>
   );
}


export default ModalCreateUser