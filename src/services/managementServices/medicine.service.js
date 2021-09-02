import axios from "axios";
import authHeader from "@/services/auth-header";

class MedicineService {
    getMedicines(id) {
        const params = {
            id: id
        }
        return axios.get(process.env.VUE_APP_API_URL + '/pmsDoctor/medicine-diagnosis-api/', {
            headers: authHeader(),
            params
        })

    }


}

export default MedicineService