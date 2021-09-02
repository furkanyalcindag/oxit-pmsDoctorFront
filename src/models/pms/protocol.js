export default class Clinic {


    constructor(description, assays, patient, uuid, price,isPaid,taxRate,situation) {
        this.description = description
        this.assays = assays
        this.patient = patient
        this.uuid = uuid
        this.price = price
        this.isPaid = isPaid
        this.taxRate = taxRate
        this.situation = situation


    }
}