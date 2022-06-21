// import http from '../httpService';
import jwtDecode from "jwt-decode";
import axios from "axios";
const config = require("../../../config.json");

const  BASEURL =  config["BASEURL"]


export async function login(email,password){
    const {data:jwt} =await axios.post(`${BASEURL}`+'/'+'api/auth/signin',{email,password});

    //
    if(jwt){

        const id = jwtDecode(jwt).id;
        const username = jwtDecode(jwt).username;
        const email = jwtDecode(jwt).email;
        const roles = jwtDecode(jwt).roles;
        const companyId = jwtDecode(jwt).companyId;
        const  accessToken = jwt;
        sessionStorage.setItem('userToken',accessToken);
        return { id,username, email, roles, accessToken,companyId };

    }
    return null;
}

export async function registerAdminOrUser(email,username,password,companyId,checkadmin,checkuser) {
  return await axios.post(`${BASEURL}`+'/'+'api/auth/signup',{email,username,password,companyId,checkadmin,checkuser},{
      headers: {
          'x-access-token': sessionStorage.getItem('userToken')
      }});
}
//
export function registerCompany(name){
  return  axios.post(`${BASEURL}`+'/'+'api/company/register',{name},{
      headers: {
          'x-access-token': sessionStorage.getItem('userToken')
      }});
}


export function companyListData(){
    return  axios.get(`${BASEURL}`+'/'+'api/company/all',{
        headers: {
            'x-access-token': sessionStorage.getItem('userToken')
        }});
}

export function adminRegularUserData(){
    return  axios.get(`${BASEURL}`+'/'+'api/super-admin/user-list',{
        headers: {
            'x-access-token': sessionStorage.getItem('userToken')
        }});
}
export function selectedUserDataFetch(id){
    return  axios.post(`${BASEURL}`+'/'+'api/super-admin/selected-user',{id},{
        headers: {
            'x-access-token': sessionStorage.getItem('userToken')
        }});
}
export function selectedRegularUserOrAdminUpdate(id,username,email,password,status,isAdmin,isRUser){
    return  axios.put(`${BASEURL}`+'/'+'api/super-admin/edit-user'+'/'+id,{username, email, password,status, isAdmin, isRUser},{
        headers: {
            'x-access-token': sessionStorage.getItem('userToken')
        }});
}

export function selectedUserDataDelete(id){
    return  axios.delete(`${BASEURL}`+'/'+'api/super-admin/delete-user'+'/'+id),{
        headers: {
            'x-access-token': sessionStorage.getItem('userToken')
        }};
}

export function selectedCompanyStatusUpdate(id){
    return  axios.put(`${BASEURL}`+'/'+'api/company/status'+'/'+id,{
        headers: {
            'x-access-token': sessionStorage.getItem('userToken')
        }});
}
export function selectedCompanyDelete(id){
    return  axios.delete(`${BASEURL}`+'/'+'api/company/delete'+'/'+id,{
        headers: {
            'x-access-token': sessionStorage.getItem('userToken')
        }});
}

//admin
export function RegularUserDataFetch(companyId){
    return  axios.get(`${BASEURL}`+'/'+'api/admin/user-list'+'/'+companyId,{
        headers: {
            'x-access-token': sessionStorage.getItem('userToken')
        }});
}

export function selectedRegularUserDelete(id){
    return  axios.delete(`${BASEURL}`+'/'+'api/admin/delete-user'+'/'+id,{
        headers: {
            'x-access-token': sessionStorage.getItem('userToken')
        }});
}

export function selectedRegularUserStatusUpdate(id){
    return  axios.put(`${BASEURL}`+'/'+'api/admin/status'+'/'+id,{
        headers: {
            'x-access-token': sessionStorage.getItem('userToken')
        }});
}


export function catalogRecordRegister(type,name,companyId){
    return  axios.post(`${BASEURL}`+'/'+'api/catalog'+`${type}`+'/insert',{name,companyId},{
        headers: {
            'x-access-token': sessionStorage.getItem('userToken')
        }});
}

