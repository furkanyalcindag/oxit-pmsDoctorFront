<template>
  <div>
    <CRow>
      <CCol lg="12">
        <transition name="fade">
          <CCard v-if="show">
            <CCardHeader>
              <img src="../../../../../../../Downloads/icons8-medal-24.png" height="24" width="24"/>
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
                <CRow v-for="(p,index) in prizes" :key="index">
                  <CCol class="mt-2" lg="2">
                    <CCol lg="2">

                      <img src="../../../../../../../Desktop/hasemagumus-iyonlu-maske-219f.jpg" height="130"
                           width="100"/></CCol>
                  </CCol>
                  <CCol class="mt-2" lg="10">
                    <CRow>
                      <CCol lg="3">
                        <h5>
                            <img src="../../../icons/icons8-tag-window-24 (1).png" height="24" width="24"/></h5>


                          Başlık


                        <hr>
                        <h6 v-if="p.title">{{ p.title }}</h6>
                        <h6 v-else>-</h6>

                      </CCol>
                      <CCol lg="6">
                        <h5>
                          <img src="../../../icons/icons8-cell-phone-24.png" height="24" width="24"/>

                          Açıklama
                        </h5>


                        <hr>
                        <h6 v-if="p.description">{{ p.description }}</h6>
                        <h6 v-else>-</h6>

                      </CCol>
                      <CCol lg="2">
                        <h5>
                          <img src="../../../icons/icons8-maintenance-date-24.png" height="24" width="24"/></h5>


                          Tarih

                        <hr>
                        <h6 v-if="p.date">{{ p.date }}</h6>
                        <h6 v-else>-</h6>

                      </CCol>
                      <CCol lg="1">
                        <CButton @click="getSinglePrize">
                          <CIcon name="cil-pencil"/>
                        </CButton>
                      </CCol>
                    </CRow>
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
                        <CInput
                            description=""
                            autocomplete="autocomplete"
                            v-model="prizeUpdate.image"

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
        <CButton @click="validationForm" color="success">Güncelle</CButton>
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
                        <CInput
                            description=""
                            autocomplete="autocomplete"
                            v-model="prize.image"

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
import PrizeService from "@/services/managementServices/prize.service";
import Prize from "@/models/pms/article";
import {freeSet} from '@coreui/icons'

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
      prizeModal: false

    };
  },

  methods: {

    async getPrizes() {
      let response = await new PrizeService().getPrizes();
      if (response.status === 200) {
        this.prizes = response.data
      }
    },

    async getSinglePrize(id) {
      this.prizeUpdateModal = true
      let response = await new PrizeService().getSinglePrize(id);
      if (response.status === 200) {
        this.prizeUpdate = response.data
      }
    },

    async editPrize() {

      let response = await new PrizeService().editPrize(this.prize);
      if (response.status === 200) {
        this.prizeModal = false
        await this.getPrizes()
      }

    },

    async validationForm() {
      this.$refs.simpleRules.validate().then(async success => {
        if (success) {
          await this.editPrize()
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
