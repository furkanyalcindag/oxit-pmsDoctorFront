<template>
  <div>
    <CRow>
      <CCol lg="12">
        <transition name="fade">
          <CCard v-if="show">
            <CCardHeader>
              <CIcon name="cil-pencil"/>
              Form Elements
              <div class="card-header-actions">
                <CLink href="#" class="card-header-action btn-setting">
                  <CIcon name="cil-settings"/>
                </CLink>
                <CLink
                    class="card-header-action btn-minimize"
                    @click="formCollapsed=!formCollapsed"
                >
                  <CIcon :name="`cil-chevron-${formCollapsed ? 'bottom' : 'top'}`"/>
                </CLink>
                <CLink href="#" class="card-header-action btn-close" v-on:click="show = !show">
                  <CIcon name="cil-x-circle"/>
                </CLink>
              </div>
            </CCardHeader>
            <CCollapse :show="formCollapsed">
              <CCardBody>
                <CRow>

                  <CCol lg="4">


                    <CInput
                        label="Prepended text"
                        description="Here's some help text"
                        type="email"
                        autocomplete="email"
                        prepend="@"
                    />
                    <CInput
                        label="Appended text"
                        append=".00"
                        description="Here's some help text"
                    />



                  </CCol>


                  <CCol lg="4">


                    <CInput
                        label="Prepended text"
                        description="Here's some help text"
                        type="email"
                        autocomplete="email"
                        prepend="@"
                    />
                    <CInput
                        label="Appended text"
                        append=".00"
                        description="Here's some help text"
                    />



                  </CCol>

                  <CCol lg="4">


                    <CInput
                        label="Prepended text"
                        description="Here's some help text"
                        type="email"
                        autocomplete="email"
                        prepend="@"
                    />
                    <CInput
                        label="Appended text"
                        append=".00"
                        description="Here's some help text"
                    />



                  </CCol>






                </CRow>


                <div class="form-actions">
                  <CButton type="submit" color="primary">Save changes</CButton>
                  <CButton color="secondary">Cancel</CButton>
                </div>
              </CCardBody>
            </CCollapse>
          </CCard>
        </transition>
      </CCol>
    </CRow>
    <CRow>

      <CCol lg="12">
        <transition name="fade">
          <CCard v-if="show">

        <CCardBody>
          <CDataTable
              :items="items"
              :fields="fields"
              column-filter
              table-filter
              items-per-page-select
              :items-per-page="5"
              hover
              sorter
              pagination
          >
            <template #status="{item}">
              <td>
                <CBadge :color="getBadge(item.status)">
                  {{ item.status }}
                </CBadge>
              </td>
            </template>
            <template #show_details="{item, index}">
              <td class="py-2">
                <CButton
                    color="primary"
                    variant="outline"
                    square
                    size="sm"
                    @click="toggleDetails(item, index)"
                >
                  {{ Boolean(item._toggled) ? 'Hide' : 'Show' }}
                </CButton>
              </td>
            </template>
            <template #details="{item}">
              <CCollapse :show="Boolean(item._toggled)" :duration="collapseDuration">
                <CCardBody>
                  <CMedia :aside-image-props="{ height: 102 }">
                    <h4>
                      {{ item.username }}
                    </h4>
                    <p class="text-muted">User since: {{ item.registered }}</p>
                    <CButton size="sm" color="info" class="">
                      User Settings
                    </CButton>
                    <CButton size="sm" color="danger" class="ml-1">
                      Delete
                    </CButton>
                  </CMedia>
                </CCardBody>
              </CCollapse>
            </template>
          </CDataTable>
        </CCardBody></CCard></transition>


      </CCol>


    </CRow>
  </div>
</template>

<script>

