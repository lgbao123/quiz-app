import React from 'react'
import ReactPaginate from 'react-paginate';
function ListUser(props) {
   const { userList } = props
   const handlePageClick = (event) => {
      props.setPage(+event.selected + 1)
      console.log(
         `User requested page number ${event.selected}`
      );

   };

   return (
      <>
         <div className='table-user  '>
            <table className="table table-hover table-bordered table-responsive ">
               <thead className="text-light bg-dark">
                  <tr>
                     <th scope="col" className='col-0.5'>No</th>
                     <th scope="col" className='col-1.5'>Username</th>
                     <th scope="col" className='col-5'>Email</th>
                     <th scope="col" className='col-2'>Role</th>
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
                              <button type="button"
                                 className="flex-fill me-1 btn btn-primary "
                                 onClick={() => props.HandleClickModalViewUser(element)}
                              >View</button>
                              <button type="button"
                                 className="flex-fill me-1 btn btn-info "
                                 onClick={() => props.HandleClickModalUpdateUser(element)}
                              >Update</button>
                              <button type="button"
                                 className="flex-fill me-1 btn btn-danger"
                                 onClick={() => props.HandleClickModalDeleteUser(element)}
                              >Delete</button>
                           </td>
                        </tr>)
                  })}
                  {userList && userList.length === 0 && (
                     <tr>
                        <td colSpan="5">Not Found Data </td>
                        {/* <td ></td> */}
                     </tr>
                  )
                  }

               </tbody>
            </table>
         </div>



         <div className='d-flex justify-content-center'>

            <ReactPaginate
               nextLabel="next >"
               onPageChange={handlePageClick}
               pageRangeDisplayed={3}
               marginPagesDisplayed={2}
               pageCount={props.pagecount}
               previousLabel="< prev"
               pageClassName="page-item"
               pageLinkClassName="page-link"
               previousClassName="page-item"
               previousLinkClassName="page-link"
               nextClassName="page-item"
               nextLinkClassName="page-link"
               breakLabel="..."
               breakClassName="page-item"
               breakLinkClassName="page-link"
               containerClassName="pagination"
               activeClassName="active"
               renderOnZeroPageCount={null}
               forcePage={props.page - 1}
            />
         </div>



      </>

   )
}

export default ListUser