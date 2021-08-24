<template>
  <div>
    <CRow>
      <CCol lg="12">
        <transition name="fade">
          <CCard v-if="show">
            <CCardHeader>
              <CIcon name="cil-pencil"/>
              Reklam Yönetimi
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
                <validation-observer ref="simpleRules">
                  <CRow>
                    <CCol lg="4">
                      <validation-provider
                          #default="{errors}"
                          rules="required|min:3|max:100"
                          name="Ad">
                        Reklam Adı <span class="text-danger">*</span>
                        <span class="text-danger">{{ errors[0] }}</span>

                        <CInput
                            description=""
                            autocomplete="autocomplete"
                            v-model="advertisement.name"
                            :state="errors.length > 0 ? false:null"
                        />
                      </validation-provider>
                    </CCol>
                    <CCol lg="4">
                      Firma Adı <span class="text-danger">*</span>
                      <CSelect
                          description=""
                          autocomplete="autocomplete"
                          :options="companies"
                          v-model="advertisement.companyName"
                          :value.sync="advertisement.companyName"
                      />
                    </CCol>
                    <CCol lg="4">
                      Reklam Yeri <span class="text-danger">*</span>

                      <CSelect
                          description=""
                          autocomplete="autocomplete"
                          :options="locations"
                          v-model="advertisement.locationName"
                          :value.sync="advertisement.locationName"
                      />
                    </CCol>
                    <CCol lg="4">
                      <validation-provider
                          #default="{errors}"
                          rules="required|min:3|max:100"
                          name="Yayın Başlangıç Tarihi">
                        Yayın Başlangıç Tarihi <span class="text-danger">*</span>
                        <span class="text-danger">{{ errors[0] }}</span>

                        <CInput
                            :min="minDate"
                            type="date"
                            v-model="advertisement.publishStartDate"
                            :state="errors.length > 0 ? false:null"

                        />
                      </validation-provider>
                    </CCol>
                    <CCol lg="4">
                      <validation-provider
                          #default="{errors}"
                          rules="required|min:3|max:100"
                          name="Yayın Bitiş Tarihi">
                        Yayın Bitiş Tarihi <span class="text-danger">*</span>
                        <span class="text-danger">{{ errors[0] }}</span>

                        <CInput
                            :min="minDate"
                            type="date"
                            v-model="advertisement.publishEndDate"
                            :state="errors.length > 0 ? false:null"
                        />
                      </validation-provider>
                    </CCol>
                    <CCol lg="4">
                      <validation-provider
                          #default="{errors}"
                          rules="required|min:3|max:100"
                          name="Fiyat">
                        Fiyat <span class="text-danger">*</span>
                        <span class="text-danger">{{ errors[0] }}</span>

                        <CInput
                            description=""
                            autocomplete="autocomplete"
                            v-model="advertisement.price"
                            :state="errors.length > 0 ? false:null"
                        />
                      </validation-provider>
                    </CCol>
                    <CCol lg="4" class="mt-3">
                      <div class="form-actions">
                        <CButton @click="validationForm" type="submit" color="primary"
                        >
                          <c-spinner v-show="loading" size="sm"></c-spinner>
                          Kaydet
                        </CButton>

                      </div>
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
                    :items="advertisements"
                    :fields="fieldsTableAdvertising"
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
                  <template #company="{ item, index }">
                    <td class="py-2">
                      {{ item.company.label }}
                    </td>
                  </template>
                  <template #location="{ item, index }">
                    <td class="py-2">
                      {{ item.location.label }}
                    </td>
                  </template>
                  <template #publishStartDate="{ item, index }">
                    <td class="py-2">
                      {{ item.publishStartDate.substring(8, 11) }}-{{ item.publishStartDate.substring(5, 7) }}-{{
                        item.publishStartDate.substring(0, 4)
                      }}
                    </td>
                  </template>
                  <template #publishEndDate="{ item, index }">
                    <td class="py-2">
                      {{ item.publishEndDate.substring(8, 11) }}-{{ item.publishEndDate.substring(5, 7) }}-{{
                        item.publishEndDate.substring(0, 4)
                      }}
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


                          <CButton @click="setDeleteModal(item.uuid)" class="mr-2">Sil</CButton>
                        </CDropdownItem>
                        <CDropdownItem>

                          <CButton @click="getSingleAdvertisement(item.uuid)">Düzenle</CButton>

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
      Reklamı silmek istediğinizden emin misiniz?


      <template #header>
        <h6 class="modal-title">Uyarı</h6>
        <CButtonClose @click="deleteModel = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="deleteModel = false" color="danger">Hayır</CButton>
        <CButton :disabled="loadingDelete" @click="deleteAdvertisement" color="success">
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
                      <CCol lg="4">
                        <validation-provider
                            #default="{errors}"
                            rules="required|min:3|max:100"
                            name="Ad">
                          Reklam Adı <span class="text-danger">*</span>
                          <span class="text-danger">{{ errors[0] }}</span>
                          <CInput
                              description=""
                              autocomplete="autocomplete"
                              v-model="advertisementUpdate.name"
                              :state="errors.length > 0 ? false:null"
                          />
                        </validation-provider>
                      </CCol>
                      <CCol lg="4">
                        <validation-provider
                            #default="{errors}"
                            rules="required"
                            name="Firma Adı">
                          Firma Adı <span class="text-danger">*</span>
                          <span class="text-danger">{{ errors[0] }}</span>

                          <CSelect
                              description=""
                              autocomplete="autocomplete"
                              :options="companies"
                              v-model="companyUpdate"
                              :value.sync="companyUpdate"
                              :state="errors.length > 0 ? false:null"
                          />
                        </validation-provider>
                      </CCol>
                      <CCol lg="4">
                        <validation-provider
                            #default="{errors}"
                            rules="required"
                            name=" Reklam Yeri">
                          Reklam Yeri <span class="text-danger">*</span>
                          <span class="text-danger">{{ errors[0] }}</span>

                          <CSelect
                              description=""
                              autocomplete="autocomplete"
                              :options="locations"
                              v-model="locationUpdate"
                              :value.sync="locationUpdate"
                              :state="errors.length > 0 ? false:null"
                          />
                        </validation-provider>
                      </CCol>
                      <CCol lg="4">
                        <validation-provider
                            #default="{errors}"
                            rules="required|min:3|max:100"
                            name="Yayın Başlangıç Tarihi">
                          Yayın Başlangıç Tarihi <span class="text-danger">*</span>
                          <span class="text-danger">{{ errors[0] }}</span>

                          <CInput
                              type="date"
                              v-model="advertisementUpdate.publishStartDate"
                              :state="errors.length > 0 ? false:null"

                          />
                        </validation-provider>
                      </CCol>
                      <CCol lg="4">
                        <validation-provider
                            #default="{errors}"
                            rules="required|min:3|max:100"
                            name="Yayın Bitiş Tarihi">
                          Yayın Bitiş Tarihi <span class="text-danger">*</span>
                          <span class="text-danger">{{ errors[0] }}</span>

                          <CInput
                              type="date"
                              v-model="advertisementUpdate.publishEndDate"
                              :state="errors.length > 0 ? false:null"
                          />
                        </validation-provider>
                      </CCol>
                      <CCol lg="4">
                        <validation-provider
                            #default="{errors}"
                            rules="required|min:3|max:100"
                            name="Fiyat">
                          Fiyat <span class="text-danger">*</span>
                          <span class="text-danger">{{ errors[0] }}</span>

                          <CInput
                              description=""
                              autocomplete="autocomplete"
                              v-model="advertisementUpdate.price"
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
        <h6 class="modal-title">Personel Güncelle</h6>
        <CButtonClose class="text-white"/>
      </template>
      <template #footer>
        <CButton :disabled="loadingEdit" @click="staffUpdateModal = false" color="danger">Kapat</CButton>
        <CButton @click="validationForm" color="success">
          <c-spinner v-show="loadingEdit" size="sm"></c-spinner>
          Güncelle
        </CButton>
      </template>
    </CModal>


  </div>
