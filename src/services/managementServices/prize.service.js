import axios from "axios";
import authHeader from "@/services/auth-header";

class PrizeService {


    getPrizes() {

        return axios.get(process.env.VUE_APP_API_URL + `/pmsDoctor/prize-api/`, {headers: authHeader()})

    }

    addPrize(prize) {
        return axios.post(process.env.VUE_APP_API_URL + '/pmsDoctor/prize-api/',
            {

                title : prize.title,
                description : prize.description,
                image : prize.image,
                date :prize. date


            }, {headers: authHeader()}).then(response => {


            return response;
        }).catch(error => {
            return error
        });


    }

    editPrize(prize) {
        const params = {id: prize.uuid}
        return axios.put(process.env.VUE_APP_API_URL + '/pmsDoctor/prize-api/',
            {
                 title : prize.title,
                description : prize.description,
                image : prize.image,
                date :prize. date

            }, {headers: authHeader(), params}).then(response => {


            return response;
        }).catch(error => {
            return error
        });


    }

    getSinglePrize(id) {
        const params = {
            id: id
        }
        return axios.get(process.env.VUE_APP_API_URL + `/pmsDoctor/prize-api/`, {headers: authHeader(), params})
    }


    deletePrize(id) {
        const params = {
            id: id
        }
        return axios.delete(process.env.VUE_APP_API_URL + `/pmsDoctor/prize-api/`, {headers: authHeader(), params})
    }



}


export default PrizeService