const items = [
  {username: 'Samppa Nori', registered: '2012/01/01', role: 'Member', status: 'Active'},
  {username: 'Estavan Lykos', registered: '2012/02/01', role: 'Staff', status: 'Banned'},
  {username: 'Chetan Mohamed', registered: '2012/02/01', role: 'Admin', status: 'Inactive'},
  {username: 'Derick Maximinus', registered: '2012/03/01', role: 'Member', status: 'Pending'},
  {username: 'Friderik Dávid', registered: '2012/01/21', role: 'Staff', status: 'Active'},
  {username: 'Yiorgos Avraamu', registered: '2012/01/01', role: 'Member', status: 'Active'},
  {username: 'Avram Tarasios', registered: '2012/02/01', role: 'Staff', status: 'Banned', _classes: 'table-success'},
  {username: 'Quintin Ed', registered: '2012/02/01', role: 'Admin', status: 'Inactive'},
  {username: 'Enéas Kwadwo', registered: '2012/03/01', role: 'Member', status: 'Pending'},
  {username: 'Agapetus Tadeáš', registered: '2012/01/21', role: 'Staff', status: 'Active'},
  {username: 'Carwyn Fachtna', registered: '2012/01/01', role: 'Member', status: 'Active', _classes: 'table-info'},
  {username: 'Nehemiah Tatius', registered: '2012/02/01', role: 'Staff', status: 'Banned'},
  {username: 'Ebbe Gemariah', registered: '2012/02/01', role: 'Admin', status: 'Inactive'},
  {username: 'Eustorgios Amulius', registered: '2012/03/01', role: 'Member', status: 'Pending'},
  {username: 'Leopold Gáspár', registered: '2012/01/21', role: 'Staff', status: 'Active'},
  {username: 'Pompeius René', registered: '2012/01/01', role: 'Member', status: 'Active'},
  {username: 'Paĉjo Jadon', registered: '2012/02/01', role: 'Staff', status: 'Banned'},
  {username: 'Micheal Mercurius', registered: '2012/02/01', role: 'Admin', status: 'Inactive'},
  {username: 'Ganesha Dubhghall', registered: '2012/03/01', role: 'Member', status: 'Pending'},
  {username: 'Hiroto Šimun', registered: '2012/01/21', role: 'Staff', status: 'Active'},
  {username: 'Vishnu Serghei', registered: '2012/01/01', role: 'Member', status: 'Active'},
  {username: 'Zbyněk Phoibos', registered: '2012/02/01', role: 'Staff', status: 'Banned'},
  {username: 'Einar Randall', registered: '2012/02/01', role: 'Admin', status: 'Inactive', _classes: 'table-danger'},
  {username: 'Félix Troels', registered: '2012/03/21', role: 'Staff', status: 'Active'},
  {username: 'Aulus Agmundr', registered: '2012/01/01', role: 'Member', status: 'Pending'}
]

const fields = [
  {key: 'username', _style: 'min-width:200px'},
  'registered',
  {key: 'role', _style: 'min-width:100px;'},
  {key: 'status', _style: 'min-width:100px;'},
  {
    key: 'show_details',
    label: '',
    _style: 'width:1%',
    sorter: false,
    filter: false
  }
]

export default {
  name: 'Customer',
  data() {
    return {
      items: items.map((item, id) => {
        return {...item, id}
      }),
      fields,
      details: [],
      collapseDuration: 0,
      selected: [], // Must be an array reference!
      show: true,
      horizontal: {label: 'col-3', input: 'col-9'},
      options: ['Option 1', 'Option 2', 'Option 3'],
      selectOptions: [
        'Option 1', 'Option 2', 'Option 3',
        {
          value: 'some value',
          label: 'Selected option'
        }
      ],
      selectedOption: 'some value',

      formCollapsed: true,
      checkboxNames: ['Checkboxes', 'Inline Checkboxes',
        'Checkboxes - custom', 'Inline Checkboxes - custom'],
      radioNames: ['Radios', 'Inline Radios',
        'Radios - custom', 'Inline Radios - custom'],

    }
  },


  methods: {
    validator(val) {
      return val ? val.length >= 4 : false
    },
    getBadge(status) {
      switch (status) {
        case 'Active':
          return 'success'
        case 'Inactive':
          return 'secondary'
        case 'Pending':
          return 'warning'
        case 'Banned':
          return 'danger'
        default:
          'primary'
      }
    },
    toggleDetails(item) {
      this.$set(this.items[item.id], '_toggled', !item._toggled)
      this.collapseDuration = 300
      this.$nextTick(() => {
        this.collapseDuration = 0
      })
    }

  }
}
</script>
