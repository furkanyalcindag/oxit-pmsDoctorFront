<template>
  <CRow>
    <CCol lg="12">
      <transition name="fade">
        <CCard v-if="show">
          <CCardHeader>
            <CIcon name="cil-pencil"/>
            Blog
            <div class="card-header-actions">
              <CButton @click="setOpenModal" size="sm" color="primary">Blog Ekle</CButton>

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
                  <transition name="fade">
                    <CCard v-if="show">
                      <template>
                        <CCardBody>

                          <CDataTable
                              :items="blogs"
                              :fields="fieldsTable"
                              :border="true"
                              hover
                              pagination
                              :noItemsView="{ noResults: 'Veri bulunamadı', noItems: 'Veri bulunamadı' }"
                              clickableRows

                          >
                            <template #title="{ item, index }">
                              <td class="py-2">
                                <img :src="item.image" height="50" width="50">

                                {{ item.title }}
                              </td>
                            </template>
                            <template #department="{ item, index }">
                              <td class="py-2">

                                {{ item.department.label }}
                              </td>
                            </template>
                            <template #isPublish="{ item, index }">
                              <td class="py-2">
                                <span v-if="item.isPublish">
                                  Yayında

                                </span>
                                <span v-else>
                                  Taslak Olarak Kaydedildi

                                </span>


                              </td>
                            </template>
                            <template #actions="{ item, index }">
                              <td class="py-2">
                                <CDropdown size="sm" color="dark" toggler-text="İşlemler">


                                  <CDropdownItem>


                                    <CButton size="sm" @click="setDeleteModal(item.uuid)" class="mr-2">Sil</CButton>
                                  </CDropdownItem>
                                  <CDropdownItem>

                                    <CButton size="sm" @click="getSingleBlog(item.uuid)">Düzenle</CButton>

                                  </CDropdownItem>
                                </CDropdown>
                              </td>
                            </template>

                          </CDataTable>

                          <CPagination
                              :activePage.sync="page"
                              :pages="pageCount"
                              size="sm"
                              align="end"
                          />


                        </CCardBody>
                      </template>
                    </CCard>
                  </transition>
                </CCol>
              </CRow>


            </CCardBody>
          </CCollapse>
        </CCard>
      </transition>
    </CCol>
    <CModal
        :show.sync="blogModal"
        :no-close-on-backdrop="true"
        :centered="true"
        title="Modal title 2"
        size="xl"
        color="dark"
    >
      <CRow>
        <CCol lg="12">
          <transition name="fade">
            <CCard v-if="blogModal">
              <template>
                <CCardBody>
                  <validation-observer ref="simpleRules">
                    <CRow>
                      <CCol lg="6">
                        <CRow>
                          <CCol lg="12">
                            <validation-provider
                                #default="{errors}"
                                rules="required|min:3|max:1000"
                                name="Başlık">
                              Başlık <span class="text-danger">*</span>
                              <span class="text-danger">{{ errors[0] }}</span>
                              <CInput
                                  description=""
                                  v-model="blog.title"
                                  autocomplete="autocomplete"
                                  :state="errors.length > 0 ? false:null"
                              />
                            </validation-provider>

                          </CCol>
                          <CCol lg="12">
                            <validation-provider
                                #default="{errors}"
                                rules="required|min:3|max:100"
                                name="Etiketler">
                              Etiketler <span class="text-danger">*</span>
                              <span class="text-danger">{{ errors[0] }}</span>
                              <CInput
                                  description=""
                                  v-model="blog.keyword"
                                  autocomplete="autocomplete"
                                  :state="errors.length > 0 ? false:null"
                              />
                            </validation-provider>

                          </CCol>
                          <CCol lg="12">
                            Blog Kategorisi <span class="text-danger">*</span>
                            <CSelect
                                :options="departments"
                                description=""
                                autocomplete="autocomplete"
                                v-model="blog.department"
                                :value.sync="blog.department"
                            />

                          </CCol>
                          <CCol lg="12">
                            <CRow>
                              <CCol lg="7">
                                <vue-upload-multiple-image
                                    @upload-success="uploadImageSuccess"
                                    @before-remove="beforeRemove"
                                    @edit-image="editImage"
                                    :data-images="images"
                                    idUpload="myIdUpload"
                                    editUpload="myIdEdit"
                                    :primary-text="primaryText"
                                    :browse-text="browseText"
                                    :drag-text="dragText"
                                    :markIsPrimaryText="markPrimary"
                                    :popupText="popupText"
                                    :max-image="2"
                                    :show-add="false"

                                ></vue-upload-multiple-image>
                              </CCol>
                              <CCol lg="5">
                                <CRow>
                                  <CCol lg="6">
                                    <span>Yayınlansın</span>
                                  </CCol>
                                  <CCol lg="2">
                                    <CSwitch
                                        class="mx-1"
                                        color="primary"
                                        name="switch1"
                                        :checked.sync="isPublish"
                                        v-model="isPublish"
                                    />

                                  </CCol>
                                </CRow>
                                <CRow>
                                  <CCol lg="6">
                                    <span>Vitrinde Görünsün</span>
                                  </CCol>
                                  <CCol lg="2">
                                    <CSwitch
                                        class="mx-1"
                                        color="primary"
                                        name="switch1"
                                        :checked.sync="isSponsored"
                                        v-model="isSponsored"
                                    />

                                  </CCol>
                                </CRow>


                              </CCol>

                            </CRow>
                          </CCol>


                        </CRow>

                      </CCol>
                      <CCol lg="6">
                        <CRow>

                          <CCol lg="12">
                            <validation-provider
                                #default="{errors}"
                                rules="required|min:3|max:100"
                                name="Blog Detayı">
                              Blog Detayı <span class="text-danger">*</span>
                              <span class="text-danger">{{ errors[0] }}</span>
                              <quill-editor
                                  class="quill-editor"
                                  v-model="blog.description"
                                  :state="errors.length > 0 ? false:null"
                              />
                            </validation-provider>
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
        <h6 class="modal-title">Blog Ekle</h6>
        <CButtonClose @click="blogModal = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="blogModal = false" color="danger">Kapat</CButton>
        <CButton :disabled="loading" @click="validationForm" color="success">
          <c-spinner v-show="loading" size="sm">
          </c-spinner>
          Kaydet
        </CButton>
      </template>
    </CModal>
    <CModal
        :show.sync="blogUpdateModal"
        :no-close-on-backdrop="true"
        :centered="true"
        title="Modal title 2"
        size="xl"
        color="dark"
    >
      <CRow>
        <CCol lg="12">
          <transition name="blogUpdateModal">
            <CCard v-if="blogUpdateModal">
              <template>
                <CCardBody>
                  <validation-observer ref="simpleRules">
                    <CRow>
                      <CCol lg="6">
                        <CRow>
                          <CCol lg="12">
                            <validation-provider
                                #default="{errors}"
                                rules="required|min:1|max:1000"
                                name="Başlık">
                              Başlık <span class="text-danger">*</span>
                              <span class="text-danger">{{ errors[0] }}</span>
                              <CInput
                                  description=""
                                  v-model="blogUpdate.title"
                                  autocomplete="autocomplete"
                                  :state="errors.length > 0 ? false:null"
                              />
                            </validation-provider>

                          </CCol>
                          <CCol lg="12">
                            <validation-provider
                                #default="{errors}"
                                rules="required|min:3|max:100"
                                name="Etiketler">
                              Etiketler <span class="text-danger">*</span>
                              <span class="text-danger">{{ errors[0] }}</span>
                              <CInput
                                  description=""
                                  v-model="blogUpdate.keyword"
                                  autocomplete="autocomplete"
                                  :state="errors.length > 0 ? false:null"
                              />
                            </validation-provider>

                          </CCol>
                          <CCol lg="12">
                            Blog Kategorisi <span class="text-danger">*</span>
                            <CSelect
                                :options="departments"
                                description=""
                                autocomplete="autocomplete"
                                v-model="blogUpdate.department"
                                :value.sync="blogUpdate.department"
                            />

                          </CCol>
                          <CCol lg="12">
                            <CRow>
                              <CCol lg="7">
                                <vue-upload-multiple-image
                                    @upload-success="uploadImageSuccess"
                                    @before-remove="beforeRemove"
                                    @edit-image="editImage"
                                    :data-images="images"
                                    idUpload="myIdUpload"
                                    editUpload="myIdEdit"
                                    :primary-text="primaryText"
                                    :browse-text="browseText"
                                    :drag-text="dragText"
                                    :markIsPrimaryText="markPrimary"
                                    :popupText="popupText"
                                    :max-image="2"
                                    :show-add="false"

                                ></vue-upload-multiple-image>
                              </CCol>
                              <CCol lg="5">
                                <CRow>
                                  <CCol lg="6">
                                    <span>Yayınlansın</span>
                                  </CCol>
                                  <CCol lg="2">
                                    <CSwitch
                                        class="mx-1"
                                        color="primary"
                                        name="switch1"
                                        :checked.sync="isPublishUpdate"
                                        v-model="isPublishUpdate"
                                    />

                                  </CCol>
                                </CRow>
                                <CRow>
                                  <CCol lg="6">
                                    <span>Vitrinde Görünsün</span>
                                  </CCol>
                                  <CCol lg="2">
                                    <CSwitch
                                        class="mx-1"
                                        color="primary"
                                        name="switch1"
                                        :checked.sync="isSponsoredUpdate"
                                        v-model="isSponsoredUpdate"
                                    />

                                  </CCol>
                                </CRow>


                              </CCol>

                            </CRow>
                          </CCol>
                        </CRow>

                      </CCol>
                      <CCol lg="6">
                        <CRow>
                          <CCol lg="12">
                            <validation-provider
                                #default="{errors}"
                                rules="required|min:3|max:100"
                                name="Blog Detayı">
                              Blog Detayı <span class="text-danger">*</span>
                              <span class="text-danger">{{ errors[0] }}</span>
                              <quill-editor
                                  class="quill-editor"
                                  v-model="blogUpdate.description"
                                  :state="errors.length > 0 ? false:null"
                              />
                            </validation-provider>
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
        <h6 class="modal-title">Blog Güncelle</h6>
        <CButtonClose @click="blogUpdateModal = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="blogUpdateModal = false" color="danger">Kapat</CButton>
        <CButton :disabled="loading" @click="validationForm" color="success">
          <c-spinner v-show="loading" size="sm"></c-spinner>
          Güncelle
        </CButton>
      </template>
    </CModal>


    <CModal
        title="Modal title"
        color="danger"
        :show.sync="deleteModel"
    >
      Blogu silmek istediğinizden emin misiniz?


      <template #header>
        <h6 class="modal-title">Uyarı</h6>
        <CButtonClose @click="deleteModel = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="deleteModel = false" color="danger">Hayır</CButton>
        <CButton :disabled="loading" @click="deleteBlog" color="success">
          <c-spinner v-show="loading" size="sm"></c-spinner>
          Evet
        </CButton>
      </template>


    </CModal>

  </CRow>
