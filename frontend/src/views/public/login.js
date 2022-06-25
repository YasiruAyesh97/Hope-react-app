import React,{useState, useEffect} from 'react'
import {Row,Col,Image,Form,Button,Alert} from 'react-bootstrap'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Card from '../../components/Card'
import useAuth from '../../hooks/useAuth';

import auth1 from     '../../assets/images/auth/01.png'
import {Formik} from "formik";
import * as yup from "yup";

import {login} from "../../service/web/userService";

const schema = yup.object().shape({
   email: yup.string()
       .email("Enter valid email")
       .required("Email is required")
       .label("Email"),
   password: yup.string()
       .required("Password is required")
       .matches(
           /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
           "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
       )
       .label("Password"),

});


const Login = () => {
   const { setAuth } = useAuth();

   const navigate = useNavigate();

   const from =  "/";

   // const userRef = useRef();
   // const errRef = useRef();

   const [errMsg, setErrMsg] = useState('');
   const [errCode, setErrCode] = useState(0);

   useEffect(() => {
      setErrMsg('');
      setErrCode(0);
   }, [])

   const handleSubmit = async (values) => {
      try {

         const response = await login(values.email,values.password);

         if(response){
            setAuth(response)
            navigate(from, { replace: true });
         }


      } catch (err) {
         if (!err?.response) {
            setErrMsg('No Server Response');
            setErrCode(500);
         } else if (err.response?.status === 400) {
            setErrMsg('Missing Username or Password');
            setErrCode(400);
         } else if (err.response?.status === 401) {
            setErrMsg('Invalid password');
            setErrCode(401);
         } else {
            setErrMsg('Login Failed');
         }

      }
   }

   return (
       <>
          <section className="login-content">
             <Row className="m-0 align-items-center bg-white vh-100">
                <Col md="6">
                   <Row className="justify-content-center">
                      <Col md="10">
                         <Card className="card-transparent shadow-none d-flex justify-content-center mb-0 auth-card">
                            <Card.Body>
                               <Link to="/dashboard" className="navbar-brand d-flex align-items-center mb-3">
                                  <svg width="30" className="text-primary" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                     <rect x="-0.757324" y="19.2427" width="28" height="4" rx="2" transform="rotate(-45 -0.757324 19.2427)" fill="currentColor"/>
                                     <rect x="7.72803" y="27.728" width="28" height="4" rx="2" transform="rotate(-45 7.72803 27.728)" fill="currentColor"/>
                                     <rect x="10.5366" y="16.3945" width="16" height="4" rx="2" transform="rotate(45 10.5366 16.3945)" fill="currentColor"/>
                                     <rect x="10.5562" y="-0.556152" width="28" height="4" rx="2" transform="rotate(45 10.5562 -0.556152)" fill="currentColor"/>
                                  </svg>
                                  <h4 className="logo-title ms-3"></h4>
                               </Link>
                               <h2 className="mb-2 text-center">Sign In</h2>
                               <p className="text-center">Login to stay connected.</p>


                               {errCode===500?<Alert variant="danger d-flex align-items-center" role="alert">
                                  <svg className="me-2" id="exclamation-triangle-fill" fill="currentColor" width="20" viewBox="0 0 16 16">
                                     <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
                                  </svg>
                                  <div>
                                     {errMsg}
                                  </div>
                               </Alert>:null}

                               {errCode===400||errCode===401? <Alert variant="warning d-flex align-items-center" role="alert">
                                  <svg className="me-2" id="exclamation-triangle-fill" fill="currentColor" width="20" viewBox="0 0 16 16">
                                     <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
                                  </svg>
                                  <div>
                                     {errMsg}
                                  </div>
                               </Alert>:null}


                               <Formik
                                   validationSchema={schema}
                                   onSubmit={handleSubmit}

                                   initialValues={{
                                      email: "",
                                      password:"",


                                   }}
                               >
                                  {({
                                       handleSubmit,
                                       handleChange,
                                       values,
                                       touched,
                                       dirty,
                                       isValid,
                                       errors }) => (

                                      <form noValidate onSubmit={handleSubmit}>
                                         <Row>
                                            <Form.Group className="form-group">
                                               <Form.Label htmlFor="email">Email</Form.Label>
                                               <Form.Control
                                                   type="text"
                                                   id="email"
                                                   name="email"
                                                   placeholder=""
                                                   value={values.email}
                                                   onChange={handleChange("email")}
                                                   isValid={!errors.email}
                                                   isInvalid={errors.email}
                                               />
                                               <Form.Control.Feedback type="invalid">
                                                  {errors.email}
                                               </Form.Control.Feedback>

                                            </Form.Group>

                                            <Form.Group className="form-group">
                                               <Form.Label htmlFor="password">Password</Form.Label>
                                               <Form.Control
                                                   type="password"
                                                   id="password"
                                                   name="password"
                                                   placeholder=""
                                                   value={values.password}
                                                   onChange={handleChange("password")}
                                                   isValid={!errors.password}
                                                   isInvalid={errors.password}
                                               />
                                               <Form.Control.Feedback type="invalid">
                                                  {errors.password}
                                               </Form.Control.Feedback>

                                            </Form.Group>



                                         <Col lg="12" className="d-flex justify-content-between">
                                            {/*<Form.Check className="form-check mb-3">*/}
                                            {/*   <Form.Check.Input type="checkbox"  id="customCheck1"/>*/}
                                            {/*   <Form.Check.Label htmlFor="customCheck1">Remember Me</Form.Check.Label>*/}
                                            {/*</Form.Check>*/}
                                            <div className="form-check mb-3">

                                            </div>
                                            {/*<Link to="reset">Forgot Password?</Link>*/}
                                         </Col>
                                      </Row>
                                     <div className="d-flex justify-content-center">
                                     <Button
                                         onClick={handleSubmit}
                                         type="button"
                                         variant="btn btn-primary"
                                         disabled={!(dirty && isValid)}
                                     >Sign In</Button>
                                     </div>

                                      </form>
                                  )}
                               </Formik>

                            </Card.Body>
                         </Card>
                      </Col>
                   </Row>
                   <div className="sign-bg">
                      <svg width="280" height="230" viewBox="0 0 431 398" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <g opacity="0.05">
                            <rect x="-157.085" y="193.773" width="543" height="77.5714" rx="38.7857" transform="rotate(-45 -157.085 193.773)" fill="#3B8AFF"/>
                            <rect x="7.46875" y="358.327" width="543" height="77.5714" rx="38.7857" transform="rotate(-45 7.46875 358.327)" fill="#3B8AFF"/>
                            <rect x="61.9355" y="138.545" width="310.286" height="77.5714" rx="38.7857" transform="rotate(45 61.9355 138.545)" fill="#3B8AFF"/>
                            <rect x="62.3154" y="-190.173" width="543" height="77.5714" rx="38.7857" transform="rotate(45 62.3154 -190.173)" fill="#3B8AFF"/>
                         </g>
                      </svg>
                   </div>
                </Col>
                <Col md="6" className="d-md-block d-none bg-primary p-0 mt-n1 vh-100 overflow-hidden">
                   <Image src={auth1} className="Image-fluid gradient-main animated-scaleX" alt="images"/>
                </Col>
             </Row>
          </section>
       </>
   )
}

export default Login
