<template>
  <div>
    <CRow>
      <CCol lg="12">
        <transition name="fade">
          <CCard v-if="show">
            <CCardHeader>
              <img src="../../../icons/icons8-gold-medal-32.png" height="32" width="32"/>
              Ödüller

              <div class="card-header-actions">
                <CButton @click="prizeModal = true">
                  <CIcon :content="$options.freeSet.cilPlus" name="cil-plus"/>
                </CButton>
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
                  <CCol lg="12">
                    <CListGroupItem
                        v-for="(p,index) in prizes" :key="index"
                        href="#"
                        class="flex-column align-items-start"
                    >
                      <CRow>
                        <CCol lg="3">


                          <img :src="p.profileImage" height="150" width="200">
                        </CCol>
                        <CCol lg="9">
                          <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">{{ p.title }}</h5>
                            <small>
                              <CDropdown size="sm" color="primary" toggler-text="İşlemler">
                                <CDropdownItem>
                                  <CButton @click="getSinglePrize(p.uuid)">
                                    <CIcon name="cil-pencil"/>
                                    Düzenle
                                  </CButton>
                                </CDropdownItem>
                                <CDropdownItem>
                                  <CButton @click="setDeleteModal(p.uuid)">
                                    <CIcon name="cilTrash"/>
                                    Sil
                                  </CButton>
                                </CDropdownItem>
                              </CDropdown>
                            </small>
                          </div>
                          <p class="mb-1">
                            {{ p.date.substring(8, 10) }}-{{ p.date.substring(5, 8) }}{{ p.date.substring(0, 4) }}
                          </p>
                          <small>{{ p.description }}</small>
                        </CCol>
                      </CRow>


                    </CListGroupItem>
                  </CCol>
                  <hr>
                </CRow>
              </CCardBody>
            </CCollapse>
          </CCard>
        </transition>
      </CCol>
    </CRow>
    <CModal
        title="Modal title"
        color="danger"
        :show.sync="deleteModel"
    >
      Ödülü silmek istediğinizden emin misiniz?


      <template #header>
        <h6 class="modal-title">Uyarı</h6>
        <CButtonClose @click="deleteModel = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="deleteModel = false" color="danger">Hayır</CButton>
        <CButton :disabled="loadingDelete" @click="deletePrize" color="success">
          <c-spinner v-show="loadingDelete" size="sm"></c-spinner>
          Evet
        </CButton>
      </template>


    </CModal>

    <CModal
        :show.sync="prizeUpdateModal"
        :no-close-on-backdrop="true"
        :centered="true"
        title="Modal title 2"
        size="xl"
        color="dark"
    >
      <CRow>
        <CCol lg="12">
          <transition name="fade">
            <CCard v-if="prizeUpdateModal">
              <template>
                <CCardBody>
                  <validation-observer ref="simpleRules">
                    <CRow>

                      <CCol lg="3">
                        Başlık <span class="text-danger">*</span>
                        <CInput
                            description=""
                            autocomplete="autocomplete"
                            v-model="prizeUpdate.title"

                            :state="errors.length > 0 ? false:null"
                        />

                      </CCol>

                      <CCol lg="3">
                        Açıklama <span class="text-danger">*</span>
                        <CInput
                            description=""
                            autocomplete="autocomplete"
                            v-model="prizeUpdate.description"

                            :state="errors.length > 0 ? false:null"
                        />

                      </CCol>


                      <CCol lg="3">
                        Fotoğraf <span class="text-danger">*</span>
                        <CInputFile
                            horizontal
                            @change="getBase64"
                            custom
                            :placeholder="selectedFile"
                            :state="errors.length > 0 ? false:null"
                        />

                      </CCol>


                      <CCol lg="3">
                        Tarih <span class="text-danger">*</span>
                        <CInput
                            type="date"
                            description=""
                            autocomplete="autocomplete"
                            v-model="prizeUpdate.date"

                            :state="errors.length > 0 ? false:null"
                        />

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
        <h6 class="modal-title">Ödül Bilgileri Güncelle</h6>
        <CButtonClose @click="prizeUpdateModal = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="prizeUpdateModal = false" color="danger">Kapat</CButton>
        <CButton :disabled="loadingEdit" @click="validationForm" color="success">
          <c-spinner v-show="loadingEdit" size="sm"></c-spinner>
          Kaydet
        </CButton>
      </template>
    </CModal>

    <CModal
        :show.sync="prizeModal"
        :no-close-on-backdrop="true"
        :centered="true"
        title="Modal title 2"
        size="xl"
        color="dark"
    >
      <CRow>
        <CCol lg="12">
          <transition name="fade">
            <CCard v-if="prizeModal">
              <template>
                <CCardBody>
                  <validation-observer ref="simpleRules">
                    <CRow>


                      <CCol lg="3">
                        Başlık <span class="text-danger">*</span>
                        <CInput
                            description=""
                            autocomplete="autocomplete"
                            v-model="prize.title"

                            :state="errors.length > 0 ? false:null"
                        />

                      </CCol>

                      <CCol lg="3">
                        Açıklama <span class="text-danger">*</span>
                        <CInput
                            description=""
                            autocomplete="autocomplete"
                            v-model="prize.description"

                            :state="errors.length > 0 ? false:null"
                        />

                      </CCol>


                      <CCol lg="3">
                        Fotoğraf <span class="text-danger">*</span>
                        <CInputFile
                            horizontal
                            @change="getBase64"
                            custom
                            :placeholder="selectedFile"
                            :state="errors.length > 0 ? false:null"
                        />

                      </CCol>


                      <CCol lg="3">
                        Tarih <span class="text-danger">*</span>
                        <CInput
                            type="date"
                            description=""
                            autocomplete="autocomplete"
                            v-model="prize.date"

                            :state="errors.length > 0 ? false:null"
                        />

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
        <h6 class="modal-title">Ödül Bilgileri Güncelle</h6>
        <CButtonClose @click="prizeModal = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="prizeModal = false" color="danger">Kapat</CButton>
        <CButton @click="validationForm" color="success">
          <c-spinner v-show="loading" size="sm"></c-spinner>
          Kaydet
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
import PrizeService from "@/services/managementServices/prize.service";
import Prize from "@/models/pms/article";
import {freeSet} from '@coreui/icons'
import Secretary from "@/models/pms/secretary";

