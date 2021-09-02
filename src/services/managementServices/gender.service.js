import axios from "axios";
import authHeader from "@/services/auth-header";

class GenderService {


  getGender() {

        return axios.get(process.env.VUE_APP_API_URL + `/pmsDoctor/gender-api/`, {headers: authHeader()})

    }

}

export default GenderService
