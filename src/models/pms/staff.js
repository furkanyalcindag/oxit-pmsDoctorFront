export default class Staff {


    constructor(firstName, lastName, email, mobilePhone, uuid, address, profession, profileImage,diplomaNo, insuranceNumber,departmentId,title,username,group) {
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.group = group
        this.mobilePhone = mobilePhone
        this.uuid = uuid
        this.address = address
        this.profession = profession
        this.profileImage = profileImage
        this.diplomaNo = diplomaNo
        this.insuranceNumber = insuranceNumber
        this.title = title
        this.departmentId = departmentId
        this.username = username
        this.group = group
    }
}