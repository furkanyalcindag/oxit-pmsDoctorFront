<template>
  <div>
    <CRow>
      <CCol lg="12">
        <transition name="fade">
          <CCard v-if="show">
            <CCardHeader>
              <CIcon name="cil-pencil"/>
              Klinik Yönetimi
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
                <div>

                </div>
                <validation-observer ref="simpleRules">
                  <CRow>

                    <CCol lg="3">
                      <validation-provider
                          #default="{errors}"
                          rules="required|min:3|max:100"
                          name="Hasta Adı">
                        Hasta Adı <span class="text-danger">*</span>
                        <span class="text-danger">{{ errors[0] }}</span>
                        <CInput
                            description=""
                            autocomplete="autocomplete"
                            v-model="patient.firstName"
                            :state="errors.length > 0 ? false:null"
                        />
                      </validation-provider>
                    </CCol>


                    <CCol lg="3">
                      <validation-provider
                          #default="{errors}"
                          rules="required|min:3|max:100"
                          name="Hasta Soyad">
                        Hasta Soyad <span class="text-danger">*</span>
                        <span class="text-danger">{{ errors[0] }}</span>
                        <CInput
                            description=""
                            autocomplete="autocomplete"
                            v-model="patient.lastName"

                            :state="errors.length > 0 ? false:null"
                        />
                      </validation-provider>
                    </CCol>
                    <CCol lg="3">
                      <validation-provider
                          #default="{errors}"
                          rules="required|min:3|max:100"
                          name="Telefon Numarası">
                        Telefon Numarası <span class="text-danger">*</span>
                        <span class="text-danger">{{ errors[0] }}</span>
                        <CInput
                            description=""
                            autocomplete="autocomplete"
                            v-model="patient.mobilePhone"
                            :state="errors.length > 0 ? false:null"
                        />

                      </validation-provider>
                    </CCol>

                    <CCol lg="3">
                      <validation-provider
                          #default="{errors}"
                          rules="required|min:3|max:100"
                          name="TC No">
                        TC No <span class="text-danger">*</span>
                        <span class="text-danger">{{ errors[0] }}</span>
                        <CInput
                            description=""
                            autocomplete="autocomplete"
                            v-model="patient.identityNumber"

                            :state="errors.length > 0 ? false:null"
                        />
                      </validation-provider>
                    </CCol>
                    <CCol lg="3">

                      Cinsiyet <span class="text-danger">*</span>

                      <CSelect
                          :options="genders"
                          description=""
                          autocomplete="autocomplete"
                          v-model="patient.gender"
                          :value.sync="patient.gender"

                      />

                    </CCol>

                    <CCol lg="3">

                      Kan Grubu <span class="text-danger">*</span>

                      <CSelect
                          :options="bloodgroups"
                          description=""
                          autocomplete="autocomplete"
                          v-model="patient.bloodgroup"
                          :value.sync="patient.bloodgroup"

                      />

                    </CCol>
                    <CCol lg="3">
                      <validation-provider
                          #default="{errors}"
                          rules="required|min:3|max:100"
                          name="Adresi">
                        Adresi <span class="text-danger">*</span>
                        <span class="text-danger">{{ errors[0] }}</span>
                        <CTextarea
                            description=""
                            autocomplete="autocomplete"
                            v-model="patient.address"

                            :state="errors.length > 0 ? false:null"
                        />
                      </validation-provider>
                    </CCol>

                    <CCol lg="3">
                      <validation-provider
                          #default="{errors}"
                          rules="required|min:3|max:100|email"
                          name="E-Mail">
                        E-Mail <span class="text-danger">*</span>
                        <span class="text-danger">{{ errors[0] }}</span>
                        <CInput
                            description=""
                            type="email"
                            autocomplete="email"
                            prepend="@"
                            v-model="patient.email"
                            :state="errors.length > 0 ? false:null"
                        />

                      </validation-provider>
                    </CCol>
                    <CCol lg="3">
                      <validation-provider
                          #default="{errors}"
                          rules="required"
                          name="Doğum Tarihi">
                        Doğum Tarihi <span class="text-danger">*</span>
                        <span class="text-danger">{{ errors[0] }}</span>
                        <CInput
                            description=""
                            type="date"
                            :max="maxDate"
                            v-model="patient.birthDate"
                            :state="errors.length > 0 ? false:null"
                        />

                      </validation-provider>
                    </CCol>

                  </CRow>
                </validation-observer>

                <div class="form-actions">
                  <CButton type="submit" color="primary"
                           @click="validationForm"
                  >Kaydet
                  </CButton>

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
            <template>
              <CCardBody>

                <CDataTable
                    :items="patients"
                    :fields="fieldsTable"
                    column-filter
                    :border="true"
                    :items-per-page="5"
                    :activePage="4"
                    hover
                    sorter
                    pagination
                    :noItemsView="{ noResults: 'Veri bulunamadı', noItems: 'Veri bulunamadı' }"
                    clickableRows

                >
                  <template #firstName="{ item, index }">
                    <td class="py-2">

                      {{ item.firstName }} {{ item.lastName }}
                    </td>
                  </template>
                  <template #bloodGroup="{ item, index }">
                    <td class="py-2">

                      {{ item.bloodGroup.label }}
                    </td>
                  </template>
                  <template #gender="{ item, index }">
                    <td class="py-2">

                      {{ item.gender.label }}
                    </td>
                  </template>
                  <template #birthDate="{ item, index }">
                    <td class="py-2">

                      {{ item.birthDate.substring(8, 10) }}-{{ item.birthDate.substring(5, 8) }}{{ item.birthDate.substring(0, 4) }}
                    </td>
                  </template>

                  <template #actions="{ item, index }">
                    <td class="py-2">
                      <CDropdown toggler-text="İşlemler">
                        <CDropdownItem>
                          <CButton @click="setDeleteModal(item.uuid)" class="mr-2">Sil</CButton>
                        </CDropdownItem>
                        <CDropdownItem>
                          <CButton @click="getSinglePatient(item.uuid)">Düzenle</CButton>
                        </CDropdownItem>
                        <CDropdownItem>
                          <CLink>
                            <CButton @click="$router.push({name:'protocol',params:{patient:item.uuid}})"
                                     color="primary">Protokol
                            </CButton>
                          </CLink>
                        </CDropdownItem>
                      </CDropdown>


                    </td>
                  </template>
                </CDataTable>
              </CCardBody>
            </template>
          </CCard>
        </transition>
      </CCol>
    </CRow>


    <CModal
        title="Modal title"
        color="danger"
        :show.sync="deleteModel"
        @ok="deletePatient"
    >
      Hastayı silmek istediğinizden emin misiniz?


      <template #header>
        <h6 class="modal-title">Uyarı</h6>
        <CButtonClose @click="deleteModel = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="deleteModel = false" color="danger">Hayır</CButton>
        <CButton @click="deletePatient" color="success">Evet</CButton>
      </template>


    </CModal>


    <CModal
        :show.sync="staffUpdateModal"
        :no-close-on-backdrop="true"
        :centered="true"
        title="Modal title 2"
        size="xl"
        color="dark"
    >
      <CRow>
        <CCol lg="12">
          <transition name="fade">
            <CCard v-if="staffUpdateModal">
              <template>
                <CCardBody>
                  <CRow>

                    <validation-observer ref="simpleRules">
                      <CRow>

                        <CCol lg="3">
                          <validation-provider
                              #default="{errors}"
                              rules="required|min:3|max:100"
                              name="Hasta Adı">
                            Hasta Adı <span class="text-danger">*</span>
                            <span class="text-danger">{{ errors[0] }}</span>
                            <CInput
                                description=""
                                autocomplete="autocomplete"
                                v-model="patientUpdate.firstName"
                                :state="errors.length > 0 ? false:null"
                            />
                          </validation-provider>
                        </CCol>


                        <CCol lg="3">
                          <validation-provider
                              #default="{errors}"
                              rules="required|min:3|max:100"
                              name="Hasta Soyadı">
                            Hasta Soyadı <span class="text-danger">*</span>
                            <span class="text-danger">{{ errors[0] }}</span>
                            <CInput
                                description=""
                                autocomplete="autocomplete"
                                v-model="patientUpdate.lastName"

                                :state="errors.length > 0 ? false:null"
                            />
                          </validation-provider>
                        </CCol>
                        <CCol lg="3">
                          <validation-provider
                              #default="{errors}"
                              rules="required|min:3|max:100"
                              name="Kan Grubu">
                            Kan Grubu <span class="text-danger">*</span>
                            <span class="text-danger">{{ errors[0] }}</span>
                            <CInput
                                description=""
                                autocomplete="autocomplete"
                                v-model="patientUpdate.bloodgroup"
                                :state="errors.length > 0 ? false:null"
                            />

                          </validation-provider>
                        </CCol>

                        <CCol lg="3">
                          <validation-provider
                              #default="{errors}"
                              rules="required|min:3|max:100"
                              name="Adresi">
                            Adresi <span class="text-danger">*</span>
                            <span class="text-danger">{{ errors[0] }}</span>
                            <CInput
                                description=""
                                autocomplete="autocomplete"
                                v-model="patientUpdate.address"

                                :state="errors.length > 0 ? false:null"
                            />
                          </validation-provider>
                        </CCol>


                        <CCol lg="3">
                          <validation-provider
                              #default="{errors}"
                              rules="required|min:3|max:100"
                              name="Telefon Numarası">
                            Telefon Numarası <span class="text-danger">*</span>
                            <span class="text-danger">{{ errors[0] }}</span>
                            <CInput
                                description=""
                                autocomplete="autocomplete"
                                v-model="patientUpdate.telephoneNumber"

                                :state="errors.length > 0 ? false:null"
                            />
                          </validation-provider>
                        </CCol>

                        <CCol lg="3">
                          <validation-provider
                              #default="{errors}"
                              rules="required|min:3|max:100"
                              name="TC No">
                            TC No <span class="text-danger">*</span>
                            <span class="text-danger">{{ errors[0] }}</span>
                            <CInput
                                description=""
                                autocomplete="autocomplete"
                                v-model="patientUpdate.identityNumber"

                                :state="errors.length > 0 ? false:null"
                            />
                          </validation-provider>
                        </CCol>


                        <CCol lg="3">
                          Cinsiyet <span class="text-danger">*</span>
                          <CSelect
                              :options="genders"
                              description=""
                              autocomplete="autocomplete"
                              v-model="patientUpdate.gender"
                              :value.sync="patinetUpdate.gender"
                          />
                        </CCol>


                        <CCol lg="3">
                          Kan Grubu <span class="text-danger">*</span>
                          <CSelect
                              :options="bloodgroups"
                              description=""
                              autocomplete="autocomplete"
                              v-model="patientUpdate.bloodgroup"
                              :value.sync="patientUpdate.bloodgroup"
                          />


                        </CCol>
                        <CCol lg="3">
                          <validation-provider
                              #default="{errors}"
                              rules="required|min:3|max:100"
                              name="Doğum Tarihi">
                            Doğum Tarihi <span class="text-danger">*</span>
                            <span class="text-danger">{{ errors[0] }}</span>
                            <CInput
                                description=""
                                autocomplete="autocomplete"
                                v-model="patientUpdate.birthdate"

                                :state="errors.length > 0 ? false:null"
                            />
                          </validation-provider>
                        </CCol>

                        <CCol lg="3">
                          <validation-provider
                              #default="{errors}"
                              rules="required|min:3|max:100|email"
                              name="E-Mail">
                            E-Mail <span class="text-danger">*</span>
                            <span class="text-danger">{{ errors[0] }}</span>
                            <CInput
                                description=""
                                type="email"
                                autocomplete="email"
                                prepend="@"
                                v-model="doctorUpdate.email"
                                :state="errors.length > 0 ? false:null"
                            />

                          </validation-provider>
                        </CCol>
                        <CCol lg="3">
                          <validation-provider
                              #default="{errors}"
                              rules="required|min:3|max:100|email"
                              name="Doğum Tarihi">
                            E-Mail <span class="text-danger">*</span>
                            <span class="text-danger">{{ errors[0] }}</span>
                            <CInput
                                description=""
                                type="date"
                                v-model="patientUpdate.birthdate"
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
        <h6 class="modal-title">Hasta Bilgileri Güncelle</h6>
        <CButtonClose @click="staffUpdateModal = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="staffUpdateModal = false" color="danger">Kapat</CButton>
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
import DoctorService from "@/services/managementServices/doctor.service";
import Patient from "@/models/pms/patient";
import PatientService from "@/services/managementServices/patient.service";
import GenderService from "@/services/managementServices/gender.service";
import BloodService from "@/services/managementServices/blood.service";

