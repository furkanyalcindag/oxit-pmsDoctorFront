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
                <CRow>
                  <CCol class="d-flex justify-content-end" lg="12">

                  </CCol>
                  <CCol lg="12">
                    <CListGroup>
                      <CListGroupItem
                          v-for="(edu,index) in educations" :key="index"
                          href="#"
                          class="flex-column align-items-start"
                      >
                        <div class="d-flex w-100 justify-content-between">
                          <h5 class="mb-1">{{ edu.universityName }}</h5>
                          <small>
                            <CDropdown size="sm" color="dark" toggler-text="İşlemler">
                              <CDropdownItem>
                                <CButton size="sm" @click="getSingleEducationInfo(edu.uuid)">
                                  Düzenle
                                </CButton>
                              </CDropdownItem>
                              <CDropdownItem>
                                <CButton size="sm" @click="setDeleteModal(edu.uuid)">
                                  Sil
                                </CButton>
                              </CDropdownItem>
                            </CDropdown>
                          </small>
                        </div>
                        <p class="mb-1">
                          {{ edu.facultyName }} / {{ edu.departmentName }}
                        </p>
                        <small>{{ edu.educationType.label }}</small>
                      </CListGroupItem>
                    </CListGroup>
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
        <CButtonClose @click="educationInfoUpdateModal = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="educationInfoUpdateModal = false" color="danger">Kapat</CButton>
        <CButton :disabled="loadingEdit" @click="validationForm" color="success">
          <c-spinner v-show="loadingEdit" size="sm">
          </c-spinner>
          Güncelle
        </CButton>
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
        <CButton @click="validationForm" color="success">
          <c-spinner v-show="loading" size="sm"></c-spinner>
          Kaydet
        </CButton>
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
        <CButton :disabled="loadingDelete" @click="deleteEducationInfo" color="success">
          <c-spinner size="sm" v-show="loadingDelete"></c-spinner>
          Evet
        </CButton>
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
import CTableWrapper from '@/views/base/Table.vue'

export default {
  name: "Clinic",
  freeSet,
  components: {
    ValidationProvider,
    ValidationObserver,
    CTableWrapper
  },
  data() {
    return {
      fieldsTable: [
        {key: 'universityName', label: "Universite Adı", _style: "min-width:200px"},
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
      eduUUID: '',
      loadingDelete:false,
      loadingEdit:false


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
      this.educationUpdate = response.data
      if (response.status === 200) {
        this.educationInfoUpdateModal = true
      }
    },
    setDeleteModal(id) {
      this.eduUUID = id
      this.deleteModel = true
    },
    async deleteEducationInfo() {
      this.loadingDelete = true
      let response = await new EducationService().deleteEducation(this.eduUUID)
      if (response.status === 200) {
        this.deleteModel = false
        this.loadingDelete = false
        await this.getEducationInfo()
        this.$toast.success({
          title: 'Başarılı',
          message: "Eğitim bilgileri başarıyla silindi"
        })
      } else {
        this.loadingDelete = false
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
      this.loadingEdit = true
      this.educationUpdate.educationType = this.educationUpdate.educationType.value
      let response = await new EducationService().editEducation(this.educationUpdate);
      if (response.status === 200) {
        this.educationInfoUpdateModal = false
        this.loadingEdit = false
        await this.getEducationInfo()
      } else {
        this.loadingEdit = false
      }

    },
    async addEducationInfo() {
      this.loading = true
      if (this.education.educationType === "") {
        this.education.educationType = this.educationTypes[0].value
      }
      let response = await new EducationService().addEducation(this.education);
      if (response.status === 200) {
        this.loading = false
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
          if (this.educationUpdate.uuid) {
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
