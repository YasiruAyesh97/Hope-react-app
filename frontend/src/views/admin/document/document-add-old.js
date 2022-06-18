import React from 'react'
import {Row,Col,Image,Form,Button} from 'react-bootstrap'
import Card from '../../../components/Card'

import {Link} from 'react-router-dom'
// img
import avatars1 from '../../../assets/images/avatars/01.png'
import avatars2 from '../../../assets/images/avatars/avtar_1.png'
import avatars3 from '../../../assets/images/avatars/avtar_2.png'
import avatars4 from '../../../assets/images/avatars/avtar_3.png'
import avatars5 from '../../../assets/images/avatars/avtar_4.png'
import avatars6 from '../../../assets/images/avatars/avtar_5.png'

const AdminAdd =() =>{


   return(
       <>
          <div>
             <Row>
                <Col >
                   <Card>
                      <Card.Header className="d-flex justify-content-between">
                         <div className="header-title">
                            <h4 className="card-title">New Document Information Information</h4>
                         </div>
                      </Card.Header>
                      <Card.Body>
                         <div className="new-user-info">
                            <form>

                               <div className="row">
                                  <Form.Group className="form-group">
                                     <Form.Label htmlFor="name"> Name of the Document:</Form.Label>
                                     <Form.Control type="text"  id="name" placeholder=" Name"/>
                                  </Form.Group>

                                  <Form.Group className="col-sm-12 form-group">
                                     <Form.Label>List1:</Form.Label>
                                     <select name="type" className="selectpicker form-control" data-style="py-0">
                                        <option>Select company</option>
                                        <option>Caneda</option>
                                        <option>Noida</option>
                                        <option >USA</option>
                                        <option>India</option>
                                        <option>Africa</option>
                                     </select>
                                  </Form.Group>

                                  <Form.Group className="col-sm-12 form-group">
                                     <Form.Label>List2:</Form.Label>
                                     <select name="type" className="selectpicker form-control" data-style="py-0">
                                        <option>Select company</option>
                                        <option>Caneda</option>
                                        <option>Noida</option>
                                        <option >USA</option>
                                        <option>India</option>
                                        <option>Africa</option>
                                     </select>
                                  </Form.Group>

                                  <Form.Group className="col-sm-12 form-group">
                                     <Form.Label>List3:</Form.Label>
                                     <select name="type" className="selectpicker form-control" data-style="py-0">
                                        <option>Select company</option>
                                        <option>Caneda</option>
                                        <option>Noida</option>
                                        <option >USA</option>
                                        <option>India</option>
                                        <option>Africa</option>
                                     </select>
                                  </Form.Group>

                                  <Form.Group className="form-group">
                                     <Form.Label htmlFor="name"> Agent:</Form.Label>
                                     <Form.Control type="text"  id="name" placeholder=" Name"/>
                                  </Form.Group>

                                  <Form.Group className="form-group">
                                     <Form.Label htmlFor="name"> Due Date:</Form.Label>
                                     <Form.Control type="date" name="dob" placeholder="Date of Birth" isInvalid={1==1}/>

                                  </Form.Group>

                                  <Form.Group className="col-sm-12 form-group">
                                     <Form.Label>Status:</Form.Label>
                                     <select name="type" className="selectpicker form-control" data-style="py-0">
                                        <option>Select company</option>
                                        <option>Caneda</option>
                                        <option>Noida</option>
                                     </select>
                                  </Form.Group>

                               </div>
                               <Button type="button" variant="btn btn-primary">Add New Information</Button>
                            </form>
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