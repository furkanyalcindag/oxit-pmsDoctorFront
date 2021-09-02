<template>
  <CRow>
    <CCol lg="9">
      <CRow>
        <CCol lg="12">
          <transition name="fade">
            <CCard v-if="show">
              <CCardHeader>
                <CIcon name="cil-pencil"/>
                Makaleler

                <div class="card-header-actions">
                  <CButton @click="articleModal = true">
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
                  <CRow v-for="(a,index) in articles" :key="index">
                    <CCol lg="4">
                      <h5>
                        <img src="../../../icons/icons8-cell-phone-24.png" height="24" width="24"/>

                        Başlık
                      </h5>


                      <hr>
                      <h6 v-if="a.title">{{ a.title }}</h6>
                      <h6 v-else>-</h6>

                    </CCol>
                    <CCol lg="4">
                      <h5>
                        <img src="../../../icons/icons8-link-24.png" height="24" width="24"/>
                        Link
                      </h5>


                      <hr>
                      <h6 v-if="a.link">{{ a.link }}</h6>
                      <h6 v-else>-</h6>

                    </CCol>
                    <CCol lg="2">
                      <h5>


                        <img src="../../../icons/icons8-pay-date-24 (1).png" height="24" width="24"/>
                        Tarih
                      </h5>


                      <hr>
                      <h6 v-if="a.date">
                        {{ a.date.substring(8, 10) }}-{{ a.date.substring(5, 8) }}{{ a.date.substring(0, 4) }}</h6>
                      <h6 v-else>-</h6>

                    </CCol>
                    <CCol lg="1">
                      <CButton @click="getSingleArticle(a.uuid)">
                        <CIcon name="cil-pencil"/>
                      </CButton>

                    </CCol>
                    <CCol lg="1">
                      <CButton @click="setDeleteModal(a.uuid)">
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
          :show.sync="articleUpdateModal"
          :no-close-on-backdrop="true"
          :centered="true"
          title="Modal title 2"
          size="xl"
          color="dark"
      >
        <CRow>
          <CCol lg="12">
            <transition name="fade">
              <CCard v-if="articleUpdateModal">
                <template>
                  <CCardBody>
                    <validation-observer ref="simpleRules">
                      <CRow>
                        <CCol lg="4">
                          Başlık <span class="text-danger">*</span>
                          <CInput
                              description=""
                              autocomplete="autocomplete"
                              v-model="articleUpdate.title"

                              :state="errors.length > 0 ? false:null"
                          />

                        </CCol>
                        <CCol lg="4">
                          Link <span class="text-danger">*</span>
                          <CInput
                              description=""
                              autocomplete="autocomplete"
                              v-model="articleUpdate.link"

                              :state="errors.length > 0 ? false:null"
                          />

                        </CCol>
                        <CCol lg="4">
                          Tarih <span class="text-danger">*</span>
                          <CInput
                              type="date"
                              description=""
                              autocomplete="autocomplete"
                              v-model="articleUpdate.date"

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
          <h6 class="modal-title">Makale Bilgileri Güncelle</h6>
          <CButtonClose @click="articleUpdateModal = false" class="text-white"/>
        </template>
        <template #footer>
          <CButton @click="articleUpdateModal = false" color="danger">Kapat</CButton>
          <CButton @click="validationForm" color="success">Güncelle</CButton>
        </template>
      </CModal>
      <CModal
          :show.sync="articleModal"
          :no-close-on-backdrop="true"
          :centered="true"
          title="Modal title 2"
          size="xl"
          color="dark"
      >
        <CRow>
          <CCol lg="12">
            <transition name="fade">
              <CCard v-if="articleModal">
                <template>
                  <CCardBody>
                    <validation-observer ref="simpleRules">
                      <CRow>


                        <CCol lg="4">
                          Başlık <span class="text-danger">*</span>
                          <CInput
                              description=""
                              autocomplete="autocomplete"
                              v-model="article.title"

                              :state="errors.length > 0 ? false:null"
                          />

                        </CCol>


                        <CCol lg="4">
                          Link <span class="text-danger">*</span>
                          <CInput
                              description=""
                              autocomplete="autocomplete"
                              v-model="article.link"

                              :state="errors.length > 0 ? false:null"
                          />

                        </CCol>

                        <CCol lg="4">
                          Tarih <span class="text-danger">*</span>
                          <CInput
                              type="date"
                              description=""
                              autocomplete="autocomplete"
                              v-model="article.date"

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
          <h6 class="modal-title">Makale Bilgileri Güncelle</h6>
          <CButtonClose @click="articleModal = false" class="text-white"/>
        </template>
        <template #footer>
          <CButton @click="articleModal = false" color="danger">Kapat</CButton>
          <CButton @click="validationForm" color="success">Kaydet</CButton>
        </template>
      </CModal>
      <CModal
          title="Modal title"
          color="danger"
          :show.sync="deleteModel"
      >
        Makaleyi silmek istediğinizden emin misiniz?


        <template #header>
          <h6 class="modal-title">Uyarı</h6>
          <CButtonClose @click="deleteModel = false" class="text-white"/>
        </template>
        <template #footer>
          <CButton @click="deleteModel = false" color="danger">Hayır</CButton>
          <CButton @click="deleteArticle" color="success">Evet</CButton>
        </template>


      </CModal>
    </CCol>


    <CCol lg="4">
      <article-timeline :articles="timeline_data"></article-timeline>
    </CCol>

  </CRow>
