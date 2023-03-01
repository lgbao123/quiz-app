import React from 'react'
import { deleteQuiz } from '../../../../service/apiService';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import _ from 'lodash'
import { toast } from 'react-toastify';
function ModalDeleteQuiz(props) {
   const { show, setShow, dataDelete } = props;

   const handleClose = () => {
      setShow(false);
      props.setDataDelete({});

   }
   const handleSubmitDelete = async () => {
      if (!_.isEmpty(dataDelete)) {
         let res = await deleteQuiz(dataDelete.id);
         if (res && res.EC === 0) {
            toast.success(res.EM);
            handleClose();
            await props.fetchListQuiz();
         }
         if (res && res.EC !== 0) {
            toast.error(res.EM);

         }
      }
      return
   }
   return (
      <>

         <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
               <Modal.Title>Delete Quiz</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure to delete <b>{dataDelete?.name}</b> ?</Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={handleClose}>
                  Close
               </Button>
               <Button variant="primary" onClick={() => handleSubmitDelete()}>
                  Comfirm
               </Button>
            </Modal.Footer>
         </Modal>
      </>
   );
}

export default ModalDeleteQuiz