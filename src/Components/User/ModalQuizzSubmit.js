import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import _ from 'lodash'

function ModalQuizzSubmit(props) {
   const { show, setShow } = props;

   const handleClose = () => {
      setShow(false);
      // props.setDataDelete({});

   }

   return (
      <>

         <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
               <Modal.Title>Submit Quiz</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               Are you sure ?
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={handleClose}>
                  Close
               </Button>
               <Button variant="primary" onClick={() => props.handleFinish()}>
                  Comfirm
               </Button>
            </Modal.Footer>
         </Modal>
      </>
   );
}

export default ModalQuizzSubmit