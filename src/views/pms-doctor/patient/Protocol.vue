<template>
  <div>
    <CRow>
      <CCol lg="12">
        <transition name="fade">
          <CCard v-if="show">
            <CCardHeader>
              <CIcon name="cil-pencil"/>
              Hasta Bilgileri
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
                    <h5>
                      İsim Soyisim:
                    </h5>
                  </CCol>
                  <CCol lg="3">
                    <h5>{{ patient.firstName }} {{ patient.lastName }}</h5>
                  </CCol>
                  <CCol lg="2">
                    <h5>
                      TC:
                    </h5>
                  </CCol>
                  <CCol lg="3">
                    <h5>{{ patient.identityNumber }}</h5>
                  </CCol>
                </CRow>
                <hr>
                <CRow>
                  <CCol lg="2">
                    <h5>
                      Doğum Tarihi:
                    </h5>
                  </CCol>
                  <CCol lg="3">
                    <h5>{{ patient.birthDate }}</h5>
                  </CCol>
                  <CCol lg="2">
                    <h5>
                      Adres:
                    </h5>
                  </CCol>
                  <CCol lg="3">
                    <h5>{{ patient.address }}</h5>
                  </CCol>
                </CRow>
                <hr>
                <CRow>
                  <CCol lg="2">
                    <h5>
                      Kan Grubu:
                    </h5>
                  </CCol>
                  <CCol lg="3">
                    <h5>{{ patient.bloodGroup.label }}</h5>
                  </CCol>
                  <CCol lg="2">
                    <h5>
                      Telefon Numarası:
                    </h5>
                  </CCol>
                  <CCol lg="3">
                    <h5>{{ patient.mobilePhone }}</h5>
                  </CCol>
                </CRow>
                <hr>
                <CRow>
                  <CCol lg="2">
                    <h5>
                      Cinsiyet:
                    </h5>
                  </CCol>
                  <CCol lg="3">
                    <h5>{{ patient.gender.label }}</h5>
                  </CCol>
                  <CCol lg="2">
                    <h5>
                      E-Mail
                    </h5>
                  </CCol>
                  <CCol lg="3">
                    <h5>{{ patient.email }}</h5>
                  </CCol>
                </CRow>
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
                <CTabs>
                  <CTab title="Protokol Ekle" active>
                    <CCard class="mt-5">
                      <CCard>
                        <CCardHeader>
                          <div class="card-header-actions">

                            <CDropdown href="#" class="card-header-action btn-setting" toggler-text="İşlemler">

                              <CDropdownItem>
                                <CButton @click="protocolUpdateModal=true" color="primary">Tahlil Ekle</CButton>

                              </CDropdownItem>
                            </CDropdown>
                          </div>
                        </CCardHeader>
                        <CCardBody>
                          <CRow>
                            <CCol lg="6">
                              <validation-observer ref="simpleRules">
                                <CRow>
                                  <CCol lg="12">
                                    <validation-provider
                                        #default="{errors}"
                                        rules="required|min:3|max:100"
                                        name="Şikayet">
                                      Şikayet<span class="text-danger">*</span>
                                      <span class="text-danger">{{ errors[0] }}</span>
                                      <CTextarea

                                          description=""
                                          autocomplete="autocomplete"
                                          v-model="protocol.description"
                                          :state="errors.length > 0 ? false:null"
                                      />
                                    </validation-provider>
                                  </CCol>
                                </CRow>
                              </validation-observer>
                            </CCol>
                            <CCol lg="6">
                              <CCardSubtitle class="mt-2">İstenilen Tahliller
                              </CCardSubtitle>
                              <CListGroup>
                                <CListGroupItem>
                                  <CListGroup>
                                    <CListGroupItem v-for="(selected,index) in protocol.assays">
                                      {{ selected.name }}
                                      <CButton @click="minusSelectedAssay(selected)">
                                        <CIcon :content="$options.freeSet.cilMinus"
                                               name="cil-minus" class="ml-3"/>

                                      </CButton>
                                    </CListGroupItem>
                                  </CListGroup>
                                </CListGroupItem>
                              </CListGroup>
                            </CCol>
                          </CRow>
                          <CRow>
                            <CCol lg="6">
                              <CButton @click="addProtocol" color="primary">Kaydet</CButton>
                            </CCol>
                          </CRow>
                        </CCardBody>
                      </CCard>
                    </CCard>
                  </CTab>
                  <CTab title="Geçmiş Protokoller">
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


                            <CButton @click="getSingleOldProtocol(item.uuid)" color="success">Görüntüle</CButton>
                          </td>
                        </template>
                      </CDataTable>
                    </CCardBody>
                  </CTab>
                </CTabs>
              </CCardBody>
            </template>
          </CCard>
        </transition>
      </CCol>
    </CRow>


    <CModal
        :show.sync="showResultModal"
        :no-close-on-backdrop="true"
        :centered="true"
        title="Modal title 2"
        size="xl"
        color="dark"
    >
      <CRow>
        <CCol lg="12">
          <transition name="fade">
            <CCard v-if="showResultModal">
              <template>
                <CCardBody>
                  <CTableWrapper :items="getShuffledUsersData()" :fields="fieldsTableAssay">

                  </CTableWrapper>
                </CCardBody>
              </template>
            </CCard>
          </transition>
        </CCol>
      </CRow>
      <template #header>
        <h6 class="modal-title">Sonuçlar</h6>
        <CButtonClose @click="showResultModal = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="showResultModal = false" color="danger">Kapat</CButton>

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
                  <validation-observer ref="simpleRules">
                    <CRow>


                      <CCol lg="6">
                        <validation-provider
                            #default="{errors}"
                            rules="required|min:3|max:100"
                            name="Tahlil Adı">
                          Tahlil Adı <span class="text-danger">*</span>
                          <span class="text-danger">{{ errors[0] }}</span>
                          <CInput
                              description=""
                              autocomplete="autocomplete"
                              v-model="assay.assayName"
                              @input="getAssays"
                              :state="errors.length > 0 ? false:null"
                          />
                        </validation-provider>
                      </CCol>
                      <CCol lg="6" class="mt-4">
                        <CButton @click="getAssays" color="success">Ara</CButton>

                      </CCol>

                    </CRow>
                  </validation-observer>
                  <hr>
                  <CRow>
                    <CCol lg="6">

                      <CListGroup>
                        <CListGroupItem v-for="assay in assayArray">{{ assay.name }}
                          <CButton @click="pushSelectedAssay(assay)">
                            <CIcon :content="$options.freeSet.cilPlus"
                                   name="cil-plus" class="ml-3"/>

                          </CButton>
                        </CListGroupItem>
                      </CListGroup>
                    </CCol>
                    <CCol lg="6">
                      <CCard>
                        <CListGroup>
                          <CListGroupItem v-for="selected in selectedAssays">{{ selected.name }}</CListGroupItem>
                        </CListGroup>
                      </CCard>
                    </CCol>
                  </CRow>
                </CCardBody>
              </template>
            </CCard>
          </transition>
        </CCol>
      </CRow>
      <template #header>
        <h6 class="modal-title">Tahlil Ekle</h6>
        <CButtonClose @click="closeModalAssay" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="closeModalAssay" color="danger">Kapat</CButton>
        <CButton @click="setAssayModal" color="success">Ekle</CButton>
      </template>
    </CModal>


    <CModal
        :show.sync="protocolNewUpdateModal"
        :no-close-on-backdrop="true"
        :centered="true"
        title="Modal title 2"
        size="xl"
        color="dark"
    >
      <CRow>
        <CCol lg="12">
          <transition name="fade">
            <CCard v-if="protocolNewUpdateModal">
              <template>
                <CCardBody>

                  <CTabs>
                    <CTab title="Şikayet ve Tahliller" active>
                      <CRow>
                        <CCol lg="6">
                          Açıklama <span class="text-danger">*</span>
                          <CInput
                              disabled
                              v-model="protocolUpdate.description"
                          />
                        </CCol>
                        <CCol lg="6">
                          <CListGroup>
                            <CListGroupItem v-for="selected in patientAssays">
                              <CRow>

                                <CCol lg="9">
                                  {{ selected.label }}

                                </CCol>

                                <CCol lg="3">

                                  <CButton @click="getSingleAssayResult(selected.value)" color="success">Görüntüle
                                  </CButton>
                                </CCol>
                              </CRow>


                            </CListGroupItem>
                            <CButton @click="getSingleDiagnosis">Teşhis EKle</CButton>


                          </CListGroup>
                        </CCol>
                      </CRow>
                    </CTab>
                  </CTabs>
                </CCardBody>
              </template>
            </CCard>
          </transition>
        </CCol>
      </CRow>
      <template #header>
        <h6 class="modal-title">Protokol</h6>
        <CButtonClose @click="protocolNewUpdateModal = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="protocolNewUpdateModal = false" color="danger">Kapat</CButton>

      </template>
    </CModal>
    <CModal
        :show.sync="getDiagnosis"
        :no-close-on-backdrop="true"
        :centered="true"
        title="Modal title 2"
        size="xl"
        color="dark"
    >
      <CRow>
        <CCol lg="12">
          <transition name="fade">
            <CCard v-if="getDiagnosis">
              <template>
                <CCardBody>

                  <CRow v-if="showDiagnosis">
                    <CCol lg="6">
                      Teşhis <span class="text-danger">*</span>
                      <CInput
                          v-model="diagnosis.diagnosis"
                      />
                    </CCol>
                    <CCol lg="6">
                      <CRow>
                        <CCol lg="6">
                          İlaç <span class="text-danger">*</span>
                          <CInput
                              description=""
                              autocomplete="autocomplete"
                              v-model="medicineName"
                          />
                        </CCol>
                        <CCol lg="6" v-if="medicineName !== ''">
                          <CButton @click="pushSelectedMedicine(medicineName)">
                            <CIcon :content="$options.freeSet.cilPlus"
                                   name="cil-plus" class="ml-3"/>
                          </CButton>
                        </CCol>
                      </CRow>
                    </CCol>
                    <CCol lg="6">
                      <CCard>
                        <CListGroup>
                          <CListGroupItem v-for="selected in selectedMedicines">{{ selected }}
                            <CButton @click="minusSelectedMedicine(selected)">
                              <CIcon :content="$options.freeSet.cilMinus"
                                     name="cil-minus" class="ml-3"/>
                            </CButton>
                          </CListGroupItem>
                        </CListGroup>
                      </CCard>
                    </CCol>
                    <CCol lg="6">
                      <CButton @click="addDiagnosis">Ekle</CButton>
                    </CCol>
                  </CRow>
                  <CRow v-else>
                    <CCol lg="4">
                      <CCard>
                        <CCardHeader class="d-flex justify-content-center">Teşhis</CCardHeader>
                        <CCardBody>
                          {{ diagnosis.diagnosis }}
                        </CCardBody>
                      </CCard>
                    </CCol>
                    <CCol lg="8">
                      <CCard>
                      <CListGroup>
                        <CCardHeader class="d-flex justify-content-center">İlaçlar</CCardHeader>
                        <CListGroupItem v-for="medicine in patientMedicines">{{ medicine.name }}</CListGroupItem>
                      </CListGroup>
                        </CCard>
                    </CCol>
                  </CRow>
                </CCardBody>
              </template>
            </CCard>
          </transition>
        </CCol>
      </CRow>
      <template #header>
        <h6 class="modal-title">Protokol</h6>
        <CButtonClose @click="getDiagnosis = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="getDiagnosis = false" color="danger">Kapat</CButton>

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
import Assay from "@/models/pms/assay";
import {freeSet} from "@coreui/icons";
import usersData from "@/views/users/UsersData";
import CTableWrapper from '@/views/base/Table.vue'
import DiagnosisService from "../../../services/managementServices/diagnosis.service";
import Diagnosis from "../../../models/pms/diagnosis";
import MedicineService from "../../../services/managementServices/medicine.service";
import Secretary from "@/models/pms/secretary";

