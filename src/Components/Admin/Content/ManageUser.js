import ModalCreateUser from "./ModalCreateUser"
import './ManageUser.scss'
import { useState } from "react"

function ManageUser() {
   const [showmodal, setShowModal] = useState(false);
   return (
      <div className="manageUser-container">
         <div className="title">ManageUser</div>
         <button className="btn-newuser btn btn-dark" onClick={() => setShowModal(true)}>Add New User</button>
         <ModalCreateUser show={showmodal} setShow={setShowModal} />
         <div className="list-user">Table</div>
      </div>
   )
}

export default ManageUser