


import axios from "axios";
import authHeader from "@/services/auth-header";

class PatientService {


  getPatients() {

        return axios.get(process.env.VUE_APP_API_URL + `/pmsDoctor/patient-api/`, {headers: authHeader()})

    }

     getPatientsSelect() {

        return axios.get(process.env.VUE_APP_API_URL + `/pmsDoctor/patient-select-api/`, {headers: authHeader()})

    }
     addPatient(patient) {
        return axios.post(process.env.VUE_APP_API_URL + '/pmsDoctor/patient-api/',
            {
                firstName: patient.firstName,
                lastName: patient.lastName,
                genderId : patient.gender,
                identityNumber :patient.identityNumber,
                mobilePhone : patient.mobilePhone,
                address : patient.address,
                birthDate : patient.birthdate,
                bloodGroupId : patient.bloodgroup,
                email : patient.email



            }, {headers: authHeader()}).then(response => {


            return response;
        }).catch(error => {
            return error
        });


    }

     editPatient(patient) {
       const params =  { id : patient.uuid}
        return axios.put(process.env.VUE_APP_API_URL + '/pmsDoctor/patient-api/',
            {
                firstName: patient.firstName,
                lastName: patient.lastName,
                genderId : patient.gender,
                identityNumber :patient.identityNumber,
                mobilePhone : patient.mobilePhone,
                address : patient.address,
                birthDate : patient.birthdate,
                bloodGroupId : patient.bloodgroup,
                email : patient.email
            }, {headers: authHeader(),params}).then(response => {


            return response;
        }).catch(error => {
            return error
        });


    }

      getSinglePatient(id) {
        const params = {
            id: id
        }
        return axios.get(process.env.VUE_APP_API_URL + `/pmsDoctor/patient-api/`, {headers: authHeader(), params})
    }


     deletePatient(id) {
        const params = {
            id: id
        }
        return axios.delete(process.env.VUE_APP_API_URL + `/pmsDoctor/patient-api/`, {headers: authHeader(), params})
    }




}



export default PatientService
