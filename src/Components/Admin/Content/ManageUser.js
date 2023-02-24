import ModalCreateUser from "./ModalCreateUser"
import './ManageUser.scss'
import { useState, useEffect } from "react"
import ListUser from "./ListUser";
import { getAllUser } from '../../../service/apiService'
function ManageUser() {
   const [showmodal, setShowModal] = useState(false);
   const [userList, setUserList] = useState([]);
   useEffect(() => {
      fetchAllUser();

   }, [])
   const fetchAllUser = async () => {
      let res = await getAllUser();

      if (res && res.EC === 0) {
         setUserList(res.DT)
      }

   }
   return (
      <div className="manageUser-container">
         <h2 className="title mb-3 mt-3">ManageUser</h2>
         <button className="btn-newuser btn btn-dark mb-3" onClick={() => setShowModal(true)}>Add New User</button>
         <ModalCreateUser
            show={showmodal}
            setShow={setShowModal}
            fetchAllUser={fetchAllUser}
         />
         <div className="list-user">
            <ListUser userList={userList} />
         </div>
      </div>
   )
}

export default ManageUser