import axios from 'axios'
import authHeader from '@/services/auth-header'

class AppointmentService {
    addAppointment(appointment) {
        // eslint-disable-next-line no-undef
        return axios.post(process.env.VUE_APP_API_URL + '/pmsDoctor/appointment-api/',
            {
                time: appointment.time,
                date: appointment.date,
                isPaid: appointment.isPaid,
                doctorId: appointment.doctorId,
                patientId: appointment.patientId,
                price: appointment.price

            }, {headers: authHeader()}).then(response => {
            return response;
        }).catch(error => {
            return error;
        });
    }


    getAppointment() {




        // eslint-disable-next-line no-undef
        return axios.get(process.env.VUE_APP_API_URL + '/pmsDoctor/appointment-api/', {
            headers: authHeader(),

        })

    }


    deleteAppointment(uuid) {
        const params = {
            id: uuid,
        };
        // eslint-disable-next-line no-undef
        return axios.delete(process.env.VUE_APP_API_URL + '/pmsDoctor/appointment-api/', {
            headers: authHeader(),
            params
        }).then(response => {
            return response;
        }).catch(error => {
            if (error.response) {
                return error.response
            } else if (error.request) {
                //client never received a response, or request never left
            } else {
                // anything else
            }
        })
    }

    getSingleAppointment(appointment_uuid) {
        const params = {
            id: appointment_uuid,

        }
        // eslint-disable-next-line no-undef
        return axios.get(process.env.VUE_APP_API_URL +'/pmsDoctor/appointment-api/', {
            headers: authHeader(),
            params
        })

    }

    updateAppointment(appointment) {
        const params = {
            id: appointment.uuid
        }
        // eslint-disable-next-line no-undef
        return axios.put(process.env.VUE_APP_API_URL + '/pmsDoctor/appointment-api/',
            {
                time: appointment.time,
                date: appointment.date,
                isPaid: appointment.isPaid,
                doctorId: appointment.doctorId,
                patientId: appointment.patientId,
                price: appointment.price
            }, {headers: authHeader(), params}).then(response => {
            return response;
        }).catch(error => {
            return error
        })

    }

    appointmentCalendar(startTime,endTime) {
        const params =  {
            startTime: startTime,
            endTime : endTime
        }
        return axios.get(process.env.VUE_APP_API_URL + '/pmsDoctor/appointment-calendar-api/', {headers:authHeader(),params})



}

    appointmentCalendarSingle(id) {
        const params =  {

            id:id
        }
        return axios.get(process.env.VUE_APP_API_URL + '/pmsDoctor/appointment-calendar-api/', {headers:authHeader(),params})



}




}

export default AppointmentService
