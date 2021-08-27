<template>
  <div>
    <CRow>
      <CCol lg="12">
        <transition name="fade">
          <CCard v-if="show">
            <CCardHeader>
              <CIcon name="cil-pencil"/>
              Randevu Yönetimi
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
                            :min="minDate"
                            editFormat="dd-MM-yyyy"
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
                          v-model="appointment.doctorId"
                          :value.sync="appointment.doctorId"

                      />

                    </CCol>

                    <CCol lg="3">

                      Hasta <span class="text-danger">*</span>

                      <CSelect
                          :options="patients"
                          description=""
                          autocomplete="autocomplete"
                          v-model="appointment.patientId"
                          :value.sync="appointment.patientId"

                      />

                    </CCol>


                  </CRow>
                </validation-observer>

                <div class="form-actions">
                  <CButton type="submit" color="primary"
                           @click="validationForm"
                           :disabled="loading"
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
                    :items="appointments"
                    :fields="fieldsTable"
                    :border="true"
                    hover
                    :noItemsView="{ noResults: 'Veri bulunamadı', noItems: 'Veri bulunamadı' }"
                    clickableRows

                >
                  <template #time="{ item, index }">
                    <td class="py-2">

                      {{ item.time.substring(0, 3) }}{{ item.time.substring(3, 5) }}
                    </td>
                  </template>
                  <template #endTime="{ item, index }">
                    <td class="py-2">

                      {{ item.endTime.substring(0, 3) }}{{ item.endTime.substring(3, 5) }}
                    </td>
                  </template>
                  <template #date="{ item, index }">
                    <td class="py-2">

                      {{ item.date.substring(8, 10) }}-{{ item.date.substring(5, 8) }}{{ item.date.substring(0, 4) }}
                    </td>
                  </template>
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
                      <CDropdown size="sm" color="dark" toggler-text="İşlemler">


                        <CDropdownItem>


                          <CButton size="sm" @click="setDeleteModal(item.uuid)" class="mr-2">Sil</CButton>
                        </CDropdownItem>
                        <CDropdownItem>

                          <CButton size="sm" @click="getSingleAppointment(item.uuid)">Düzenle</CButton>

                        </CDropdownItem>
                      </CDropdown>
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
        @ok="deleteAppointment"
    >
      Randevuyu silmek istediğinizden emin misiniz?


      <template #header>
        <h6 class="modal-title">Uyarı</h6>
        <CButtonClose @click="deleteModel = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="deleteModel = false" color="danger">Hayır</CButton>
        <CButton :disabled="loadingDelete" @click="deleteAppointment" color="success">
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


                  <validation-observer ref="simpleRules">
                    <CRow>
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
                      <CCol lg="2">
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
                      <CCol lg="2">
                        <validation-provider
                            #default="{errors}"
                            rules="required|min:3|max:100"
                            name="Saat">
                          Başlangıç Saati <span class="text-danger">*</span>
                          <span class="text-danger">{{ errors[0] }}</span>
                          <CInput
                              timeFormat="true"
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
                    </CRow>
                  </validation-observer>
                </CCardBody>
              </template>
            </CCard>
          </transition>
        </CCol>
      </CRow>
      <template #header>
        <h6 class="modal-title">Randevu Güncelle</h6>
        <CButtonClose @click="staffUpdateModal = false" class="text-white"/>
      </template>
      <template #footer>

        <CButton @click="staffUpdateModal = false" color="danger">Kapat</CButton>

        <CButton :disabled="loadingEdit" @click="validationForm" color="success">
          <c-spinner v-show="loadingEdit" size="sm"></c-spinner>
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
import Doctor from "@/models/pms/doctor";
import DoctorService from "@/services/managementServices/doctor.service";
import Patient from "@/models/pms/patient";
import PatientService from "@/services/managementServices/patient.service";
import Appointment from "@/models/pms/appointment";
import AppointmentService from "@/services/managementServices/appointment.service";
import VSimpleCheckbox from 'vuetify'

