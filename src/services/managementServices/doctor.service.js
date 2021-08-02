
import axios from "axios";
import authHeader from "@/services/auth-header";

class DoctorService {


  getDoctor() {

        return axios.get(process.env.VUE_APP_API_URL + `/pmsDoctor/doctor-api/`, {headers: authHeader()})

    }
     addDoctor(doctor) {
        return axios.post(process.env.VUE_APP_API_URL + '/pmsDoctor/doctor-api/',
            {
                firstName: doctor.firstName,
                lastName: doctor.lastName,
                insuranceNumber: doctor.insuranceNumber,
                diplomaNo: doctor.diplomaNo,
                title: doctor.title,
                email: doctor.email,
                departmentId: doctor.department,

            }, {headers: authHeader()}).then(response => {


            return response;
        }).catch(error => {
            return error
        });


    }

     editDoctor(doctor) {
       const params =  { id : doctor.uuid}
        return axios.put(process.env.VUE_APP_API_URL + '/pmsDoctor/doctor-api/',
            {
                firstName: doctor.firstName,
                lastName: doctor.lastName,
                insuranceNumber: doctor.insuranceNumber,
                diplomaNo: doctor.diplomaNo,
                title: doctor.title,
                email: doctor.email,
                departmentId: doctor.department,

            }, {headers: authHeader(),params}).then(response => {


            return response;
        }).catch(error => {
            return error
        });


    }

      getSingleDoctor(id) {
        const params = {
            id: id
        }
        return axios.get(process.env.VUE_APP_API_URL + `/pmsDoctor/doctor-api/`, {headers: authHeader(), params})
    }


     deleteDoctor(id) {
        const params = {
            id: id
        }
        return axios.delete(process.env.VUE_APP_API_URL + `/pmsDoctor/doctor-api/`, {headers: authHeader(), params})
    }




}



export default DoctorService
