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
                <div>
                </div>
                <CRow></CRow>
                <CRow>
                  <CCol lg="4">
                    Reklam Adı <span class="text-danger">*</span>
                    <CInput
                        description=""
                        autocomplete="autocomplete"
                        v-model="advertisement.name"
                    />
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
                    Yayın Başlangıç Tarihi <span class="text-danger">*</span>
                    <CInput
                        type="date"
                        v-model="advertisement.publishStartDate"

                    />
                  </CCol>
                  <CCol lg="4">
                    Yayın Bitiş Tarihi <span class="text-danger">*</span>
                    <CInput
                        type="date"
                        v-model="advertisement.publishEndDate"
                    />
                  </CCol>
                  <CCol lg="4">
                    Fiyat <span class="text-danger">*</span>
                    <CInput
                        description=""
                        autocomplete="autocomplete"
                        v-model="advertisement.price"
                    />

                  </CCol>
                  <CCol lg="4" class="mt-3">
                    <div class="form-actions">
                      <CButton @click="addAdvertisement" type="submit" color="primary"
                      >Kaydet
                      </CButton>

                    </div>
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

                <CDataTable
                    :items="advertisements"
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

                  <template #actions="{ item, index }">
                    <td class="py-2">
                      <CButton @click="setDeleteModal(item.uuid)" color="danger" class="mr-2">Sil</CButton>
                      <CButton @click="getSingleAdvertisement(item.uuid)" color="primary" class="mr-2">Düzenle
                      </CButton>
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
      Personeli silmek istediğinizden emin misiniz?


      <template #header>
        <h6 class="modal-title">Uyarı</h6>
        <CButtonClose @click="deleteModel = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="deleteModel = false" color="danger">Hayır</CButton>
        <CButton @click="deleteAdvertisement" color="success">Evet</CButton>
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
                    <CCol lg="4">
                      Reklam Adı <span class="text-danger">*</span>
                      <CInput
                          description=""
                          autocomplete="autocomplete"
                          v-model="advertisementUpdate.name"
                      />
                    </CCol>
                    <CCol lg="4">
                      Firma Adı <span class="text-danger">*</span>
                      <CSelect
                          :options="companies"
                          v-model="companyUpdate"
                          :value.sync="companyUpdate"
                      />
                    </CCol>
                    <CCol lg="4">
                      Reklam Yeri <span class="text-danger">*</span>
                      <CSelect
                          :options="locations"
                          v-model="locationUpdate"
                          :value.sync="locationUpdate"
                      />

                    </CCol>
                    <CCol lg="4">
                      Yayın Başlangıç Tarihi <span class="text-danger">*</span>
                      <CInput
                          type="date"
                          v-model="advertisementUpdate.publishStartDate"

                      />
                    </CCol>
                    <CCol lg="4">
                      Yayın Bitiş Tarihi <span class="text-danger">*</span>
                      <CInput
                          type="date"
                          v-model="advertisementUpdate.publishEndDate"
                      />
                    </CCol>
                    <CCol lg="4">
                      Fiyat <span class="text-danger">*</span>
                      <CInput
                          description=""
                          autocomplete="autocomplete"
                          v-model="advertisementUpdate.price"
                      />

                    </CCol>
                  </CRow>
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
        <CButton @click="staffUpdateModal = false" color="danger">Kapat</CButton>
        <CButton @click="editAdvertisement" color="success">Güncelle</CButton>
      </template>
    </CModal>


  </div>
</template>

<script>

import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css'
import AdvertisementLocationService from "../../../services/managementServices/advertisement.location.service";
import CompanyService from "../../../services/managementServices/company.service";
import Advertisement from "../../../models/pms/advertisement";
import AdvertisementService from "../../../services/managementServices/advertisement.service";


export default {
  name: "AdvertisementManagament",

  data() {
    return {
      fieldsTable: [
        {key: "name", label: "Reklam Adı"},
        {key: "company", label: "Firma"},
        {key: "location", label: "Reklam Yeri"},
        {key: "publishStartDate", label: "Yayın Başlangıç Tarihi"},
        {key: "publishEndDate", label: "Yayın Bitiş Tarihi"},
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
      advertisement: new Advertisement("", "", "", "", "", "", ""),
      advertisementUpdate: new Advertisement("", "", "", "", "", "", ""),
      advertisements: [],
      locationUpdate: '',
      companyUpdate: ''

    };
  },

  methods: {
    popUpChange() {
      if (this.showPopUp) {
        console.log("if")
        this.showPopUp = false
      } else {
        console.log("else")
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
      if (this.advertisement.locationName === '') {
        this.advertisement.locationName = this.locations[0].value
      }
      if (this.advertisement.companyName === '') {
        this.advertisement.companyName = this.companies[0].value
      }
      console.log("ad", this.advertisement)
      let response = await new AdvertisementService().addAdvertisement(this.advertisement)
      if (response.status === 200) {
        await this.getAdvertisements()
        this.advertisement = new Advertisement("", "", "", "", "", "", "")
        this.$toast.success({
          title: 'Başarılı',
          message: "işlem başarıyla gerçekleşti"
        })
      } else if (response.status === 401) {

      } else {
        console.log("res", response.data)
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
      console.log("comp0", this.advertisementUpdate)
      // if (this.advertisementUpdate.locationName === '') {
      //   this.advertisementUpdate.locationName = this.locations[0].value
      // }
      // if (this.advertisementUpdate.companyName === '') {
      //   this.advertisementUpdate.companyName = this.companies[0].value
      // }
      this.advertisementUpdate.locationName = this.locationUpdate
      this.advertisementUpdate.companyName = this.companyUpdate
      console.log("comp", this.advertisementUpdate)
      let response = await new AdvertisementService().editAdvertisement(this.advertisementUpdate)
      if (response.status === 200) {
        await this.getAdvertisements()
        this.staffUpdateModal = false
        this.$toast.success({
          title: 'Başarılı',
          message: "işlem başarıyla gerçekleşti"
        })
      } else if (response.status === 401) {

      } else {
        console.log("res", response.data)
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
      let response = await new AdvertisementService().getAdvertisement()
      this.advertisements = response.data.data

    },
    async getSingleAdvertisement(id) {
      let response = await new AdvertisementService().getSingleAdvertisement(id)

      if (response.status === 200) {
        this.staffUpdateModal = true
        this.advertisementUpdate = response.data
        this.locationUpdate = response.data.location.value
        this.companyUpdate = response.data.company.value
      }

    },
    async deleteAdvertisement() {
      let response = await new AdvertisementService().deleteAdvertisement(this.deleteId)
      if (response.status === 200) {
        await this.getAdvertisements()
        this.deleteModel = false
        this.$toast.success({
          title: 'Başarılı',
          message: "işlem başarıyla gerçekleşti"
        })
      } else if (response.status === 401) {

      } else {
        console.log("res", response.data)
        this.errors = response.response.data;
        for (const [key, value] of Object.entries(this.errors)) {
          this.$toast.error({
            title: 'Hata',
            message: `${key}: ${value}`
          })
        }
      }

    }
  },

  watch: {},

  async created() {
    await this.selectCompany()
    await this.selectLocation()
    await this.getAdvertisements()
  },
  async mounted() {
    await this.selectCompany()
    await this.selectLocation()
    await this.getAdvertisements()

  },
  computed: {}

};
</script>
