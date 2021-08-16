<template>
  <div>
    <CRow>
      <CCol lg="12">
        <transition name="fade">
          <CCard v-if="show">
            <CCardHeader>
              <img src="../../../icons/icons8-contact-32.png" height="32" width="32"/>
              İletişim Bilgileri
              <div class="card-header-actions">
                <CButton v-if="contact === null" @click="contactInfoModal = true">
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
                  <CCol lg="6">
                    <CRow>
                      <CCol lg="12">
                        <h5>
                          <img src="../../../icons/icons8-instagram-logo-24.png" height="24" width="24"/>

                          Instagram
                        </h5>


                        <hr>
                        <h6 v-if="contactList.instagram">{{ contactList.instagram }}</h6>
                        <h6 v-else>-</h6>

                      </CCol>
                      <CCol lg="12">


                        <h5>
                          <img src="../../../icons/icons8-tag-window-24.png" height="24" width="24"/>
                          Web Site
                        </h5>
                        <hr>
                        <h5 v-if="contactList.website">{{ contactList.website }}</h5>
                        <h5 v-else>-</h5>

                      </CCol>
                      <CCol lg="12">
                        <h5>
                          <img src="../../../icons/icons8-facebook-circled-24.png" height="24" width="24"/>

                          Facebook
                        </h5>


                        <hr>
                        <h6 v-if="contactList.facebook">{{ contactList.facebook }}</h6>
                        <h6 v-else>-</h6>

                      </CCol>
                      <CCol lg="12">
                        <h5>


                          <img src="../../../icons/icons8-linkedin-24.png" height="24" width="24"/>
                          Linkedin


                        </h5>
                        <hr>
                        <h6 v-if="contactList.linkedIn">{{ contactList.linkedIn }}</h6>
                        <h6 v-else>-</h6>

                      </CCol>
                    </CRow>
                  </CCol>
                  <CCol lg="6">
                    <CRow>
                      <CCol lg="10">
                        <CRow>
                          <CCol>
                            <h5>
                              <img src="../../../icons/icons8-cell-phone-24.png" height="24" width="24"/>

                              Telefon
                            </h5>
                            <hr>
                            <h6 v-if="contactList.mobilePhone">{{ contactList.mobilePhone }}</h6>
                            <h6 v-else>-</h6>
                          </CCol>
                        </CRow>

                      </CCol>
                      <CCol lg="10">
                        <CRow>
                          <CCol lg="3">
                            <h5>
                              <img src="../../../icons/icons8-cell-phone-24.png" height="24" width="24"/>
                              E-mail:
                            </h5>
                          </CCol>
                          <CCol lg="9">
                            <h6 v-if="contactList.email">{{ contactList.email }}</h6>
                            <h6 v-else>-</h6>
                          </CCol>
                        </CRow>


                      </CCol>

                      <CCol lg="10">
                            <hr>
                        <CRow>
                          <CCol lg="3">
                            <h5>
                              <img src="../../../icons/icons8-linkedin-24.png" height="24" width="24"/>
                              Adres:
                            </h5>
                          </CCol>
                          <CCol lg="9">
                            <h6 v-if="contactList.address">{{ contactList.address }}</h6>
                            <h6 v-else>-</h6>
                          </CCol>
                        </CRow>
                      </CCol>

                      <CCol lg="12">
                        <hr>
                        <CRow>
                          <CCol lg="10">

                            <h5>
                              <img src="../../../icons/icons8-youtube-play-button-24.png" height="24" width="24"/>
                              Youtube</h5>


                            <hr>
                            <h6 v-if="contactList.youtube">{{ contactList.youtube }}</h6>
                            <h6 v-else>-</h6>

                          </CCol>
                          <CCol lg="2">
                            <CButton @click="getSingleContactInfo">
                              <CIcon name="cil-pencil"/>
                            </CButton>

                          </CCol>
                        </CRow>
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
        :show.sync="contactInfoModal"
        :no-close-on-backdrop="true"
        :centered="true"
        title="Modal title 2"
        size="xl"
        color="dark"
    >
      <CRow>
        <CCol lg="12">
          <transition name="fade">
            <CCard v-if="contactInfoModal">
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
                           <CTextarea

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
                          Facebook <span class="text-danger">*</span>

                          <CInput

                              description=""
                              autocomplete="autocomplete"
                              v-model="contact.facebook"

                          />


                        </CCol>
                        <CCol lg="3">
                          <validation-provider
                              #default="{errors}"
                              rules="required|min:3|max:100"
                              name="Email">
                            E-mail <span class="text-danger">*</span>
                            <span class="text-danger">{{ errors[0] }}</span>
                            <CInput
                                disabled
                                description=""
                                autocomplete="autocomplete"
                                v-model="contact.email"
                                :state="errors.length > 0 ? false:null"
                            />

                          </validation-provider>
                        </CCol>


                        <CCol lg="3">
                          <validation-provider
                              #default="{errors}"
                              rules="required|min:3|max:100"
                              name="Instagram">
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
                          LinkedIn <span class="text-danger">*</span>
                          <CInput
                              description=""
                              autocomplete="autocomplete"
                              v-model="contact.linkedin"

                              :state="errors.length > 0 ? false:null"
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
        <h6 class="modal-title">İletişim Bilgileri Güncelle</h6>
        <CButtonClose @click="contactInfoModal = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="contactInfoModal = false" color="danger">Kapat</CButton>
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
import ContactService from "@/services/managementServices/contact.service";
import {freeSet} from '@coreui/icons'

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
      contactInfoModal: false,
      contacts: [],
      contactList: new Contact("", "", "", "", "", "", "",),


    };
  },

  methods: {

    async getContactInfo() {
      let response = await new ContactService().getContactInfo();
      if (response.status === 200) {
        this.contactList = response.data
      }
    },

    async getSingleContactInfo() {
      this.contactInfoModal = true
      let response = await new ContactService().getContactInfo();
      if (response.status === 200) {
        this.contact = response.data
      }
    },

    async editContactInfo() {
      let response = await new ContactService().editContactInfo(this.contact);
      if (response.status === 200) {
        this.contactInfoModal = false
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
