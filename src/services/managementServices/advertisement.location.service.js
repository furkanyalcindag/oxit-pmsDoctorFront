import axios from "axios";
import authHeader from "@/services/auth-header";

class AdvertisementLocationService {
    getAdvertisementLocation() {
        return axios.get(process.env.VUE_APP_API_URL + '/management/advertising-location-api/', {headers: authHeader()})

    }

    addAdvertisementLocation(advertisementLocation) {
        return axios.post(process.env.VUE_APP_API_URL + '/management/advertising-location-api/', {
            name: advertisementLocation.name,
            width: advertisementLocation.width,
            height: advertisementLocation.height
        }, {headers: authHeader()})

    }

    editAdvertisementLocation(advertisementLocation) {
        const params = {
            id: advertisementLocation.uuid


        }
        return axios.put(process.env.VUE_APP_API_URL + '/management/advertising-location-api/', {
            name: advertisementLocation.name,
            width: advertisementLocation.width,
            height: advertisementLocation.height
        }, {headers: authHeader(), params})

    }

    getSingleAdvertisementLocation(id) {
        const params = {
            id: id
        }
        return axios.get(process.env.VUE_APP_API_URL + '/management/advertising-location-api/', {
            headers: authHeader(),
            params
        })

    }

    deleteAdvertisementLocation(id) {
        const params = {
            id: id
        }
        return axios.delete(process.env.VUE_APP_API_URL + '/management/advertising-location-api/', {
            headers: authHeader(),
            params
        })


    }

      selectAdvertisementLocation() {
        return axios.get(process.env.VUE_APP_API_URL + '/management/advertising-location-select-api/', {headers: authHeader()})

    }



}

export default AdvertisementLocationService