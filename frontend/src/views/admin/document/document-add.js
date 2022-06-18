import React from 'react'
import {Row,Col,Image,Form,Button,FormCheck,Alert} from 'react-bootstrap'
import Card from '../../../components/Card'
import * as yup from "yup";
import { Formik } from "formik";
import {Link} from 'react-router-dom'
// img
import avatars1 from '../../../assets/images/avatars/01.png'
import avatars2 from '../../../assets/images/avatars/avtar_1.png'
import avatars3 from '../../../assets/images/avatars/avtar_2.png'
import avatars4 from '../../../assets/images/avatars/avtar_3.png'
import avatars5 from '../../../assets/images/avatars/avtar_4.png'
import avatars6 from '../../../assets/images/avatars/avtar_5.png'

const AdminAdd =() =>{
   const schema = yup.object().shape({

      email: yup.string().required(),
      username: yup.string().required(),
      password: yup.string().required(),
      companyId: yup.string().required("Company is required"),
      roles:yup.boolean().oneOf([true],'at least one role is required').required()


   });

   const handleSubmit =(initialValues)=>{console.log(initialValues)}
   return(
       <>
          <div>
             <Row>
                <Col>
                   <Card>
                      <Card.Header className="d-flex justify-content-between">
                         <div className="header-title">
                            <h4 className="card-title">New Document Information Information</h4>
                         </div>
                         <br/>
                         <Row className="justify-content-center">
                            <Col className="justify-content-center">
                               <Alert variant="success d-flex align-items-center" role="alert">

                                  <svg className="me-2" id="check-circle-fill" width="20" fill="currentColor" viewBox="0 0 16 16">
                                     <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path>
                                  </svg>
                                  <div>
                                     An example success alert with an icon
                                  </div>
                               </Alert>
                            </Col>
                         </Row>

                      </Card.Header>

                      <Card.Body>

                         {/*<Card.Alert color="danger">done</Card.Alert>*/}
                         <div className="new-user-info">
                            <Formik
                                validationSchema={schema}
                                onSubmit={handleSubmit}

                                initialValues={{
                                   username: "",
                                   email: "",
                                   companyId:"",
                                   password:"",
                                   checkadmin:false,
                                   checkuser:false,
                                   roles:false


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
                                      <div className="row">

                                          <Form.Group className="form-group">
                                              <Form.Label htmlFor="username"> Name of the Document:</Form.Label>
                                              <Form.Control
                                                  type="text"
                                                  id="docname"
                                                  name="docname"
                                                  placeholder="Enter document name"
                                                  value={values.docname}
                                                  onChange={handleChange("docname")}
                                                  isValid={touched.docname && !errors.docname}
                                                  isInvalid={!!errors.docname}

                                              />
                                              <Form.Control.Feedback type={errors.docname?"invalid":"valid"}>
                                                  {errors.docname}
                                              </Form.Control.Feedback>
                                          </Form.Group>

                                         <Form.Group className="col-sm-12 form-group">
                                            <Form.Label>List1:</Form.Label>
                                            <Form.Select
                                                name="list1"
                                                className="selectpicker form-control"
                                                data-style="py-0"
                                                value={values.list1}
                                                onChange={handleChange("list1")}
                                                isValid={touched.list1 && !errors.list1}
                                                isInvalid={!!errors.list1}
                                            >
                                               <option value="">Select company</option>
                                               <option value="1">Caneda</option>
                                               <option value="2">Noida</option>
                                               <option value="3">USA</option>
                                               <option value="4">India</option>
                                               <option value="5">Africa</option>
                                            </Form.Select>
                                            <Form.Control.Feedback type={errors.list1?"invalid":"valid"}>
                                               {errors.list1}
                                            </Form.Control.Feedback>
                                         </Form.Group>

                                          <Form.Group className="col-sm-12 form-group">
                                              <Form.Label>List2:</Form.Label>
                                              <Form.Select
                                                  name="type"
                                                  className="selectpicker form-control"
                                                  data-style="py-0"
                                                  value={values.list2}
                                                  onChange={handleChange("list2")}
                                                  isValid={touched.list2 && !errors.list2}
                                                  isInvalid={!!errors.list2}
                                              >
                                                  <option value="">Select company</option>
                                                  <option value="1">Caneda</option>
                                                  <option value="2">Noida</option>
                                                  <option value="3">USA</option>
                                                  <option value="4">India</option>
                                                  <option value="5">Africa</option>
                                              </Form.Select>
                                              <Form.Control.Feedback type={errors.list2?"invalid":"valid"}>
                                                  {errors.list2}
                                              </Form.Control.Feedback>
                                          </Form.Group>

                                          <Form.Group className="col-sm-12 form-group">
                                              <Form.Label>List2:</Form.Label>
                                              <Form.Select
                                                  name="type"
                                                  className="selectpicker form-control"
                                                  data-style="py-0"
                                                  value={values.list3}
                                                  onChange={handleChange("list2")}
                                                  isValid={touched.list3 && !errors.list3}
                                                  isInvalid={!!errors.list3}
                                              >
                                                  <option value="">Select company</option>
                                                  <option value="1">Caneda</option>
                                                  <option value="2">Noida</option>
                                                  <option value="3">USA</option>
                                                  <option value="4">India</option>
                                                  <option value="5">Africa</option>
                                              </Form.Select>
                                              <Form.Control.Feedback type={errors.list3?"invalid":"valid"}>
                                                  {errors.list3}
                                              </Form.Control.Feedback>
                                          </Form.Group>

                                         <Form.Group className="form-group">
                                            <Form.Label htmlFor="username"> Agent:</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="agent"
                                                name="agent"
                                                placeholder="Enter Agent Name"
                                                value={values.agent}
                                                onChange={handleChange("agent")}
                                                isValid={touched.agent && !errors.agent}
                                                isInvalid={!!errors.agent}

                                            />
                                            <Form.Control.Feedback type={errors.agent?"invalid":"valid"}>
                                               {errors.agent}
                                            </Form.Control.Feedback>
                                         </Form.Group>

                                         <Form.Group className="form-group">
                                            <Form.Label htmlFor="email">Due Date:</Form.Label>
                                            <Form.Control
                                                type="date"
                                                id="dueDate"
                                                name="dueDate"
                                                placeholder="Enter due date "
                                                value={values.dueDate}
                                                onChange={handleChange("dueDate")}
                                                isValid={touched.dueDate && !errors.dueDate}
                                                isInvalid={!!errors.dueDate}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                               {errors.dueDate}
                                            </Form.Control.Feedback>

                                         </Form.Group>







                                      </div>
                                      <Button type="submit" variant="btn btn-primary">Submit</Button>
                                       {' '}
                                       <Button type="reset" variant="danger" >
                                           Reset
                                       </Button>

                                   </form>
                               )}
                            </Formik>
                         </div>
                      </Card.Body>

                   </Card>
                </Col>
             </Row>
          </div>
       </>
   )

}

export default AdminAdd;