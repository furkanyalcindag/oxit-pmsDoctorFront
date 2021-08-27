import UserService from "../services/UserService"

const user_group = UserService.getUserGroup()
const groups = {
    admin: "Admin",
    clinic: "Clinic",
    secretary: "Secretary",
    patient: "Patient",
    doctor: "Doctor",
    staff: "Staff",
    company: "Company"

}

var dashboard_link = ""
switch (user_group) {
    case groups.admin:
        dashboard_link = "admin-dashboard"
        break;
    case groups.secretary:
        dashboard_link = "secretary-dashboard"
        break;
    case groups.doctor:
        dashboard_link = "doctor-dashboard"
        break;
    default:
        break;
}

const home = {
    _name: 'CSidebarNavItem',
    name: 'Anasayfa',
    to: `/${dashboard_link}`,
    icon: 'cil-speedometer',
}
const actions = {
    _name: 'CSidebarNavTitle',
    _children: ['İşlemler']
}
const doctor = {
    _name: 'CSidebarNavItem',
    name: 'Doktor',
    to: '/doctor/list',
    icon: 'cil-user'
}
const patient = {
    _name: 'CSidebarNavItem',
    name: 'Hasta',
    to: '/patient/list',
    icon: 'cil-user',
}
const assay = {
    _name: 'CSidebarNavItem',
    name: 'Tahliller',
    to: '/assay/assay',
    icon: 'cil-user',
}

const blog = {
    _name: 'CSidebarNavItem',
    name: 'Blog',
    to: '/blog/blog',
    icon: 'cil-user',
}

const patientCalendar = {
    _name: 'CSidebarNavItem',
    name: 'Hasta Takvimi',
    to: '/patientCalendar/patientCalendar',
    icon: 'cil-user',
}
const secretary = {
    _name: 'CSidebarNavItem',
    name: 'Sekreter',
    to: '/secretary/list',
    icon: 'cil-user',
}
const clinic = {
    _name: 'CSidebarNavDropdown',
    name: 'Klinik',
    route: '/clinic/clinic',
    icon: 'cil-people',
}


const staffs = {
    _name: 'CSidebarNavDropdown',
    name: 'Personel',
    icon: 'cil-file',
    items: [
        {
            name: 'Personel',
            to: '/staffs'
        },
        {
            name: 'Grup',
            to: '/group'
        }
    ]
}
// const protocol = {
// _name: 'CSidebarNavItem',
// name: 'Protokol',
// to: '/protocol',
// icon: 'cil-file',
// }
const permission = {
    _name: 'CSidebarNavItem',
    name: 'Yetkilendirme',
    to: '/permission',
    icon: 'cil-file',
}
const advertisement = {
    _name: 'CSidebarNavDropdown',
    name: 'Reklam ',
    icon: 'cil-file',
    items: [
        {
            name: 'Reklam Ekleme',
            to: '/advertisement'
        },
        {
            name: 'Reklam Yeri',
            to: '/advertisement/location'
        },
        {
            name: 'Firma',
            to: '/advertisement/company'
        }
    ]

}
const notifications = {
    _name: 'CSidebarNavItem',
    name: 'Bildirim ',
    to: '/notifications',
    icon: 'cil-file',
}
const wristbands = {
    _name: 'CSidebarNavItem',
    name: 'Bileklik ',
    to: '/wristbands',
    icon: 'cil-file',
}
const appointment = {
    _name: 'CSidebarNavItem',
    name: 'Randevu',
    to: '/appointment/appointment',
    icon: 'cil-people',
}
const doctorProfile = {
    _name: 'CSidebarNavItem',
    name: 'Doktor Profil',
    to: '/profile',
    icon: 'cil-people',
}


const contracts = {
    _name: 'CSidebarNavItem',
    name: 'Sözleşme',
    to: '/contracts',
    icon: 'cil-file',

}
const accounting = {
    _name: 'CSidebarNavDropdown',
    name: 'Muhasebe',
    icon: 'cil-file',
    items: [
        {
            name: 'Firma',
            to: '/accounting-company'
        },
        {
            name: 'Klinik',
            to: '/accounting-clinic'
        },
        {
            name: 'Personel',
            to: '/accounting-staff'
        },
        {
            name: 'Referans Bazlı',
            to: '/accounting-reference'
        }
    ]

}
var items = []
// items.push(home)
items.push(actions)
if (user_group === groups.clinic || user_group === groups.doctor) {
    items.push(assay)
    items.push(appointment)
    items.push(patient)



}
if (user_group === groups.admin) {
    items.push(staffs)
    items.push(clinic)
    items.push(permission)
    items.push(wristbands)
    items.push(contracts)
    items.push(advertisement)
    items.push(accounting)
    items.push(notifications)

}
if (user_group === groups.clinic) {
    items.push(doctor)
    items.push(secretary)
}
if (user_group === 'Doctor') {
    items.push(patientCalendar)
// items.push(protocol)
    items.push(doctorProfile)
    items.push(blog)
}
export default [
    {
        _name: 'CSidebarNav',
        _children: items
    }
]
