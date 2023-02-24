import ModalCreateUser from "./ModalCreateUser"
import './ManageUser.scss'
import { useState } from "react"
import ListUser from "./ListUser";

function ManageUser() {
   const [showmodal, setShowModal] = useState(false);
   return (
      <div className="manageUser-container">
         <h2 className="title mb-3 mt-3">ManageUser</h2>
         <button className="btn-newuser btn btn-dark mb-3" onClick={() => setShowModal(true)}>Add New User</button>
         <ModalCreateUser show={showmodal} setShow={setShowModal} />
         <div className="list-user"><ListUser /></div>
      </div>
   )
}

export default ManageUser