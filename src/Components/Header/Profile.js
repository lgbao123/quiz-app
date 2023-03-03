
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import History from './History';
import ProfileUser from './ProfileUser';
import ResetPassword from './ResetPassword';
function Profile(props) {
   const { show, setShow } = props;
   const handleClose = () => setShow(false);
   const [isUpdate, setIsUpdate] = useState(false);
   const [isUpdatePass, setIsUpdatePass] = useState(false);
   const [key, setKey] = useState('Profile');
   const handleSubmit = () => {
      if (key === 'Profile') {
         setIsUpdate(true)
      }
      if (key === 'ResetPassword') {
         setIsUpdatePass(true)
      }
   }
   return (
      <>
         <Modal show={show} onHide={handleClose} size='lg' centered>
            <Modal.Header closeButton>
               <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <Tabs
                  id="controlled-tab-example"
                  activeKey={key}
                  onSelect={(k) => setKey(k)}
                  className="mb-3"
               >
                  <Tab eventKey="Profile" title="Profile">
                     <ProfileUser isUpdate={isUpdate} setIsUpdate={setIsUpdate} handleClose={handleClose} />
                  </Tab>
                  <Tab eventKey="ResetPassword" title="Reset Password">
                     <ResetPassword isUpdatePass={isUpdatePass} setIsUpdatePass={setIsUpdatePass} handleClose={handleClose} />
                  </Tab>
                  <Tab eventKey="History" title="History">
                     <History />
                  </Tab>

               </Tabs>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={handleClose}>
                  Close
               </Button>
               <Button variant="primary" onClick={handleSubmit}>
                  Save Changes
               </Button>
            </Modal.Footer>
         </Modal>
      </>
   )
}

export default Profile