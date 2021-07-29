import axios from "axios";
import authHeader from "@/services/auth-header";

class AdvertisementService {

    getAdvertisement() {
        return axios.get(process.env.VUE_APP_API_URL + '/management/advertising-management-api/', {headers: authHeader()}).then(response => {
            return response
        }).catch(error => {
            return error
        })

    }

    addAdvertisement(advertisement) {
        return axios.post(process.env.VUE_APP_API_URL + '/management/advertising-management-api/', {
            name: advertisement.name,
            companyId: advertisement.companyName.value,
            locationId: advertisement.locationName.value,
            publishEndDate: advertisement.publishEndDate,
            publishStartDate: advertisement.publishStartDate,
            price: advertisement.price
        }, {headers: authHeader()}).then(response => {
            return response;
        }).catch(error => {
            return error
        })

    }

    editAdvertisement(advertisement) {
        const params = {
            id: advertisement.uuid
        }
        return axios.put(process.env.VUE_APP_API_URL + '/management/advertising-management-api/', {
            name: advertisement.name,
            companyId: advertisement.companyName,
            locationId: advertisement.locationName,
            publishEndDate: advertisement.publishEndDate,
            publishStartDate: advertisement.publishStartDate,
            price: advertisement.price
        }, {headers: authHeader(), params}).then(response => {
            return response;
        }).catch(error => {
            return error
        })

    }

    getSingleAdvertisement(id) {
        const params = {
            id: id
        }
        return axios.get(process.env.VUE_APP_API_URL + '/management/advertising-management-api/', {
            headers: authHeader(),
            params
        })


    }

    deleteAdvertisement(id) {
        const params = {
            id: id
        }
        return axios.get(process.env.VUE_APP_API_URL + '/management/advertising-management-api/', {
            headers: authHeader(),
            params
        })

    }


}

export default AdvertisementService