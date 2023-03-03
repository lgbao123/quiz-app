import React, { useEffect, useState } from 'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { toast } from 'react-toastify';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { postUpdatePassword } from '../../service/apiService';
function ResetPassword(props) {
   const { isUpdatePass, setIsUpdatePass } = props
   const [oldPass, setOldPass] = useState('');
   const [newPass, setNewPass] = useState('');
   const [confirmPass, setConfirmPass] = useState('');
   const [isvalidOldPass, setIsValidOldPass] = useState(false);
   const [isvalidNewPass, setIsValidNewPass] = useState(false);
   const [isvalidConfirmPass, setIsValidConfirmPass] = useState(false);
   const [isShowOldPass, setIsShowOldPass] = useState(false);
   const [isShowNewPass, setIsShowNewPass] = useState(false);
   const [isShowConfirmPass, setIsShowConfirmPass] = useState(false);
   const [isFirst, setIsFirst] = useState(true);
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
   const handleUpdatPassword = async () => {
      setIsFirst(false);
      if (isvalidNewPass && isvalidOldPass && isvalidConfirmPass) {

         let res = await postUpdatePassword(oldPass, newPass);
         if (res && res.EC === 0) {
            toast.success(res.EM);
            setIsFirst(true);
            props.handleClose();
         } else {

            toast.error(res.EM);
         }
      }
   }
   //validate
   useEffect(() => {

      checkPassword(oldPass) ? setIsValidOldPass(true) : setIsValidOldPass(false)
      checkPassword(newPass) ? setIsValidNewPass(true) : setIsValidNewPass(false)
      newPass === confirmPass ? setIsValidConfirmPass(true) : setIsValidConfirmPass(false)

   }, [oldPass, newPass, confirmPass])
   useEffect(() => {
      if (isUpdatePass) {
         handleUpdatPassword();
         setIsUpdatePass(false);
      }
   }, [isUpdatePass])
   return (
      <Form >
         <Row className="mb-3">
            <Form.Group className='password-create-user' as={Col} controlId="formGridPassword1">
               <Form.Label>Old Password</Form.Label>
               <Form.Control isInvalid={isFirst ? false : !isvalidOldPass} type={isShowOldPass ? "text" : "password"} value={oldPass}
                  onChange={(e) => setOldPass(e.target.value)} />
               {isShowOldPass ? (
                  <span className='icon-eye' onClick={() => setIsShowOldPass(false)}>
                     <AiOutlineEyeInvisible />
                  </span>) : (
                  <span className='icon-eye' onClick={() => setIsShowOldPass(true)}>
                     <AiOutlineEye />
                  </span>)}
               <Form.Control.Feedback type="invalid">
                  6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter
               </Form.Control.Feedback>
            </Form.Group>
         </Row>
         <Row className="mb-3">
            <Form.Group className='password-create-user' as={Col} controlId="formGridPassword2">
               <Form.Label>New Password</Form.Label>
               <Form.Control isInvalid={isFirst ? false : !isvalidNewPass} type={isShowNewPass ? "text" : "password"} value={newPass}
                  onChange={(e) => setNewPass(e.target.value)} />
               {isShowNewPass ? (
                  <span className='icon-eye' onClick={() => setIsShowNewPass(false)}>
                     <AiOutlineEyeInvisible />
                  </span>) : (
                  <span className='icon-eye' onClick={() => setIsShowNewPass(true)}>
                     <AiOutlineEye />
                  </span>)}
               <Form.Control.Feedback type="invalid">
                  6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter
               </Form.Control.Feedback>
            </Form.Group>
         </Row>
         <Row className="mb-3">
            <Form.Group className='password-create-user' as={Col} controlId="formGridPassword3">
               <Form.Label>Confirm Password</Form.Label>
               <Form.Control isInvalid={isFirst ? false : !isvalidConfirmPass} type={isShowConfirmPass ? "text" : "password"} value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)} />
               {isShowConfirmPass ? (
                  <span className='icon-eye' onClick={() => setIsShowConfirmPass(false)}>
                     <AiOutlineEyeInvisible />
                  </span>) : (
                  <span className='icon-eye' onClick={() => setIsShowConfirmPass(true)}>
                     <AiOutlineEye />
                  </span>)}
               <Form.Control.Feedback type="invalid">
                  Password must be same
               </Form.Control.Feedback>
            </Form.Group>
         </Row>

      </Form>
   )
}

export default ResetPassword