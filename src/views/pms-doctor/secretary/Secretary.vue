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
                          name="Sekreter Adı">
                        Sekreter Adı <span class="text-danger">*</span>
                        <span class="text-danger">{{ errors[0] }}</span>
                        <CInput
                            description=""
                            autocomplete="autocomplete"
                            v-model="secretary.firstName"
                            :state="errors.length > 0 ? false:null"
                        />
                      </validation-provider>
                    </CCol>


                    <CCol lg="3">
                      <validation-provider
                          #default="{errors}"
                          rules="required|min:3|max:100"
                          name="Sekreter Soyad">
                        Sekreter Soyad <span class="text-danger">*</span>
                        <span class="text-danger">{{ errors[0] }}</span>
                        <CInput
                            description=""
                            autocomplete="autocomplete"
                            v-model="secretary.lastName"

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
                            v-model="secretary.email"
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
                    :items="secretarys"
                    :fields="fieldsTable"
                    :border="true"
                    hover
                    :noItemsView="{ noResults: 'Veri bulunamadı', noItems: 'Veri bulunamadı' }"
                    clickableRows

                >

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


                          <CButton size="sm" appoi @click="setDeleteModal(item.uuid)" class="mr-2">Sil</CButton>
                        </CDropdownItem>
                        <CDropdownItem>

                          <CButton size="sm" @click="getSingleSecretary(item.uuid)">Düzenle</CButton>

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
        @ok="deleteSecretary"
    >
      Sekreteri silmek istediğinizden emin misiniz?


      <template #header>
        <h6 class="modal-title">Uyarı</h6>
        <CButtonClose @click="deleteModel = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="deleteModel = false" color="danger">Hayır</CButton>
        <CButton :disabled="loadingDelete" @click="deleteSecretary" color="success">
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
                              name="Doktor Adı">
                            Sekreter Adı <span class="text-danger">*</span>
                            <span class="text-danger">{{ errors[0] }}</span>
                            <CInput
                                description=""
                                autocomplete="autocomplete"
                                v-model="secretaryUpdate.firstName"
                                :state="errors.length > 0 ? false:null"
                            />
                          </validation-provider>
                        </CCol>


                        <CCol lg="3">
                          <validation-provider
                              #default="{errors}"
                              rules="required|min:3|max:100"
                              name="Sekreter Soyad">
                            Sekreter Soyad <span class="text-danger">*</span>
                            <span class="text-danger">{{ errors[0] }}</span>
                            <CInput
                                description=""
                                autocomplete="autocomplete"
                                v-model="secretaryUpdate.lastName"

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
                                v-model="secretaryUpdate.email"
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
        <CButton @click="validationForm" color="success">
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
import Secretary from "@/models/pms/secretary";
import SecretaryService from "@/services/managementServices/secretary.service";

export default {
  name: "Secretary",
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      fieldsTable: [
        {key: 'firstName', label: "Sekreter Adı", _style: "min-width:200px"},
        {key: "lastName", label: "Sekreter Soyadı"},
        {key: "email", label: "Email"},
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
      secretary: new Secretary("", "", "", "",),
      secretaryUpdate: new Secretary("", "", "", "",),
      secretarys: [],
      loadingEdit: false,
      loadingDelete: false,
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

    async addSecretary() {
      this.loading = true
      let response = await new SecretaryService().addSecretary(this.secretary)
      if (response.status === 200) {
        await this.getSecretarys(1)
        this.secretary = new Secretary()
        this.$toast.success({
          title: 'Başarılı',
          message: "Sekreter başarıyla eklendi"
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

    async getSecretarys(page) {

      let response = await new SecretaryService().getSecretary(page)
      this.secretarys = response.data.data
      this.pageCount = response.data.activePage
    },


    async getSingleSecretary(id) {

      let response = await new SecretaryService().getSingleSecretary(id)
      this.secretaryUpdate = response.data

      if (response.status === 200) {
        this.staffUpdateModal = true
        this.staffUpdateModal = true


      }

    },


    async deleteSecretary() {
      this.loadingDelete = true
      let response = await new SecretaryService().deleteSecretary(this.deleteId)
      if (response.status === 200) {
        await this.getSecretarys(1)
        this.deleteModel = false
        this.$toast.success({
          title: 'Başarılı',
          message: "Sekreter başarıyla silindi"
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

    async editSecretary() {
      this.loading = true
      let response = await new SecretaryService().editSecretary(this.secretaryUpdate)
      if (response.status === 200) {
        this.staffUpdateModal = false
        await this.getSecretarys(1)

        this.$toast.success({
          title: 'Başarılı',
          message: "Sekreter başarıyla güncellendi"
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
          if (this.secretaryUpdate.uuid) {
            await this.editSecretary()
          } else {
            await this.addSecretary()
          }
        }
      })
    },
  },

    watch: {

    page: function (val) {
      console.log(val)
      this.getSecretarys(this.page)

    },
  },


  async created() {
    await this.getSecretarys(1)


  },
  async mounted() {


  },
  computed: {}

};
</script>
