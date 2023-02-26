import React, { useEffect, useState } from 'react'
import "./Login.scss"
import { useNavigate } from "react-router-dom"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { postRegister } from '../../service/apiService'
import { toast } from 'react-toastify';
function Register() {
   const [email, setEmail] = useState('')
   const [username, setUserName] = useState('');
   const [password, setPassword] = useState('');
   const [isValidEmail, setIsValidEmail] = useState(false);
   const [isValidUsername, setIsvalidUsername] = useState(false);
   const [isValidPassword, setIsvalidPassword] = useState(false);
   const [isShowPass, setIsShowPass] = useState(false);
   const [isFirst, setIsFirst] = useState(true);

   const navigate = useNavigate();
   const validateEmail = (mail) => {
      //eslint-disable-next-line
      if ((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(mail)) {
         return (true)
      }
      return (false)
   }
   const checkPassword = (inputtxt) => {
      //[6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter]
      //eslint-disable-next-line
      var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
      if (inputtxt.match(passw)) {
         return true;
      } else {
         return false;
      }
   }
   const handleSubmitRegister = async () => {
      // validate 
      setIsFirst(false);
      if (isValidEmail && isValidPassword && isValidUsername) {
         // call api

         let res = await postRegister(email, password, username);
         if (res && res.EC === 0) {
            toast.success(res.EM);
            navigate("/login");
         }
         if (res && res.EC !== 0) {
            toast.error(res.EM);
         }
         // alert('ok')
      }
      return
   }
   useEffect(() => {
      validateEmail(email) ? setIsValidEmail(true) : setIsValidEmail(false)
      checkPassword(password) ? setIsvalidPassword(true) : setIsvalidPassword(false)
      username.length >= 3 ? setIsvalidUsername(true) : setIsvalidUsername(false);
   }, [email, username, password])

   return (

      <div className="container-fluid vh-100 bg-light login-container">
         <div className="row  no-gutter">
            {/* <div className="col-md-6 d-none d-md-flex bg-image"></div> */}
            <div className="col-12 py-3 px-md-5 px-0 d-flex gap-3 align-items-center justify-content-around justify-content-md-end header">
               <p className='my-0 col-6 text-md-end text-muted'>Already have an account?</p>
               <button className='btn btn-dark px-4 py-1  rounded' onClick={() => navigate('/login')}>Log in</button>
            </div>
            <div className="col-md-6 col-xxl-4 mx-auto bg-light">
               <div className="login d-flex align-items-center py-5">
                  <div className="container">
                     <div className="row">
                        <div className="col-lg-10 col-xl-10 mx-auto">
                           <h3 className="display-6 text-center my-5"> Register page!</h3>
                           <p className="text-muted my-5 text-center">Hello, who’s this?</p>

                           <form>

                              <div className="mb-4 form-group">
                                 <label htmlFor="inputEmail" className="form-label ">Email</label>
                                 <input id="inputEmail" type="email" placeholder="Email address"
                                    autoFocus className={isValidEmail || isFirst ? "form-control rounded shadow-sm px-4" :
                                       "form-control is-invalid rounded shadow-sm px-4"}
                                    value={email} onChange={(e) => setEmail(e.target.value)}
                                 />
                                 <div className="invalid-feedback ms-3">
                                    Invalid Email
                                 </div>
                              </div>
                              <div className="mb-4 form-group password-register">
                                 <label htmlFor="inputPassword" className="form-label ">Password</label>
                                 <input id="inputPassword" type={isShowPass ? 'text' : 'password'} placeholder="Password"
                                    className={isValidPassword || isFirst ? "form-control rounded  shadow-sm px-4 " : "form-control rounded is-invalid shadow-sm px-4 "}
                                    value={password} onChange={(e) => setPassword(e.target.value)}
                                 />
                                 {isShowPass ? (
                                    <span className='icon-eye' onClick={() => setIsShowPass(false)}>
                                       <AiOutlineEyeInvisible />
                                    </span>) : (
                                    <span className='icon-eye' onClick={() => setIsShowPass(true)}>
                                       <AiOutlineEye />
                                    </span>)}
                                 <div className="invalid-feedback ms-3">
                                    6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter
                                 </div>

                              </div>
                              <div className="mb-3 form-group">
                                 <label htmlFor="inputUsername" className="form-label ">Username</label>
                                 <input id="inputUsername" type="text" placeholder="Username"
                                    autoFocus className={isValidUsername || isFirst ? "form-control rounded shadow-sm px-4" :
                                       "form-control is-invalid rounded shadow-sm px-4"}
                                    value={username} onChange={(e) => setUserName(e.target.value)}
                                 />
                                 <div className="invalid-feedback ms-3">
                                    Username must be more than 3 characters
                                 </div>
                              </div>
                              {/* <div className="form-check my-3">
                                 <input id="customCheck1" type="checkbox" className="form-check-input" />
                                 <label for="customCheck1" className="form-check-label">Remember password</label>
                              </div> */}
                              <p className='btn-back text-muted' >Forgot password? </p>
                              <div className="d-grid gap-2 my-5">
                                 <button type="button"
                                    className="btn btn-dark btn-block text-uppercase mb-2 rounded-pill shadow-sm"
                                    onClick={handleSubmitRegister}
                                 >Create account</button>
                              </div>
                              <p className='btn-back' onClick={() => navigate('/')}>&#60;&#60; Back to Homepage </p>
                           </form>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div >
      </div >

   )
}

export default Register;