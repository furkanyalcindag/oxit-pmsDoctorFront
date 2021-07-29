import axios from "axios";
import authHeader from "@/services/auth-header";

class GroupService {
    getGroups() {
        return axios.get(process.env.VUE_APP_API_URL + `/management/group-api/`, {headers: authHeader()}).then(response => {
            return response
        }).catch(error => {
            return error
        })

    }

    addGroup(groupName) {
        return axios.post(process.env.VUE_APP_API_URL + `/management/group-api/`, {
            groupName: groupName
        }, {headers: authHeader()}).then(response => {


            return response;
        }).catch(error => {
            return error
        });
    }

    deleteGroup(id) {
        const params = {
            id: id
        }
        return axios.delete(process.env.VUE_APP_API_URL + `/management/group-api/`, {
            headers: authHeader(),
            params
        }).then(response => {


            return response;
        }).catch(error => {
            return error
        });
    }


}

export default GroupService