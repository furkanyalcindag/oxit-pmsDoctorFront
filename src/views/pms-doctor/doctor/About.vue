<template>
  <div>
    <CRow>
      <CCol lg="12">
        <transition name="fade">
          <CCard v-if="show">
            <CCardHeader>
              <CIcon name="cil-pencil"/>
              Genel Bilgiler
              <div class="card-header-actions">

                <CLink
                    class="card-header-action btn-minimize"
                    @click="formCollapsed = !formCollapsed"
                >
                  <CIcon
                      :name="`cil-chevron-${formCollapsed ? 'bottom' : 'top'}`"
                  />
                </CLink>

              </div>
            </CCardHeader>
            <CCollapse :show="formCollapsed">
              <CCardBody>
                <CRow>


                  <CCol lg="2">
                    <h3><img src="../../../icons/icons8-numbers-input-form-24.png" height="24" width="24"/>
                      Hakkında
                    </h3>
                    <hr>
                    <h5 v-if="about.about">{{ about.about }}</h5>
                    <h5 v-else>-</h5>

                  </CCol>
                  <CCol lg="1">
                    <CButton @click="getSingleAbout">
                      <CIcon name="cil-pencil"/>
                    </CButton>

                  </CCol>
                </CRow>


              </CCardBody>
            </CCollapse>
          </CCard>
        </transition>
      </CCol>
    </CRow>


    <CModal
        :show.sync="aboutUpdateModal"
        :no-close-on-backdrop="true"
        :centered="true"
        title="Modal title 2"
        size="xl"
        color="dark"
    >
      <CRow>
        <CCol lg="12">
          <transition name="fade">
            <CCard v-if="aboutUpdateModal">
              <template>
                <CCardBody>
                  <CRow>

                    <validation-observer ref="simpleRules">
                      <CRow>

                        <CCol lg="3">

                          Hakkında <span class="text-danger">*</span>

                          <CInput

                              description=""
                              autocomplete="autocomplete"
                              v-model="about.about"

                          />

                        </CCol>

                      </CRow>
                    </validation-observer>
                  </CRow>
                </CCardBody>
              </template>
            </CCard>
          </transition>
        </CCol>
      </CRow>
      <template #header>
        <h6 class="modal-title">Hakkında Güncelle</h6>
        <CButtonClose @click="aboutUpdateModal = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="aboutUpdateModal = false" color="danger">Kapat</CButton>
        <CButton @click="validationForm" color="success">Güncelle</CButton>
      </template>
    </CModal>


  </div>
</template>

<script>

import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css'
import Clinic from "@/models/pms/clinic";
import {ValidationProvider, ValidationObserver} from 'vee-validate'
import {required, email, min, max} from 'validations'
import Doctor from "@/models/pms/doctor";
import Contact from "@/models/pms/contact";

import About from "@/models/pms/about";
import AboutService from "@/services/managementServices/about.service";

export default {
  name: "Clinic",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      fieldsTable: [
        {key: 'about', label: "Hakkında", _style: "min-width:200px"},
        {key: "actions", label: "İşlemler"},

      ],


      usersData: [
        {
          firstName: 'Samppa Nori',
          lastName: 'ssdsdsd',
          profession: 'Member',
          title: 'Active',
          department: 'Active',
          diplomaNo: 'Active',
          actions: ''
        },

      ],

      pageLabel: {label: 'sasasa', external: true,},
      page: 1,
      numberOfPages: 0,
      selected: [],
      rowsPerPageItems: [5],
      search: '',
      total: 0,
      loading: false,
      pagination: {external: true},
      customers: [],
      cities: [],
      districts: [],
      staffs: [],
      clinic: new Clinic("", "", "", "", "", "", "", "", "", ""),
      isSuccess: false,
      isSuccessCar: false,
      isError: false,
      errorsStaff: [],
      isErrorCustomerUpdate: false,
      groups: [],
      contactInfoUpdateModal: false,
      details: [],
      errors: [],
      isCorporate: false,
      collapseDuration: 0,
      darkModal: false,
      carModal: false,
      show: true,
      showAddCar: true,
      horizontal: {label: "col-3", input: "col-9"},
      options: ["Option 1", "Option 2", "Option 3"],
      selectOptions: [
        "Option 1",
        "Option 2",
        "Option 3",
        {
          value: "some value",
          label: "Selected option",
        },
      ],
      selectedOption: "some value",

      formCollapsed: true,
      checkboxNames: [
        "Checkboxes",
        "Inline Checkboxes",
        "Checkboxes - custom",
        "Inline Checkboxes - custom",
      ],
      radioNames: [
        "Radios",
        "Inline Radios",
        "Radios - custom",
        "Inline Radios - custom",
      ],
      deleteModel: false,
      deleteId: '',
      clinics: [],
      city: '',
      district: '',
      cit: '',
      updateId: 0,
      updateModal: false,
      clinicUpdate: new Clinic("", "", "", "", "", "", "", "", "", ""),
      cityUpdate: '',
      districtUpdate: '',
      required,
      email,
      min,
      max,
      doctor: new Doctor("", "", "", "", "", "", "", ""),
      about: new About("", "", "", "", "", "", "", ""),
      doctorUpdate: new Doctor("", "", "", "", "", "", "", ""),
      departments: [],
      doctors: [],
      contact: new Contact("", "", "", "", "", "", "",),


    };
  },

  methods: {

    async getAbout() {
      let response = await new AboutService().getAbout();
      if (response.status === 200) {
        this.contact = response.data
      }
    },

    async getSingleAbout() {
      this.aboutUpdateModal = true
      let response = await new AboutService().getAbout();
      if (response.status === 200) {
        this.about = response.data
      }
    },

    async editAbout() {

      let response = await new AboutService().editAbout(this.contact);
      if (response.status === 200) {
        this.aboutUpdateModal = false
        await this.getAbout()
      }

    },

    async validationForm() {
      this.$refs.simpleRules.validate().then(async success => {
        if (success) {
          await this.editAbout()
        }
      })

    },
  },


  async created() {
    await this.getAbout()

  }
  ,
  async mounted() {


  }
  ,
  computed: {}

};
</script>
