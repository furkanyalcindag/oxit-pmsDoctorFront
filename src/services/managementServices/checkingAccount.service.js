import axios from "axios";
import authHeader from "@/services/auth-header";

class CheckingAccountService {

    checkingAccountList(id) {
        const params = {
            id: id

        };

        return axios.get(process.env.VUE_APP_API_URL + `/pmsDoctor/checking-account-api/`, {
            headers: authHeader(),
            params
        })


    }

    getPaymentType() {
        return axios.get(process.env.VUE_APP_API_URL + `/pmsDoctor/payment-type-select-api/`, {headers: authHeader()})
    }

    addPayment(payment) {
        return axios.post(process.env.VUE_APP_API_URL + '/pmsDoctor/payment-api/',
            {
                checkingAccountUUID: payment.checkingAccountUUID,
                paymentAmount: payment.paymentAmount,
                paymentType: payment.paymentType


            }, {headers: authHeader()}).then(response => {


            return response;
        }).catch(error => {
            return error
        });


    }

    makeDiscount(discount) {
        return axios.post(process.env.VUE_APP_API_URL + '/pmsDoctor/payment-discount-api/',
            {
                checkingAccountUUID: discount.checkingAccountUUID,
                paymentAmount: discount.paymentAmount,


            }, {headers: authHeader()}).then(response => {


            return response;
        }).catch(error => {
            return error
        });


    }


    getPaymentMovement(id) {
        const params = {
            id: id

        };
        return axios.get(process.env.VUE_APP_API_URL + '/pmsDoctor/payment-movement-api/',
            {
                headers: authHeader(),
                params
            }).then(response => {


            return response;
        }).catch(error => {
            return error
        });


    }


    getCheckingAccountData() {

        return axios.get(process.env.VUE_APP_API_URL + '/pmsDoctor/total-checking-account-api/',
            {
                headers: authHeader(),

            }).then(response => {


            return response;
        }).catch(error => {
            return error
        });


    }

    getMomentaryCheckingAccount() {
        return axios.get(process.env.VUE_APP_API_URL + '/pmsDoctor/momentary-checking-account-api/', {headers: authHeader()})
    }
    getAllCheckingAccount() {
        return axios.get(process.env.VUE_APP_API_URL + '/pmsDoctor/all-checking-account-api/', {headers: authHeader()})
    }


}

export default CheckingAccountService