</template>

<script>

import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css'
import Clinic from "@/models/pms/clinic";
import {ValidationProvider, ValidationObserver} from 'vee-validate'
import {required, email, min, max} from 'validations'
import Article from "@/models/pms/article";
import ArticleService from "@/services/managementServices/article.service";
import {freeSet} from '@coreui/icons'
import ArticleTimeline from "@/views/pms-doctor/doctor/ArticleTimeline";

export default {
  name: "Clinic",
  freeSet,
  components: {
    ValidationProvider,
    ValidationObserver,
    ArticleTimeline
  },
  data() {
    return {
      fieldsTable: [
        {key: 'title', label: "Başlık", _style: "min-width:200px"},
        {key: "link", label: "Link"},
        {key: "date", label: "Tarih"},


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
      article: new Article("", "", "", "", "", "", "", ""),
      articleUpdate: new Article("", "", "", "", "", "", "", ""),
      articles: [],
      articleUpdateModal: false,
      articleModal: false,
      articleUUID: '',
      timeline_data: []


    };
  },

  methods: {

    async getArticles() {
      let response = await new ArticleService().getArticles();
      if (response.status === 200) {
        this.articles = response.data
      }
    },

    async getSingleArticle(id) {
      this.articleUpdateModal = true
      let response = await new ArticleService().getSingleArticle(id);
      if (response.status === 200) {
        this.articleUpdate = response.data
      }
    },

    async editArticle() {

      let response = await new ArticleService().editArticle(this.articleUpdate);
      if (response.status === 200) {
        this.articleUpdateModal = false
        await this.getArticles()
        await this.getArticlesTimeline()
      }

    },
    async getArticlesTimeline() {
      let response = await new ArticleService().getArticleTimeline()
      this.timeline_data = response.data
    },
    async addArticle() {
      let response = await new ArticleService().addArticle(this.article)
      if (response.status === 200) {
        this.articleModal = false
        await this.getArticles()
        await this.getArticlesTimeline()
        this.article = new Article()
        this.$toast.success({
          title: 'Başarılı',
          message: "Makale başarıyla eklendi"
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

      this.articleUUID = id
      this.deleteModel = true

    },
    async deleteArticle() {
      let response = await new ArticleService().deleteArticle(this.articleUUID)
      if (response.status === 200) {
        this.deleteModel = false
        await this.getArticles()
        await this.getArticlesTimeline()
        this.deleteModel = false
        this.$toast.success({
          title: 'Başarılı',
          message: "Makale başarıyla silindi"
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
          if (this.articleUpdate.uuid) {
            await this.editArticle()
          } else {
            await this.addArticle()
          }

        }
      })

    },
  },


  async created() {
    await this.getArticles()
    await this.getArticlesTimeline()

  }
  ,
  async mounted() {


  }
  ,
  computed: {}

};
</script>
