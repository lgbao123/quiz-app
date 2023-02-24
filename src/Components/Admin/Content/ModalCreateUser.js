import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { toast } from 'react-toastify';
import { postCreateNewUser } from '../../../service/apiService';
function ModalCreateUser(props) {
   const { show, setShow } = props;
   const [email, setEmail] = useState('')
   const [password, setPassWord] = useState('')
   const [username, setUserName] = useState('')
   const [role, setRole] = useState('USER')
   const [userImage, setUserImage] = useState('')
   const [previewimageuser, setPreviewImageUser] = useState('')

   const [isvalidemail, setIsValidEmail] = useState(true);
   const [isvalidpass, setIsValidPass] = useState(true);
   const [isvalidname, setIsValidName] = useState(true);

   const handleClose = () => {
      setShow(false);
      setEmail('');
      setPassWord('');
      setUserName('');
      setRole('USER');
      setUserImage('');

   }
   const handleUploadImage = (e) => {

      if (e.target && e.target.files && e.target.files[0]) {
         setPreviewImageUser(URL.createObjectURL(e.target.files[0]))
         setUserImage(e.target.files[0])
      }
   }
   const ValidateEmail = (mail) => {
      if ((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(mail)) {
         return (true)
      }
      return (false)
   }
   const CheckPassword = (inputtxt) => {
      //[6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter]
      var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
      if (inputtxt.value.match(passw)) {
         return true;
      } else {
         return false;
      }
   }
   const handleSubmitCreateUser = async () => {
      //validate
      if (isvalidemail && isvalidname && isvalidpass) {

         // Call API
         // Gửi ảnh dùng formdata , dùng object sẽ không gửi được file
         let data = await postCreateNewUser(email, password, username, role, userImage)

         if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
         }
         if (data && data.EC !== 0) {
            toast.error(data.EM);
         }

         console.log('COMPO', data);
      }
      return;
   }
   // Clean URL previewimage
   useEffect(() => {
      return () => {
         previewimageuser && URL.revokeObjectURL(previewimageuser)
      }
   }, [previewimageuser])

   // Handle Validate
   useEffect(() => {
      ValidateEmail(email) ? setIsValidEmail(true) : setIsValidEmail(false)
      password ? setIsValidPass(true) : setIsValidPass(false)
      username ? setIsValidName(true) : setIsValidName(false);
   }, [password, email, username])
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
               <Form >
                  <Row className="mb-3">
                     <Form.Group as={Col} md={6} controlId="formGridEmail" className='mb-3'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control isInvalid={!isvalidemail} isValid={isvalidemail} type="email" placeholder="Enter email" value={email}
                           onChange={(e) => setEmail(e.target.value)} />
                        <Form.Control.Feedback type="invalid">
                           Invalid Email
                        </Form.Control.Feedback>
                     </Form.Group>
                     <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control isInvalid={!isvalidpass} isValid={isvalidpass} type="password" placeholder="Password" value={password}
                           onChange={(e) => setPassWord(e.target.value)} />
                        <Form.Control.Feedback type="invalid">
                           Invalid Password
                        </Form.Control.Feedback>
                     </Form.Group>
                  </Row>

                  <Row className="mb-3">
                     <Form.Group as={Col} md={6} className='mb-3' controlId="formGridUserName">
                        <Form.Label>Username</Form.Label>
                        <Form.Control isInvalid={!isvalidname} isValid={isvalidname} value={username} onChange={(e) => setUserName(e.target.value)} />
                        <Form.Control.Feedback type="invalid">
                           Invalid Username
                        </Form.Control.Feedback>
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
                        {previewimageuser ? (<img src={previewimageuser} alt="preview " />) : (<span>Preview Image</span>)}

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