import axios from "axios";
import authHeader from "@/services/auth-header";

class DepartmentService {


  getDepartment() {

        return axios.get(process.env.VUE_APP_API_URL + `/pmsDoctor/department-api/`, {headers: authHeader()})

    }

}

export default DepartmentService
