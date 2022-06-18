import axios from "axios";
// import {getJwt} from "../service/web/userService";
// axios.defaults.headers.common['x-auth-token']=getJwt();
export default {
    get:axios.get,
    post:axios.post,
    put:axios.put,
    delete:axios.delete
}
