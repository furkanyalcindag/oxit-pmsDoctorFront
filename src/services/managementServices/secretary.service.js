
import axios from "axios";
import authHeader from "@/services/auth-header";

class SecretaryService {


    getSecretary() {

        return axios.get(process.env.VUE_APP_API_URL + `/pmsDoctor/secretary-api/`, {headers: authHeader()})

    }

    addSecretary(secretary) {
        return axios.post(process.env.VUE_APP_API_URL + '/pmsDoctor/secretary-api/',
            {
                firstName: secretary.firstName,
                lastName: secretary.lastName,
                email: secretary.email,


            }, {headers: authHeader()}).then(response => {


            return response;
        }).catch(error => {
            return error
        });


    }

    editSecretary(secretary) {
        const params = {id: secretary.uuid}
        return axios.put(process.env.VUE_APP_API_URL + '/pmsDoctor/secretary-api/',
            {
                firstName: secretary.firstName,
                lastName: secretary.lastName,
                email: secretary.email,

            }, {headers: authHeader(), params}).then(response => {


            return response;
        }).catch(error => {
            return error
        });


    }

    getSingleSecretary(id) {
        const params = {
            id: id
        }
        return axios.get(process.env.VUE_APP_API_URL + `/pmsDoctor/secretary-api/`, {headers: authHeader(), params})
    }


     deleteSecretary(id) {
        const params = {
            id: id
        }
        return axios.delete(process.env.VUE_APP_API_URL + `/pmsDoctor/secretary-api/`, {headers: authHeader(), params})
    }




}








export default SecretaryService
