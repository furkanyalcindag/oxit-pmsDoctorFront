import axios from "axios";
import authHeader from "@/services/auth-header";

class EducationTypeService {


  getEducationType() {

        return axios.get(process.env.VUE_APP_API_URL + `/pmsDoctor/education-type-api/`, {headers: authHeader()})

    }

}

export default EducationTypeService