//catalog 1
export function catalog1DataFetch(companyId){
    return  axios.get(`${BASEURL}`+'/'+'api/catalog1/all'+'/'+companyId,{
        headers: {
            'x-access-token': sessionStorage.getItem('userToken')
        }});
}

export function selectedCatalog1StatusUpdate(id){
    return  axios.put(`${BASEURL}`+'/'+'api/catalog1/status'+'/'+id,{
        headers: {
            'x-access-token': sessionStorage.getItem('userToken')
        }});
}
export function selectedCatalog1Delete(id){
    return  axios.delete(`${BASEURL}`+'/'+'api/catalog1/delete'+'/'+id,{
        headers: {
            'x-access-token': sessionStorage.getItem('userToken')
        }});
}
//catalog 2
export function catalog2DataFetch(companyId){
    return  axios.get(`${BASEURL}`+'/'+'api/catalog2/all'+'/'+companyId,{
        headers: {
            'x-access-token': sessionStorage.getItem('userToken')
        }});
}

export function selectedCatalog2StatusUpdate(id){
    return  axios.put(`${BASEURL}`+'/'+'api/catalog2/status'+'/'+id,{
        headers: {
            'x-access-token': sessionStorage.getItem('userToken')
        }});
}
export function selectedCatalog2Delete(id){
    return  axios.delete(`${BASEURL}`+'/'+'api/catalog2/delete'+'/'+id,{
        headers: {
            'x-access-token': sessionStorage.getItem('userToken')
        }});
}
//catalog 3
export function catalog3DataFetch(companyId){
    return  axios.get(`${BASEURL}`+'/'+'api/catalog3/all'+'/'+companyId,{
        headers: {
            'x-access-token': sessionStorage.getItem('userToken')
        }});
}

export function selectedCatalog3StatusUpdate(id){
    return  axios.put(`${BASEURL}`+'/'+'api/catalog3/status'+'/'+id,{
        headers: {
            'x-access-token': sessionStorage.getItem('userToken')
        }});
}
export function selectedCatalog3Delete(id){
    return  axios.delete(`${BASEURL}`+'/'+'api/catalog3/delete'+'/'+id,{
        headers: {
            'x-access-token': sessionStorage.getItem('userToken')
        }});
}

//document
export function documentListDataFetch(companyId){
    return  axios.get(`${BASEURL}`+'/'+'api/document/all'+'/'+companyId,{
        headers: {
            'x-access-token': sessionStorage.getItem('userToken')
        }});
}

export function selectedDocumentDelete(id){
    return  axios.delete(`${BASEURL}`+'/'+'api/document/delete'+'/'+id,{
        headers: {
            'x-access-token': sessionStorage.getItem('userToken')
        }});
}
export function selectedDocumentStatusUpdate(id){
    return  axios.put(`${BASEURL}`+'/'+'api/document/status'+'/'+id,{
        headers: {
            'x-access-token': sessionStorage.getItem('userToken')
        }});
}


export function documentRecordInsert(name,dueDate,agentName,catalog1Id,catalog2Id,catalog3Id,companyId,userId){
    return  axios.post(`${BASEURL}`+'/'+'api/document/insert',{name,dueDate,agentName,catalog1Id,catalog2Id,catalog3Id,companyId,userId},{
        headers: {
            'x-access-token': sessionStorage.getItem('userToken')
        }});
}

export function expiresSoonDocumentListDataFetch(companyId){

    return  axios.get(`${BASEURL}`+'/'+'api/document/expiresoon'+'/'+companyId,{
        headers: {
            'x-access-token': sessionStorage.getItem('userToken')
        }});
}

export function logout(){
    sessionStorage.removeItem('userToken');
}
export function getJwt(){
    return sessionStorage.getItem('userToken');
}


export function getDecodeJwt(){

    const jwt =sessionStorage.getItem('userToken')
    const id = jwtDecode(jwt).id;
    const username = jwtDecode(jwt).username;
    const email = jwtDecode(jwt).email;
    const roles = jwtDecode(jwt).roles;
    const companyId = jwtDecode(jwt).companyId;
    const  accessToken = jwt;
    return { id,username, email, roles, accessToken,companyId };;
}