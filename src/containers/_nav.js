import UserService from "../services/UserService"

const user_group = UserService.getUserGroup()
const groups = {
    admin: "Admin",
    serviceman: "Tamirci",
    customer: "Customer",
    accountant: "Muhasebe"
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
const current = {
    _name: 'CSidebarNavDropdown',
    name: 'Cari',
    route: '/checking-account',
    icon: 'cil-calculator',
    items: [
        {
            name: 'Cari İşlemler',
            to: '/checking-account/checking-account-list'
        }
    ]
}
const customer = {
    _name: 'CSidebarNavDropdown',
    name: 'Müşteri',
    route: '/customer',
    icon: 'cil-user',
    items: [
        {
            name: 'Müşteri',
            to: '/customer/customer'
        }
    ]
}
const catalog = {
    _name: 'CSidebarNavDropdown',
    name: 'Katalog',
    route: '/category',
    icon: 'cil-playlist-add',
    items: [
        {
            name: 'Kategori',
            to: '/catalog/category'
        },
        {
            name: 'Ürünler',
            to: '/catalog/product-list'
        },
        {
            name: 'Marka',
            to: '/catalog/brand'
        }
    ]
}
const staff = {
    _name: 'CSidebarNavDropdown',
    name: 'Personel',
    route: '/staff',
    icon: 'cil-people',
    items: [
        {
            name: 'Personel İşlemleri',
            to: '/staff/staff-operations'
        },

        {
            name: 'Personel İşlemleri PMS',
            to: '/staff/staff'
        }
    ]
}


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


const services = {
    _name: 'CSidebarNavDropdown',
    name: 'Servis',
    route: '/service',
    icon: 'cil-file',
    items: [
        {
            name: 'Servis Listesi',
            to: '/service/service-list'
        }
    ]
}
const group = {
    _name: 'CSidebarNavDropdown',
    name: 'Grup',
    route: '/group',
    icon: 'cil-file',
    items: [
        {
            name: 'Group',
            to: '/group'
        }
    ]
}
const permission = {
    _name: 'CSidebarNavDropdown',
    name: 'Yetkilendirme',
    route: '/permission',
    icon: 'cil-file',
    items: [
        {
            name: 'Yetkilendirme',
            to: '/permission'
        }
    ]
}

var items = []
items.push(home)
items.push(actions)
if (user_group === groups.admin || user_group === groups.accountant) {
    items.push(current)
}
if (user_group === groups.admin || user_group === groups.accountant || user_group === groups.customer) {
    items.push(customer)
}
if (user_group === groups.admin || user_group === groups.serviceman) {
    items.push(catalog)
}

if (user_group === groups.admin) {
    items.push(staff)
}
if (user_group === groups.admin || user_group === groups.serviceman || user_group === groups.customer) {
    //items.push(services)
    items.push(clinic)
} else {
     items.push(clinic)
    items.push(group)
    items.push(permission)
}
export default [
    {
        _name: 'CSidebarNav',
        _children: items
    }
]