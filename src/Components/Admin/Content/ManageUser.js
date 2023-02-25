import ModalCreateUser from "./ModalCreateUser"
import './ManageUser.scss'
import { useState, useEffect } from "react"
import ListUser from "./ListUser";
import { getAllUser } from '../../../service/apiService'
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";
function ManageUser() {
   const [showmodal, setShowModal] = useState(false);
   const [showmodalUpdateUser, setShowModalUpdateUser] = useState(false);
   const [showmodalViewUser, setShowModalViewUser] = useState(false);
   const [showmodalDeleteUser, setShowModalDeleteUser] = useState(false);
   const [userList, setUserList] = useState([]);
   const [dataUpdate, setDataUpdate] = useState({});
   const [dataView, setDataView] = useState({});
   const [dataDelete, setDataDelete] = useState({});
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
   const HandleClickModalViewUser = (user) => {
      // console.log(user);
      setDataView(user)
      setShowModalViewUser(true);
   }
   const HandleClickModalDeleteUser = (user) => {
      // console.log(user);
      setDataDelete(user)
      setShowModalDeleteUser(true);
   }
   return (
      <div className="manageUser-container">
         <h2 className="title mb-3 mt-3">ManageUser</h2>
         <button className="btn-newuser btn btn-dark mb-3" onClick={() => setShowModal(true)}>Add New User</button>
         <div className="list-user">
            <ListUser userList={userList}
               HandleClickModalUpdateUser={HandleClickModalUpdateUser}
               HandleClickModalViewUser={HandleClickModalViewUser}
               HandleClickModalDeleteUser={HandleClickModalDeleteUser}
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
         <ModalViewUser
            show={showmodalViewUser}
            setShow={setShowModalViewUser}
            dataView={dataView}
            setDataView={setDataView}
         />
         <ModalDeleteUser
            show={showmodalDeleteUser}
            setShow={setShowModalDeleteUser}
            dataDelete={dataDelete}
            setDataDelete={setDataDelete}
            fetchAllUser={fetchAllUser}
         />
      </div>
   )
}

export default ManageUser