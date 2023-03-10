import axios from "../utils/axiosCustomize";
const postCreateNewUser = (email, password, username, role, userImage) => {
   const data = new FormData()
   data.append("email", email)
   data.append("password", password)
   data.append("username", username)
   data.append("role", role)
   data.append("image", userImage)
   return axios.post('api/v1/participant', data)
}
const getAllUser = () => {
   return axios.get('api/v1/participant/')
}
const putUpdateUser = (id, username, role, userImage) => {
   const data = new FormData()
   data.append("id", id)
   data.append("username", username)
   data.append("role", role)
   if (userImage) data.append("image", userImage)

   return axios.put('api/v1/participant', data)
}
const deleteUser = (id) => {
   return axios.delete('api/v1/participant', { "data": { id } })
   // return axios.delete('api/v1/participant', { "id": id })
}
const getUserWithPaginate = (page, limit) => {
   return axios.get(`api/v1/participant?page=${page}&limit=${limit}`)
}
// const postLoign = (email, password) => {
//    return axios.post(`api/v1/login`, { email, password })
// }
const postLoign = (email, password) => {
   return axios.post(`api/v1/auth/login`, { email, password })
}
const postRegister = (email, password, username) => {
   return axios.post(`api/v1/auth/register`, { email, password, username })
}
const getQuizzByUser = () => {
   return axios.get(`api/v1/quiz-by-participant`)
}
const getQuestionById = (id) => {
   // return axios.get(`api/v1/questions-by-quiz?quizId=${id}`)
   return axios.get(`api/v1/quiz-with-qa/${id}`)
}
const postSubmitAnswers = (data) => {
   return axios.post(`api/v1/quiz-submit`, { ...data })
}
const getAllQuiz = () => {
   return axios.get(`api/v1/quiz/all`)
}
const getQuizById = (id) => {
   return axios.get(`api/v1/quiz/${id}`)
}
const postAddQuiz = (description, name, difficulty, quizImage, time) => {
   const data = new FormData()
   data.append("description", description)
   data.append("name", name)
   data.append("type", difficulty)
   data.append("image", quizImage)
   data.append("time", time)
   return axios.post(`api/v1/quiz`, data)
}
const putUpdateQuiz = (id, description, name, difficulty, quizImage, time) => {
   const data = new FormData()
   data.append("id", id)
   data.append("description", description)
   data.append("name", name)
   data.append("type", difficulty)
   if (quizImage) data.append("image", quizImage)
   data.append("time", time)
   return axios.put(`api/v1/quiz`, data)
}
const deleteQuiz = (id) => {
   return axios.delete(`api/v1/quiz/${id}`)
}
const postCreateNewQuetion = (quiz_id, description, questionImage) => {
   const data = new FormData()
   data.append("quizId", quiz_id)
   data.append("description", description)
   data.append("image", questionImage)
   return axios.post(`api/v1/question`, data)
}
const postCreateNewAnswer = (description, correct_answer, question_id) => {
   return axios.post(`api/v1/answer`, { description, correct_answer, questionId: question_id })
}
const getQuizWithQA = (idQuiz) => {
   return axios.get(`api/v1/quiz-with-qa/${idQuiz}`)
}
const postUpSertQuizWithQA = (data) => {
   return axios.post('api/v1/quiz-upsert-qa', { ...data });
}
const postAssignQuizUser = (quizId, userId) => {
   return axios.post('api/v1/quiz-assign-to-user', { quizId, userId });
}
const postLogout = (email, refresh_token) => {
   return axios.post('api/v1/auth/logout', { email, refresh_token });
}
const getDashboard = () => {
   return axios.get('api/v1/participant/overview');
}
const postUpdateProfile = (username, userImage) => {
   const data = new FormData()
   data.append("username", username)
   data.append("userImage", userImage)

   return axios.post(`api/v1/auth/update-profile`, data)
}
const postUpdatePassword = (current_password, new_password) => {


   return axios.post(`api/v1/participant/change-password`, { current_password, new_password })
}
export {
   postCreateNewUser, getAllUser, putUpdateUser, deleteUser,
   getUserWithPaginate, postLoign, postRegister, getQuizzByUser, getQuestionById,
   postSubmitAnswers, getAllQuiz, postAddQuiz, putUpdateQuiz, deleteQuiz,
   postCreateNewQuetion, postCreateNewAnswer, getQuizWithQA, postUpSertQuizWithQA, postAssignQuizUser, postLogout,
   getDashboard, postUpdateProfile, postUpdatePassword, getQuizById
}