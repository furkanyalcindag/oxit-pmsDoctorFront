import axios from "axios";
import authHeader from "@/services/auth-header";

class CompanyService {

    addCompany(company) {
        return axios.post(process.env.VUE_APP_API_URL + '/management/company-api/', {
            companyName: company.companyName,
            email: company.email,
            taxOffice: company.taxOffice,
            taxNumber: company.taxNumber
        }, {headers: authHeader()}).then(response => {
            return response
        }).catch(error => {
            return error
        })
    }

    editCompany(company) {
        const params = {
            id: company.uuid
        }
        return axios.put(process.env.VUE_APP_API_URL + '/management/company-api/', {
            companyName: company.companyName,
            email: company.email,
            taxOffice: company.taxOffice,
            taxNumber: company.taxNumber
        }, {headers: authHeader(), params}).then(response => {


            return response;
        }).catch(error => {
            return error
        });
    }

    getCompanies(page) {
        const params = {
            activePage: page
        }
        return axios.get(process.env.VUE_APP_API_URL + '/management/company-api/', {headers: authHeader(), params})
    }

    getSingleCompany(id) {
        const params = {
            id: id
        }
        return axios.get(process.env.VUE_APP_API_URL + '/management/company-api/', {headers: authHeader(), params})
    }

    deleteCompany(id) {
        const params = {
            id: id
        }
        return axios.delete(process.env.VUE_APP_API_URL + '/management/company-api/', {
            headers: authHeader(),
            params
        }).then(response => {


            return response;
        }).catch(error => {
            return error
        });
    }

    selectCompanies() {
        return axios.get(process.env.VUE_APP_API_URL + '/management/company-select-api/', {headers: authHeader()})
    }


}

export default CompanyService