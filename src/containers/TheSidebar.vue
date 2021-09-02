<template>
  <CSidebar
      fixed
      :minimize="minimize"
      :show="show"
      @update:show="(value) => $store.commit('set', ['sidebarShow', value])"
  >
    <CSidebarBrand class="d-md-down-none">
      <img v-if="minimize" class="menu-icon" v-bind:src="settings.icon"/>
    </CSidebarBrand>

    <CRenderFunction flat :content-to-render="computedSidebar"/>
    <CSidebarMinimizer
        class="d-md-down-none"
        @click.native="$store.commit('set', ['sidebarMinimize', !minimize])"
    />
  </CSidebar>
</template>

<script>
import nav from './_nav'

export default {
  data() {
    return {
      settings: null,
    }
  },
  name: 'TheSidebar',
  nav,
  computed: {
    show() {
      return this.$store.state.sidebarShow
    },
    minimize() {
      return this.$store.state.sidebarMinimize
    },
    currentItems() {
      if (localStorage.getItem('user_group') === 'Admin') {
        const actions = {
          _name: 'CSidebarNavTitle',
          _children: ['İşlemler']
        }
        const clinic = {
          _name: 'CSidebarNavItem',
          name: 'Klinik',
          to: '/clinic/clinic',
          icon: 'cilBuilding',

        }
        const staffs = {
          _name: 'CSidebarNavDropdown',
          name: 'Personel',
          icon: 'cilUser',
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
        const permission = {
          _name: 'CSidebarNavItem',
          name: 'Yetkilendirme',
          to: '/permission',
          icon: 'cilApps',
        }
        const advertisement = {
          _name: 'CSidebarNavDropdown',
          name: 'Reklam ',
          icon: 'cilChevronDoubleRight',
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
          icon: 'cilPaperPlane',


        }
        const wristbands = {
          _name: 'CSidebarNavItem',
          name: 'Bileklik ',
          to: '/wristbands',
          icon: 'cilWatch',


        }
        const contracts = {
          _name: 'CSidebarNavItem',
          name: 'Sözleşme',
          to: '/contracts',
          icon: 'cilTask',


        }
        const accounting = {
          _name: 'CSidebarNavDropdown',
          name: 'Muhasebe',
          icon: 'cilFolderOpen',
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
        let items = []
        items.push(actions)
        items.push(clinic)
        items.push(staffs)
        items.push(permission)
        items.push(advertisement)
        items.push(notifications)
        items.push(wristbands)
        items.push(contracts)
        items.push(accounting)
        return items
      }
      if (localStorage.getItem('user_group') === 'Clinic') {
        const actions = {
          _name: 'CSidebarNavTitle',
          _children: ['İşlemler']
        }
        const doctor = {
          _name: 'CSidebarNavItem',
          name: 'Doktor',
          to: '/doctor/list',
          icon: 'cil-user',

        }
        const patient = {
          _name: 'CSidebarNavItem',
          name: 'Hasta',
          to: '/patient/list',
          icon: 'cil-user',

        }
        const patientCalendar = {
          _name: 'CSidebarNavItem',
          name: 'Hasta Randevu Takvimi',
          to: '/patientCalendar',
          icon: 'cil-user',

        }
        const secretary = {
          _name: 'CSidebarNavItem',
          name: 'Sekreter',
          to: '/secretary/list',
          icon: 'cil-user',

        }
        const appointment = {
          _name: 'CSidebarNavItem',
          name: 'Randevu',
          to: '/appointment/appointment',
          icon: 'cil-people',

        }
        let items = []
        items.push(actions)
        items.push(doctor)
        items.push(patient)
        items.push(patientCalendar)
        items.push(secretary)
        items.push(appointment)
        return items;

      }
      if (localStorage.getItem('user_group') === 'Doctor') {
        const actions = {
          _name: 'CSidebarNavTitle',
          _children: ['İşlemler']
        }
        const patient = {
          _name: 'CSidebarNavItem',
          name: 'Hasta',
          to: '/patient/list',
          icon: 'cil-user',

        }
         const accountingList = {
          _name: 'CSidebarNavItem',
          name: 'Muhasebe',
          to: '/accounting/list',
          icon: 'cil-user',

        }
        const assay = {
          _name: 'CSidebarNavItem',
          name: 'Tahlil',
          to: '/assay/assay',
          icon: 'cil-user',

        }
        const patientCalendar = {
          _name: 'CSidebarNavItem',
          name: 'Hasta Randevu Takvimi',
          to: '/patientCalendar',
          icon: 'cil-user',

        }
        const doctorProfile = {
          _name: 'CSidebarNavItem',
          name: 'Doktor Profil',
          to: '/profile',
          icon: 'cil-people',
        }

         const doctorsPatient = {
          _name: 'CSidebarNavItem',
          name: 'Hastalar',
          to: '/doctors-patient',
          icon: 'cil-people',
        }



        const blog = {
          _name: 'CSidebarNavItem',
          name: 'Blog',
          to: '/blog/blog',
          icon: 'cil-user',

        }
        let items = []
        items.push(actions)
        items.push(assay)
        items.push(patientCalendar)
        items.push(doctorProfile)
        items.push(accountingList)
        items.push(blog)
        items.push(doctorsPatient)
        return items
      }
      if (localStorage.getItem('user_group') === 'Secretary') {
        const patient = {
          _name: 'CSidebarNavItem',
          name: 'Hasta',
          to: '/patient/list',
          icon: 'cil-user',

        }
        const patientCalendar = {
          _name: 'CSidebarNavItem',
          name: 'Hasta Randevu Takvimi',
          to: '/patientCalendar',
          icon: 'cil-user',

        }
        const appointment = {
          _name: 'CSidebarNavItem',
          name: 'Randevu',
          to: '/appointment/appointment',
          icon: 'cil-people',

        }
        let items = []
        items.push(patient)
        items.push(patientCalendar)
        items.push(appointment)
        return items;
      }
      return [];
    },
    computedSidebar() {
      return [
        {
          _name: "CSidebarNav",
          _children: this.currentItems
        }
      ]

    }
  },
  mounted() {
    this.$store.dispatch('getSettings').then(result => {
      this.settings = result
    })
  },
}
</script>

<style scoped>
.menu-logo {
  width: 125px;
}

.menu-icon {
  width: 35px;
}
</style>