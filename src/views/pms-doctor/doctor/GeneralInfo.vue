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
                    <CCol lg="2">

                      <img src="../../../../../../../Desktop/hasemagumus-iyonlu-maske-219f.jpg" height="180"
                           width="120"/></CCol>

                  </CCol>
                  <CCol lg="10">
                    <CRow>
                      <CCol lg="6">
                        <h5><img src="../../../icons/icons8-name-24.png" height="24" width="24"/>

                          İsim Soyisim</h5>
                        <hr>
                        <h5 v-if="staff.firstName !== '' || staff.lastName !==''">
                          {{ staff.firstName }} {{ staff.lastName }}</h5>
                        <h5 v-else>-</h5>
                      </CCol>
                      <CCol lg="6">


                        <h5>
                           <img src="../../../icons/icons8-price-tag-24.png" height="24" width="24"/></h5>
                          Ünvan

                        <hr>
                        <h5 v-if="staff.title">{{ staff.title }}</h5>
                        <h5 v-else>-</h5>

                      </CCol>
                    </CRow>

                    <CRow class="mt-3">
                        <CCol lg="4">
                        <h5>Uzmanlık Alanı</h5>
                        <hr>
                        <h5 v-if="staff.profession">{{ staff.profession }}</h5>
                        <h5 v-else>-</h5>

                      </CCol>
                      <CCol lg="4">


                        <h5>Bölüm</h5>
                        <hr>
                        <h5 v-if="staff.department">{{ staff.department.label }}</h5>
                        <h5 v-else>-</h5>

                      </CCol>
                      <CCol lg="3">
                        <h5><img src="../../../icons/icons8-numbers-input-form-24.png" height="24" width="24"/>
                          Diploma No
                        </h5>
                        <hr>
                        <h5 v-if="staff.diplomaNo">{{ staff.diplomaNo }}</h5>
                        <h5 v-else>-</h5>

                      </CCol>
                      <CCol lg="1">
                        <CButton @click="getSingleGeneralInfo">
                          <CIcon name="cil-pencil"/>
                        </CButton>

                      </CCol>
                    </CRow>

                  </CCol>
                </CRow>


              </CCardBody>
            </CCollapse>
          </CCard>
        </transition>
      </CCol>
    </CRow>


    <CModal
        :show.sync="generalInfoUpdateModal"
        :no-close-on-backdrop="true"
        :centered="true"
        title="Modal title 2"
        size="xl"
        color="dark"
    >
      <CRow>
        <CCol lg="12">
          <transition name="fade">
            <CCard v-if="generalInfoUpdateModal">
              <template>
                <CCardBody>
                  <CRow>

                    <validation-observer ref="simpleRules">
                      <CRow>

                        <CCol lg="3">

                          Doktor Adı <span class="text-danger">*</span>

                          <CInput
                              disabled
                              description=""
                              autocomplete="autocomplete"
                              v-model="staff.firstName"

                          />

                        </CCol>


                        <CCol lg="3">
                          Doktor Soyadı <span class="text-danger">*</span>

                          <CInput
                              disabled
                              description=""
                              autocomplete="autocomplete"
                              v-model="staff.lastName"

                          />


                        </CCol>
                        <CCol lg="3">
                          <validation-provider
                              #default="{errors}"
                              rules="required|min:3|max:100"
                              name="Diploma No">
                            Diploma No <span class="text-danger">*</span>
                            <span class="text-danger">{{ errors[0] }}</span>
                            <CInput
                                description=""
                                autocomplete="autocomplete"
                                v-model="staff.diplomaNo"
                                :state="errors.length > 0 ? false:null"
                            />

                          </validation-provider>
                        </CCol>


                        <CCol lg="3">
                          <validation-provider
                              #default="{errors}"
                              rules="required|min:3|max:100"
                              name="Uzmanlık Alanı">
                            Uzmanlık Alanı <span class="text-danger">*</span>
                            <span class="text-danger">{{ errors[0] }}</span>
                            <CInput
                                description=""
                                autocomplete="autocomplete"
                                v-model="staff.profession"
                                :state="errors.length > 0 ? false:null"
                            />

                          </validation-provider>
                        </CCol>


                        <CCol lg="3">
                          Bölüm <span class="text-danger">*</span>
                          <CSelect
                              :options="departments"
                              description=""
                              autocomplete="autocomplete"
                              v-model="staff.department"
                              :value.sync="staff.department"
                          />


                        </CCol>


                        <CCol lg="3">
                          <validation-provider
                              #default="{errors}"
                              rules="required|min:3|max:100"
                              name="Ünvan">
                            Ünvan <span class="text-danger">*</span>
                            <span class="text-danger">{{ errors[0] }}</span>
                            <CInput
                                description=""
                                autocomplete="autocomplete"
                                v-model="staff.title"

                                :state="errors.length > 0 ? false:null"
                            />
                          </validation-provider>
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
        <h6 class="modal-title">Personel Güncelle</h6>
        <CButtonClose @click="generalInfoUpdateModal = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="generalInfoUpdateModal = false" color="danger">Kapat</CButton>
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
import Staff from "@/models/pms/staff";
import StaffService from "@/services/managementServices/staff.service";

import DepartmentService from "@/services/managementServices/department.service";

export default {
  name: "Clinic",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      fieldsTable: [
        {key: 'firstName', label: "Doktor Adı", _style: "min-width:200px"},
        {key: "lastName", label: "Doktor Soyad"},
        {key: "profession", label: "Uzmanlık Alanı"},
        {key: "title", label: "Ünvan"},
        {key: "department", label: "Bölüm"},
        {key: "diplomaNo", label: "Diploma No"},
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
      generalInfoUpdateModal: false,
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
      doctorUpdate: new Doctor("", "", "", "", "", "", "", ""),
      departments: [],
      doctors: [],
      staff: new Staff("", "", "", "", "", "", "", "", ""),


    };
  },

  methods: {

    async getGeneralInfo() {
      let response = await new StaffService().getGeneralInfo();
      if (response.status === 200) {
        this.staff = response.data
      }
    },

    async getSingleGeneralInfo() {
      this.generalInfoUpdateModal = true
      // this.staff.department = response.data.department.value

      let response = await new StaffService().getGeneralInfo();
      if (response.status === 200) {
        this.staff = response.data
      }
    },

    async getDepartments() {

      let response = await new DepartmentService().getDepartment()
      this.departments = response.data
    },


    async editGeneralInfo() {
      console.log(this.staff.department)
      if (this.staff.department === "") {
        this.staff.department = this.departments[0].value
      }
      console.log(this.staff.department)
      let response = await new StaffService().editGeneralInfo(this.staff);
      if (response.status === 200) {
        this.generalInfoUpdateModal = false
        await this.getGeneralInfo()
      }

    },

    async validationForm() {
      this.$refs.simpleRules.validate().then(async success => {
        if (success) {
          await this.editGeneralInfo()

        }
      })

    },

  },


  async created() {
    await this.getDepartments()
    await this.getGeneralInfo()


  }
  ,
  async mounted() {
    await this.getGeneralInfo()
    await this.getDepartments()


  }
  ,
  computed: {}

};
</script>
