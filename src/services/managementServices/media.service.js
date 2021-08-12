
import axios from "axios";
import authHeader from "@/services/auth-header";

class MediaService {


  getMedia() {

        return axios.get(process.env.VUE_APP_API_URL + `/pmsDoctor/media-api/`, {headers: authHeader()})

    }


     addMedia(media) {
        return axios.post(process.env.VUE_APP_API_URL + '/pmsDoctor/media-api/',
            {
                media: media.media,
            }, {headers: authHeader()}).then(response => {


            return response;
        }).catch(error => {
            return error
        });


    }



      getSingleMedia(id) {
        const params = {
            id: id
        }
        return axios.get(process.env.VUE_APP_API_URL + `/pmsDoctor/media-api/`, {headers: authHeader(), params})
    }


     deleteMedia(id) {
        const params = {
            id: id
        }
        return axios.delete(process.env.VUE_APP_API_URL + `/pmsDoctor/media-api/`, {headers: authHeader(), params})
    }




}



export default MediaService
