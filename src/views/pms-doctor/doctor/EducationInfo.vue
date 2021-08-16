<template>
  <div>
    <CRow>
      <CCol lg="12">
        <transition name="fade">
          <CCard v-if="show">
            <CCardHeader>
              <img src="../../../icons/icons8-graduation-cap-32.png" height="32" width="32"/>
              Eğitim Bilgileri
              <div class="card-header-actions">
                <CButton @click="educationInfoModal = true">
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
                <CRow v-for="(edu,index) in educations" :key="index">
                  <CCol lg="6">
                    <CCol lg="12">
                      <h5>
                        <img src="../../../icons/icons8-cell-phone-24.png" height="24" width="24"/>
                        Universite
                      </h5>
                      <hr>
                      <h6 v-if="edu.universityName">{{ edu.universityName }}</h6>
                      <h6 v-else>-</h6>

                    </CCol>
                    <CCol lg="12">
                      <h5>
                        <img src="../../../icons/icons8-cell-phone-24.png" height="24" width="24"/>

                        Eğitim Türü
                      </h5>


                      <hr>
                      <h6 v-if="edu.educationType">{{ edu.educationType.label }}</h6>
                      <h6 v-else>-</h6>

                    </CCol>
                  </CCol>
                  <CCol lg="6">
                    <CRow>
                      <CCol lg="10">
                        <h5>
                          <img src="../../../icons/icons8-cell-phone-24.png" height="24" width="24"/>

                          Fakülte
                        </h5>


                        <hr>
                        <h6 v-if="edu.facultyName">{{ edu.facultyName }}</h6>
                        <h6 v-else>-</h6>

                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol lg="10">
                        <h5>
                          <img src="../../../icons/icons8-cell-phone-24.png" height="24" width="24"/>

                          Bölüm
                        </h5>
                        <hr>
                        <h6 v-if="edu.departmentName">{{ edu.departmentName }}</h6>
                        <h6 v-else>-</h6>
                      </CCol>
                      <CCol lg="1">
                        <CButton @click="getSingleEducationInfo(edu.uuid)">
                          <CIcon name="cil-pencil"/>
                        </CButton>
                      </CCol>
                      <CCol lg="1">
                        <CButton @click="setDeleteModal(edu.uuid)">
                          <CIcon name="cilTrash"/>
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
        :show.sync="educationInfoUpdateModal"
        :no-close-on-backdrop="true"
        :centered="true"
        title="Modal title 2"
        size="xl"
        color="dark"
    >
      <CRow>
        <CCol lg="12">
          <transition name="fade">
            <CCard v-if="educationInfoUpdateModal">
              <template>
                <CCardBody>
                  <validation-observer ref="simpleRules">
                    <CRow>
                      <CCol lg="3">
                        Üniversite <span class="text-danger">*</span>
                        <CInput
                            description=""
                            autocomplete="autocomplete"
                            v-model="educationUpdate.universityName"

                            :state="errors.length > 0 ? false:null"
                        />

                      </CCol>

                      <CCol lg="3">
                        Fakülte <span class="text-danger">*</span>
                        <CInput
                            description=""
                            autocomplete="autocomplete"
                            v-model="educationUpdate.facultyName"

                            :state="errors.length > 0 ? false:null"
                        />

                      </CCol>


                      <CCol lg="3">
                        Bölüm <span class="text-danger">*</span>
                        <CInput
                            description=""
                            autocomplete="autocomplete"
                            v-model="educationUpdate.departmentName"

                            :state="errors.length > 0 ? false:null"
                        />

                      </CCol>


                      <CCol lg="3">

                        Eğitim Türü <span class="text-danger">*</span>

                        <CSelect
                            :options="educationTypes"
                            description=""
                            autocomplete="autocomplete"
                            v-model="educationUpdate.educationType"
                            :value.sync="educationUpdate.educationType"

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
        <h6 class="modal-title">Eğitim Bilgileri Güncelle</h6>
        <CButtonClose @click="educationInfoModal = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="educationInfoModal = false" color="danger">Kapat</CButton>
        <CButton @click="validationForm" color="success">Güncele</CButton>
      </template>
    </CModal>
    <CModal
        :show.sync="educationInfoModal"
        :no-close-on-backdrop="true"
        :centered="true"
        title="Modal title 2"
        size="xl"
        color="dark"
    >
      <CRow>
        <CCol lg="12">
          <transition name="fade">
            <CCard v-if="educationInfoModal">
              <template>
                <CCardBody>
                  <validation-observer ref="simpleRules">
                    <CRow>
                      <CCol lg="3">
                        Üniversite <span class="text-danger">*</span>
                        <CInput
                            description=""
                            autocomplete="autocomplete"
                            v-model="education.universityName"

                            :state="errors.length > 0 ? false:null"
                        />

                      </CCol>

                      <CCol lg="3">
                        Fakülte <span class="text-danger">*</span>
                        <CInput
                            description=""
                            autocomplete="autocomplete"
                            v-model="education.facultyName"

                            :state="errors.length > 0 ? false:null"
                        />

                      </CCol>


                      <CCol lg="3">
                        Bölüm <span class="text-danger">*</span>
                        <CInput
                            description=""
                            autocomplete="autocomplete"
                            v-model="education.departmentName"

                            :state="errors.length > 0 ? false:null"
                        />

                      </CCol>


                      <CCol lg="3">

                        Eğitim Türü <span class="text-danger">*</span>

                        <CSelect
                            :options="educationTypes"
                            description=""
                            autocomplete="autocomplete"
                            v-model="education.educationType"
                            :value.sync="education.educationType"

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
        <h6 class="modal-title">Eğitim Bilgileri Güncelle</h6>
        <CButtonClose @click="educationInfoModal = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="educationInfoModal = false" color="danger">Kapat</CButton>
        <CButton @click="validationForm" color="success">Kaydet</CButton>
      </template>
    </CModal>
    <CModal
        title="Modal title"
        color="danger"
        :show.sync="deleteModel"
    >
      Eğitimi silmek istediğinizden emin misiniz?


      <template #header>
        <h6 class="modal-title">Uyarı</h6>
        <CButtonClose @click="deleteModel = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="deleteModel = false" color="danger">Hayır</CButton>
        <CButton @click="deleteEducationInfo" color="success">Evet</CButton>
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
import EducationService from "@/services/managementServices/education.service";
import Education from "@/models/pms/education";
import {freeSet} from '@coreui/icons'
import EducationTypeService from "@/services/managementServices/educationType.service";

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
        {key: 'universityName', label: "Universite Adı", _style: "min-width:200px"},
        {key: "facultyName", label: "Fakülte Adı"},
        {key: "departmentName", label: "Bölüm"},
        {key: "educationType", label: "Eğitim Türü"},
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
      doctorUpdate: new Doctor("", "", "", "", "", "", "", ""),
      departments: [],
      doctors: [],
      // contact: new Contact("", "", "", "", "", "", "",),
      education: new Education("", "", "", "", "", "", "",),
      educationUpdate: new Education("", "", "", "", "", "", "", ""),
      educations: [],
      educationInfoUpdateModal: false,
      educationTypes: [],
      educationInfoModal: false,
      eduUUID: ''


    };
  },

  methods: {


    async getEducationInfo() {

      let response = await new EducationService().getEducations();
      if (response.status === 200) {
        this.educations = response.data.data
      }
    },

    async getSingleEducationInfo(id) {
      let response = await new EducationService().getSingleEducation(id);
      this.education = response.data
      if (response.status === 200) {
        this.educationInfoModal = true

      }
    },
    setDeleteModal(id) {
      this.eduUUID = id
      this.deleteModel = true
    },
    async deleteEducationInfo() {
      let response = await new EducationService().deleteEducation(this.eduUUID)
      if (response.status === 200) {
        this.deleteModel = false
        await this.getEducationInfo()
        this.deleteModel = false
        this.$toast.success({
          title: 'Başarılı',
          message: "Eğitim bilgileri başarıyla silindi"
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


    async editEducationInfo() {

      let response = await new EducationService().editEducation(this.educationUpdate);
      if (response.status === 200) {
        this.educationInfoUpdateModal = false
        await this.getEducationInfo()
      }

    },
    async addEducationInfo() {
      if (this.education.educationType === "") {
        this.education.educationType = this.educationTypes[0].value
      }
      let response = await new EducationService().addEducation(this.education);
      if (response.status === 200) {
        this.educationInfoModal = false
        await this.getEducationInfo()


      }

    },

    async getEducationTypes() {
      let response = await new EducationTypeService().getEducationType()
      this.educationTypes = response.data
    },


    async validationForm() {
      this.$refs.simpleRules.validate().then(async success => {
        if (success) {
          if (this.education.uuid) {
            await this.editEducationInfo()

          } else {
            await this.addEducationInfo()
          }
        }
      })

    },
  },


  async created() {
    await this.getEducationInfo()
    await this.getEducationTypes()

  }
  ,
  async mounted() {

    await this.getEducationInfo()
    await this.getEducationTypes()

  }
  ,
  computed: {}

};
</script>
