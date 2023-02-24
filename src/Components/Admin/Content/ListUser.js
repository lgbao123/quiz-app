import React, { useEffect, useState } from 'react'
import { getAllUser } from '../../../service/apiService'
function ListUser() {
   const [userList, setUserList] = useState([]);
   useEffect(() => {
      fetchAllUser();
      console.log(userList);
   }, [])
   const fetchAllUser = async () => {
      let res = await getAllUser();

      if (res && res.EC === 0) {
         setUserList(res.DT)
      }

   }
   console.log('render');
   return (
      <>

         <table className="table table-hover table-bordered table-responsive ">
            <thead className="text-light bg-dark">
               <tr>
                  <th scope="col" className='col-1'>No</th>
                  <th scope="col" className='col-2.5'>Username</th>
                  <th scope="col" className='col-4'>Email</th>
                  <th scope="col" className='col-1.5'>Role</th>
                  <th scope="col" className='col-2'>Action</th>
               </tr>
            </thead>
            <tbody>
               {userList && userList.length > 0 && userList.map((element, index) => {
                  return (
                     <tr key={`data-user-${index}`}>
                        <th scope="row">{index + 1}</th>
                        <td>{element.username}</td>
                        <td>{element.email}</td>
                        <td>{element.role}</td>
                        <td className='d-flex mb-1' >
                           <button type="button" className="flex-fill me-1 btn btn-primary ">View</button>
                           <button type="button" className="flex-fill me-1 btn btn-info ">Update</button>
                           <button type="button" className="flex-fill me-1 btn btn-danger">Delete</button>
                        </td>
                     </tr>)
               })}

               {/* <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
               </tr>
               <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
               </tr> */}
            </tbody>
         </table>


      </>

   )
}

export default ListUser