export default {
  name: "PatientAppointment",
  components: {
    ValidationProvider,
    ValidationObserver,
    // eslint-disable-next-line vue/no-unused-components
    VSimpleCheckbox
  },
  data() {
    return {
      fieldsTable: [

        {key: "date", label: "Tarih"},
        {key: 'time', label: "Saat"},
        {key: "endTime", label: "Bitiş Saati"},
        {key: "doctor", label: "Doktor"},
        {key: "patient", label: "Hasta"},
        {key: "actions", label: "İşlemler"},


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
      appointment: new Appointment("", "", "", false, "", "", 0, ""),
      appointmentUpdate: new Appointment("", "", "", false, "", "", 0, ""),
      isPaid: false,
      appointments: [],
      minDate: '',
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

    async addAppointment() {
      this.loading = true
      if (this.appointment.doctorId === "" || this.appointment.patientId === undefined) {
        this.appointment.doctorId = this.doctors[0].value
      }
      if (this.appointment.patientId === "" || this.appointment.patientId === undefined) {
        this.appointment.patientId = this.patients[0].value
      }
      let response = await new AppointmentService().addAppointment(this.appointment)
      if (response.status === 200) {
        this.loading = false
        await this.getAppointments(1)
        this.appointment = new Appointment()
        this.$toast.success({
          title: 'Başarılı',
          message: "Randevu başarıyla eklendi"
        })
      } else if (response.status === 406) {
        this.loading = false
        this.$toast.warn({
          title: 'Başarısız',
          message: "Başlangıç saati şuanki saatten geçmiş bir saat olamaz"
        })
      } else if (response.status === 301) {
        this.loading = false
        this.$toast.warn({
          title: 'Başarısız',
          message: "Başlangıç saati bitiş saatinden büyük olamaz"
        })
      } else if (response.status === 411) {
        this.loading = false
        this.$toast.warn({
          title: 'Başarısız',
          message: "Bitiş saati şuanki saatten küçük olamaz"
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

      let response = await new PatientService().getPatientSelect()
      this.patients = response.data
    },


    async deleteAppointment() {
      this.loadingDelete = true

      let response = await new AppointmentService().deleteAppointment(this.deleteId)
      if (response.status === 200) {
        await this.getAppointments(1)
        this.deleteModel = false
        this.$toast.success({
          title: 'Başarılı',
          message: "Randevu başarıyla silindi"
        })
        this.loadingDelete = false
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

    async editAppointment() {
      this.loadingEdit = true
      if (this.appointmentUpdate.doctor === "") {
        this.appointmentUpdate.doctor = this.doctors[0].value
      }

      if (this.appointmentUpdate.patient === "") {
        this.appointmentUpdate.patient = this.patients[0].value
      }

      let response = await new AppointmentService().updateAppointment(this.appointmentUpdate)
      if (response.status === 200) {
        this.loadingEdit = false
        this.staffUpdateModal = false
        await this.getAppointments(1)
        this.$toast.success({
          title: 'Başarılı',
          message: "Randevu başarıyla güncellendi"
        })
      } else if (response.status === 406) {
        this.loadingEdit = false
        this.$toast.success({
          title: 'Başarısız',
          message: "Şuanki saatten geçmiş bir başlangıç saati eklenemez"
        })
      } else if (response.status === 301) {
        this.loadingEdit = false
        this.$toast.success({
          title: 'Başarısız',
          message: "Başlangıç saati bitiş saatinden büyük olamaz"
        })
      } else if (response.status === 411) {
        this.loadingEdit = false
        this.$toast.success({
          title: 'Başarısız',
          message: "Bitiş saati şuanki saatten küçük olamaz"
        })
      } else if (response.status === 417) {
        this.loadingEdit = false
        this.$toast.success({
          title: 'Başarısız',
          message: "Geçmiş tarih eklenemez"
        })
      } else if (response.status === 304) {
        this.loadingEdit = false
        this.$toast.success({
          title: 'Başarısız',
          message: "Şuanki saatten geçmiş bir bitiş saati eklenemez"
        })

      } else if (response.status === 401) {
        localStorage.clear()

      } else {
        this.loadingEdit = false
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


    async getAppointments(page) {

      let response = await new AppointmentService().getAppointment(page)
      this.appointments = response.data.data
      this.pageCount = response.data.activePage
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

  watch: {

    page: function (val) {
      console.log(val)
      this.getAppointments(this.page)

    },
  },

  async created() {
    await this.getDoctors()
    await this.getPatients()
    await this.getAppointments(1)
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    this.minDate = today

  },
  async mounted() {
    await this.getDoctors()
    await this.getPatients()
    await this.getAppointments(1)


  },
  computed: {}

};
</script>
