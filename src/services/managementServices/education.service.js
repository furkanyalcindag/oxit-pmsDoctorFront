import axios from "axios";
import authHeader from "@/services/auth-header";

class EducationService {


    getEducations() {

        return axios.get(process.env.VUE_APP_API_URL + `/pmsDoctor/education-api/`, {headers: authHeader()})

    }

    getEducationsSelect() {

        return axios.get(process.env.VUE_APP_API_URL + `/pmsDoctor/educationt-type-api/`, {headers: authHeader()})

    }

    addEducation(education) {
        return axios.post(process.env.VUE_APP_API_URL + '/pmsDoctor/education-api/',
            {

                universityName : education.universityName,
                facultyName : education.facultyName,
                departmentName : education.departmentName,
                educationTypeId :education.educationType


            }, {headers: authHeader()}).then(response => {


            return response;
        }).catch(error => {
            return error
        });


    }

    editEducation(education) {
        const params = {id: education.uuid}
        return axios.put(process.env.VUE_APP_API_URL + '/pmsDoctor/education-api/',
            {
                universityName : education.universityName,
                facultyName : education.facultyName,
                departmentName : education.departmentName,
                educationTypeId :education. educationType
            }, {headers: authHeader(), params}).then(response => {


            return response;
        }).catch(error => {
            return error
        });


    }

    getSingleEducation(id) {
        const params = {
            id: id
        }
        return axios.get(process.env.VUE_APP_API_URL + `/pmsDoctor/education-api/`, {headers: authHeader(), params})
    }


    deleteEducation(id) {
        const params = {
            id: id
        }
        return axios.delete(process.env.VUE_APP_API_URL + `/pmsDoctor/education-api/`, {headers: authHeader(), params})
    }



}


export default EducationService