</template>

<script>
import {ValidationProvider, ValidationObserver} from 'vee-validate'
import {required, email, min, max} from 'validations'
import DepartmentService from "@/services/managementServices/department.service";
import Blog from "@/models/pms/blog";
import BlogService from "@/services/managementServices/blog.service";
import VueUploadMultipleImage from 'vue-upload-multiple-image';

export default {
  name: "Notifications",
  components: {
    ValidationObserver,
    ValidationProvider,
    VueUploadMultipleImage
  },
  data() {
    return {
      fieldsTable: [
        {key: 'title', label: "Başlık", _style: "min-width:200px"},
        {key: "department", label: "Kategori"},
        {key: "isPublish", label: "Yayın Durumu"},
        {key: "isSponsored", label: "Sponsorlu İçerik"},
        {key: "actions", label: "İşlemler"},
      ],
      pageLabel: {label: 'sasasa', external: true,},
      page: 1,
      name: 'AdvancedTables',
      numberOfPages: 0,
      selected: [],
      rowsPerPageItems: [5],
      search: '',
      total: 0,
      loading: false,
      pagination: {external: true},


      isSuccess: false,
      isSuccessCar: false,
      isError: false,
      details: [],
      errors: [],
      collapseDuration: 0,
      darkModal: false,
      carModal: false,
      pageCount: 0,
      show: true,
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
      blog: new Blog("", "", "", "", ""),
      blogUpdate: new Blog("", "", "", "", ""),
      selectedFile: '',
      items: [],
      fieldsTableNotification: [
        {key: "title", label: "Başlık"},
        {key: "link", label: "Link"},],
      required,
      email,
      min,
      max,
      blogUpdateModal: false,
      departments: [],
      isPublish: false,
      isPublishUpdate: false,
      blogs: [],
      blogUUID: 0,
      blogModal: false,
      image: null,
      primaryText: "",
      browseText: "Fotoğraf Yükle",
      dragText: "Fotğrafları Sürükle",
      markPrimary: "Ana fotoğraf yap",
      popupText: "Blog Resimleri",
      images: [],
      imagesPost: [],
      loadingDelete: false,
      loadingEdit: false,
      isSponsored: false,
      isSponsoredUpdate: false

    };
  },
  methods: {
    validator(val) {
      return val ? val.length >= 4 : false;
    },
    async getDepartments() {

      let response = await new DepartmentService().getDepartment()
      this.departments = response.data
    },
    getBase64(event) {
      var reader = new FileReader();
      reader.readAsDataURL(event[0]);
      this.selectedFile = event.length + ' dosya seçildi'
      var x = this
      reader.onload = function () {
        x.blog.image = reader.result
      };
    },
    uploadImageSuccess(formData, index, fileList) {
      this.imagesPost = fileList
    },
    beforeRemove(index, done, fileList) {
      done()
      this.imagesPost = fileList


    },
    editImage(formData, index, fileList) {
      this.imagesPost = fileList
    },

    async addBlog() {
      this.loading = true
      if (this.imagesPost.length) {
        this.blog.image = this.imagesPost[0].path
      } else {
        this.blog.image = null
      }
      if (this.blog.department === "" || this.blog.department === undefined) {
        this.blog.department = this.departments[0].value
      }
      this.blog.isPublish = this.isPublish
      this.blog.isSponsored = this.isSponsored

      let response = await new BlogService().addBlog(this.blog)
      if (response.status === 200) {
        this.loading = false

        this.blogModal = false
        this.images = []
        this.blog = new Blog()
        await this.getBlogs(1)
        this.$toast.success({
          title: 'Başarılı',
          message: 'Blog başarıyla eklendi'
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


    setOpenModal() {
      this.images = []
      this.blogModal = true
    },
    async getBlogs(page) {
      let response = await new BlogService().getBlogs(page)
      this.blogs = response.data.data
      this.pageCount = response.data.activePage
    },
    async editBlog() {
      this.blogUpdate.department = this.blogUpdate.department.value
      this.blogUpdate.isPublish = this.isPublishUpdate
      this.blogUpdate.isSponsoredUpdate = this.isSponsoredUpdate
      if (this.imagesPost.length) {
        this.blogUpdate.image = this.imagesPost[0].path
      }
      let response = await new BlogService().editBlog(this.blogUpdate)
      if (response.status === 200) {
        await this.getBlogs(1)
        this.loadingEdit = false
        this.blogUpdateModal = false
        this.images = []
        this.$toast.success({
          title: 'Başarılı',
          message: ' işlem başarıyla gerçekleştirilmiştir'
        })
      } else {
        this.loadingEdit = false
      }
    },
    async getSingleBlog(id) {
      this.images = []
      this.blogUpdateModal = true
      let response = await new BlogService().getSingleBlog(id)
      this.blogUpdate = response.data
      this.isPublishUpdate = response.data.isPublish
      let obj = {
        default: 1,
        highlight: 1,
        name: '',
        path: response.data.image
      }
      this.images.push(obj)
      console.log("image", this.images)

    },
    setDeleteModal(id) {
      this.blogUUID = id
      this.deleteModel = true

    },
    async deleteBlog() {
      this.loadingDelete = true
      let response = await new BlogService().deleteBlog(this.blogUUID)
      if (response.status === 200) {
        this.deleteModel = false
        await this.getBlogs(1)
        this.$toast.success({
          title: 'Başarılı',
          message: 'Blog başarıyla silindi'
        })
      }

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
    async validationForm() {
      this.$refs.simpleRules.validate().then(async success => {
        if (success) {
          if (this.blogUpdate.uuid) {
            await this.editBlog()
          } else {
            await this.addBlog()
          }

        }
      })
    },


  },


  watch: {

    page: function (val) {
      console.log(val)
      this.getPatients(this.page)

    },


  },


  async created() {
    await this.getDepartments()
    await this.getBlogs(1)

  },
  async mounted() {

  },
  computed: {}
};
</script>
<style>
.quill-editor {
  height: 150px;
}
</style>


