<template>
  <div>
    <CRow>
      <CCol lg="12">
        <transition name="fade">
          <CCard v-if="show">
            <CCardHeader>
                <img src="../../../icons/icons8-info-32.png" height="32" width="32"/>
              Hakkında
              <div class="card-header-actions">
                <CButton v-show="!about" @click="aboutUpdateModal = true">
                  <CIcon :content="$options.freeSet.cilPlus" name="cil-plus"/>
                </CButton>
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


                  <CCol lg="11">
                    <h5>
                      <img src="../../../icons/icons8-about-24.png" height="24" width="24"/>
                      Hakkında
                    </h5>
                    <hr>
                    <h6 v-if="aboutList.about">{{ aboutList.about }}</h6>
                    <h6 v-else>-</h6>

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

                  <validation-observer ref="simpleRules">
                    <CRow>

                      <CCol lg="12">

                        Hakkında <span class="text-danger">*</span>

                        <CTextarea
                            rows="3"
                            description=""
                            autocomplete="autocomplete"
                            v-model="about.about"

                        />

                      </CCol>

                    </CRow>
                  </validation-observer>
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
        <CButton @click="validationForm" color="success">Kaydet</CButton>
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
import {freeSet} from '@coreui/icons'
import About from "@/models/pms/about";
import AboutService from "@/services/managementServices/about.service";
import Secretary from "@/models/pms/secretary";

export default {
  name: "Clinic",
  freeSet,
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
      aboutUpdateModal: false,
      aboutList: new About("")


    };
  },

  methods: {

    async getAbout() {
      let response = await new AboutService().getAbout();
      if (response.status === 200) {
        this.aboutList = response.data
        console.log(response.data)
        console.log("get", this.aboutList)
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

      let response = await new AboutService().editAbout(this.about);
      if (response.status === 200) {
        this.aboutUpdateModal = false
        await this.getAbout()
      }

    },
    async addAbout() {
      let response = await new AboutService().addAbout(this.about)
      if (response.status === 200) {
        this.aboutUpdateModal = false
        await this.getAbout()
        this.about = new About()
        this.$toast.success({
          title: 'Başarılı',
          message: "İşlem başarıyla gerçekleşti"
        })
      } else {
        this.isError = true;
        this.errors = response.response.data;
        for (const [key, value] of Object.entries(this.errors)) {
          this.$toast.error({
            title: 'Hata',
            message: `${key}: ${value}`
          })
        }
      }

    },


    async validationForm() {
      this.$refs.simpleRules.validate().then(async success => {
        if (success) {
          if (this.about.uuid) {
            await this.editAbout()
          } else {
            await this.addAbout()
          }
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
