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
                          name="Doktor Adı">
                        Doktor Adı <span class="text-danger">*</span>
                        <span class="text-danger">{{ errors[0] }}</span>
                        <CInput
                            description=""
                            autocomplete="autocomplete"
                            v-model="doctor.firstName"
                            :state="errors.length > 0 ? false:null"
                        />
                      </validation-provider>
                    </CCol>


                    <CCol lg="3">
                      <validation-provider
                          #default="{errors}"
                          rules="required|min:3|max:100"
                          name="Doktor Soyad">
                        Doktor Soyad <span class="text-danger">*</span>
                        <span class="text-danger">{{ errors[0] }}</span>
                        <CInput
                            description=""
                            autocomplete="autocomplete"
                            v-model="doctor.lastName"

                            :state="errors.length > 0 ? false:null"
                        />
                      </validation-provider>
                    </CCol>
                    <CCol lg="3">
                      <validation-provider
                          #default="{errors}"
                          rules="required|min:3|max:100"
                          name="Diploma No">
                        Diploma No <span class="text-danger">*</span>
                        <span class="text-danger">{{ errors[0] }}</span>
                        <CInput
                            description=""
                            autocomplete="autocomplete"
                            v-model="doctor.diplomaNo"
                            :state="errors.length > 0 ? false:null"
                        />

                      </validation-provider>
                    </CCol>

                    <CCol lg="3">
                      <validation-provider
                          #default="{errors}"
                          rules="required|min:3|max:100"
                          name="Sigorta Numarası">
                        Sigorta Numarası <span class="text-danger">*</span>
                        <span class="text-danger">{{ errors[0] }}</span>
                        <CInput
                            description=""
                            autocomplete="autocomplete"
                            v-model="doctor.insuranceNumber"

                            :state="errors.length > 0 ? false:null"
                        />
                      </validation-provider>
                    </CCol>
                    <CCol lg="3">

                      Bölüm <span class="text-danger">*</span>

                      <CSelect
                          :options="departments"
                          description=""
                          autocomplete="autocomplete"
                          v-model="doctor.departmentId"
                          :value.sync="doctor.departmentId"

                      />

                    </CCol>
                    <CCol lg="3">
                      <validation-provider
                          #default="{errors}"
                          rules="required|min:3|max:100"
                          name="Ünvan">
                        Ünvan <span class="text-danger">*</span>
                        <span class="text-danger">{{ errors[0] }}</span>
                        <CInput
                            description=""
                            autocomplete="autocomplete"
                            v-model="doctor.title"

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
                            v-model="doctor.email"
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
                    :items="doctors"
                    :fields="fieldsTable"
                    :border="true"
                    hover
                    :noItemsView="{ noResults: 'Veri bulunamadı', noItems: 'Veri bulunamadı' }"
                    clickableRows

                >
                  <template #department="{ item, index }">
                    <td class="py-2">

                      {{ item.department.label }}
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

                          <CButton size="sm" @click="getSingleDoctor(item.uuid)">Düzenle</CButton>

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
        @ok="deleteDoctor"
    >
      Doktoru silmek istediğinizden emin misiniz?


      <template #header>
        <h6 class="modal-title">Uyarı</h6>
        <CButtonClose @click="deleteModel = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="deleteModel = false" color="danger">Hayır</CButton>
        <CButton @click="deleteDoctor" color="success">
          <c-spinner v-show="loading" size="sm"></c-spinner>
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
                              name="Doktor Adı">
                            Doktor Adı <span class="text-danger">*</span>
                            <span class="text-danger">{{ errors[0] }}</span>
                            <CInput
                                description=""
                                autocomplete="autocomplete"
                                v-model="doctorUpdate.firstName"
                                :state="errors.length > 0 ? false:null"
                            />
                          </validation-provider>
                        </CCol>


                        <CCol lg="3">
                          <validation-provider
                              #default="{errors}"
                              rules="required|min:3|max:100"
                              name="Doktor Soyad">
                            Doktor Soyad <span class="text-danger">*</span>
                            <span class="text-danger">{{ errors[0] }}</span>
                            <CInput
                                description=""
                                autocomplete="autocomplete"
                                v-model="doctorUpdate.lastName"

                                :state="errors.length > 0 ? false:null"
                            />
                          </validation-provider>
                        </CCol>
                        <CCol lg="3">
                          <validation-provider
                              #default="{errors}"
                              rules="required|min:3|max:100"
                              name="Diploma No">
                            DiplomA No <span class="text-danger">*</span>
                            <span class="text-danger">{{ errors[0] }}</span>
                            <CInput
                                description=""
                                autocomplete="autocomplete"
                                v-model="doctorUpdate.diplomaNo"
                                :state="errors.length > 0 ? false:null"
                            />

                          </validation-provider>
                        </CCol>

                        <CCol lg="3">
                          <validation-provider
                              #default="{errors}"
                              rules="required|min:3|max:100"
                              name="Sigorta Numarası">
                            Sigorta Numarası <span class="text-danger">*</span>
                            <span class="text-danger">{{ errors[0] }}</span>
                            <CInput
                                description=""
                                autocomplete="autocomplete"
                                v-model="doctorUpdate.insuranceNumber"

                                :state="errors.length > 0 ? false:null"
                            />
                          </validation-provider>
                        </CCol>
                        <CCol lg="3">
                          Bölüm <span class="text-danger">*</span>
                          <CSelect
                              :options="departments"
                              description=""
                              autocomplete="autocomplete"
                              v-model="doctorUpdate.departmentId"
                              :value.sync="doctor.departmentId"
                          />
                        </CCol>
                        <CCol lg="3">
                          <validation-provider
                              #default="{errors}"
                              rules="required|min:3|max:100"
                              name="Ünvan">
                            Ünvan <span class="text-danger">*</span>
                            <span class="text-danger">{{ errors[0] }}</span>
                            <CInput
                                description=""
                                autocomplete="autocomplete"
                                v-model="doctorUpdate.title"

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
        <h6 class="modal-title">Personel Güncelle</h6>
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
import Doctor from "@/models/pms/doctor";
import DoctorService from "@/services/managementServices/doctor.service";
import DepartmentService from "@/services/managementServices/department.service";
import Staff from "@/models/pms/staff";

