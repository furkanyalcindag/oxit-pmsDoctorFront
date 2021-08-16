<template>
  <div>
    <CRow>
      <CCol lg="12">
        <transition name="fade">
          <CCard v-if="show">
            <CCardHeader>
              <img src="../../../icons/icons8-photo-video-32.png" height="32" width="32"/>
              Medya Bilgileri
              <div class="card-header-actions">
                <CButton @click="mediaUpdateModal=true">
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
                <CRow v-for="(m,index) in medias" :key="index">
                  <CCol lg="6" class="mt-2">
                    <img :src="m.media" height="200" width="150">

                  </CCol>
                  <CCol lg="1">
                    <CButton @click="setDeleteModal(m.uuid)">
                      <CIcon name="cilTrash"/>
                    </CButton>
                  </CCol>
                </CRow>

              </CCardBody>
            </CCollapse>
          </CCard>
        </transition>
      </CCol>
    </CRow>
    <CModal
        :show.sync="mediaUpdateModal"
        :no-close-on-backdrop="true"
        :centered="true"
        title="Modal title 2"
        size="xl"
        color="dark"
    >
      <CRow>
        <CCol lg="12">
          <transition name="fade">
            <CCard v-if="mediaUpdateModal">
              <template>
                <CCardBody>

                  <validation-observer ref="simpleRules">
                    <CRow>

                      <CCol lg="12">

                        Medya <span class="text-danger">*</span>

                        <CInputFile
                            horizontal
                            @change="getBase64"
                            custom
                            :placeholder="selectedFile"
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
        <h6 class="modal-title">Medya Ekle</h6>
        <CButtonClose @click="mediaUpdateModal = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="mediaUpdateModal = false" color="danger">Kapat</CButton>
        <CButton @click="validationForm" color="success">Ekle</CButton>
      </template>
    </CModal>
    <CModal
        :show.sync="deleteModel"
        :no-close-on-backdrop="true"
        :centered="true"
        title="Modal title 2"
        size="xl"
        color="dark"
    >
      <CRow>
        <CCol lg="12">
          <transition name="fade">
            <CCard v-if="deleteModel">
              <template>
                <CCardBody>
                  Medyayı silmek istediğinize emin misiniz?
                </CCardBody>
              </template>
            </CCard>
          </transition>
        </CCol>
      </CRow>
      <template #header>
        <h6 class="modal-title">Medya Bilgileri Güncelle</h6>
        <CButtonClose @click="deleteModel = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="deleteModel = false" color="danger">Kapat</CButton>
        <CButton @click="deleteMedia" color="success">Sil</CButton>
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


import About from "@/models/pms/about";

import MediaService from "@/services/managementServices/media.service";
import Media from "@/models/pms/media";
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
        {key: 'media', label: "Medya", _style: "min-width:200px"},
        {key: "actions", label: "İşlemler"},

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
      doctor: new Doctor("", "", "", "", "", "", "", ""),
      about: new About("", "", "", "", "", "", "", ""),
      doctorUpdate: new Doctor("", "", "", "", "", "", "", ""),
      departments: [],
      doctors: [],
      media: new Media("", "", "", "", "", "", "",),
      mediaUpdateModal: false,
      mediaUpdate: new Media(""),
      medias: [],
      mediaUUID: '',
      selectedFile: ''


    };
  },

  methods: {

    async getMedia() {
      let response = await new MediaService().getMedia();
      if (response.status === 200) {
        this.medias = response.data
      }
    },

    getBase64(event) {
      var reader = new FileReader();
      reader.readAsDataURL(event[0]);
      this.selectedFile = event.length + ' dosya seçildi'
      var x = this
      reader.onload = function () {
        x.media.media = reader.result


      };
    },


    async addMedia() {
      let response = await new MediaService().addMedia(this.media)
      if (response.status === 200) {
        this.mediaUpdateModal = false
        await this.getMedia()
      }

    },
    setDeleteModal(id) {
      console.log("denemememem")
      this.mediaUUID = id
      this.deleteModel = true

    },

    async deleteMedia() {
      let response = await new MediaService().deleteMedia(this.mediaUUID)
      if (response.status === 200) {
        this.deleteModel = false
        await this.getMedia()
        this.deleteModel = false
        this.$toast.success({
          title: 'Başarılı',
          message: "Medya başarıyla silindi"
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


    async validationForm() {
      this.$refs.simpleRules.validate().then(async success => {
        if (success) {
          await this.addMedia()
        }
      })

    },
  },


  async created() {
    await this.getMedia()

  }
  ,
  async mounted() {


  }
  ,
  computed: {}

};
</script>
