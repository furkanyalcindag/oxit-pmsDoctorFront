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
                    <h3>
                      height="24" width="24"/>
                      Instagram
                    </h3>
                    <hr>
                    <h5 v-if="contact.instagram">{{ contact.instagram }}</h5>
                    <h5 v-else>-</h5>

                  </CCol>
                  <CCol lg="2">


                    <h3>
                      <img src="../../../icons/icons8-tag-window-24.png" height="24" width="24"/>
                      Web Site
                    </h3>
                    <hr>
                    <h5 v-if="contact.website">{{ contact.website }}</h5>
                    <h5 v-else>-</h5>

                  </CCol>
                  <CCol lg="2">
                    <h3>
                      <img src="../../../icons/icons8-tag-window-24.png" height="24" width="24"/>
                      Facebook
                    </h3>
                    <hr>
                    <h5 v-if="contact.facebook">{{ contact.facebook }}</h5>
                    <h5 v-else>-</h5>

                  </CCol>
                  <CCol lg="2">
                    <h3>Linkedin</h3>
                    <hr>
                    <h5 v-if="contact.linkedIn">{{ contact.linkedIn }}</h5>
                    <h5 v-else>-</h5>

                  </CCol>
                  <CCol lg="2">


                    <h3>Youtube</h3>
                    <hr>
                    <h5 v-if="contact.youtube">{{ contact.youtube }}</h5>
                    <h5 v-else>-</h5>

                  </CCol>


                  <CCol lg="2">
                    <h3><img src="../../../icons/icons8-numbers-input-form-24.png" height="24" width="24"/>
                      Telefon
                    </h3>
                    <hr>
                    <h5 v-if="contact.mobilePhone">{{ contact.mobilePhone }}</h5>
                    <h5 v-else>-</h5>

                  </CCol>
                  <CCol lg="1">
                    <CButton @click="getSingleContactInfo">
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
        :show.sync="contactInfoUpdateModal"
        :no-close-on-backdrop="true"
        :centered="true"
        title="Modal title 2"
        size="xl"
        color="dark"
    >
      <CRow>
        <CCol lg="12">
          <transition name="fade">
            <CCard v-if="contactInfoUpdateModal">
              <template>
                <CCardBody>
                  <CRow>

                    <validation-observer ref="simpleRules">
                      <CRow>

                        <CCol lg="3">

                          Telefon <span class="text-danger">*</span>

                          <CInput

                              description=""
                              autocomplete="autocomplete"
                              v-model="contact.mobilePhone"

                          />

                        </CCol>


                        <CCol lg="3">
                          Adres <span class="text-danger">*</span>

                          <CInput

                              description=""
                              autocomplete="autocomplete"
                              v-model="contact.address"

                          />


                        </CCol>
                        <CCol lg="3">
                          Web Site <span class="text-danger">*</span>

                          <CInput

                              description=""
                              autocomplete="autocomplete"
                              v-model="contact.website"

                          />


                        </CCol>
                        <CCol lg="3">
                          <validation-provider
                              #default="{errors}"
                              rules="required|min:3|max:100"
                              name="Diploma No">
                            E-mail <span class="text-danger">*</span>
                            <span class="text-danger">{{ errors[0] }}</span>
                            <CInput
                                disabled
                                description=""
                                autocomplete="autocomplete"
                                v-model="contact.diplomaNo"
                                :state="errors.length > 0 ? false:null"
                            />

                          </validation-provider>
                        </CCol>


                        <CCol lg="3">
                          <validation-provider
                              #default="{errors}"
                              rules="required|min:3|max:100"
                              name="Uzmanlık Alanı">
                            Instagram <span class="text-danger">*</span>
                            <span class="text-danger">{{ errors[0] }}</span>
                            <CInput
                                description=""
                                autocomplete="autocomplete"
                                v-model="contact.instagram"
                                :state="errors.length > 0 ? false:null"
                            />

                          </validation-provider>
                        </CCol>


                        <CCol lg="3">
                          Youtube <span class="text-danger">*</span>
                          <CInput
                              description=""
                              autocomplete="autocomplete"
                              v-model="contact.youtube"

                              :state="errors.length > 0 ? false:null"
                          />

                        </CCol>


                        <CCol lg="3">
                          <validation-provider
                              #default="{errors}"
                              rules="required|min:3|max:100"
                              name="Ünvan">
                            Linkedin <span class="text-danger">*</span>
                            <span class="text-danger">{{ errors[0] }}</span>
                            <CInput
                                description=""
                                autocomplete="autocomplete"
                                v-model="contact.linkedIn"

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
        <CButtonClose @click="contactInfoUpdateModal = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="contactInfoUpdateModal = false" color="danger">Kapat</CButton>
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
import ContactService from "@/services/managementServices/contact.service";

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
      contact: new Contact("", "", "", "", "", "", "",),


    };
  },

  methods: {

    async getContactInfo() {
      let response = await new ContactService().getContactInfo();
      if (response.status === 200) {
        this.contact = response.data
      }
    },

    async getSingleContactInfo() {
      this.contactInfoUpdateModal = true
      let response = await new ContactService().getContactInfo();
      if (response.status === 200) {
        this.contact = response.data
      }
    },

    async editContactInfo() {
      console.log(this.contact.department)
      console.log(this.contact.department)
      let response = await new ContactService().editContactInfo(this.contact);
      if (response.status === 200) {
        this.contactInfoUpdateModal = false
        await this.getContactInfo()
      }

    },

    async validationForm() {
      this.$refs.simpleRules.validate().then(async success => {
        if (success) {
          await this.editContactInfo()
        }
      })

    },
  },


  async created() {
    await this.getContactInfo()

  }
  ,
  async mounted() {


  }
  ,
  computed: {}

};
</script>
