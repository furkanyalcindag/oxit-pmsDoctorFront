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
                          name="Klinik Adı">
                        Klinik Adı <span class="text-danger">*</span>
                        <span class="text-danger">{{ errors[0] }}</span>
                        <CInput
                            description=""
                            autocomplete="autocomplete"
                            v-model="clinic.clinicName"
                            :state="errors.length > 0 ? false:null"
                        />
                      </validation-provider>
                    </CCol>


                    <CCol lg="3">
                      <validation-provider
                          #default="{errors}"
                          rules="required|min:3|max:100"
                          name="Yetkili Ad">
                        Yetkili Ad <span class="text-danger">*</span>
                        <span class="text-danger">{{ errors[0] }}</span>
                        <CInput
                            description=""
                            autocomplete="autocomplete"
                            v-model="clinic.staffName"

                            :state="errors.length > 0 ? false:null"
                        />
                      </validation-provider>
                    </CCol>
                    <CCol lg="3">
                      <validation-provider
                          #default="{errors}"
                          rules="required|min:3|max:100"
                          name="Yetkili Soyad">
                        Yetkili Soyad <span class="text-danger">*</span>
                        <span class="text-danger">{{ errors[0] }}</span>
                        <CInput
                            description=""
                            autocomplete="autocomplete"
                            v-model="clinic.staffSurname"
                            :state="errors.length > 0 ? false:null"
                        />

                      </validation-provider>
                    </CCol>

                    <CCol lg="3">
                      <validation-provider
                          #default="{errors}"
                          rules="required|min:3|max:100"
                          name="Telefon Numarası">
                        Telefon Numarası <span class="text-danger">*</span>
                        <span class="text-danger">{{ errors[0] }}</span>
                        <CInput
                            description=""
                            autocomplete="autocomplete"
                            v-model="clinic.telephoneNumber"

                            :state="errors.length > 0 ? false:null"
                        />
                      </validation-provider>
                    </CCol>
                    <CCol lg="3">
                      <validation-provider
                          #default="{errors}"
                          rules="required|min:3|max:100"
                          name="Vergi Dairesi">
                        Vergi Dairesi <span class="text-danger">*</span>
                        <span class="text-danger">{{ errors[0] }}</span>
                        <CInput
                            description=""
                            autocomplete="autocomplete"
                            v-model="clinic.taxOffice"

                            :state="errors.length > 0 ? false:null"
                        />
                      </validation-provider>
                    </CCol>
                    <CCol lg="3">
                      <validation-provider
                          #default="{errors}"
                          rules="required|min:3|max:100"
                          name="Vergi Numarası">
                        Vergi Numarası <span class="text-danger">*</span>
                        <span class="text-danger">{{ errors[0] }}</span>
                        <CInput
                            description=""
                            autocomplete="autocomplete"
                            v-model="clinic.taxNumber"

                            :state="errors.length > 0 ? false:null"
                        />
                      </validation-provider>
                    </CCol>
                    <CCol lg="3">
                      <validation-provider
                          #default="{errors}"
                          rules="required|min:3|max:100"
                          name="İl">
                        İl <span class="text-danger">*</span>
                        <span class="text-danger">{{ errors[0] }}</span>
                        <CSelect
                            :options="cities"
                            v-model="city"
                            :value.sync="city"
                            @change="getDistricts(city)"
                            :state="errors.length > 0 ? false:null"
                        />
                      </validation-provider>
                    </CCol>
                    <CCol lg="3">
                      <validation-provider
                          #default="{errors}"
                          rules="required|min:3|max:100"
                          name="İlçe">
                        İlçe <span class="text-danger">*</span>
                        <span class="text-danger">{{ errors[0] }}</span>
                        <CSelect
                            :options="districts"
                            v-model="district"
                            :value.sync="district"
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
                            v-model="clinic.email"
                            :state="errors.length > 0 ? false:null"
                        />

                      </validation-provider>
                    </CCol>
                    <CCol lg="9">
                      <validation-provider
                          #default="{errors}"
                          rules="required|min:3|max:100"
                          name="Adres">
                        Adres <span class="text-danger">*</span>
                        <span class="text-danger">{{ errors[0] }}</span>
                        <CTextarea
                            :rows="2"
                            description=""
                            autocomplete="autocomplete"
                            v-model="clinic.address"
                            :state="errors.length > 0 ? false:null"
                        />

                      </validation-provider>
                    </CCol>
                  </CRow>
                </validation-observer>

                <div class="form-actions">
                  <CButton type="submit" color="primary"
                           @click="validationForm"
                  >Kaydet
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
                    :items="clinics"
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

                      <CButton @click="getSingleClinic(item.uuid)" color="success">Düzenle</CButton>
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
        @ok="deleteClinic"
    >
      Kliniği silmek istediğinizden emin misiniz?


      <template #header>
        <h6 class="modal-title">Uyarı</h6>
        <CButtonClose @click="deleteModel = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="deleteModel = false" color="danger">Hayır</CButton>
        <CButton @click="deleteClinic" color="success">Evet</CButton>
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

                    <CCol lg="3">
                      <validation-provider
                          #default="{errors}"
                          rules="required|min:3|max:100"
                          name="Klinik Adı">
                        Klinik Adı <span class="text-danger">*</span>
                        <span class="text-danger">{{ errors[0] }}</span>
                        <CInput
                            description=""
                            autocomplete="autocomplete"
                            v-model="clinicUpdate.clinicName"
                            :state="errors.length > 0 ? false:null"
                        />
                      </validation-provider>
                    </CCol>


                    <CCol lg="3">
                      <validation-provider
                          #default="{errors}"
                          rules="required|min:3|max:100"
                          name="Yetkili Ad">
                        Yetkili Ad <span class="text-danger">*</span>
                        <span class="text-danger">{{ errors[0] }}</span>
                        <CInput
                            description=""
                            autocomplete="autocomplete"
                            v-model="clinicUpdate.staffName"

                            :state="errors.length > 0 ? false:null"
                        />
                      </validation-provider>
                    </CCol>
                    <CCol lg="3">
                      <validation-provider
                          #default="{errors}"
                          rules="required|min:3|max:100"
                          name="Yetkili Soyad">
                        Yetkili Soyad <span class="text-danger">*</span>
                        <span class="text-danger">{{ errors[0] }}</span>
                        <CInput
                            description=""
                            autocomplete="autocomplete"
                            v-model="clinicUpdate.staffSurname"
                            :state="errors.length > 0 ? false:null"
                        />

                      </validation-provider>
                    </CCol>

                    <CCol lg="3">
                      <validation-provider
                          #default="{errors}"
                          rules="required|min:3|max:100"
                          name="Telefon Numarası">
                        Telefon Numarası <span class="text-danger">*</span>
                        <span class="text-danger">{{ errors[0] }}</span>
                        <CInput
                            description=""
                            autocomplete="autocomplete"
                            v-model="clinicUpdate.telephoneNumber"

                            :state="errors.length > 0 ? false:null"
                        />
                      </validation-provider>
                    </CCol>
                    <CCol lg="3">
                      <validation-provider
                          #default="{errors}"
                          rules="required|min:3|max:100"
                          name="Vergi Dairesi">
                        Vergi Dairesi <span class="text-danger">*</span>
                        <span class="text-danger">{{ errors[0] }}</span>
                        <CInput
                            description=""
                            autocomplete="autocomplete"
                            v-model="clinicUpdate.taxOffice"

                            :state="errors.length > 0 ? false:null"
                        />
                      </validation-provider>
                    </CCol>
                    <CCol lg="3">
                      <validation-provider
                          #default="{errors}"
                          rules="required|min:3|max:100"
                          name="Vergi Numarası">
                        Vergi Numarası <span class="text-danger">*</span>
                        <span class="text-danger">{{ errors[0] }}</span>
                        <CInput
                            description=""
                            autocomplete="autocomplete"
                            v-model="clinicUpdate.taxNumber"

                            :state="errors.length > 0 ? false:null"
                        />
                      </validation-provider>
                    </CCol>
                    <CCol lg="3">
                      <validation-provider
                          #default="{errors}"
                          rules="required|min:3|max:100"
                          name="İl">
                        İl <span class="text-danger">*</span>
                        <span class="text-danger">{{ errors[0] }}</span>
                        <CSelect
                            :options="cities"
                            v-model="cityUpdate"
                            :value.sync="cityUpdate"
                            @change="getDistricts(city)"
                            :state="errors.length > 0 ? false:null"
                        />
                      </validation-provider>
                    </CCol>
                    <CCol lg="3">
                      <validation-provider
                          #default="{errors}"
                          rules="required|min:3|max:100"
                          name="İlçe">
                        İlçe <span class="text-danger">*</span>
                        <span class="text-danger">{{ errors[0] }}</span>
                        <CSelect
                            :options="districts"
                            v-model="districtUpdate"
                            :value.sync="districtUpdate"
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
                            v-model="clinicUpdate.email"
                            :state="errors.length > 0 ? false:null"
                        />

                      </validation-provider>
                    </CCol>
                    <CCol lg="9">
                      <validation-provider
                          #default="{errors}"
                          rules="required|min:3|max:100"
                          name="Adres">
                        Adres <span class="text-danger">*</span>
                        <span class="text-danger">{{ errors[0] }}</span>
                        <CTextarea
                            :rows="2"
                            description=""
                            autocomplete="autocomplete"
                            v-model="clinicUpdate.address"
                            :state="errors.length > 0 ? false:null"
                        />

                      </validation-provider>
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
        <CButtonClose @click="staffUpdateModal = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="staffUpdateModal = false" color="danger">Kapat</CButton>
        <CButton @click="validationForm" color="success">Güncelle</CButton>
      </template>
    </CModal>


  </div>
