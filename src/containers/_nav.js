// import UserService from "../services/UserService"

const user_group = localStorage.getItem('user_group')
console.log("user_grtoup", user_group)
const groups = {
    admin: "Admin",
    clinic: "Clinic",
    serviceman: "Tamirci",
    customer: "Customer",
    accountant: "Muhasebe",
    secretary : "Secretary",
    patient : "Patient",

}

var dashboard_link = ""
switch (user_group) {
    case groups.admin:
        dashboard_link = "admin-dashboard"
        break;
    case groups.customer:
        dashboard_link = "customer-dashboard"
        break;
    case groups.serviceman:
        dashboard_link = "serviceman-dashboard"
        break;
    case groups.accountant:
        dashboard_link = "accountant-dashboard"
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
// const current = {
//     _name: 'CSidebarNavDropdown',
//     name: 'Cari',
//     route: '/checking-account',
//     icon: 'cil-calculator',
//     items: [
//         {
//             name: 'Cari İşlemler',
//             to: '/checking-account/checking-account-list'
//         }
//     ]
// }

const doctor = {
    _name: 'CSidebarNavDropdown',
    name: 'Doktor',
    route: '/doctor',
    icon: 'cil-user',
    items: [
        {
            name: 'Doktor',
            to: '/doctor/doctor'
        }
    ]
}

const patient = {
    _name: 'CSidebarNavDropdown',
    name: 'Patient',
    route: '/patient',
    icon: 'cil-user',
    items: [
        {
            name: 'Hasta',
            to: '/patient/patient'
        }
    ]
}

const assay = {
    _name: 'CSidebarNavDropdown',
    name: 'Assay',
    route: '/assay',
    icon: 'cil-user',
    items: [
        {
            name: 'Tahlil',
            to: '/assay/assay'
        }
    ]
}

const patientCalendar = {
    _name: 'CSidebarNavDropdown',
    name: 'PatientCalendar',
    route: '/patientCalendar',
    icon: 'cil-user',
    items: [
        {
            name: 'Takvim',
            to: '/patientCalendar/patientCalendar'
        }
    ]
}



const secretary = {
    _name: 'CSidebarNavDropdown',
    name: 'Sekreter',
    route: '/secretary',
    icon: 'cil-user',
    items: [
        {
            name: 'Sekreter',
            to: '/secretary/secretary'
        }
    ]
}
// const customer = {
//     _name: 'CSidebarNavDropdown',
//     name: 'Müşteri',
//     route: '/customer',
//     icon: 'cil-user',
//     items: [
//         {
//             name: 'Müşteri',
//             to: '/customer/customer'
//         }
//     ]
// }
// const catalog = {
//     _name: 'CSidebarNavDropdown',
//     name: 'Katalog',
//     route: '/category',
//     icon: 'cil-playlist-add',
//     items: [
//         {
//             name: 'Kategori',
//             to: '/catalog/category'
//         },
//         {
//             name: 'Ürünler',
//             to: '/catalog/product-list'
//         },
//         {
//             name: 'Marka',
//             to: '/catalog/brand'
//         }
//     ]
// }
// const staff = {
//     _name: 'CSidebarNavDropdown',
//     name: 'Personel',
//     route: '/staff',
//     icon: 'cil-people',
//     items: [
//         {
//             name: 'Personel İşlemleri',
//             to: '/staff/staff-operations'
//         },
//
//         {
//             name: 'Personel İşlemleri PMS',
//             to: '/staff/staff'
//         }
//     ]
// }


const clinic = {
    _name: 'CSidebarNavDropdown',
    name: 'Klinik',
    route: '/clinic',
    icon: 'cil-people',
    items: [
        {
            name: 'Klinik İşlemleri',
            to: '/clinic/clinic'
        }
    ]
}


// const services = {
//     _name: 'CSidebarNavDropdown',
//     name: 'Servis',
//     route: '/service',
//     icon: 'cil-file',
//     items: [
//         {
//             name: 'Servis Listesi',
//             to: '/service/service-list'
//         }
//     ]
// }
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


const protocols = {
    _name: 'CSidebarNavDropdown',
    name: 'Protokol',
    icon: 'cil-file',
    items: [
        {
            name: 'Protokol',
            to: '/protocols'
        },

    ]
}
const protocolNew = {
    _name: 'CSidebarNavDropdown',
    name: 'Protokol',
    icon: 'cil-file',
    items: [
        {
            name: 'Protokol',
            to: '/protocolNew/:patient'
        },

    ]
}

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
    _name: 'CSidebarNavDropdown',
    name: 'Bildirim ',
    icon: 'cil-file',
    items: [
        {
            name: 'Bildirim',
            to: '/notifications'
        }
    ]

}


const wristbands = {
    _name: 'CSidebarNavDropdown',
    name: 'Bileklik ',
    icon: 'cil-file',
    items: [
        {
            name: 'Bileklik',
            to: '/wristbands'
        }
    ]

}


const appointment = {
    _name: 'CSidebarNavDropdown',
    name: 'Randevu',
    route: '/appointment',
    icon: 'cil-people',
    items: [
        {
            name: 'Klinik İşlemleri',
            to: '/appointmnet/appointmnet'
        }
    ]
}


const contracts = {
    _name: 'CSidebarNavDropdown',
    name: 'Sözleşme',
    icon: 'cil-file',
    items: [
        {
            name: 'Sözleşme',
            to: '/contracts'
        }
    ]

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
items.push(home)
items.push(actions)
// if (user_group === groups.admin || user_group === groups.accountant) {
//     items.push(current)
// }
// if (user_group === groups.admin || user_group === groups.accountant || user_group === groups.customer) {
//     items.push(customer)
// }
// if (user_group === groups.admin || user_group === groups.serviceman) {
//     items.push(catalog)
// }

if (user_group === groups.admin) {
    console.log("user", user_group)
    items.push(clinic)
    items.push(staffs)
    items.push(permission)
    items.push(advertisement)
    items.push(accounting)
    items.push(notifications)
    items.push(wristbands)
    items.push(contracts)
    items.push(appointment)
    items.push(patientCalendar)
    items.push(assay)
    items.push(protocols)
    items.push(protocolNew)

    // items.push(staff)
}
if (user_group === groups.clinic) {
    console.log("clinic", user_group)
    items.push(doctor)
    items.push(secretary)
    items.push(patient)

}
// if (user_group === groups.admin || user_group === groups.serviceman || user_group === groups.customer) {
//     //items.push(services)
//     items.push(clinic)
// }
// else {
//     items.push(clinic)
//     items.push(staffs)
//     items.push(permission)
//     items.push(advertisement)
//     items.push(accounting)
//     items.push(notifications)
//     items.push(wristbands)
//     items.push(contracts)
// }
export default [
    {
        _name: 'CSidebarNav',
        _children: items
    }
]
