import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import _ from 'lodash'

function ModalQuizzResult(props) {
   const { show, setShow, dataResultModal } = props;

   const handleClose = () => {
      setShow(false);
      // props.setDataDelete({});

   }

   return (
      <>

         <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
               <Modal.Title>Result</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <p>Correct : <b>{dataResultModal && dataResultModal.countCorrect}</b> </p>
               <p>Total : <b>{dataResultModal && dataResultModal.countTotal}</b> </p>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={handleClose}>
                  Close
               </Button>
               <Button variant="primary" onClick={handleClose}>
                  Comfirm
               </Button>
            </Modal.Footer>
         </Modal>
      </>
   );
}

export default ModalQuizzResult