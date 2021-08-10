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

                    <CCol lg="2">
                      <validation-provider
                          #default="{errors}"
                          rules="required|min:3|max:100"
                          name="Tarih">
                        Tarih<span class="text-danger">*</span>
                        <span class="text-danger">{{ errors[0] }}</span>
                        <CInput
                            type="date"
                            description=""
                            autocomplete="autocomplete"
                            v-model="appointment.date"
                            :state="errors.length > 0 ? false:null"
                        />
                      </validation-provider>
                    </CCol>

                    <CCol lg="2">
                      <validation-provider
                          #default="{errors}"
                          rules="required|min:3|max:100"
                          name="Saat">
                        Saat<span class="text-danger">*</span>
                        <span class="text-danger">{{ errors[0] }}</span>
                        <CInput
                            type="time"
                            timeFormat="true"
                            description=""
                            autocomplete="autocomplete"
                            v-model="appointment.time"
                            :state="errors.length > 0 ? false:null"
                        />
                      </validation-provider>
                    </CCol>

                     <CCol lg="2">
                      <validation-provider
                          #default="{errors}"
                          rules="required|min:3|max:100"
                          name="Bitiş Saati">
                        Bitiş Saati<span class="text-danger">*</span>
                        <span class="text-danger">{{ errors[0] }}</span>
                        <CInput
                            type="time"
                            timeFormat="true"
                            description=""
                            autocomplete="autocomplete"
                            v-model="appointment.endTime"
                            :state="errors.length > 0 ? false:null"
                        />
                      </validation-provider>
                    </CCol>


                    <CCol lg="3">

                      Doktor <span class="text-danger">*</span>

                      <CSelect
                          :options="doctors"
                          description=""
                          autocomplete="autocomplete"
                          v-model="appointment.doctor"
                          :value.sync="appointment.doctor"

                      />

                    </CCol>

                    <CCol lg="3">

                      Hasta <span class="text-danger">*</span>

                      <CSelect
                          :options="patients"
                          description=""
                          autocomplete="autocomplete"
                          v-model="appointment.patient"
                          :value.sync="appointment.patient"

                      />

                    </CCol>

                    <CCol lg="2">
                      <CRow>
                        <CCol lg="6">
                          Ücretli mi ? <span class="text-danger">*</span>
                          <span class="text-danger">{{ errors[0] }}</span>
                          <CSwitch
                              class="mx-1"
                              color="primary"
                              name="switch1"
                              :checked.sync="appointment.isPaid"
                          />
                        </CCol>
                        <CCol lg="6">
                          Ücret
                          <CInput
                              v-model="appointment.price"
                          />
                        </CCol>
                      </CRow>
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
                    :items="appointments"
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
                  <template #patient="{ item, index }">
                    <td class="py-2">

                      {{ item.patient.label }}
                    </td>
                  </template>

                  <template #doctor="{ item, index }">
                    <td class="py-2">

                      {{ item.doctor.label }}
                    </td>
                  </template>


                  <template #actions="{ item, index }">
                    <td class="py-2">
                        <CDropdown toggler-text="İşlemler">
                        <CDropdownItem>
                      <CButton @click="setDeleteModal(item.uuid)" color="danger" class="mr-2">Sil</CButton>
                        </CDropdownItem>

                          <CDropdownItem>
                      <CButton @click="getSingleAppointment(item.uuid)" color="success">Düzenle</CButton>
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
        @ok="deleteAppointment"
    >
      Randevuyu silmek istediğinizden emin misiniz?


      <template #header>
        <h6 class="modal-title">Uyarı</h6>
        <CButtonClose @click="deleteModel = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="deleteModel = false" color="danger">Hayır</CButton>
        <CButton @click="deleteAppointment" color="success">Evet</CButton>
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
                              name="Saat">
                            Saat <span class="text-danger">*</span>
                            <span class="text-danger">{{ errors[0] }}</span>
                            <CInput
                                timeFormat="24hr"
                                type="time"
                                description=""
                                autocomplete="autocomplete"
                                v-model="appointmentUpdate.time"
                                :state="errors.length > 0 ? false:null"
                            />
                          </validation-provider>
                        </CCol>

                          <CCol lg="2">
                      <validation-provider
                          #default="{errors}"
                          rules="required|min:3|max:100"
                          name="Bitiş Saati">
                        Bitiş Saati<span class="text-danger">*</span>
                        <span class="text-danger">{{ errors[0] }}</span>
                        <CInput
                            type="time"
                            timeFormat="true"
                            description=""
                            autocomplete="autocomplete"
                            v-model="appointmentUpdate.endTime"
                            :state="errors.length > 0 ? false:null"
                        />
                      </validation-provider>
                    </CCol>


                        <CCol lg="3">
                          <validation-provider
                              #default="{errors}"
                              rules="required|min:3|max:100"
                              name="Tarih">
                            Tarih <span class="text-danger">*</span>
                            <span class="text-danger">{{ errors[0] }}</span>
                            <CInput
                                description=""
                                type="date"
                                autocomplete="autocomplete"
                                v-model="appointmentUpdate.date"

                                :state="errors.length > 0 ? false:null"
                            />
                          </validation-provider>
                        </CCol>




                        <CCol lg="3">
                          Doktor <span class="text-danger">*</span>
                          <CSelect
                              :options="doctors"
                              description=""
                              autocomplete="autocomplete"
                              v-model="appointmentUpdate.doctor"
                              :value.sync="appointmentUpdate.doctor"
                          />
                        </CCol>


                        <CCol lg="3">
                          Hasta <span class="text-danger">*</span>
                          <CSelect
                              :options="patients"
                              description=""
                              autocomplete="autocomplete"
                              v-model="appointmentUpdate.patient"
                              :value.sync="appointmentUpdate.patient"
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
        <h6 class="modal-title">Hasta Güncelle</h6>
        <CButtonClose @click="staffUpdateModal = false" class="text-white"/>
      </template>
      <template #footer>
         <CDropdownItem>
        <CButton @click="staffUpdateModal = false" color="danger">Kapat</CButton>
         </CDropdownItem>
         <CDropdownItem>
        <CButton @click="validationForm" color="success">Güncelle</CButton>
         </CDropdownItem>
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
import Appointment from "@/models/pms/appointment";
import AppointmentService from "@/services/managementServices/appointment.service";
import VSimpleCheckbox from 'vuetify'

