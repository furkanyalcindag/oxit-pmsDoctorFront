import axios from "axios";
import authHeader from "@/services/auth-header";


class CustomerService {

    customerAdd(customer) {

        customer.isCorporate = customer.taxNumber != '' || customer.taxNumber != null;


        return axios.post(process.env.VUE_APP_API_URL + '/car-service/customer-api/',
            {
                firstName: customer.firstName,
                lastName: customer.lastName,
                username: customer.username,
                mobilePhone: customer.mobilePhone,
                address: customer.address,
                isCorporate: customer.isCorporate,
                firmName: customer.firmName,
                taxNumber: customer.taxNumber,
                taxOffice: customer.taxOffice

            }, {headers: authHeader()}).then(response => {
            console.log(response)


            return response;
        }).catch(error => {
            console.log("hata", error)
            return error
        });


    }

    customerGet(search, page, per_page) {

        axios.get(`http://localhost:8000/car-service/customer-api/?search=${search}&page=1&per_page=10`, {headers: authHeader()})
            .then(res => {
                return res.data.data;

            })
            .catch(err => console.log(err.response.data));


    }


}

export default CustomerService