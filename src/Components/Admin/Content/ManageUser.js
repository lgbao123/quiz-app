import ModalCreateUser from "./ModalCreateUser"
import './ManageUser.scss'
import { useState, useEffect } from "react"
import ListUser from "./ListUser";
import { getAllUser } from '../../../service/apiService'
import ModalUpdateUser from "./ModalUpdateUser";
function ManageUser() {
   const [showmodal, setShowModal] = useState(false);
   const [showmodalUpdateUser, setShowModalUpdateUser] = useState(false);
   const [userList, setUserList] = useState([]);
   const [dataUpdate, setDataUpdate] = useState({});
   useEffect(() => {
      fetchAllUser();

   }, [])
   const fetchAllUser = async () => {
      let res = await getAllUser();

      if (res && res.EC === 0) {
         setUserList(res.DT)
      }

   }
   const HandleClickModalUpdateUser = (user) => {
      // console.log(user);
      setDataUpdate(user)
      setShowModalUpdateUser(true);
   }
   return (
      <div className="manageUser-container">
         <h2 className="title mb-3 mt-3">ManageUser</h2>
         <button className="btn-newuser btn btn-dark mb-3" onClick={() => setShowModal(true)}>Add New User</button>
         <div className="list-user">
            <ListUser userList={userList}
               HandleClickModalUpdateUser={HandleClickModalUpdateUser}
            />
         </div>
         <ModalCreateUser
            show={showmodal}
            setShow={setShowModal}
            fetchAllUser={fetchAllUser}
         />
         <ModalUpdateUser
            show={showmodalUpdateUser}
            setShow={setShowModalUpdateUser}
            dataUpdate={dataUpdate}
            fetchAllUser={fetchAllUser}
            setDataUpdate={setDataUpdate}
         />
      </div>
   )
}

export default ManageUser