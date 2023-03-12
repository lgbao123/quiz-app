import React, { useEffect, useState } from 'react'
import "./Login.scss"
import { useNavigate } from "react-router-dom"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { FaSpinner } from "react-icons/fa"
import { postLoign } from '../../service/apiService'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux'
import { doLogin } from '../../redux/action/userAction'
import Language from '../Header/Language'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { getBase64ImageFromUrl } from '../../utils/utils'
function Login() {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('');
   const [isValidEmail, setIsValidEmail] = useState(false);
   const [isShowPass, setIsShowPass] = useState(false);
   const [isFirst, setIsFirst] = useState(true);
   const [isLoading, setIsLoading] = useState(false);
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const validateEmail = (mail) => {
      //eslint-disable-next-line
      if ((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(mail)) {
         return (true)
      }
      return (false)
   }
   const handleSubmitLogin = async () => {
      //validate 
      setIsFirst(false);
      if (isValidEmail) {
         //call api
         setIsLoading(true);
         let res = await postLoign(email, password);
         console.log(res);
         if (res && res.EC === 0) {
            res.DT.image = await getBase64ImageFromUrl(res.DT.image)
               .then(result => {
                  return (result.split(',')[1])

               })
               .catch(err => console.error(err));
            dispatch(doLogin(res));
            toast.success(res.EM);
            setIsLoading(false);
            navigate("/");


         }
         if (res && res.EC !== 0) {
            res.EM = Array.isArray(res.EM) ? res.EM[0] : res.EM
            setIsLoading(false);
            toast.error(res.EM);
         }
      }
      return
   }
   useEffect(() => {
      validateEmail(email) ? setIsValidEmail(true) : setIsValidEmail(false)

   }, [email])
   return (
      <PerfectScrollbar>
         <div className="container-fluid vh-100 bg-light login-container">
            <div className="row  no-gutter">
               {/* <div className="col-md-6 d-none d-md-flex bg-image"></div> */}
               <div className="col-12 py-3 px-md-5 px-0 d-flex gap-3 align-items-center justify-content-around justify-content-md-end header">
                  <p className='my-0 col-6 text-md-end text-muted'>Don't have an account yet?</p>
                  <div className='d-flex gap-md-3 flex-column-reverse flex-sm-row gap-2  align-items-center'>
                     <button className='btn btn-dark px-4 py-1  rounded' onClick={() => navigate('/register')}>Sign up</button>
                     {/* <div className=''><Language /></div> */}
                  </div>
               </div>
               <div className="col-md-6 col-xxl-4 mx-auto bg-light">
                  <div className="login d-flex align-items-center py-5">
                     <div className="container">
                        <div className="row">
                           <div className="col-lg-10 col-xl-10 mx-auto">
                              <h3 className="display-6 text-center my-5"> Login page!</h3>
                              <p className="text-muted my-5 text-center">Hello, who’s this?</p>

                              <form>

                                 <div className="mb-3 form-group">
                                    <input id="inputEmail" type="email" placeholder="Email address"
                                       autoFocus className={isValidEmail || isFirst ? "form-control rounded-pill shadow-sm px-4" :
                                          "form-control is-invalid rounded-pill shadow-sm px-4"}
                                       value={email} onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <div className="invalid-feedback ms-3">
                                       Invalid Email
                                    </div>
                                 </div>
                                 <div className="mb-3 form-group password">

                                    <input id="inputPassword" type={isShowPass ? 'text' : 'password'} placeholder="Password"
                                       className="form-control rounded-pill  shadow-sm px-4 "
                                       value={password} onChange={(e) => setPassword(e.target.value)}
                                    />
                                    {isShowPass ? (
                                       <span className='icon-eye' onClick={() => setIsShowPass(false)}>
                                          <AiOutlineEyeInvisible />
                                       </span>) : (
                                       <span className='icon-eye' onClick={() => setIsShowPass(true)}>
                                          <AiOutlineEye />
                                       </span>)}


                                 </div>
                                 {/* <div className="form-check my-3">
                                 <input id="customCheck1" type="checkbox" className="form-check-input" />
                                 <label for="customCheck1" className="form-check-label">Remember password</label>
                              </div> */}
                                 {/* <p className='btn-back text-muted' >Forgot password? </p> */}
                                 <div className="d-grid gap-2 my-5">
                                    <button disabled={isLoading} type="button"
                                       className="btn btn-login btn-dark btn-block text-uppercase mb-2 rounded-pill shadow-sm"
                                       onClick={handleSubmitLogin}
                                    >  {isLoading && <FaSpinner className='spinner' />}

                                       <span >Log in </span></button>
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
      </PerfectScrollbar>
   )
}

export default Login