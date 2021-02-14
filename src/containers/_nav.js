export default [
    {
        _name: 'CSidebarNav',
        _children: [
            {
                _name: 'CSidebarNavItem',
                name: 'Anasayfa',
                to: '/dashboard',
                icon: 'cil-speedometer',

            },
            {
                _name: 'CSidebarNavTitle',
                _children: ['İşlemler']
            },
            {
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
            },
            {
                _name: 'CSidebarNavDropdown',
                name: 'Kullanıcı İşlemleri',
                route: '/login',
                icon: 'cil-user',
                items: [
                    {
                        name: 'Login',
                        to: '/pages/login'
                    },

                ]
            },
            {
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
            },
            {
                _name: 'CSidebarNavDropdown',
                name: 'Katalog',
                route: '/category',
                icon: 'cil-star',
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
            },
            {
                _name: 'CSidebarNavDropdown',
                name: 'Personel',
                route: '/staff',
                icon: 'cil-star',
                items: [
                    {
                        name: 'Personel İşlemleri',
                        to: '/staff/staff-operations'
                    }
                ]
            },
            {
                _name: 'CSidebarNavDropdown',
                name: 'Servis',
                route: '/service',
                icon: 'cil-star',
                items: [
                    {
                        name: 'Servis Listesi',
                        to: '/service/service-list'
                    }
                ]
            },

        ]
    }
]