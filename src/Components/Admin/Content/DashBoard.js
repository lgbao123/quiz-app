import ModalCreateUser from "./ModalCreateUser"


function DashBoard() {
   return (
      <div className="dashboard-container">
         <div className="title">Dashboard</div>
         <div className="btn-newuser"><ModalCreateUser /></div>
         <div className="list-user">Table</div>
      </div>
   )
}

export default DashBoard