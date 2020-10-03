import axios from "axios";
import authHeader from "@/services/auth-header";


class CustomerService {

    customerAdd(customer) {
        return axios.post(process.env.VUE_APP_API_URL + '/car-service/customer-api/',
            {
                firstName: customer.firstName,
                lastName: customer.lastName,
                username: customer.username,
                mobilePhone: customer.mobilePhone,
                address: customer.address,
                isCorporate: customer.isCorporate,
                firmName: customer.firmName,
                taxNumber: customer.taxNumber

            }, {headers: authHeader()}).then(response => {
            console.log(response)


            return response;
        }).catch(error => {
            console.log("hata",error)
          return error
        });


    }


}

export default  CustomerService