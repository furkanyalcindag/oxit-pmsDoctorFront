<template>
  <div>
    <CRow>
      <CCol lg="12">
        <transition name="fade">
          <CCard v-if="show">
            <CCardHeader>
              <CIcon name="cil-pencil"/>
              Reklam Yeri
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
                    Reklam Bölümü <span class="text-danger">*</span>
                    <CInput
                        description=""
                        autocomplete="autocomplete"
                        :options="options"
                        v-model="advertisementLocation.name"
                    />
                  </CCol>
                  <CCol lg="4">
                    Genişlik(pixel) <span class="text-danger">*</span>
                    <CInput
                        description=""
                        autocomplete="autocomplete"
                        v-model="advertisementLocation.width"
                    />
                  </CCol>
                  <CCol lg="4">
                    Uzunluk(pixel) <span class="text-danger">*</span>
                    <CInput
                        description=""
                        autocomplete="autocomplete"
                        v-model="advertisementLocation.height"
                    />
                  </CCol>
                  <CCol lg="4">
                    Fiyat(dakika bazlı) <span class="text-danger">*</span>
                    <CInput
                        description=""
                        autocomplete="autocomplete"
                    />
                  </CCol>
                  <CCol lg="4">
                    <CRow>
                      <CCol lg="6">
                        <span> Popup'ta gösterilsin <span class="text-danger">*</span></span>
                        <CInputCheckbox/>
                      </CCol>
                      <CCol lg="6">
                        Gösterim Süresi <span class="text-danger">*</span>
                        <CInput

                            description=""
                            autocomplete="autocomplete"
                        />
                      </CCol>
                    </CRow>

                  </CCol>
                  <CCol lg="4" class="mt-3">
                    <div class="form-actions">
                      <CButton @click="addAdvertisementLocation" type="submit" color="primary"
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
                    :items="locations"
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


                  <template #actions="{ item, index }">
                    <td class="py-2">
                      <CButton @click="setDeleteModal(item.uuid)" color="danger" class="mr-2">Sil</CButton>
                      <CButton @click="getSingleAdvertisementLocation(item.uuid)" color="primary" class="mr-2">Düzenle
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
        <CButton @click="deleteAdvertisementLocation" color="success">Evet</CButton>
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
                      Reklam Bölümü <span class="text-danger">*</span>
                      <CInput
                          description=""
                          autocomplete="autocomplete"
                          :options="options"
                          v-model="advertisementLocationUpdate.name"
                      />
                    </CCol>
                    <CCol lg="4">
                      Genişlik(pixel) <span class="text-danger">*</span>
                      <CInput
                          description=""
                          autocomplete="autocomplete"
                          v-model="advertisementLocationUpdate.width"
                      />
                    </CCol>
                    <CCol lg="4">
                      Uzunluk(pixel) <span class="text-danger">*</span>
                      <CInput
                          description=""
                          autocomplete="autocomplete"
                          v-model="advertisementLocationUpdate.height"
                      />
                    </CCol>
                    <CCol lg="4">
                      Fiyat(dakika bazlı) <span class="text-danger">*</span>
                      <CInput
                          description=""
                          autocomplete="autocomplete"
                      />
                    </CCol>
                    <CCol lg="4">
                      <CRow>
                        <CCol lg="6">
                          <span> Popup'ta gösterilsin <span class="text-danger">*</span></span>
                          <CInputCheckbox/>
                        </CCol>
                        <CCol lg="6">
                          Gösterim Süresi <span class="text-danger">*</span>
                          <CInput

                              description=""
                              autocomplete="autocomplete"
                          />
                        </CCol>
                      </CRow>
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
        <CButton @click="editAdvertisementLocation" color="success">Güncelle</CButton>
      </template>
    </CModal>


  </div>
</template>

<script>


import Car from "@/models/car";

import Staff from "@/models/Staff";
import StaffService from "@/services/staff.service";
import GeneralService from "@/services/general.service";
import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css'
import Customer from "@/models/customer";
import UserService from "@/services/managementServices/user.service";
import AdvertisementLocationService from "../../../services/managementServices/advertisement.location.service";
import AdvertisementLocation from "../../../models/pms/advertisementLocation";


export default {
  name: "Group",

  data() {
    return {
      fieldsTable: [
        {key: "name", label: "Reklam Yeri"},
        {key: "width", label: "Genişlik"},
        {key: "height", label: "Uzunluk"},
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
      staff: new Staff("", "", "", "", "", ""),
      staffUpdate: new Customer("", "", "", "", "", "", "", ""),
      customer: new Customer("", "", "", "", "", "", "", ""),
      car: new Car("", "", "", "", "", "", "", "", "", "", ""),
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
      advertisementLocation: new AdvertisementLocation("", "", "", ""),
      advertisementLocationUpdate: new AdvertisementLocation("", "", "", ""),
      locations: []


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
    async addAdvertisementLocation() {
      let response = await new AdvertisementLocationService().addAdvertisementLocation(this.advertisementLocation)
      if (response.status === 200) {
        await this.getAdvertisementLocation()
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
    async editAdvertisementLocation() {
      let response = await new AdvertisementLocationService().editAdvertisementLocation(this.advertisementLocationUpdate)
      if (response.status === 200) {
        await this.getAdvertisementLocation()
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
    async getAdvertisementLocation() {
      let response = await new AdvertisementLocationService().getAdvertisementLocation()
      this.locations = response.data.data
    },
    async deleteAdvertisementLocation() {
      let response = await new AdvertisementLocationService().deleteAdvertisementLocation(this.deleteId)
      if (response.status === 200) {
        await this.getAdvertisementLocation()
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

    },
    async getSingleAdvertisementLocation(id) {
      let response = await new AdvertisementLocationService().getSingleAdvertisementLocation(id)
      this.advertisementLocationUpdate = response.data
      if (response.status === 200) {
        this.staffUpdateModal = true
      }

    }
  },

  watch: {},

  async created() {
    await this.getAdvertisementLocation()
  },
  async mounted() {
    await this.getAdvertisementLocation()

  },
  computed: {}

};
</script>
