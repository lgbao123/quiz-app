import axios from "../utils/axiosCustomize";
const postCreateNewUser = (email, password, username, role, userImage) => {
   const data = new FormData()
   data.append("email", email)
   data.append("password", password)
   data.append("username", username)
   data.append("role", role)
   data.append("userImage", userImage)
   return axios.post('api/v1/participant', data)
}
const getAllUser = () => {
   return axios.get('api/v1/participant/all')
}
const putUpdateUser = (id, username, role, userImage) => {
   const data = new FormData()
   data.append("id", id)
   data.append("username", username)
   data.append("role", role)
   data.append("userImage", userImage)
   return axios.put('api/v1/participant', data)
}
const deleteUser = (id) => {
   return axios.delete('api/v1/participant', { "data": { "id": id } })
}
const getUserWithPaginate = (page, limit) => {
   return axios.get(`api/v1/participant?page=${page}&limit=${limit}`)
}
export { postCreateNewUser, getAllUser, putUpdateUser, deleteUser, getUserWithPaginate }