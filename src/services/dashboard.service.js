import axios from "axios";
import authHeader from "@/services/auth-header";

class DashboardService {
    getAdminDashboard() {

        return axios.get(process.env.VUE_APP_API_URL + `/car-service/get-admin-dashboard-api/`, {headers: authHeader()})
            .then(response => {
            console.log(response)
            return response;
        }).catch((err) => {
            if (err.response) {
                console.log("resp", err.response)
                return err.response
            } else if (err.request) {
                // client never received a response, or request never left
                console.log("req", err.request)
            } else {
                // anything else
            }
        })


    }

}

export default DashboardService