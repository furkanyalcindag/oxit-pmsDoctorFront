import axios from "axios";
import authHeader from "@/services/auth-header";

class DashboardService {
    getAdminDashboard() {

        return axios.get(process.env.VUE_APP_API_URL + `/car-service/get-admin-dashboard-api/`, {headers: authHeader()})


    }

}

export default DashboardService