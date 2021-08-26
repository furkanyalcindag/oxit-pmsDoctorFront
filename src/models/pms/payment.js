
export default class Payment {
    constructor(uuid, checkingAccountUUID, paymentAmount, paymentType, discount,protocolId,taxRate) {
        this.uuid = uuid
        this.checkingAccountUUID = checkingAccountUUID
        this.paymentAmount = paymentAmount
        this.paymentType = paymentType
        this.discount = discount
        this.protocolId = protocolId
        this.taxRate =  taxRate

    }
}