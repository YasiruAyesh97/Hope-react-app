import http from '../httpService';
import jwtDecode from "jwt-decode";

const  BASEURL =  'http://localhost:3001'


export async function login(email,password){
    console.log("caled :")
    const {data:jwt} =await http.post(`${BASEURL}`+'/'+'api/auth/signin',{email,password});

    //
    if(jwt){
        // console.log("TOKEN2 :"+TOKEN)
        const username = jwtDecode(jwt).username;
        const email = jwtDecode(jwt).email;
        const roles = jwtDecode(jwt).roles;
        const companyId = jwtDecode(jwt).companyId;
        const  accessToken = jwt;
        return { username, email, roles, accessToken,companyId };

    }
    return null;
}

export async function registerAdminOrUser(email,username,password,companyId,checkadmin,checkuser) {
  return await http.post(`${BASEURL}`+'/'+'api/auth/signup',{email,username,password,companyId,checkadmin,checkuser});
}
//
export function registerCompany(name){
  return  http.post(`${BASEURL}`+'/'+'api/company/register',{name});
}


export function companyListData(){
    return  http.get(`${BASEURL}`+'/'+'api/company/all');
}

export function adminRegularUserData(){
    return  http.get(`${BASEURL}`+'/'+'api/super-admin/user-list');
}
export function selectedUserDataFetch(id){
    return  http.post(`${BASEURL}`+'/'+'api/super-admin/selected-user',{id});
}
export function selectedUserDataDelete(id){
    return  http.delete(`${BASEURL}`+'/'+'api/super-admin/delete-user'+'/'+id);
}

export function selectedCompanyStatusUpdate(id){
    return  http.put(`${BASEURL}`+'/'+'api/company/status'+'/'+id);
}
export function selectedCompanyDelete(id){
    return  http.delete(`${BASEURL}`+'/'+'api/company/delete'+'/'+id);
}

//admin
export function RegularUserDataFetch(){
    return  http.get(`${BASEURL}`+'/'+'api/admin/user-list');
}

export function selectedRegularUserDelete(id){
    return  http.delete(`${BASEURL}`+'/'+'api/admin/delete-user'+'/'+id);
}

export function selectedRegularUserStatusUpdate(id){
    return  http.put(`${BASEURL}`+'/'+'api/admin/status'+'/'+id);
}

//catalog 1
export function catalog1DataFetch(companyId){
    return  http.get(`${BASEURL}`+'/'+'api/catalog1/all'+'/'+companyId);
}
export function catalog3DataFetch(companyId){
    return  http.get(`${BASEURL}`+'/'+'api/catalog3/all'+'/'+companyId);
}
export function selectedCatalog1StatusUpdate(id){
    return  http.put(`${BASEURL}`+'/'+'api/catalog1/status'+'/'+id);
}
export function selectedCatalog1Delete(id){
    return  http.delete(`${BASEURL}`+'/'+'api/catalog1/delete'+'/'+id);
}
//catalog 2
export function catalog2DataFetch(companyId){
    return  http.get(`${BASEURL}`+'/'+'api/catalog2/all'+'/'+companyId);
}

export function selectedCatalog2StatusUpdate(id){
    return  http.put(`${BASEURL}`+'/'+'api/catalog2/status'+'/'+id);
}
export function selectedCatalog2Delete(id){
    return  http.delete(`${BASEURL}`+'/'+'api/catalog2/delete'+'/'+id);
}




export function selectedCatalog3StatusUpdate(id){
    return  http.put(`${BASEURL}`+'/'+'api/catalog3/status'+'/'+id);
}
export function selectedCatalog3Delete(id){
    return  http.delete(`${BASEURL}`+'/'+'api/catalog3/delete'+'/'+id);
}



// export async function getAllUsers() {
//   return await http.post(`${config["BASEURL"]}`+'/'+'web/user/view');
// }
// export function getUser(id){
//   return  http.get(`${config["BASEURL"]}`+'/'+'web/user/select'+'/'+id);
// }
//
// export function updateUser(user,selectedUser){
//
//   return  http.put(`${config["BASEURL"]}`+'/'+'web/user/update'+'/'+selectedUser,user);
// }
//
// export function viewUser(id){
//
//   return  http.get(`${config["BASEURL"]}`+'/'+'web/user/profile'+'/'+id);
// }
//
// export function getCurrentUser(){
//
//   const jwt = localStorage.getItem('token');
//   if(jwt) return jwtDecode(jwt);
//   return false;
// }
// export function logout(){
//   localStorage.removeItem('token');
// }
// export function getJwt(){
//   return localStorage.getItem('token');
// }
// export async function getPoliceDivision() {
//   return await http.get(`${config["BASEURL"]}`+'/'+'web/user/division');
// }