export default {
  name: "Clinic",
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      fieldsTable: [
        {key: 'firstName', label: "Doktor Adı", _style: "min-width:200px"},
        {key: "lastName", label: "Doktor Soyad"},
        {key: "email", label: "Email"},
        {key: "title", label: "Ünvan"},
        {key: "department", label: "Bölüm"},
        {key: "insuranceNumber", label: "Sİgorta Numarası"},
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
      doctor: new Staff("", "", "", "", "", "", "", ""),
      doctorUpdate: new Staff("", "", "", "", "", "", "", ""),
      departments: [],
      doctors: [],
      loadingDelete: false,
      loadingEdit: false,
      pageCount: 0,

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

    async addDoctor() {

      if (!this.doctor.departmentId) {

        this.doctor.departmentId = this.departments[0].value
      }
      this.loading = true

      let response = await new DoctorService().addDoctor(this.doctor)
      if (response.status === 200) {
        await this.getDoctors(1)
        this.doctor = new Doctor()
        this.$toast.success({
          title: 'Başarılı',
          message: "Doktor başarıyla eklendi"
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

    async getSingleDoctor(id) {

      let response = await new DoctorService().getSingleDoctor(id)
      this.doctorUpdate = response.data
      this.doctorUpdate.department = response.data.department.value
      if (response.status === 200) {
        this.staffUpdateModal = true
        this.staffUpdateModal = true


      }

    },

    async getDepartments() {

      let response = await new DepartmentService().getDepartment()
      this.departments = response.data
    },


    async deleteDoctor() {
      this.loadingDelete = true
      let response = await new DoctorService().deleteDoctor(this.deleteId)
      if (response.status === 200) {
        await this.getDoctors(1)
        this.deleteModel = false
        this.$toast.success({
          title: 'Başarılı',
          message: "Doktor başarıyla silindi"
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

    async editDoctor() {
      this.loading = true
      if (this.doctorUpdate.department === "") {
        this.doctorUpdate.department = this.departments[0].value
      }
      let response = await new DoctorService().editDoctor(this.doctorUpdate)
      if (response.status === 200) {
        this.staffUpdateModal = false
        await this.getDoctors(1)
        this.$toast.success({
          title: 'Başarılı',
          message: "Doktor başarıyla güncellendi"
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


    async getDoctors(page) {

      let response = await new DoctorService().getDoctor(page)
      this.doctors = response.data.data
      this.pageCount = response.data.activePage
    },


    async validationForm() {
      this.$refs.simpleRules.validate().then(async success => {
        if (success) {
          if (this.doctorUpdate.uuid) {
            await this.editDoctor()
          } else {
            await this.addDoctor()
          }
        }
      })
    },
  },

  watch: {

    page: function (val) {
      console.log(val)
      this.getDoctors(this.page)

    },
  },

  async created() {
    await this.getDoctors(1)
    await this.getDepartments()


  },
  async mounted() {


  },
  computed: {}

};
</script>