</template>

<script>

import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css'
import AdvertisementLocationService from "../../../services/managementServices/advertisement.service";
import CompanyService from "../../../services/managementServices/company.service";
import CompanyAdvertisement from "../../../models/pms/companyAdvertisement";
import CompanyAdvertisementService from "../../../services/managementServices/company.advertisement.service";
import {ValidationProvider, ValidationObserver} from 'vee-validate'
import {required, email, min, max} from 'validations'

export default {
  name: "CompanyAdvertisement",
  components: {
    ValidationObserver,
    ValidationProvider
  },

  data() {
    return {
      fieldsTableAdvertising: [
        {key: "name", label: "Reklam Adı"},
        {key: "company", label: "Firma"},
        {key: "location", label: "Reklam Yeri"},
        {key: "publishStartDate", label: "Yayın Başlangıç Tarihi"},
        {key: "publishEndDate", label: "Yayın Bitiş Tarihi"},
        {key: "buttons", label: "İşlemler"},

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
      cars: [],
      staffs: [],
      isSuccess: false,
      isSuccessCar: false,
      isError: false,
      errorsStaff: [],
      isErrorCustomerUpdate: false,
      groups: [],
      staffUpdateModal: false,
      details: [],
      errors: [],
      errorsCar: [],
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
      showPopUp: false,
      locations: [],
      companies: [],
      company: '',
      location: '',
      advertisement: new CompanyAdvertisement("", "", "", "", "", "", ""),
      advertisementUpdate: new CompanyAdvertisement("", "", "", "", "", "", ""),
      advertisements: [],
      locationUpdate: '',
      companyUpdate: '',
      required,
      email,
      min,
      max,
      loadingEdit: false,
      loadingDelete: false,
      minDate: ''

    };
  },

  methods: {
    popUpChange() {
      if (this.showPopUp) {
        this.showPopUp = false
      } else {
        this.showPopUp = false
      }
    },
    setDeleteModal(id) {

      this.deleteId = id
      this.deleteModel = true

    },
    async selectLocation() {
      let response = await new AdvertisementLocationService().selectAdvertisementLocation()
      this.locations = response.data
    },
    async selectCompany() {
      let response = await new CompanyService().selectCompanies()
      this.companies = response.data
    },
    async addAdvertisement() {
      this.loading = true
      if (this.advertisement.locationName === '') {
        this.advertisement.locationName = this.locations[0].value
      }
      if (this.advertisement.companyName === '') {
        this.advertisement.companyName = this.companies[0].value
      }
      let response = await new CompanyAdvertisementService().addAdvertisement(this.advertisement)
      if (response.status === 200) {
        this.loading = false
        await this.getAdvertisements()
        this.advertisement = new CompanyAdvertisement("", "", "", "", "", "", "")
        this.$toast.success({
          title: 'Başarılı',
          message: "işlem başarıyla gerçekleşti"
        })
      } else if (response.status === 401) {
        console.log()

      } else if (response.status === 406) {
        this.$toast.success({
          title: 'Başarısız',
          message: "Başlangıç tarihi bitiş tarihinden büyük olamaz"
        })
      } else if (response.status === 301) {
        this.$toast.success({
          title: 'Başarısız',
          message: "Başlangıç tarihi bugünün tarihinden küçük olamaz"
        })
      } else if (response.status === 411) {
        this.$toast.success({
          title: 'Başarısız',
          message: "Bitiş tarihi bugünün tarihinden küçük olamaz"
        })

      } else {
        this.loadingEdit = false
        this.errors = response.response.data;
        for (const [key, value] of Object.entries(this.errors)) {
          this.$toast.error({
            title: 'Hata',
            message: `${key}: ${value}`
          })
        }
      }
    },
    async editAdvertisement() {
      this.loadingEdit = true
      this.advertisementUpdate.locationName = this.locationUpdate
      this.advertisementUpdate.companyName = this.companyUpdate
      let response = await new CompanyAdvertisementService().editAdvertisement(this.advertisementUpdate)
      if (response.status === 200) {
        await this.getAdvertisements()
        this.staffUpdateModal = false
        this.$toast.success({
          title: 'Başarılı',
          message: "işlem başarıyla gerçekleşti"
        })
        this.loadingEdit = false
      } else if (response.status === 401) {
        console.log()


      } else if (response.status === 406) {
        this.$toast.success({
          title: 'Başarısız',
          message: "Başlangıç tarihi bitiş tarihinden büyük olamaz"
        })
      } else if (response.status === 301) {
        this.$toast.success({
          title: 'Başarısız',
          message: "Başlangıç tarihi bugünün tarihinden küçük olamaz"
        })
      } else if (response.status === 411) {
        this.$toast.success({
          title: 'Başarısız',
          message: "Bitiş tarihi bugünün tarihinden küçük olamaz"
        })

      } else {
        this.loadingEdit = false
        this.errors = response.response.data;
        for (const [key, value] of Object.entries(this.errors)) {
          this.$toast.error({
            title: 'Hata',
            message: `${key}: ${value}`
          })
        }

      }

    },
    async getAdvertisements() {
      let response = await new CompanyAdvertisementService().getAdvertisement()
      this.advertisements = response.data.data

    },
    async getSingleAdvertisement(id) {
      let response = await new CompanyAdvertisementService().getSingleAdvertisement(id)

      if (response.status === 200) {
        this.staffUpdateModal = true
        this.advertisementUpdate = response.data
        this.locationUpdate = response.data.location.value
        this.companyUpdate = response.data.company.value
      }

    },
    async deleteAdvertisement() {
      this.loadingDelete = true
      let response = await new CompanyAdvertisementService().deleteAdvertisement(this.deleteId)
      if (response.status === 200) {
        await this.getAdvertisements()
        this.loadingDelete = false
        this.deleteModel = false
        this.$toast.success({
          title: 'Başarılı',
          message: "işlem başarıyla gerçekleşti"
        })
      } else if (response.status === 401) {
        console.log()

      } else {
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
    async validationForm() {
      this.$refs.simpleRules.validate().then(async success => {
        if (success) {
          if (this.advertisementUpdate.uuid) {
            await this.editAdvertisement()
          } else {
            await this.addAdvertisement()
          }
        } else {
          console.log()
        }
      })
    }
  },

  async created() {
    await this.selectCompany()
    await this.selectLocation()
    await this.getAdvertisements()
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    this.minDate = today
  },
  async mounted() {
    await this.selectCompany()
    await this.selectLocation()
    await this.getAdvertisements()

  },

}
</script>