export default {
  name: "Clinic",
  freeSet,
  components: {
    ValidationProvider,
    ValidationObserver,
    // eslint-disable-next-line vue/no-unused-components
    VSimpleCheckbox,
    CTableWrapper
  },
  data() {
    return {
      fieldsTable: [
        {key: 'description', label: "Açıklama", _style: "min-width:200px"},
        {key: "patient", label: "Hasta"},
        {key: "actions", label: "İşlemler"},
      ],
      fieldsTableAssay: [
        {key: 'assayName', label: "Açıklama", _style: "min-width:200px"},
        {key: "refNo", label: "Referans Değeri"},
        {key: "assayNo", label: "Tahlil Değeri"},
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
      protocol: new Protocol("", [], "", false, "", "", 0, ""),
      protocolUpdate: new Protocol("", [], "", false, "", "", 0, ""),
      protocols: [],
      assays: [],
      isPaid: false,
      appointments: [],
      assayArray: [],
      assay: new Assay("",),
      assayUpdate: new Assay("",),
      selectedAssays: [],
      protocolNewUpdateModal: false,
      showResultModal: false,
      usersData: [
        {'assayName': 'Smjhjhjuhjh', 'refNo': '686876', 'assayNo': '87878', 'status': 'Active'},
        {'assayName': 'Estavan Lykos', 'refNo': '8787877', 'assayNo': '988787', 'status': 'Banned'},
        {'assayName': 'Chetan Mohamed', 'refNo': '8788787', 'assayNo': '878787', 'status': 'Inactive'},
        {'assayName': 'Derick Maximinus', 'refNo': '87878787', 'assayNo': '878787', 'status': 'Pending'},
        {'assayName': 'Friderik Dávid', 'refNo': '8887787', 'assayNo': '7877', 'status': 'Active'},
      ],
      patientAssays: [],
      diagnosis: new Diagnosis("", "", []),
      showDiagnosis: false,
      selectedMedicines: [],
      medicineName: '',
      protocolId: '',
      id: '',
      getDiagnosis: false,
      patientMedicines: []
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
    setAssayModal() {
      this.selectedAssays = []
      this.protocolUpdateModal = false
    },
    async getSingleOldProtocol(id) {
      this.protocolId = id
      this.protocolNewUpdateModal = true
      let response = await new ProtocolService().getSingleProtocol(id)
      this.id = response.data.protocolId
      await this.getPatientAssays(id)
      this.protocolUpdate = response.data

    },

    async getPatientAssays(id) {
      let response = await new AssayService().getSinglePatientAssay(id)
      this.patientAssays = response.data

    },
    closeModalAssay() {
      this.protocol.assays = []
      this.selectedAssays = []
      this.protocolUpdateModal = false
    },

    async getSingleAssayResult(id) {
      this.showResultModal = true
      this.protocolNewUpdateModal = false
      let response = await new ProtocolService().getResultAssay(id, this.$route.params.patient)
      this.assayUpdate = response.data
    },

    async minusSelectedAssay(index) {
      const deneme = this.protocol.assays.indexOf(index)
      if (deneme > -1) {
        this.protocol.assays.splice(deneme, 1)
      }
    },
    async minusSelectedMedicine(index) {
      const deneme = this.selectedMedicines.indexOf(index)
      if (deneme > -1) {
        this.selectedMedicines.splice(deneme, 1)
      }
    },
    isUniqeElementInArray(uuid, array) {
      for (let i = 0; i < array.length; i++) {
        if (array[i].uuid === uuid) {
          return false
        }

      }
      return true;
    },
    isUniqeElementInMedicineArray(name, array) {
      for (let i = 0; i < array.length; i++) {
        if (array[i].name === name) {
          return false
        }

      }
      return true;
    },


    async getSinglePatient() {
      let response = await new PatientService().getSinglePatient(this.$route.params.patient)
      this.patient = response.data
    },
    async getAssays() {
      let response = await new AssayService().getAssays(this.assay.assayName)
      this.assayArray = response.data.data
    },
    async pushSelectedAssay(assay) {
      let obj = {
        name: assay.name,
        uuid: assay.uuid
      }
      if (this.isUniqeElementInArray(obj.uuid, this.selectedAssays)) {
        this.selectedAssays.push(obj)
      }
      obj = {}
      this.protocol.assays = this.selectedAssays
    },
    async pushSelectedMedicine(medicine) {
      if (this.isUniqeElementInMedicineArray(medicine, this.selectedMedicines)) {
        this.selectedMedicines.push(medicine)
      }
      this.diagnosis.medicines = this.selectedMedicines
    },
    async addProtocol() {
      for (let i = 0; i < this.protocol.assays.length; i++) {
        this.protocol.assays[i] = this.protocol.assays[i].uuid
      }

      this.protocol.patient = this.$route.params.patient
      let response = await new ProtocolService().addProtocol(this.protocol)
      if (response.status === 200) {
        await this.getOldProtocols()
        this.protocol = new Protocol("", [])
        this.$toast.success({
          title: 'Başarılı',
          message: "Protokol başarıyla eklendi"
        })
      }
    },
    async getOldProtocols() {
      let response = await new ProtocolService().getPatientProtocols(this.$route.params.patient)
      this.protocols = response.data
    },
    async addDiagnosis() {
      this.diagnosis.protocolId = this.protocolId
      let response = await new DiagnosisService().addDiagnosis(this.diagnosis)
      if (response.status === 200) {
        this.showDiagnosis = false
        await this.getSingleDiagnosis()
        this.diagnosis = new Diagnosis()
        this.$toast.success({
          title: 'Başarılı',
          message: "Teşhis başarıyla eklendi"
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

    async getSingleDiagnosis() {
      this.getDiagnosis = true
      this.protocolNewUpdateModal = false
      let response = await new DiagnosisService().getDiagnosis(this.id)
      if (response.status === 200) {
        this.diagnosis = response.data
        this.showDiagnosis = false
        await this.getDiagnosisMedicines()
      } else {
        this.showDiagnosis = true
      }

    },
    async getDiagnosisMedicines() {
      let response = await new MedicineService().getMedicines(this.diagnosis.uuid)
      this.patientMedicines = response.data

    },
    setDeleteModal(id) {

      this.deleteId = id
      this.deleteModel = true
    },

    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))
        let temp = array[i]
        array[i] = array[j]
        array[j] = temp
      }
      return array
    },

    getShuffledUsersData() {
      return this.shuffleArray(this.usersData.slice(0))
    }
  },

  watch: {},

  async created() {
    await this.getSinglePatient()
    await this.getOldProtocols()


  },
  async mounted() {

  },
  computed: {}

};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
