import React,{useState, useEffect} from 'react'
import {Row,Col,Image,Form,Button,ListGroup,} from 'react-bootstrap'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Card from '../../components/Card'
import useAuth from '../../hooks/useAuth';

import linkedin  from     '../../assets/images/brands/li.svg'
import auth1 from     '../../assets/images/auth/01.png'
import {Formik} from "formik";
import * as yup from "yup";

import {login} from "../../service/web/userService";
const schema = yup.object().shape({

   email: yup.string().required(),
   password: yup.string().required()

});

const Login = () => {
   const { setAuth } = useAuth();

   const navigate = useNavigate();
   const location = useLocation();
   // const from = location.state?.from?.pathname || "/";
   const from =  "/";
   console.log("location : "+JSON.stringify(location.state))
   // const userRef = useRef();
   // const errRef = useRef();

   const [user, setUser] = useState('');
   const [pwd, setPwd] = useState('');
   const [errMsg, setErrMsg] = useState('');
   useEffect(() => {
      // userRef.current.focus();
   }, [])

   useEffect(() => {
      setErrMsg('');
   }, [user, pwd])

   const handleSubmit = async (values) => {
      // e.preventDefault();

      const email ="admin2@gmail.com"
      const username="admin"
      const roles= ["ROLE_MODERATOR"]
      const accessToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjU1MDg5MTkxLCJleHAiOjE2NTUxNzU1OTF9.DTbhNGBX610TRD2rWRAroshWUYLM8hr1VVhLqoufobc"
      try {
         // const response = await axios.post(LOGIN_URL,
         //     JSON.stringify({ user, pwd }),
         //     {
         //        headers: { 'Content-Type': 'application/json' },
         //        withCredentials: true
         //     }
         // );
         // console.log(JSON.stringify(response?.data));
         // //console.log(JSON.stringify(response));
         // const accessToken = response?.data?.accessToken;
         // const roles = response?.data?.roles;
         // setAuth({ username, email, roles, accessToken });

         // setAuth({ user, pwd, roles, accessToken });
         // setUser('');
         // setPwd('');
         // navigate(from, { replace: true });
      } catch (err) {
         if (!err?.response) {
            setErrMsg('No Server Response');
         } else if (err.response?.status === 400) {
            setErrMsg('Missing Username or Password');
         } else if (err.response?.status === 401) {
            setErrMsg('Unauthorized');
         } else {
            setErrMsg('Login Failed');
         }
         // errRef.current.focus();
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
                                  <h4 className="logo-title ms-3">POC</h4>
                               </Link>
                               <h2 className="mb-2 text-center">Sign In</h2>
                               <p className="text-center">Login to stay connected.</p>

                               <Formik
                                   // validationSchema={schema}
                                   onSubmit={handleSubmit}

                                   initialValues={{
                                      email: "",
                                      password:"",


                                   }}
                               >
                                  {({
                                       handleSubmit,
                                       handleReset,
                                       handleChange,

                                       setFieldValue,

                                       values,
                                       touched,
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
                                                   isValid={touched.email && !errors.email}
                                                   isInvalid={!!errors.email}
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
                                                   isValid={touched.password && !errors.password}
                                                   isInvalid={!!errors.password}
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
                                            <Link to="reset">Forgot Password?</Link>
                                         </Col>
                                      </Row>
                                     <div className="d-flex justify-content-center">
                                     <Button  onClick={handleSubmit} type="button" variant="btn btn-primary">Sign In</Button>
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
