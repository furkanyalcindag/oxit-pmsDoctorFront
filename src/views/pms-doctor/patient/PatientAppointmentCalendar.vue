<template>
  <CCard>
      <vue-cal
          :on-event-click="onEventClick"
          :events="events"
          :selected-date="selectedDate"
          style="height: 560px"
          class="vuecal"
          :time-from="7*60"
          :time-to="22*60"
          :disable-views="['years', 'year']"
          events-count-on-year-view="events-count-on-year-view"
          events-on-month-view="short"
          active-view="month"
          locale="tr"
          @ready="formatDate"
          @view-change="formatDate">
      </vue-cal>

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
                                disabled
                                timeFormat="24hr"
                                type="time"
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
                            disabled
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
                          <validation-provider
                              #default="{errors}"
                              rules="required|min:3|max:100"
                              name="Tarih">
                            Tarih <span class="text-danger">*</span>
                            <span class="text-danger">{{ errors[0] }}</span>
                            <CInput
                                disabled
                                description=""
                                type="date"
                                autocomplete="autocomplete"
                                v-model="appointment.date"

                                :state="errors.length > 0 ? false:null"
                            />
                          </validation-provider>
                        </CCol>




                        <CCol lg="3">
                          Doktor <span class="text-danger">*</span>
                          <CInput
                              disabled

                              description=""
                              autocomplete="autocomplete"
                              v-model="appointment.doctor.label"

                          />
                        </CCol>


                        <CCol lg="3">
                          Hasta <span class="text-danger">*</span>
                          <CInput
                              disabled

                              description=""
                              autocomplete="autocomplete"
                              v-model="appointment.patient.label"

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
        <CButton @click="staffUpdateModal = false" color="danger">Kapat</CButton>
      </template>
    </CModal>

  </CCard>


</template>

<script>
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import 'vue-cal/dist/vuecal.css'
import 'vue-cal/dist/i18n/tr.js'
import AppointmentService from "@/services/managementServices/appointment.service";
import Appointment from "@/models/pms/appointment";
import {ValidationProvider, ValidationObserver} from 'vee-validate'
export default {
  name: "PatientAppointmentCalendar",
  components: {
    VueCal,
    ValidationObserver,
    ValidationProvider

  },

  data() {
    return {
      events: [],
      selectedDate: null,
      isPaid: false,
      setOpenModal: false,
      appointmentUUID: 0,
      location: null,
      student: null,
      show: false,
      appointment: new Appointment("","","","","","",""),
      staffUpdateModal: false,
    }
  },
  async created() {


  },
  watch: {},
  methods: {
    async onEventClick(event) {
      this.staffUpdateModal = true
      this.appointmentUUID = event.uuid
      await this.adminGetSingleAppointment()
    },
    async formatDate({startDate, endDate}) {
      let start = startDate.getFullYear() + '-' + (parseInt(startDate.getMonth()) + 1) + '-' + startDate.getDate()
      let end = endDate.getFullYear() + '-' + (parseInt(endDate.getMonth()) + 1) + '-' + endDate.getDate()
      await this.getAppointments(start, end)
    },
    async getAppointments(start, end) {
      this.show = true
      let response = await new AppointmentService().appointmentCalendar(start, end)
      if (response.status === 200) {
        this.show = false
        this.events = response.data
      }
    },
    async adminGetSingleAppointment() {
      let response = await new AppointmentService().appointmentCalendarSingle(this.appointmentUUID)
      this.appointment = response.data

    }
  }
}
</script>

<style lang="scss">
.vuecal {
  background-color: #ffffff;
}

.vuecal__title-bar {
  background-color: #c0f0ff;
}

.vuecal--month-view .vuecal__cell {
  height: 80px;
}

.vuecal--month-view .vuecal__cell-content {
  justify-content: flex-start;
  height: 100%;
  align-items: flex-end;
}

.vuecal--month-view .vuecal__cell-date {
  padding: 4px;
}

.vuecal--month-view .vuecal__no-event {
  display: none;
}

.vuecal__event.undone {
  background-color: #ffa8a8;
  border: 1px solid #ffa8a8;
  color: #383b37;
}

.vuecal__event.done {
  background-color: #afe090;
  border: 1px solid #afe090;
  color: #383b37;
}
</style>