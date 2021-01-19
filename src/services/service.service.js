import axios from "axios";
import authHeader from "@/services/auth-header";


class ServiceService {

    addService(service) {
        return axios.post(process.env.VUE_APP_API_URL + '/car-service/service-api/',
            {
                carUUID: service.carUUID,
                serviceType: service.serviceType,
                serviceKM: service.serviceKM,
                complaint: service.complaint,
                responsiblePerson: service.responsiblePerson,
                serviceman: service.serviceman


            }, {headers: authHeader()}).then(response => {


            return response;
        }).catch(error => {
            console.log("hata", error)
            return error
        });


    }


    getServices() {
        return axios.get(process.env.VUE_APP_API_URL + `/car-service/service-api/`, {headers: authHeader()})


    }

    getServiceType() {
        return axios.get(process.env.VUE_APP_API_URL + `/car-service/service-type-select-api/`, {headers: authHeader()})


    }

    getCarServices(id) {
        const params = {
            uuid: id

        };

        return axios.get(process.env.VUE_APP_API_URL + `/car-service/get-car-services-api/`, {
            headers: authHeader(),
            params
        })


    }

    getServicesList() {
        return axios.get(process.env.VUE_APP_API_URL + `/car-service/get-services-api/`, {headers: authHeader()})


    }


    getServiceDetail(id) {
        const params = {
            uuid: id

        };

        return axios.get(process.env.VUE_APP_API_URL + `/car-service/get-service-detail-api/`, {
            headers: authHeader(),
            params
        })


    }

    addServiceDetermination(uuid, photos, products, determination, laborPrice, laborTaxRate, laborName) {
        return axios.post(process.env.VUE_APP_API_URL + '/car-service/service-determination-api/',
            {
                uuid: uuid,
                photos: photos,
                products: products,
                determination: determination,
                laborPrice: laborPrice,
                laborTaxRate: laborTaxRate,
                laborName: laborName


            }, {headers: authHeader()}).then(response => {


            return response;
        }).catch(error => {
            console.log("hata", error)
            return error
        });


    }

    getServiceProducts(id) {
        const params = {
            uuid: id

        };

        return axios.get(process.env.VUE_APP_API_URL + `/car-service/get-service-products-api/`, {
            headers: authHeader(),
            params
        })


    }


    getServiceImages(id) {
        const params = {
            uuid: id

        };

        return axios.get(process.env.VUE_APP_API_URL + `/car-service/get-service-images-api/`, {
            headers: authHeader(),
            params
        })


    }

    acceptService(uuid, isAccept) {
        return axios.post(process.env.VUE_APP_API_URL + '/car-service/service-approve-api/',
            {
                uuid: uuid,
                isAccept: isAccept,


            }, {headers: authHeader()}).then(response => {


            return response;
        }).catch(error => {
            console.log("hata", error)
            return error
        });


    }

    ServiceProcessing(uuid, situationNo, receiverPerson) {
        if (situationNo === 3) {

            return axios.post(process.env.VUE_APP_API_URL + '/car-service/service-processing-api/',
                {
                    uuid: uuid,
                    situationNo: situationNo,
                    receiverPerson: receiverPerson


                }, {headers: authHeader()}).then(response => {


                return response;
            }).catch(error => {
                console.log("hata", error)
                return error
            });


        } else {
            return axios.post(process.env.VUE_APP_API_URL + '/car-service/service-processing-api/',
                {
                    uuid: uuid,
                    situationNo: situationNo,


                }, {headers: authHeader()}).then(response => {


                return response;
            }).catch(error => {
                console.log("hata", error)
                return error
            });
        }


    }


}

export default ServiceService