export default {
  name: "Clinic",
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      fieldsTable: [
        {key: 'firstName', label: "Hasta Adı", _style: "min-width:200px"},
        {key: "email", label: "Email"},
        {key: "identityNumber", label: "TC No"},
        {key: "bloodGroup", label: "Kan Grubu"},
        {key: "gender", label: "Cinsiyet"},
        {key: "mobilePhone", label: "Telefon Numarası"},
        {key: "birthDate", label: "Doğum Tarihi"},
        {key: "actions", label: "İşlemler"}


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
      staffUpdateModal: false,
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
      patient: new Patient("", "", "", "", "", "", "", "", "", "",),
      genders: [],
      bloodgroups: [],
      patients: [],
      patientUpdate: new Patient("", "", "", "", "", "", "", "", "", "",),
      maxDate: ''


    };
  },

  methods: {
    validator(val) {
      return val ? val.length >= 4 : false;
    },
    getBadge(status) {
      switch (status) {
        case "Active":
          return "success";
        case "Inactive":
          return "secondary";
        case "Pending":
          return "warning";
        case "Banned":
          return "danger";
        default:
          "primary";
      }
    },
    toggleDetails(item) {
      this.$set(this.items[item.id], "_toggled", !item._toggled);
      this.collapseDuration = 300;
      this.$nextTick(() => {
        this.collapseDuration = 0;
      });
    },

    isCorporateControl() {
      this.isCorporate = !this.isCorporate;
      this.customer.isCorporate = this.isCorporate;
    },
    setDeleteModal(id) {

      this.deleteId = id
      this.deleteModel = true

    },

    async addPatient() {
      if (this.patient.gender === "") {
        this.patient.gender = this.genders[0].value
      }
      if (this.patient.bloodGroup === "") {
        this.patient.bloodGroup = this.bloodgroups[0].value
      }


      let response = await new PatientService().addPatient(this.patient)
      if (response.status === 200) {
        await this.getPatients()
        this.patient = new Patient()
        this.$toast.success({
          title: 'Başarılı',
          message: "Hasta başarıyla eklendi"
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

    async getSinglePatient(id) {

      let response = await new PatientService().getSinglePatient(id)
      this.patientUpdate = response.data
      this.patientUpdate.gender = response.data.gender.value
      this.patientUpdate.bloodgroup = response.data.bloodgroup.value
      if (response.status === 200) {
        this.staffUpdateModal = true
        this.staffUpdateModal = true


      }

    },

    async getGenders() {

      let response = await new GenderService().getGender()
      this.genders = response.data
    },


    async getBloodGroups() {

      let response = await new BloodService().getBloodGroup()
      this.bloodgroups = response.data
    },


    async deletePatient() {

      let response = await new PatientService().deletePatient(this.deleteId)
      if (response.status === 200) {
        await this.getPatients()
        this.deleteModel = false
        this.$toast.success({
          title: 'Başarılı',
          message: "Hasta başarıyla silindi"
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

    async editPatient() {
      if (this.patientUpdate.gender === "") {
        this.patientUpdate.gender = this.genders[0].value
      }

      if (this.patientUpdate.bloodgroup === "") {
        this.patientUpdate.bloodgroup = this.bloodgroups[0].value
      }

      let response = await new DoctorService().editPatient(this.patientUpdate)
      if (response.status === 200) {
        this.staffUpdateModal = false
        await this.getPatients()
        this.$toast.success({
          title: 'Başarılı',
          message: "Hasta başarıyla eklendi"
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


    async getPatients() {

      let response = await new PatientService().getPatients()
      this.patients = response.data.data
    },


    async validationForm() {
      this.$refs.simpleRules.validate().then(async success => {
        if (success) {
          if (this.doctorUpdate.uuid) {
            await this.editPatient()
          } else {
            await this.addPatient()
          }
        }
      })
    },
  },

  watch: {},

  async created() {
    await this.getGenders()
    await this.getBloodGroups()
    await this.getPatients()
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    this.maxDate = today


  },
  async mounted() {
    await this.getGenders()
    await this.getBloodGroups()
    await this.getPatients()


  },
  computed: {}

};
</script>
