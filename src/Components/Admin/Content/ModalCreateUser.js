import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
function ModalCreateUser() {
   const [show, setShow] = useState(false);

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

   return (
      <>
         <Button variant="primary" onClick={handleShow}>
            Launch static backdrop modal
         </Button>

         <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size="lg"
         >
            <Modal.Header closeButton>
               <Modal.Title>Add New User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <Form>
                  <Row className="mb-3">
                     <Form.Group as={Col} md={6} controlId="formGridEmail" className='mb-3'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                     </Form.Group>

                     <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                     </Form.Group>
                  </Row>


                  <Row className="mb-3">
                     <Form.Group as={Col} md={6} className='mb-3' controlId="formGridUserName">
                        <Form.Label>Username</Form.Label>
                        <Form.Control />
                     </Form.Group>

                     <Form.Group as={Col} controlId="formGridRole">
                        <Form.Label>Role</Form.Label>
                        <Form.Select defaultValue="Choose...">
                           <option>User</option>
                           <option>Admin</option>
                        </Form.Select>
                     </Form.Group>

                  </Row>
                  <Row>
                     <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="file" />
                     </Form.Group>
                  </Row>
               </Form>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={handleClose}>
                  Close
               </Button>
               <Button variant="primary">Understood</Button>
            </Modal.Footer>
         </Modal>
      </>
   );
}


export default ModalCreateUser