import authHeader from "@/services/auth-header";
import axios from "axios";


class GeneralService {


    getCity() {

        return axios.get(process.env.VUE_APP_API_URL + `/management/city-district-api/`, {headers: authHeader()})

    }


    getDistrict(id) {

        const params = {
            id: id

        };

        return axios.get(process.env.VUE_APP_API_URL + `/management/city-district-api/`, {
            headers: authHeader(),
            params
        })

    }


}


export default GeneralService
