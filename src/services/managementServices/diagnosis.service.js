import axios from "axios";
import authHeader from "@/services/auth-header";

class DiagnosisService {
    getDiagnosis(id) {
        const params = {
            id: id
        }

        return axios.get(process.env.VUE_APP_API_URL + '/pmsDoctor/diagnosis-api/', {
            headers: authHeader(),
            params
        }).then(response => {
            return response
        }).catch(error => {
            return error
        })
    }

    addDiagnosis(diagnosis) {
        return axios.post(process.env.VUE_APP_API_URL + '/pmsDoctor/diagnosis-api/', {
            diagnosis: diagnosis.diagnosis,
            protocolId: diagnosis.protocolId,
            medicines: diagnosis.medicines
        }, {headers: authHeader()}).then(response => {
            return response
        }).catch(error => {
            return error
        })

    }


}

export default DiagnosisService