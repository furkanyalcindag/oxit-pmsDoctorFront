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
            assays: protocol.assays

        }, {headers: authHeader()})

    }


    editProtocol(protocol) {

        const params = {

            id: protocol.uuid
        }

        return axios.put(process.env.VUE_APP_API_URL + '/pmsDoctor/protocol-api/', {

            description: protocol.description,
            patientId: protocol.patient,
            assays: protocol.assays

        }, {headers: authHeader(), params})

    }


    deleteProtocols(id) {


        const params = {
            id: id
        }

        return axios.delete(process.env.VUE_APP_API_URL + '/pmsDoctor/protocol-api/', {headers: authHeader(), params})
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
