import React, {useEffect, useState} from 'react'
import {Row, Col, Form, Button, FormCheck, Alert, Modal} from 'react-bootstrap'
import Card from '../../../components/Card'
import * as yup from "yup";
import { Formik } from "formik";
import {useNavigate} from 'react-router-dom'

import {
    catalog1DataFetch,
    catalog2DataFetch,
    catalog3DataFetch,
    documentRecordInsert
} from "../../../service/web/userService";
import useAuth from "../../../hooks/useAuth";

const schema = yup.object().shape({
    name: yup.string().required(),
    dueDate: yup.string().required(),
    agentName: yup.string().required(),
    catalog1Id: yup.string().required(),
    catalog2Id: yup.string().required(),
    catalog3Id: yup.string().required(),
});
const AdminAdd =() =>{
    const navigate = useNavigate();
    const { auth } = useAuth();
    const [catalog1List,setCatalog1List]=useState([])
    const [catalog2List,setCatalog2List]=useState([])
    const [catalog3List,setCatalog3List]=useState([])

    useEffect(() => {
        getCatalogList();
        setErrMsg('');
        setErrCode(0);
    }, [])
    async function getCatalogList(){
       try{
           const {data:catalog1} =await catalog1DataFetch(auth.companyId);
           const {data:catalog2} =await catalog2DataFetch(auth.companyId);
           const {data:catalog3} =await catalog3DataFetch(auth.companyId);

           setCatalog1List(catalog1)
           setCatalog2List(catalog2)
           setCatalog3List(catalog3)
       }catch (e) {

       }

    }

    const [errMsg, setErrMsg] = useState('');
    const [errCode, setErrCode] = useState(0);
    //document add
    const handleSubmit = async (values,{resetForm}) => {
        try {

            const response = await documentRecordInsert(values.name,values.dueDate,values.agentName,values.catalog1Id,values.catalog2Id,values.catalog3Id,auth.companyId,auth.id);

            if(response){
                setErrCode(200);
                setErrMsg('Add new record successful');
                resetForm({})
            }

            // navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
                setErrCode(500);
            } else if (err.response?.status === 400) {
                setErrMsg('Document Inserted');
                setErrCode(400);
            } else if (err.response?.status === 401) {
                setErrMsg('Document Insertion Failed');
                setErrCode(401);
            }  else if (err.response?.status === 403) {
                navigate("/auth")
                setErrCode(403);
            } else {
                setErrMsg('Document Insertion Failed');
            }
        }
    }
    return(
        <>
            <div>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header className="d-flex justify-content-between">
                                <div className="header-title">
                                    <h4 className="card-title">New User Information</h4>
                                </div>
                                <br/>
                                <Row className="justify-content-center">
                                    <Col className="justify-content-center">

                                        {errCode===200?<Alert variant="success d-flex align-items-center" role="alert">

                                            <svg className="me-2" id="check-circle-fill" width="20" fill="currentColor" viewBox="0 0 16 16">
                                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path>
                                            </svg>
                                            <div>
                                                {errMsg}
                                            </div>
                                        </Alert>:null}
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
                                            name: "",
                                            dueDate: "",
                                            agentName: "",
                                            catalog1Id : "",
                                            catalog2Id : "",
                                            catalog3Id : "",

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
                                                        <Form.Label htmlFor="name"> Name:</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            id="name"
                                                            name="name"
                                                            placeholder=" "
                                                            value={values.name}
                                                            onChange={handleChange("name")}
                                                            isValid={touched.name && !errors.name}
                                                            isInvalid={errors.name}

                                                        />
                                                        <Form.Control.Feedback type={errors.name?"invalid":"valid"}>
                                                            {errors.name}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>

                                                    <Form.Group className="col-sm-12 form-group">
                                                        <Form.Label>Catalog1 :</Form.Label>
                                                        <Form.Select
                                                            name="catalog1Id"
                                                            className="selectpicker form-control"
                                                            data-style="py-0"
                                                            value={values.catalog1Id}
                                                            onChange={handleChange("catalog1Id")}
                                                            isValid={touched.catalog1Id && !errors.catalog1Id}
                                                            isInvalid={errors.catalog1Id}
                                                        >
                                                            <option value="">select</option>
                                                            {catalog1List.map((option) => (
                                                                <option value={option.id}>{option.name}</option>
                                                            ))}
                                                        </Form.Select>
                                                        <Form.Control.Feedback type={errors.catalog1Id?"invalid":"valid"}>
                                                            {errors.catalog1Id}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>

                                                    <Form.Group className="col-sm-12 form-group">
                                                        <Form.Label>Catalog2 :</Form.Label>
                                                        <Form.Select
                                                            name="catalog2Id"
                                                            className="selectpicker form-control"
                                                            data-style="py-0"
                                                            value={values.catalog2Id}
                                                            onChange={handleChange("catalog2Id")}
                                                            isValid={touched.catalog2Id && !errors.catalog2Id}
                                                            isInvalid={errors.catalog2Id}
                                                        >
                                                            <option value="">select</option>
                                                            {catalog2List.map((option) => (
                                                                <option value={option.id}>{option.name}</option>
                                                            ))}
                                                        </Form.Select>
                                                        <Form.Control.Feedback type={errors.catalog2Id?"invalid":"valid"}>
                                                            {errors.catalog2Id}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>

                                                    <Form.Group className="col-sm-12 form-group">
                                                        <Form.Label>Catalog3 :</Form.Label>
                                                        <Form.Select
                                                            name="catalog3Id"
                                                            className="selectpicker form-control"
                                                            data-style="py-0"
                                                            value={values.catalog3Id}
                                                            onChange={handleChange("catalog3Id")}
                                                            isValid={touched.catalog3Id && !errors.catalog3Id}
                                                            isInvalid={errors.catalog3Id}
                                                        >
                                                            <option value="">select</option>
                                                            {catalog3List.map((option) => (
                                                                <option value={option.id}>{option.name}</option>
                                                            ))}
                                                        </Form.Select>
                                                        <Form.Control.Feedback type={errors.catalog3Id?"invalid":"valid"}>
                                                            {errors.catalog3Id}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>

                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="agentName">Agent Name:</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            id="agentName"
                                                            name="agentName"
                                                            placeholder=" "
                                                            value={values.agentName}
                                                            onChange={handleChange("agentName")}
                                                            isValid={touched.agentName && !errors.agentName}
                                                            isInvalid={errors.agentName}
                                                        />
                                                        <Form.Control.Feedback type="invalid">
                                                            {errors.agentName}
                                                        </Form.Control.Feedback>

                                                    </Form.Group>

                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="dueDate">dueDate:</Form.Label>
                                                        <Form.Control
                                                            type="date"
                                                            id="dueDate"
                                                            name="dueDate"
                                                            placeholder="Due Date"
                                                            value={values.dueDate}
                                                            onChange={handleChange("dueDate")}
                                                            isValid={touched.dueDate && !errors.dueDate}
                                                            isInvalid={errors.dueDate}
                                                        />
                                                        <Form.Control.Feedback type="invalid">
                                                            {errors.dueDate}
                                                        </Form.Control.Feedback>

                                                    </Form.Group>


                                                </div>
                                                <Button type="submit" variant="btn btn-primary">Submit</Button>{' '}
                                                <Button type="reset" variant="secondary" onClick={handleReset}> Reset </Button>

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