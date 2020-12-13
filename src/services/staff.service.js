import axios from "axios";
import authHeader from "@/services/auth-header";


class StaffService {

    addStaff(staff) {
        return axios.post(process.env.VUE_APP_API_URL + '/car-service/staff-api/',
            {
                firstName: staff.firstName,
                lastName: staff.lastName,
                username: staff.username,
                mobilePhone: staff.mobilePhone,
                address: staff.address,
                group: staff.group


            }, {headers: authHeader()}).then(response => {
            console.log(response)


            return response;
        }).catch(error => {
            console.log("hata", error)
            return error
        });


    }



    getStaffs() {
        return axios.get(process.env.VUE_APP_API_URL + `/car-service/staff-api/`, {headers: authHeader()})


    }


}

export default StaffService