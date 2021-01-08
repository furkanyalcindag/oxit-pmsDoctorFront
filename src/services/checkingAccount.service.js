import axios from "axios";
import authHeader from "@/services/auth-header";

class CheckingAccountService {

    checkingAccountList() {

        return axios.get(process.env.VUE_APP_API_URL + `/car-service/checking-account-api/`, {headers: authHeader()})


    }

    getPaymentType() {
        return axios.get(process.env.VUE_APP_API_URL + `/car-service/payment-type-select-api/`, {headers: authHeader()})


    }


}

export default CheckingAccountService