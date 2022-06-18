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
                           <h4 className="card-title">New Catalog Information</h4>
                        </div>
                     </Card.Header>
                     <Card.Body>
                        <div className="new-user-info">
                           <form>
                              <div className="row">
                                 <Form.Group className="col-sm-12 form-group">
                                    <Form.Label>Type:</Form.Label>
                                    <select name="type" className="selectpicker form-control" data-style="py-0">
                                       <option>Select Catalog type</option>
                                       <option>Catalog 1</option>
                                       <option>Catalog 2</option>
                                       <option >Catalog 3</option>
                                    </select>
                                 </Form.Group>

                                 <Form.Group className="form-group">
                                    <Form.Label htmlFor="name"> Name:</Form.Label>
                                    <Form.Control type="text"  id="name" placeholder=" Name"/>
                                 </Form.Group>

                              </div>
                              <Button type="button" variant="btn btn-primary">Submit</Button>
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