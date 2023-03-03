import React, { useEffect, useState } from 'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { doLogin, doUpdateProfile } from '../../redux/action/userAction';
import { postUpdateProfile } from '../../service/apiService';
import { getBase64 } from '../../utils/utils';
function ProfileUser(props) {
   const [isFirst, setIsFirst] = useState(true);
   const [isvalidname, setIsValidName] = useState(false);
   const account = useSelector(state => state.user.account);
   const [username, setUserName] = useState('');
   const [email, setEmail] = useState('');
   const [userImage, setUserImage] = useState('');
   const dispatch = useDispatch();
   // console.log(account);
   // const username = useSelector((state) => state.user.username)
   // const image = useSelector((state) => state.user.image)
   const [previewimageuser, setPreviewImageUser] = useState('');
   const { isUpdate, setIsUpdate } = props
   const handleUploadImage = async (e) => {

      if (e.target && e.target.files && e.target.files[0]) {
         const img = await getBase64(e.target.files[0]);
         const base64result = img.split(',')[1];
         setPreviewImageUser(base64result);
         setUserImage(e.target.files[0])
      }
   }
   const handleUpdateProfile = async () => {
      setIsFirst(false);
      if (isvalidname) {
         let res = await postUpdateProfile(username, userImage);
         if (res && res.EC === 0) {
            toast.success(res.EM);
            setIsFirst(true);

            const newAccount = {
               ...account,
               username: username,
               image: previewimageuser

            }
            // console.log(newAccount);
            dispatch(doUpdateProfile(newAccount));
            props.handleClose();

         } else {
            toast.error(res.EM);
         }
      }
   }
   useEffect(() => {
      // setPreviewImageUser(URL.createObjectURL(userImage))
      setUserName(account.username);
      setPreviewImageUser(account.image);
      setEmail(account.email)
   }, [account])
   //clean up
   useEffect(() => {
      return () => {
         previewimageuser && URL.revokeObjectURL(previewimageuser)
      }
   }, [previewimageuser])
   //validate
   useEffect(() => {
      username.length >= 3 ? setIsValidName(true) : setIsValidName(false);
   }, [username])
   useEffect(() => {
      if (isUpdate) {
         handleUpdateProfile();
         setIsUpdate(false);
      }
   }, [isUpdate])
   return (
      <Form >


         <Row className="mb-3">
            <Form.Group as={Col} md={6} className='mb-3' controlId="formGridUserName">
               <Form.Label>Username</Form.Label>
               <Form.Control isInvalid={isFirst ? false : !isvalidname} value={username} onChange={(e) => setUserName(e.target.value)} />
               <Form.Control.Feedback type="invalid">
                  Username must be more than 3 characters
               </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md={6} controlId="formGridEmail" className='mb-3'>
               <Form.Label>Email</Form.Label>
               <Form.Control type="email" placeholder="Enter email" value={email}
                  onChange={(e) => setEmail(e.target.value)} disabled />
               <Form.Control.Feedback type="invalid">
                  Invalid Email
               </Form.Control.Feedback>
            </Form.Group>

         </Row>
         <Row>
            <Form.Group controlId="formFile" className="mb-3">
               <Form.Label>Image</Form.Label>
               <Form.Control type="file" onChange={(e) => handleUploadImage(e)} />
            </Form.Group>
         </Row>
         <Row>
            <div className='img-section  my-3 w-20'>
               {previewimageuser ? (<img src={`data:image/png;base64,${previewimageuser}`} alt="preview " />) : (<span>Preview Image</span>)}

            </div>
         </Row>
      </Form>
   )
}

export default ProfileUser