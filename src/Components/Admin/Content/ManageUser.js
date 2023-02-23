import ModalCreateUser from "./ModalCreateUser"
import './ManageUser.scss'

function ManageUser() {
   return (
      <div className="manageUser-container">
         <div className="title">ManageUser</div>
         <div className="btn-newuser"><ModalCreateUser /></div>
         <div className="list-user">Table</div>
      </div>
   )
}

export default ManageUser