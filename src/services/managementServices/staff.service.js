import axios from "axios";
import authHeader from "@/services/auth-header";

class StaffService {

    getStaffs(page) {
        const params = {
            activePage: page
        }
        return axios.get(process.env.VUE_APP_API_URL + '/management/staff-api/', {headers: authHeader(), params})

    }

    getGeneralInfo() {
        return axios.get(process.env.VUE_APP_API_URL + '/pmsDoctor/general-info-api/', {headers: authHeader()})

    }

    editGeneralInfo(staff) {
        const params = {
            id: staff.uuid


        }
        return axios.put(process.env.VUE_APP_API_URL + '/pmsDoctor/general-info-api/', {
            profileImage: staff.profileImage,
            diplomaNo: staff.diplomaNo,
            departmentId: staff.department,
            profession: staff.profession,
            title: staff.title


        }, {headers: authHeader(), params}).then(response => {


            return response;
        }).catch(error => {
            return error
        });

    }

    addStaff(staff) {
        return axios.post(process.env.VUE_APP_API_URL + '/management/staff-api/', {
            firstName: staff.firstName,
            lastName: staff.lastName,
            email: staff.email,
            mobilePhone: staff.mobilePhone,
            groupId: staff.group,
            address: staff.address
        }, {headers: authHeader()}).then(response => {


            return response;
        }).catch(error => {
            return error
        });


    }

    editStaff(staff) {
        const params = {
            id: staff.uuid

        }
        return axios.put(process.env.VUE_APP_API_URL + '/management/staff-api/', {
            firstName: staff.firstName,
            lastName: staff.lastName,
            email: staff.email,
            mobilePhone: staff.mobilePhone,
            groupId: staff.group,
            address: staff.address
        }, {headers: authHeader(), params}).then(response => {


            return response;
        }).catch(error => {
            return error
        });

    }

    deleteStaff(id) {
        const params = {
            id: id
        }
        return axios.delete(process.env.VUE_APP_API_URL + '/management/staff-api/', {
            headers: authHeader(),
            params
        }).then(response => {


            return response;
        }).catch(error => {
            return error
        });

    }

    getSingleStaff(id) {
        const params = {
            id: id
        }

        return axios.get(process.env.VUE_APP_API_URL + '/management/staff-api/', {headers: authHeader(), params})

    }
}

export default StaffService