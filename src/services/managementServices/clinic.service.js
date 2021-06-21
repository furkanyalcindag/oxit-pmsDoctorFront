import axios from "axios";
import authHeader from "@/services/auth-header";

class ClinicService {


    getClinics() {
        return axios.get(process.env.VUE_APP_API_URL + `/management/clinic-api/`, {headers: authHeader()})
    }


    getStaffs() {
        return axios.get(process.env.VUE_APP_API_URL + `/management/user-api/`, {headers: authHeader()})

    }


    addClinic(clinic) {
        return axios.post(process.env.VUE_APP_API_URL + '/management/clinic-api/',
            {
                clinicName: clinic.clinicName,
                taxNumber: clinic.taxNumber,
                taxOffice: clinic.taxOffice,
                telephoneNumber: clinic.telephoneNumber,
                address: clinic.address,
                email: clinic.email,
                cityId: clinic.cityId,
                districtId: clinic.districtId
            }, {headers: authHeader()}).then(response => {


            return response;
        }).catch(error => {
            return error
        });


    }


}

export default ClinicService