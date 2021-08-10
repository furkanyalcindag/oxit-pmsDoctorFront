import axios from "axios";
import authHeader from "@/services/auth-header";

class ContactService {


    getContactInfo() {
        return axios.get(process.env.VUE_APP_API_URL + '/pmsDoctor/contact-info-api/', {headers: authHeader()})

    }

    editContactInfo(contact) {
        const params = {
            id: contact.uuid


        }
        return axios.put(process.env.VUE_APP_API_URL + '/pmsDoctor/contact-info-api/', {


            address: contact.address,
            website : contact.website,
            youtube : contact.youtube,
            facebook : contact.facebook,
            instagram : contact.instagram,
            mobilePhone : contact.mobilePhone,
            linkedin : contact.linkedin


        }, {headers: authHeader(), params}).then(response => {


            return response;
        }).catch(error => {
            return error
        });

    }

    deleteStaff(id) {
        const params = {
            id: id
        }
        return axios.delete(process.env.VUE_APP_API_URL + '/pmsDoctor/contact-info-api/', {
            headers: authHeader(),
            params
        }).then(response => {


            return response;
        }).catch(error => {
            return error
        });

    }

}

export default ContactService