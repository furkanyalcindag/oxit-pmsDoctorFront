export default class Appointment {
    constructor(uuid, time, date, isPaid, doctorId, patientId, price, endTime) {
        this.uuid = uuid
        this.time = time
        this.endTime= endTime
        this.date = date
        this.doctorId = doctorId
        this.patientId = patientId



    }
}