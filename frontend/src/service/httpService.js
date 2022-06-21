import axios from "axios";
import {getJwt} from "./web/userService";
axios.defaults.headers.common['x-access-token']=getJwt();
export default {
    get:axios.get,
    post:axios.post,
    put:axios.put,
    delete:axios.delete
}