</template>

<script>

import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css'
import Clinic from "@/models/pms/clinic";
import GeneralService from "@/services/managementServices/general.service";
import ClinicService from "@/services/managementServices/clinic.service";
import {ValidationProvider, ValidationObserver} from 'vee-validate'
import {required, email, min, max} from 'validations'

export default {
  name: "Clinic",
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      fieldsTable: [
        {key: 'clinicName', label: "Klinik Adı", _style: "min-width:200px"},
        {key: "email", label: "Email"},
        {key: "telephoneNumber", label: "Telefon Numarası"},
        {key: "cityDistrict", label: "İl/İlçe"},
        {key: "actions", label: "İşlemler"}
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
      max
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
    async getClinics() {
      let response = await new ClinicService().getClinics();
      this.clinics = response.data.data
    },
    async addClinic() {
      if (this.district === '') {
        this.clinic.districtId = this.districts[0].value
      }
      if (this.city === '') {
        this.clinic.cityId = this.cities[0].value
      }
      let a = await new ClinicService().addClinic(this.clinic);
      if (a.status === 200) {
        this.isSuccess = false;
        this.isSuccess = true;
        await this.getClinics();
        this.$toast.success({
          title: 'Başarılı',
          message: "Personel başarıyla eklendi"
        })
      } else if (a.response.status === 401) {
        this.isError = false;
        this.isError = true;
        this.$toast.error({
          title: 'Hata',
          message: "Yetkiniz bulunmamaktadır"
        })
        await this.$router.push("/pages/login");
      } else {
        this.isError = false;
        this.isError = true;
        this.errors = a.response.data;
        for (const [key, value] of Object.entries(this.errors)) {
          this.$toast.error({
            title: 'Hata',
            message: `${key}: ${value}`
          })
        }
        this.errorHide();
      }
    },
    async editClinic() {
      if (this.districtUpdate === '') {
        this.clinicUpdate.districtId = this.districts[0].value
      }
      if (this.cityUpdate === '') {
        this.clinicUpdate.cityId = this.cities[0].value
      }
      let response = await new ClinicService().editClinic(this.clinicUpdate)
      if (response.status === 200) {
        this.staffUpdateModal = false
        await this.getClinics()
      }


    },
    async getSingleClinic(id) {
      this.staffUpdateModal = true
      let response = await new ClinicService().getSingleClinic(id)
      this.clinicUpdate = response.data

    },
    async getCities() {
      let response = await new GeneralService().getCity()
      this.cities = response.data

    },
    async getDistricts(city) {
      let response = await new GeneralService().getDistrict(city)
      this.districts = response.data
    },
    async deleteClinic() {
      let response = await new ClinicService().deleteClinic(this.deleteId)
      if (response.status === 200) {
        this.deleteModel = false
        await this.getClinics()
      }
    },
    async validationForm() {
      this.$refs.simpleRules.validate().then(async success => {
        if (success) {
          if (this.clinicUpdate.uuid) {
            await this.editClinic()
          } else {
            await this.addClinic()
          }
        } else {
        }
      })
    },
  },

  watch: {},

  async created() {
    await this.getCities()
    await this.getDistricts(this.cities[0].value)
    await this.getClinics()

  },
  async mounted() {
    await this.getCities()
    await this.getDistricts(this.cities[0].value)
    await this.getClinics()


  },
  computed: {}

};
</script>
