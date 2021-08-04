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
                              <CCardSubtitle class="mt-2">İstenilen Tahliller</CCardSubtitle>
                              <CListGroup>
                                <CListGroupItem>
                                  <CListGroup>
                                    <CListGroupItem v-for="selected in protocol.assays">{{
                                        selected.name
                                      }}
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


                            <CButton @click="setDeleteModal(item.uuid)" color="danger" class="mr-2">Sil</CButton>

                            <CButton @click="getSingleProtocol(item.uuid)" color="success">Düzenle</CButton>
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
                              :state="errors.length > 0 ? false:null"
                          />
                        </validation-provider>
                      </CCol>
                      <CCol lg="6" class="mt-4">
                        <CButton @click="getAssays" color="success">Arama</CButton>
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
                          <CListGroupItem v-for="selected in selectedAssay">{{ selected.name }}</CListGroupItem>
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
        <CButtonClose @click="protocolUpdateModal = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="protocolUpdateModal = false" color="danger">Kapat</CButton>
        <CButton @click="setAssayModal" color="success">Ekle</CButton>
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

export default {
  name: "Clinic",
  freeSet,
  components: {
    ValidationProvider,
    ValidationObserver,
    // eslint-disable-next-line vue/no-unused-components
    VSimpleCheckbox,
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
      protocol: new Protocol("", [], "", false, "", "", 0, ""),
      protocolUpdate: new Protocol("", [], "", false, "", "", 0, ""),
      protocols: [],
      assays: [],
      isPaid: false,
      appointments: [],
      assayArray: [],
      assay: new Assay("",),
      selectedAssay: []


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
      this.selectedAssay = []
      this.protocolUpdateModal = false
    },
    async getSinglePatient() {
      console.log("pati", this.$route.params.patient)
      let response = await new PatientService().getSinglePatient(this.$route.params.patient)
      console.log("res", response)
      this.patient = response.data
    },
    async getAssays() {
      let response = await new AssayService().getAssays()
      this.assayArray = response.data.data
    },
    async pushSelectedAssay(assay) {
      let obj = {
        name: assay.name,
        uuid: assay.uuid
      }
      console.log(obj)
      console.log("name", assay)
      this.selectedAssay.push(obj)
      obj = {}
      this.protocol.assays = this.selectedAssay
      console.log("assay", this.selectedAssay)
    },
    async addProtocol() {
      for (let i = 0; i < this.protocol.assays.length; i++) {
        this.protocol.assays[i] = this.protocol.assays[i].uuid
      }
      this.protocol.patient = this.$route.params.patient
      let response = await new ProtocolService().addProtocol(this.protocol)
      if (response.status === 200) {
        await this.getProtocols()
        this.protocol = new Protocol("", [])
        this.$toast.success({
          title: 'Başarılı',
          message: "Protokol başarıyla eklendi"
        })
      }
    },
    async getOldProtocols() {
      let response = await new ProtocolService().getPatientProtocols(this.$route.params.patient)
      this.protocols = response.data.data
    },
    async editOldProtocol() {
      this.protocolUpdate.assays = this.assayArray

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
  },

  watch: {},

  async created() {
    await this.getSinglePatient()


  },
  async mounted() {

  },
  computed: {}

};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