export default {
  name: "Clinic",
  freeSet,
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      fieldsTable: [
        {key: 'title', label: "Başlık", _style: "min-width:200px"},
        {key: "link", label: "Link"},


      ],


      usersData: [
        {
          firstName: 'Samppa Nori',
          lastName: 'ssdsdsd',
          profession: 'Member',
          title: 'Active',
          department: 'Active',
          diplomaNo: 'Active',
          actions: ''
        },

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
      contactInfoUpdateModal: false,
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
      prize: new Prize("", "", "", "", "", "", "", ""),
      prizeUpdate: new Prize("", "", "", "", "", "", "", ""),
      prizes: [],
      prizeUpdateModal: false,
      prizeModal: false,
      selectedFile: '',
      prizeUUID: '',
      loadingDelete: false,
      loadingEdit: false

    };
  },

  methods: {

    async getPrizes() {
      let response = await new PrizeService().getPrizes();
      if (response.status === 200) {
        this.prizes = response.data
      }
    },

    getBase64(event) {
      var reader = new FileReader();
      reader.readAsDataURL(event[0]);
      this.selectedFile = event.length + ' dosya seçildi'
      var x = this
      reader.onload = function () {
        x.prize.profileImage = reader.result
      };
    },

    async getSinglePrize(id) {
      this.prizeUpdateModal = true
      let response = await new PrizeService().getSinglePrize(id);
      if (response.status === 200) {
        this.prizeUpdate = response.data
      }
    },

    async editPrize() {
      this.loadingEdit = true
      this.prizeUpdate.profileImage = this.prize.profileImage
      let response = await new PrizeService().editPrize(this.prizeUpdate);
      if (response.status === 200) {
        this.prizeUpdateModal = false
        this.loadingEdit = false
        await this.getPrizes()
      }

    },
    async addPrize() {
      this.loading = true
      let response = await new PrizeService().addPrize(this.prize);
      if (response.status === 200) {
        this.prizeModal = false
        await this.getPrizes()
        this.loading = false
        this.prize = new Prize()
        this.$toast.success({
          title: 'Başarılı',
          message: "Ödül başarıyla eklendi"
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


    setDeleteModal(id) {
      this.prizeUUID = id
      this.deleteModel = true

    },
    async deletePrize() {
      this.loadingDelete = true
      let response = await new PrizeService().deletePrize(this.prizeUUID)
      if (response.status === 200) {
        this.deleteModel = false
        this.loadingDelete = false
        await this.getPrizes()
        this.deleteModel = false
        this.$toast.success({
          title: 'Başarılı',
          message: "Ödül başarıyla silindi"
        })
      } else {
        this.loadingDelete = false
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
          if (this.prizeUpdate.uuid) {
            await this.editPrize()
          } else {
            await this.addPrize()

          }
        }
      })

    },
  },


  async created() {
    await this.getPrizes()

  }
  ,
  async mounted() {


  }
  ,
  computed: {}

};
</script>
