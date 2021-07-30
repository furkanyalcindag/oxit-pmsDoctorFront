import axios from "axios";
import authHeader from "@/services/auth-header";

class UserService {


    getGroups() {
        return axios.get(process.env.VUE_APP_API_URL + `/management/group-api/`, {headers: authHeader()})
    }


    getStaffs() {
        return axios.get(process.env.VUE_APP_API_URL + `/management/user-api/`, {headers: authHeader()})

    }


    addStaff(staff) {
        return axios.post(process.env.VUE_APP_API_URL + '/management/user-api/',
            {
                firstName: staff.firstName,
                lastName: staff.lastName,
                email: staff.username,
                mobilePhone: staff.mobilePhone,
                address: staff.address,
                groupId: staff.group


            }, {headers: authHeader()}).then(response => {


            return response;
        }).catch(error => {
            return error
        });


    }


}

export default UserService