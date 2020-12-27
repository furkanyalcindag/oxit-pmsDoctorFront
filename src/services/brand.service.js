import axios from "axios";
import authHeader from "@/services/auth-header";


class BrandService {

    addBrand(brand) {
        return axios.post(process.env.VUE_APP_API_URL + '/car-service/brand-api/',
            {
                name: brand.name,

            }, {headers: authHeader()}).then(response => {
            console.log(response)


            return response;
        }).catch(error => {
            console.log("hata", error)
            return error
        });


    }

    getBrands() {
        return axios.get(process.env.VUE_APP_API_URL + `/car-service/brand-api/`, {headers: authHeader()})


    }
}

export default BrandService