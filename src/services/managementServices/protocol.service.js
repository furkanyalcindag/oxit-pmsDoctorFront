import axios from "axios";
import authHeader from "@/services/auth-header";

class ProtocolService {


    getProtocols() {

        return axios.get(process.env.VUE_APP_API_URL + '/pmsDoctor/protocol-api/', {headers: authHeader()})
    }

    getPatientProtocols(id) {
        const params = {
            id: id
        }

        return axios.get(process.env.VUE_APP_API_URL + '/pmsDoctor/protocol-api/', {headers: authHeader(), params})
    }

    getSingleProtocol(id) {

        const params = {
            protocolId: id
        }

        return axios.get(process.env.VUE_APP_API_URL + '/pmsDoctor/protocol-api/', {headers: authHeader(), params})

    }

    addProtocol(protocol) {


        return axios.post(process.env.VUE_APP_API_URL + '/pmsDoctor/protocol-api/', {

            description: protocol.description,
            patientId: protocol.patient,
            assays: protocol.assays,
            price: protocol.price,
            isPaid: protocol.isPaid,
            taxRate: protocol.taxRate,

        }, {headers: authHeader()}).then(response => {
            return response
        }).catch(error => {
            return error
        })

    }

    getResultAssay(id, patientId) {
        const params = {
            id: id,
            patientId: patientId
        }
        return axios.get(process.env.VUE_APP_API_URL + '', {headers: authHeader(), params})

    }


}

export default ProtocolService
