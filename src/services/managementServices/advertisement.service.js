import axios from "axios";
import authHeader from "@/services/auth-header";

class AdvertisementLocationService {
    getAdvertisementLocation(page) {
        const params = {
            activePage: page
        }
        return axios.get(process.env.VUE_APP_API_URL + '/management/advertising-api/', {headers: authHeader(), params})

    }

    addAdvertisementLocation(advertisement) {
        return axios.post(process.env.VUE_APP_API_URL + '/management/advertising-api/', {
            name: advertisement.name,
            width: advertisement.width,
            height: advertisement.height,
            price: advertisement.price
        }, {headers: authHeader()})

    }

    editAdvertisementLocation(advertisementLocation) {
        const params = {
            id: advertisementLocation.uuid


        }
        return axios.put(process.env.VUE_APP_API_URL + '/management/advertising-api/', {
            name: advertisementLocation.name,
            width: advertisementLocation.width,
            height: advertisementLocation.height,
            price: advertisementLocation.price
        }, {headers: authHeader(), params})

    }

    getSingleAdvertisementLocation(id) {
        const params = {
            id: id
        }
        return axios.get(process.env.VUE_APP_API_URL + '/management/advertising-api/', {
            headers: authHeader(),
            params
        })

    }

    deleteAdvertisementLocation(id) {
        const params = {
            id: id
        }
        return axios.delete(process.env.VUE_APP_API_URL + '/management/advertising-api/', {
            headers: authHeader(),
            params
        })


    }

    selectAdvertisementLocation() {
        return axios.get(process.env.VUE_APP_API_URL + '/management/advertising-select-api/', {headers: authHeader()})

    }


}

export default AdvertisementLocationService