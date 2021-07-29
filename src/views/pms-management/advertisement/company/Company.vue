<template>
  <div>
    <CRow>
      <CCol lg="12">
        <transition name="fade">
          <CCard v-if="show">
            <CCardHeader>
              <CIcon name="cil-pencil"/>
              Grup İşlemleri
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
                  <CCol lg="6">
                    Firma Adı <span class="text-danger">*</span>
                    <CInput
                        description=""
                        autocomplete="autocomplete"
                        v-model="company.companyName"
                    />
                  </CCol>
                  <CCol lg="6">
                    Mail <span class="text-danger">*</span>
                    <CInput
                        description=""
                        autocomplete="autocomplete"
                        v-model="company.email"
                    />
                  </CCol>
                  <CCol lg="6">
                    Vergi Dairesi <span class="text-danger">*</span>
                    <CInput
                        description=""
                        autocomplete="autocomplete"
                        v-model="company.taxOffice"
                    />
                  </CCol>
                  <CCol lg="6">
                    Vergi Numarası <span class="text-danger">*</span>
                    <CInput
                        description=""
                        autocomplete="autocomplete"
                        v-model="company.taxNumber"
                    />
                  </CCol>
                  <CCol lg="6" class="mt-3">
                    <div class="form-actions">
                      <CButton type="submit" color="primary" @click="addCompany"
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
                    :items="companies"
                    :fields="fieldsTableGroup"
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
                      <CButton @click="getSingleCompany(item.uuid)" color="primary" class="mr-2">Düzenle</CButton>
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
        <CButton @click="deleteModel=false" color="danger">Hayır</CButton>
        <CButton @click="deleteCompany" color="success">Evet</CButton>
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
                    <CCol lg="6">
                      Firma Adı <span class="text-danger">*</span>
                      <CInput
                          description=""
                          autocomplete="autocomplete"
                          v-model="companyUpdate.companyName"
                      />
                    </CCol>
                    <CCol lg="6">
                      Mail <span class="text-danger">*</span>
                      <CInput
                          description=""
                          autocomplete="autocomplete"
                          v-model="companyUpdate.email"
                      />
                    </CCol>
                    <CCol lg="6">
                      Vergi Dairesi <span class="text-danger">*</span>
                      <CInput
                          description=""
                          autocomplete="autocomplete"
                          v-model="companyUpdate.taxOffice"
                      />
                    </CCol>
                    <CCol lg="6">
                      Vergi Numarası <span class="text-danger">*</span>
                      <CInput
                          description=""
                          autocomplete="autocomplete"
                          v-model="companyUpdate.taxNumber"
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
        <CButton @click="editCompany" color="success">Güncelle</CButton>
      </template>
    </CModal>


  </div>
</template>

<script>
import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css'
import CompanyService from "../../../../services/managementServices/company.service";
import Company from "../../../../models/pms/company";


export default {
  name: "Company",

  data() {
    return {
      fieldsTableGroup: [
        {key: "companyName", label: "Firma Adı"},
        {key: "email", label: "Email"},
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
      company: new Company("", "", "", "", ""),
      companyUpdate: new Company("", "", "", "", ""),
      companies: []
    };
  },

  methods: {
    setDeleteModal(id) {
      this.deleteId = id
      this.deleteModel = true
    },
    async addCompany() {
      let response = await new CompanyService().addCompany(this.company)
      console.log("res", response)
      if (response.status === 200) {
        await this.getCompanies()
        this.company = new Company("", "", "", "", "")
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
    async editCompany() {
      let response = await new CompanyService().editCompany(this.companyUpdate)
      if (response.status === 200) {
        this.staffUpdateModal = false
        await this.getCompanies()
        this.$toast.success({
          title: 'Başarılı',
          message: "işlem başarıyla gerçekleşti"
        })
      } else if (response.status === 401) {

      } else {
        this.errors = response.response.data;
        for (const [key, value] of Object.entries(this.errors)) {
          this.$toast.error({
            title: 'Hata',
            message: `${key}: ${value}`
          })
        }
      }

    },
    async deleteCompany() {
      let response = await new CompanyService().deleteCompany(this.deleteId)
      if (response.status === 200) {
        this.deleteModel = false
        await this.getCompanies()
        this.$toast.success({
          title: 'Başarılı',
          message: "işlem başarıyla gerçekleşti"
        })
      }

    },
    async getSingleCompany(id) {
      let response = await new CompanyService().getSingleCompany(id)
      if (response.status === 200) {
        this.staffUpdateModal = true
        this.companyUpdate = response.data
      }
    },
    async getCompanies() {
      let response = await new CompanyService().getCompanies()
      this.companies = response.data.data

    }
  },

  watch: {},

  async created() {
    await this.getCompanies()


  },
  async mounted() {
    await this.getCompanies()

  },
  computed: {}

};
</script>