export default {
  name: "Clinic",
  components: {
    ValidationProvider,
    ValidationObserver,
    // eslint-disable-next-line vue/no-unused-components
    VSimpleCheckbox
  },
  data() {
    return {
      fieldsTable: [
        {key: 'time', label: "Saat", _style: "min-width:200px"},
        {key: "date", label: "Tarih"},
        {key: "endTime", label: "endTime"},
        {key: "doctor", label: "Doktor"},
        {key: "patient", label: "Hasta"},
        {key: "isPaid", label: "Ücret"},


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
      appointment: new Appointment("", "", "", false, "", "", 0,""),
      appointmentUpdate: new Appointment("", "", "", false, "", "", 0,""),
      isPaid: false,
      appointments: [],


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

    async addAppointment() {
      if (this.appointment.doctorId === "") {
        this.appointment.doctorId = this.doctors[0].value
      }
      if (this.appointment.patientId === "") {
        this.appointment.patientId = this.patients[0].value
      }
      console.log("is", this.appointment.isPaid)
      let response = await new AppointmentService().addAppointment(this.appointment)
      if (response.status === 200) {
        await this.getAppointments()
        this.appointment = new Appointment()
        this.$toast.success({
          title: 'Başarılı',
          message: "Randevu başarıyla eklendi"
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

    async getSingleAppointment(id) {

      let response = await new AppointmentService().getSingleAppointment(id)
      this.appointmentUpdate = response.data
      this.appointmentUpdate.doctor = response.data.doctor.value
      this.appointmentUpdate.patient = response.data.patient.value
      if (response.status === 200) {
        this.staffUpdateModal = true
        this.staffUpdateModal = true


      }

    },

    async getDoctors() {

      let response = await new DoctorService().getDoctorSelect()
      this.doctors = response.data
    },

    async getPatients() {

      let response = await new PatientService().getPatientsSelect()
      this.patients = response.data
    },


    async deleteAppointment() {

      let response = await new AppointmentService().deleteAppointment(this.deleteId)
      if (response.status === 200) {
        await this.getAppoitnments()
        this.deleteModel = false
        this.$toast.success({
          title: 'Başarılı',
          message: "Randevu başarıyla silindi"
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

    async editAppointment() {
      if (this.appointmentUpdate.doctor === "") {
        this.appointmentUpdate.doctor = this.doctors[0].value
      }

      if (this.appointmentUpdate.patient === "") {
        this.appointmentUpdate.patient = this.patients[0].value
      }

      let response = await new AppointmentService().editAppointment(this.appointmentUpdate)
      if (response.status === 200) {
        this.staffUpdateModal = false
        await this.getAppointments()
        this.$toast.success({
          title: 'Başarılı',
          message: "Randevu başarıyla eklendi"
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


    async getAppointments() {

      let response = await new AppointmentService().getAppointment()
      console.log("response", response)
      this.appointments = response.data.data
      console.log(this.appointments)
    },


    async validationForm() {
      this.$refs.simpleRules.validate().then(async success => {
        if (success) {
          if (this.appointmentUpdate.uuid) {
            await this.editAppointment()
          } else {
            await this.addAppointment()
          }
        }
      })
    },
  },

  watch: {},

  async created() {
    await this.getDoctors()
    await this.getPatients()
    await this.getAppointments()


  },
  async mounted() {
    await this.getDoctors()
    await this.getPatients()
    await this.getAppointments()


  },
  computed: {}

};
</script>
