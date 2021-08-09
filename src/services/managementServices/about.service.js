import axios from "axios";
import authHeader from "@/services/auth-header";

class AboutService {


    getAbout() {
        return axios.get(process.env.VUE_APP_API_URL + '/pmsDoctor/about-api/', {headers: authHeader()})

    }

    editAbout(about) {
        const params = {
            id: about.uuid


        }
        return axios.put(process.env.VUE_APP_API_URL + '/pmsDoctor/about-api/', {


            about: about.about


        }, {headers: authHeader(), params}).then(response => {


            return response;
        }).catch(error => {
            return error
        });

    }

    deleteAbout(id) {
        const params = {
            id: id
        }
        return axios.delete(process.env.VUE_APP_API_URL + '/pmsDoctor/about-api/', {
            headers: authHeader(),
            params
        }).then(response => {


            return response;
        }).catch(error => {
            return error
        });

    }

}

export default AboutService