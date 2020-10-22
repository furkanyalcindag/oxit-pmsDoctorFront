import axios from "axios";
import authHeader from "@/services/auth-header";


class CarService {



    carAdd(car) {
        return axios.post(process.env.VUE_APP_API_URL + '/car-service/car-api/',
            {
                profileUuid : car.profileUuid,
                plate : car.plate,
                brand : car.brand,
                model : car.model,
                year : car.year,
                engine : car.engine,
                oilType : car.oilType,
                chassisNumber : car.chassisNumber,
                currentKM : car.currentKM,
                engineNumber : car.engineNumber,
                color : car.color

            }, {headers: authHeader()}).then(response => {
            console.log(response)


            return response;
        }).catch(error => {
            console.log("hata", error)
            return error
        });


    }
}
export default  CarService