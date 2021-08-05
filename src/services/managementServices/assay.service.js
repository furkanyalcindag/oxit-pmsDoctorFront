import axios from "axios";
import authHeader from "@/services/auth-header";

class AssayService {


    getAssays(name) {

        const params = {
            name:name,

        }
        return axios.get(process.env.VUE_APP_API_URL + `/pmsDoctor/assay-api/`, {headers: authHeader(),params})

    }


    getAssaysSelect() {

        return axios.get(process.env.VUE_APP_API_URL + `/pmsDoctor/assay-select-api/`, {headers: authHeader()})

    }

    addSecretary(assay) {
        return axios.post(process.env.VUE_APP_API_URL + '/pmsDoctor/assay-api/',
            {
                name: assay.assayName,


            }, {headers: authHeader()}).then(response => {


            return response;
        }).catch(error => {
            return error
        });


    }

    editAssay(assay) {
        const params = {id: assay.uuid}
        return axios.put(process.env.VUE_APP_API_URL + '/pmsDoctor/assay-api/',
            {
                name: assay.name,


            }, {headers: authHeader(), params}).then(response => {


            return response;
        }).catch(error => {
            return error
        });


    }

     deleteAssay(id) {
        const params = {
            id: id
        }
        return axios.delete(process.env.VUE_APP_API_URL + `/pmsDoctor/assay-api/`, {headers: authHeader(), params})
    }


    getSingleAssay(id) {
        const params = {
            id: id
        }
        return axios.get(process.env.VUE_APP_API_URL + `/pmsDoctor/assay-api/`, {headers: authHeader(), params})
    }


}


export default AssayService
