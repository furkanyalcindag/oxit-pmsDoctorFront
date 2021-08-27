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
                          type="number"
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
                          v-model="patient.genderId"
                          :value.sync="patient.genderId"

                      />

                    </CCol>

                    <CCol lg="3">

                      Kan Grubu <span class="text-danger">*</span>

                      <CSelect
                          :options="bloodgroups"
                          description=""
                          autocomplete="autocomplete"
                          v-model="patient.bloodGroupId"
                          :value.sync="patient.bloodGroupId"

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
                  >
                    <c-spinner v-show="loading" size="sm"></c-spinner>
                    Kaydet
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
                    :border="true"
                    hover
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

                      {{ item.birthDate.substring(8, 10) }}-{{
                        item.birthDate.substring(5, 8)
                      }}{{ item.birthDate.substring(0, 4) }}
                    </td>
                  </template>

                  <template #buttons="{ item, index }">
                    <td class="py-2">
                      <CBadge :color="getBadge(item.paymentSituation)">{{ item.paymentSituation }}</CBadge>
                    </td>
                  </template>

                  <template #buttons="{ item, index }">
                    <td class="py-2">
                      <CRow>
                        <CCol lg="4">
                          <CDropdown
                              color="link"
                              size="lg"
                              :caret="false"
                              placement="top-start"
                          >
                            <template #toggler-content>
                              &#x1F4C2;<span class="sr-only">sss</span>
                            </template>
                            <CDropdownItem>
                              <CButton size="sm" @click="setDeleteModal(item.uuid)" class="mr-2">Sil</CButton>
                            </CDropdownItem>
                            <CDropdownItem>
                              <CButton size="sm" @click="getSinglePatient(item.uuid)">Düzenle</CButton>
                            </CDropdownItem>
                            <CDropdownItem>
                              <CLink>
                                <CButton size="sm" @click="$router.push({name:'protocol',params:{patient:item.uuid}})"
                                         color="">Protokol
                                </CButton>
                              </CLink>
                            </CDropdownItem>
                            <CDropdownItem>
                              <CLink>
                                <CButton size="sm" class="mr-2">Cari Hatırlatma Maili Gönder</CButton>
                              </CLink>
                            </CDropdownItem>
                          </CDropdown>
                        </CCol>
                      </CRow>
                    </td>
                  </template>


                </CDataTable>
                <template>
                  <div>

                    <CPagination
                        :activePage.sync="page"
                        :pages="pageCount"
                        size="sm"
                        align="end"
                    />
                  </div>
                </template>
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
        <CButton :disabled="loadingDelete" @click="deletePatient" color="success">
          <c-spinner v-show="loadingDelete" size="sm"></c-spinner>
          Evet
        </CButton>
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
                                v-model="patientUpdate.mobilePhone"

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
                              v-model="patientUpdate.genderId"
                              :value.sync="patientUpdate.genderId"
                          />
                        </CCol>


                        <CCol lg="3">
                          Kan Grubu <span class="text-danger">*</span>
                          <CSelect
                              :options="bloodgroups"
                              description=""
                              autocomplete="autocomplete"
                              v-model="patientUpdate.bloodGroupId"
                              :value.sync="patientUpdate.bloodGroupId"
                          />


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
                                v-model="patientUpdate.email"
                                :state="errors.length > 0 ? false:null"
                            />

                          </validation-provider>
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
                                type="date"
                                v-model="patientUpdate.birthDate"
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
        <CButton :disabled="loading" @click="validationForm" color="success">
          <c-spinner v-show="loading" size="sm"></c-spinner>
          Güncelle
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
        {key: "buttons", label: "İşlemler"}

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
      departments: [],
      doctors: [],
      patient: new Patient("", "", "", "", "", "", "", "", "", "",),
      genders: [],
      bloodgroups: [],
      patients: [],
      patientUpdate: new Patient("", "", "", "", "", "", "", "", "", "",),
      maxDate: '',
      loadingDelete: false,
      loadingEdit: false,
      pageCount: 0


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
      this.loading = true
      if (this.patient.genderId === "" || this.patient.genderId === undefined) {
        this.patient.genderId = this.genders[0].value
      }
      if (this.patient.bloodGroupId === "" || this.patient.bloodGroupId === undefined) {
        this.patient.bloodGroupId = this.bloodgroups[0].value
      }
      let response = await new PatientService().addPatient(this.patient)
      if (response.status === 200) {
        this.loading = false
        await this.getPatients(1)
        this.patient = new Patient()
        this.$toast.success({
          title: 'Başarılı',
          message: "Hasta başarıyla eklendi"
        })
      } else {
        this.loading = false
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
      this.patientUpdate.gender = response.data.gender
      this.patientUpdate.bloodgroup = response.data.bloodgroup
      if (response.status === 200) {
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
      this.loadingDelete = true

      let response = await new PatientService().deletePatient(this.deleteId)
      if (response.status === 200) {
        await this.getPatients(1)
        this.deleteModel = false
        this.$toast.success({
          title: 'Başarılı',
          message: "Hasta başarıyla silindi"
        })
        this.loadingDelete = false
      } else {
        this.isError = true;
        this.loadingDelete = false
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
      this.loading = true
      this.patientUpdate.gender = this.patientUpdate.gender.value
      this.patientUpdate.bloodGroup = this.patientUpdate.bloodGroup.value
      let response = await new PatientService().editPatient(this.patientUpdate)
      if (response.status === 200) {
        this.staffUpdateModal = false
        await this.getPatients()
        this.$toast.success({
          title: 'Başarılı',
          message: "Hasta başarıyla güncellendi"
        })
        this.loading = false
      } else {
        this.loading = false
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


    async getPatients(page) {

      let response = await new PatientService().getPatient(page)
      this.patients = response.data.data
      this.pageCount = response.data.activePage
    },


    async validationForm() {
      this.$refs.simpleRules.validate().then(async success => {
        if (success) {
          if (this.patientUpdate.uuid) {
            await this.editPatient()
          } else {
            await this.addPatient()
          }
        }
      })
    },
  },

  async created() {
    await this.getGenders()
    await this.getBloodGroups()
    await this.getPatients(1)
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    this.maxDate = today


  },
  watch: {

    page: function (val) {
      console.log(val)
      this.getPatients(this.page)

    },
  },
  async mounted() {
    await this.getGenders()
    await this.getBloodGroups()
    await this.getPatients(1)


  },
  computed: {}

};
</script>
