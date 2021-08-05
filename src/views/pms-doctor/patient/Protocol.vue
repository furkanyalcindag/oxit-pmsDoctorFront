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
                          name="Açıklama">
                        Açıklama<span class="text-danger">*</span>
                        <span class="text-danger">{{ errors[0] }}</span>
                        <CTextarea

                            description=""
                            autocomplete="autocomplete"
                            v-model="protocol.description"
                            :state="errors.length > 0 ? false:null"
                        />
                      </validation-provider>

                    </CCol>


                    <CCol lg="3">

                      Hasta <span class="text-danger">*</span>

                      <CSelect
                          :options="patients"
                          description=""
                          autocomplete="autocomplete"
                          v-model="protocol.patient"
                          :value.sync="protocol.patient"

                      />

                    </CCol>

                    <CCol lg="6">

                      Tahlil <span class="text-danger">*</span>

                      <multiselect
                          :options="assays"
                          label="label"
                          value="value"
                          multiple
                          class="form-multi-select"
                          v-model="assayArray"


                      >
                      </multiselect>

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
                    :items="protocols"
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

                  <template #assayList="{ item, index }">
                    <td class="py-2">

                      <span v-for="assay in item.assayList">{{ assay.name }} - </span>
                    </td>
                  </template>


                  <template #actions="{ item, index }">
                    <td class="py-2">


                      <CButton @click="setDeleteModal(item.uuid)" color="danger" class="mr-2">Sil</CButton>

                      <CButton @click="getSingleProtocol(item.uuid)" color="success">Düzenle</CButton>
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

    >
      Protokol silmek istediğinizden emin misiniz?


      <template #header>
        <h6 class="modal-title">Uyarı</h6>
        <CButtonClose @click="deleteModel = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="deleteModel = false" color="danger">Hayır</CButton>
        <CButton @click="deleteProtocol" color="success">Evet</CButton>
      </template>


    </CModal>


    <CModal
        :show.sync="protocolUpdateModal"
        :no-close-on-backdrop="true"
        :centered="true"
        title="Modal title 2"
        size="xl"
        color="dark"
    >
      <CRow>
        <CCol lg="12">
          <transition name="fade">
            <CCard v-if="protocolUpdateModal">
              <template>
                <CCardBody>
                  <CRow>

                    <validation-observer ref="simpleRules">
                      <CRow>

                        <CCol lg="3">
                          <validation-provider
                              #default="{errors}"
                              rules="required|min:3|max:100"
                              name="Açıklama">
                            Açıklama <span class="text-danger">*</span>
                            <span class="text-danger">{{ errors[0] }}</span>
                            <CInput

                                v-model="protocolUpdate.description"
                                :state="errors.length > 0 ? false:null"
                            />
                          </validation-provider>
                        </CCol>


                        <CCol lg="6">

                          Tahlil <span class="text-danger">*</span>

                          <multiselect
                              :options="assays"
                              label="name"
                              multiple
                              class="form-multi-select"
                              v-model="assayArray"


                          >
                          </multiselect>

                        </CCol>


                        <CCol lg="3">
                          Hasta <span class="text-danger">*</span>
                          <CSelect
                              :options="patients"
                              description=""
                              autocomplete="autocomplete"
                              v-model="protocolUpdate.patient"
                              :value.sync="protocolUpdate.patient"
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
        <CButtonClose @click="protocolUpdateModal = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="protocolUpdateModal = false" color="danger">Kapat</CButton>
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
import Patient from "@/models/pms/patient";
import PatientService from "@/services/managementServices/patient.service";
import Protocol from "@/models/pms/protocol";
import VSimpleCheckbox from 'vuetify'
import ProtocolService from "@/services/managementServices/protocol.service";
import AssayService from "@/services/managementServices/assay.service";
import Multiselect from 'vue-multiselect'

export default {
  name: "Clinic",
  components: {
    ValidationProvider,
    ValidationObserver,
    // eslint-disable-next-line vue/no-unused-components
    VSimpleCheckbox,
    Multiselect
  },
  data() {
    return {
      fieldsTable: [
        {key: 'description', label: "Açıklama", _style: "min-width:200px"},
        {key: "patient", label: "Hasta"},
        {key: "assayList", label: "Tahlil"},
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
      protocolUpdateModal: false,
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
      protocol: new Protocol("", [], "", false, "", "", 0, ""),
      protocolUpdate: new Protocol("", [], "", false, "", "", 0, ""),
      protocols: [],
      assays: [],
      isPaid: false,
      appointments: [],
      assayArray: []


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

    async addProtocol() {
      //if (this.protocol.assays === "") {
      //this.protocol.assays = this.assays[0].value
      // }

      for (let i = 0; i < this.assayArray.length; i++) {
        this.assayArray[i] = this.assayArray[i].value
      }
      this.protocol.assays = this.assayArray
      if (this.protocol.patient === "") {
        this.protocol.patient = this.patients[0].value
      }

      let response = await new ProtocolService().addProtocol(this.protocol)
      if (response.status === 200) {
        await this.getProtocols()
        this.protocol = new Protocol()
        this.$toast.success({
          title: 'Başarılı',
          message: "Protokol başarıyla eklendi"
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

    async getSingleProtocol(id) {

      let response = await new ProtocolService().getSingleProtocol(id)
      this.protocolUpdate = response.data
      this.assayArray = response.data.assayList
      this.protocolUpdate.patient = response.data.patient.value
      if (response.status === 200) {
        this.protocolUpdateModal = true

      }

    },

    async getAssays() {

      let response = await new AssayService().getAssaysSelect()
      this.assays = response.data
    },

    async getPatients() {

      let response = await new PatientService().getPatientsSelect()
      this.patients = response.data
    },


    async deleteProtocol() {

      let response = await new ProtocolService().deleteProtocol(this.deleteId)
      if (response.status === 200) {
        await this.getProtocols()
        this.deleteModel = false
        this.$toast.success({
          title: 'Başarılı',
          message: "Protokol başarıyla silindi"
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

    async editProtocol() {
      for (let i = 0; i < this.assayArray.length; i++) {
        this.assayArray[i] = this.assayArray[i].value
      }
      this.protocolUpdate.assays = this.assayArray

      if (this.protocolUpdate.patient === "") {
        this.protocolUpdate.patient = this.patients[0].value
      }

      let response = await new ProtocolService().editProtocol(this.protocolUpdate)
      if (response.status === 200) {
        this.protocolUpdateModal = false
        await this.getProtocols()
        this.$toast.success({
          title: 'Başarılı',
          message: "Protokol başarıyla eklendi"
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


    async getProtocols() {

      let response = await new ProtocolService().getProtocols()
      console.log("response", response)
      this.protocols = response.data.data
      console.log(this.protocols)
    },


    async validationForm() {
      this.$refs.simpleRules.validate().then(async success => {
        console.log("array", this.assayArray)

        if (success) {

          if (this.protocolUpdate.uuid) {
            await this.editProtocol()
          } else {
            await this.addProtocol()
          }
        }
      })
    },
  },

  watch: {},

  async created() {
    await this.getAssays()
    await this.getPatients()
    await this.getProtocols()


  },
  async mounted() {
    await this.getAssays()
    await this.getPatients()
    await this.getProtocols()


  },
  computed: {}

};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
