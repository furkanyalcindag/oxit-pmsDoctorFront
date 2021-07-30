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
                districtId: clinic.districtId,
                staffName: clinic.staffName,
                staffSurname: clinic.staffSurname
            }, {headers: authHeader()}).then(response => {


            return response;
        }).catch(error => {
            return error
        });


    }

    editClinic(clinic) {
        const params = {
            id: clinic.uuid
        }
        return axios.put(process.env.VUE_APP_API_URL + '/management/clinic-api/',
            {
                clinicName: clinic.clinicName,
                taxNumber: clinic.taxNumber,
                taxOffice: clinic.taxOffice,
                // telephoneNumber: clinic.telephoneNumber,
                address: clinic.address,
                email: clinic.email,
                cityId: clinic.cityId,
                districtId: clinic.districtId
            }, {headers: authHeader(), params}).then(response => {


            return response;
        }).catch(error => {
            return error
        });


    }

    getSingleClinic(id) {
        const params = {
            id: id
        }
        return axios.get(process.env.VUE_APP_API_URL + `/management/clinic-api/`, {headers: authHeader(), params})
    }

    deleteClinic(id) {
        const params = {
            id: id
        }
        return axios.delete(process.env.VUE_APP_API_URL + `/management/clinic-api/`, {headers: authHeader(), params})
    }


}

export default ClinicService