<template>
  <div>
    <CRow>
      <CCol lg="12">
        <transition name="fade">
          <CCard v-if="show">
            <CCardHeader>
              <CIcon name="cil-pencil"/>
              Tahlil
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

                    <CCol lg="4">
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
                    <CCol lg="4">
                      <CRow>
                        <CCol lg="3">
                          <h6>
                            Ücretli mi ? <span class="text-danger">*</span>
                          </h6>
                          <CSwitch
                              class="mx-1"
                              color="primary"
                              name="switch1"
                              :checked.sync="isPaid"
                              v-model="isPaid"
                          />
                        </CCol>
                        <CCol v-if="isPaid" lg="4">
                          <h6>
                            Ücret
                          </h6>
                          <CInput
                              type="number"
                              v-model="assay.price"
                          />
                        </CCol>
                        <CCol v-if="isPaid" lg="4">
                          <h6>
                            KDV
                          </h6>
                          <CInput
                              type="number"
                              v-model="assay.taxRate"
                          />
                        </CCol>
                      </CRow>

                    </CCol>
                    <CCol class="mt-4" lg="3">
                      <CButton type="submit" color="primary"
                               @click="validationForm"
                      >
                        <c-spinner size="sm" v-show="loading">
                        </c-spinner>
                        Kaydet
                      </CButton>
                    </CCol>


                  </CRow>

                </validation-observer>


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
                    :items="assays"
                    :fields="fieldsTable"
                    :border="true"
                    :items-per-page="5"
                    :activePage="4"
                    hover
                    pagination
                    :noItemsView="{ noResults: 'Veri bulunamadı', noItems: 'Veri bulunamadı' }"
                    clickableRows

                >
                  <template #department="{ item, index }">
                    <td class="py-2">

                      {{ item.label }}
                    </td>
                  </template>


                  <template #taxRate="{ item, index }">
                    <td class="py-2">
                      <tr v-if="item.taxRate !== null">
                        {{ item.taxRate }}
                      </tr>

                    </td>
                  </template>


                  <template #price="{ item, index }">
                    <td class="py-2">
                      <tr v-if="item.price !== null">
                        {{ item.price }}
                      </tr>

                    </td>
                  </template>


                  <template #buttons="{ item, index }">
                    <td class="py-2">
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

                          <CButton size="sm" @click="getSingleAssay(item.uuid)">Düzenle</CButton>

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

    >
      Tahlili silmek istediğinizden emin misiniz?


      <template #header>
        <h6 class="modal-title">Uyarı</h6>
        <CButtonClose @click="deleteModel = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="deleteModel = false" color="danger">Hayır</CButton>

        <CButton @click="deleteAssay" color="success">

          Evet
        </CButton>
      </template>


    </CModal>


    <CModal
        :show.sync="assayUpdateModal"
        :no-close-on-backdrop="true"
        :centered="true"
        title="Modal title 2"
        size="xl"
        color="dark"
    >
      <CRow>
        <CCol lg="12">
          <transition name="fade">
            <CCard v-if="assayUpdateModal">
              <template>
                <CCardBody>
                  <validation-observer ref="simpleRules">
                    <CRow>
                      <CCol lg="4">
                        <validation-provider
                            #default="{errors}"
                            rules="required|min:3|max:100"
                            name="Tahlil Adı">
                          Tahlil Adı <span class="text-danger">*</span>
                          <span class="text-danger">{{ errors[0] }}</span>
                          <CInput
                              description=""
                              autocomplete="autocomplete"
                              v-model="assayUpdate.name"
                              :state="errors.length > 0 ? false:null"
                          />
                        </validation-provider>
                      </CCol>
                      <CCol lg="8">
                        <CRow>
                          <CCol lg="3">
                            <h6>
                              Ücretli mi ? <span class="text-danger">*</span>
                            </h6>
                            <CSwitch
                                class="mx-1"
                                color="primary"
                                name="switch1"
                                :checked.sync="isPaidUpdate"
                                v-model="isPaidUpdate"
                            />
                          </CCol>
                          <CCol v-if="isPaidUpdate" lg="4">
                            <h6>
                              Ücret
                            </h6>
                            <CInput
                                type="number"
                                v-model="assayUpdate.price"
                            />
                          </CCol>
                          <CCol v-if="isPaidUpdate" lg="4">
                            <h6>
                              KDV
                            </h6>
                            <CInput
                                type="number"
                                v-model="assayUpdate.taxRate"
                            />
                          </CCol>
                        </CRow>

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
        <h6 class="modal-title">Tahlil Güncelle</h6>
        <CButtonClose @click="assayUpdateModal = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="assayUpdateModal = false" color="danger">Kapat</CButton>
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
import Doctor from "@/models/pms/doctor";
import DoctorService from "@/services/managementServices/doctor.service";
import Patient from "@/models/pms/patient";
import PatientService from "@/services/managementServices/patient.service";
import GenderService from "@/services/managementServices/gender.service";
import BloodService from "@/services/managementServices/blood.service";
import Assay from "@/models/pms/assay";
import AssayService from "@/services/managementServices/assay.service";

export default {
  name: "Assay",
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      fieldsTable: [
        {key: 'name', label: "Tahlil Adı", _style: "min-width:200px"},
        {key: "price", label: "Ücret"},
        {key: "taxRate", label: "KDV"},
        {key: 'buttons', label: "İşlemler"},


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
      isPaid: false,
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
      assay: new Assay(""),
      assayUpdate: new Assay(""),
      assayUpdateModal: false,
      assays: [],
      loadingDelete: false,
      loadingEdit: false,
      isPaidUpdate: false


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

    async addAssay() {
      this.loading = true
      this.assay.isPaid = this.isPaid
      let response = await new AssayService().addAssay(this.assay)
      if (response.status === 200) {
        await this.getAssays()
        this.assay = new Assay()
        this.$toast.success({
          title: 'Başarılı',
          message: "Tahlil başarıyla eklendi"
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

    async getAssays() {

      let response = await new AssayService().getAssays()
      this.assays = response.data.data
    },


    async getSingleAssay(id) {

      let response = await new AssayService().getSingleAssay(id)

      if (response.status === 200) {
        this.assayUpdateModal = true
        this.assayUpdate = response.data
        this.isPaidUpdate = this.assayUpdate.isPaid


      }

    },


    async deleteAssay() {
      this.loadingDelete = true
      let response = await new AssayService().deleteAssay(this.deleteId)
      if (response.status === 200) {
        await this.getAssays()
        this.deleteModel = false
        this.$toast.success({
          title: 'Başarılı',
          message: "Tahlil başarıyla silindi"
        })
        this.loading = false
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

    async editAssay() {
      this.loading = true
      this.assay.isPaid = this.isPaidUpdate
      let response = await new AssayService().editAssay(this.assayUpdate)
      if (response.status === 200) {
        this.assayUpdateModal = false
        await this.getAssays()
        this.$toast.success({
          title: 'Başarılı',
          message: "Tahlil başarıyla güncellendi"
        })
        this.loading = false
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


    async validationForm() {
      this.$refs.simpleRules.validate().then(async success => {
        if (success) {
          if (this.assayUpdate.uuid) {
            await this.editAssay()
          } else {
            await this.addAssay()
          }
        }
      })
    },
  },

  watch: {},

  async created() {
    await this.getAssays()


  },
  async mounted() {


  },
  computed: {}

};
</script>
