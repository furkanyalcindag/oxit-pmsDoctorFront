import axios from "axios";
import authHeader from "@/services/auth-header";

class BloodService {


  getBloodGroup() {

        return axios.get(process.env.VUE_APP_API_URL + `/pmsDoctor/blood-api/`, {headers: authHeader()})

    }

}

export default BloodService
