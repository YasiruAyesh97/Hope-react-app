import React, {useEffect, useState} from 'react'
import {Row, Col, Button, Modal, Form, FormCheck} from 'react-bootstrap'
import Card from '../../../components/Card'
import {documentListDataFetch,selectedDocumentStatusUpdate,selectedDocumentDelete} from "../../../service/web/userService";
import useAuth from "../../../hooks/useAuth";

const UserList =() =>{
   const { auth } = useAuth();
   //initial record
   const [documentList,setDocumentList]=useState([])
   //initial data load
   useEffect(() => {
      getDocumentDataList();
   }, [])

   async function getDocumentDataList(){
      const {data:doc} =await documentListDataFetch(auth.companyId);
      setDocumentList(doc)
   }

   //handle delete

   const [show1, setShow1] = useState(false);
   const [selectRow, setSelectRow] = useState('');
   const handleCloseDelete = () => setShow1(false);

   const handleShowDelete = (item) =>{
      setSelectRow(item)
      setShow1(true)
   };


   //delete record
   const  deleteRecord= async () =>{

      try{
         const response =await selectedDocumentDelete(selectRow.id)
         if(response){
            let newArr = [...documentList];
            const result = newArr.filter(item => item.id != selectRow.id);
            setDocumentList(result)
            setShow1(false)
         }

      }catch (err) {

      }
   };

   //handle toggle
   const  handleToggle=async (item,idx)=>{

      //update db api
      try{
         const response = await selectedDocumentStatusUpdate(item.id)
         if(response){
            let newArr = [...documentList];
            newArr[idx]['status']= newArr[idx]['status']?0:1
            setDocumentList(newArr)
         }
      }catch (err) {

      }

   }
   //view model
   const [show, setShow] = useState(false);
   const [initialValues,setInitialValues]=useState({
      docName: "",
      catalog1name: "",
      catalog2name: "",
      catalog3name: "",


   })

   const handleCloseEdit = () => setShow(false);

   const handleShowView = (item) =>{

      setSelectRow(item)
      setInitialValues({
         docName:item.name,
         catalog1name: item.catalog1name,
         catalog2name: item.catalog2name,
         catalog3name: item.catalog3name,
         dueDate: item.dueDate,
         agentName: item.agentName,

      })

      setShow(true)

   };

   return(
       <>
          <div>
             <Row>
                <Col sm="12">
                   <Card>
                      <Card.Header className="d-flex justify-content-between">
                         <div className="header-title">
                            <h4 className="card-title">Document List</h4>
                         </div>
                      </Card.Header>
                      <Card.Body className="px-0">
                         <div className="table-responsive">
                            <table id="user-list-table" className="table table-striped" role="grid" data-toggle="data-table">
                               <thead>
                               <tr className="ligth">

                                  <th>Name</th>

                                  <th>Status</th>

                                  <th>Catalog 1</th>
                                  <th>Catalog 2</th>
                                  <th>Catalog 3</th>
                                  <th>Due Date</th>
                                  <th min-width= "100px">Action</th>
                               </tr>
                               </thead>
                               <tbody>
                               {
                                  documentList.map((item,idx) => (
                                      <tr key={idx}>
                                         <td>{item.name}</td>
                                         <td><span className={`badge ${item.status?"bg-primary":"bg-danger"}`}>{item.status?"active":"inactive"}</span></td>
                                         <td>{item.catalog1name}</td>
                                         <td>{item.catalog2name}</td>
                                         <td>{item.catalog3name}</td>
                                         <td>{item.dueDate}</td>
                                         <td>
                                            <div className="flex align-items-center list-user-action">
                                               <div className="d-flex flex-row">


                                                  <Form.Check className="form-switch">
                                                     <FormCheck.Input
                                                         className="form-check-input"
                                                         type="checkbox"
                                                         id="rowcheck{item.id}"
                                                         checked={item.status?true:false}
                                                         onChange={()=>handleToggle(item,idx)}
                                                     />

                                                  </Form.Check>
                                                  {' '}
                                                  <Button style={{ marginRight: 4 }} className="btn btn-sm btn-icon " variant="success" data-toggle="tooltip" data-placement="top" title="" data-original-title="View" to="#" onClick={()=>handleShowView(item)}>
                                                     <span className="btn-inner">
                                                      <svg width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                         <path d="M11.4925 2.78906H7.75349C4.67849 2.78906 2.75049 4.96606 2.75049 8.04806V16.3621C2.75049 19.4441 4.66949 21.6211 7.75349 21.6211H16.5775C19.6625 21.6211 21.5815 19.4441 21.5815 16.3621V12.3341" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                         <path fillRule="evenodd" clipRule="evenodd" d="M8.82812 10.921L16.3011 3.44799C17.2321 2.51799 18.7411 2.51799 19.6721 3.44799L20.8891 4.66499C21.8201 5.59599 21.8201 7.10599 20.8891 8.03599L13.3801 15.545C12.9731 15.952 12.4211 16.181 11.8451 16.181H8.09912L8.19312 12.401C8.20712 11.845 8.43412 11.315 8.82812 10.921Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                         <path d="M15.1655 4.60254L19.7315 9.16854" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                      </svg>
                                                      </span>
                                                  </Button>
                                                  {' '}
                                                  <Button className="btn btn-sm btn-icon " variant="danger" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete" to="#" onClick={()=>handleShowDelete(item)}>
                                                     <span className="btn-inner">
                                                        <svg width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
                                                           <path d="M19.3248 9.46826C19.3248 9.46826 18.7818 16.2033 18.4668 19.0403C18.3168 20.3953 17.4798 21.1893 16.1088 21.2143C13.4998 21.2613 10.8878 21.2643 8.27979 21.2093C6.96079 21.1823 6.13779 20.3783 5.99079 19.0473C5.67379 16.1853 5.13379 9.46826 5.13379 9.46826" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                           <path d="M20.708 6.23975H3.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                           <path d="M17.4406 6.23973C16.6556 6.23973 15.9796 5.68473 15.8256 4.91573L15.5826 3.69973C15.4326 3.13873 14.9246 2.75073 14.3456 2.75073H10.1126C9.53358 2.75073 9.02558 3.13873 8.87558 3.69973L8.63258 4.91573C8.47858 5.68473 7.80258 6.23973 7.01758 6.23973" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                        </svg>
                                                     </span>
                                                  </Button>
                                                  {' '}
                                               </div>
                                            </div>
                                         </td>
                                      </tr>))}
                               </tbody>
                            </table>
                         </div>
                         {/*delete model*/}
                         <Modal
                             show={show1}
                             onHide={handleCloseDelete}
                             backdrop="static"
                             keyboard={false}
                         >
                            <Modal.Header closeButton>
                               <Modal.Title>Delete Record</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                               Are You sure you want to delete this record?
                            </Modal.Body>
                            <Modal.Footer>
                               <Button variant="secondary" onClick={handleCloseDelete}>
                                  Close
                               </Button>
                               <Button variant="danger"  onClick={deleteRecord}>Delete</Button>
                            </Modal.Footer>
                         </Modal>

                      {/*view model*/}

                         <Modal show={show} onHide={handleCloseEdit}>
                            <Modal.Header closeButton>
                               <Modal.Title>Document Details</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>

                               <div className="row">

                                  <Form.Group className="mb-3">
                                     <Form.Label htmlFor="catalog1name">Catalog1 </Form.Label>
                                     <Form.Control
                                         readOnly
                                         type="text"
                                         id="catalog1name"
                                         name="catalog1name"
                                         value={initialValues.catalog1name}

                                     />
                                  </Form.Group>

                                  <Form.Group className="mb-3">
                                     <Form.Label htmlFor="catalog2name">Catalog2 </Form.Label>
                                     <Form.Control
                                         readOnly
                                         type="text"
                                         id="catalog2name"
                                         name="catalog2name"
                                         value={initialValues.catalog2name}

                                     />
                                  </Form.Group>

                                  <Form.Group className="mb-3">
                                     <Form.Label htmlFor="catalog2name">Catalog3 </Form.Label>
                                     <Form.Control
                                         readOnly
                                         type="text"
                                         id="catalog3name"
                                         name="catalog3name"
                                         value={initialValues.catalog3name}

                                     />
                                  </Form.Group>

                                  <Form.Group className="mb-3">
                                     <Form.Label htmlFor="catalog2name">Due Date </Form.Label>
                                     <Form.Control
                                         readOnly
                                         type="text"
                                         id="dueDate"
                                         name="dueDate"
                                         value={initialValues.dueDate}

                                     />
                                  </Form.Group>

                                  <Form.Group className="mb-3">
                                     <Form.Label htmlFor="catalog2name">Agent Name </Form.Label>
                                     <Form.Control
                                         readOnly
                                         type="text"
                                         id="agentName"
                                         name="agentName"
                                         value={initialValues.agentName}

                                     />
                                  </Form.Group>
                               </div>


                               <Button variant="danger" onClick={handleCloseEdit}>
                                  Cancel
                               </Button>

                            </Modal.Body>
                         </Modal>

                      </Card.Body>
                   </Card>
                </Col>
             </Row>
          </div>
       </>
   )

}

export default UserList;