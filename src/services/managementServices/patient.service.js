


import axios from "axios";
import authHeader from "@/services/auth-header";

class PatientService {


  getPatient() {

        return axios.get(process.env.VUE_APP_API_URL + `/pmsDoctor/patient-api/`, {headers: authHeader()})

    }

     getPatientSelect() {

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
                birthDate : patient.birthDate,
                bloodGroupId : patient.bloodGroup,
                email : patient.email

            },
            {headers: authHeader()
            }).then(response => {
            return response;
        }).catch(error => {
            return error.response
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
                birthDate : patient.birthDate,
                bloodGroupId : patient.bloodGroup,
                email : patient.email
            }, {headers: authHeader(),params}).then(response => {
            return response;
        }).catch(error => {
            return error.response
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
        return axios.delete(process.env.VUE_APP_API_URL + `/pmsDoctor/patient-api/`,
            {headers: authHeader(),
                params
            })
    }





}



export default PatientService
