<template>
  <div>
    <CRow>
      <CCol lg="12">
        <transition name="fade">
          <CCard v-if="show">
            <CCardHeader>
              <CIcon name="cil-pencil"/>
              Personel İşlemleri
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
                        Ad <span class="text-danger">*</span>
                        <span class="text-danger">{{ errors[0] }}</span>
                        <CInput
                            description=""
                            autocomplete="autocomplete"
                            v-model="staff.firstName"
                            :state="errors.length > 0 ? false:null"
                        />
                      </validation-provider>
                    </CCol>
                    <CCol lg="4">
                      <validation-provider
                          #default="{errors}"
                          rules="required|min:3|max:100"
                          name="Soyad">
                        Soyad <span class="text-danger">*</span>
                        <span class="text-danger">{{ errors[0] }}</span>
                        <CInput
                            description=""
                            autocomplete="autocomplete"
                            v-model="staff.lastName"
                            :state="errors.length > 0 ? false:null"
                        />
                      </validation-provider>
                    </CCol>
                    <CCol lg="4">
                      <validation-provider
                          #default="{errors}"
                          rules="required|min:3|max:100"
                          name="E-mail">
                        E-Mail <span class="text-danger">*</span>
                        <span class="text-danger">{{ errors[0] }}</span>
                        <CInput
                            description=""
                            type="email"
                            autocomplete="email"
                            prepend="@"
                            v-model="staff.email"
                            :state="errors.length > 0 ? false:null"
                        />
                      </validation-provider>
                    </CCol>
                    <CCol lg="4">
                      <validation-provider
                          #default="{errors}"
                          rules="required|min:3|max:100"
                          name="Telefon Numarası">
                        Telefon Numarası <span class="text-danger">*</span>
                        <span class="text-danger">{{ errors[0] }}</span>
                        <CInput
                            description=""
                            autocomplete="autocomplete"
                            v-model="staff.mobilePhone"
                            :state="errors.length > 0 ? false:null"
                        />
                      </validation-provider>
                    </CCol>
                    <CCol lg="4">
                      Grup <span class="text-danger">*</span>

                      <CSelect
                          :options="groups"
                          v-model="staff.group"
                          :value.sync="staff.group"
                      />
                    </CCol>
                    <CCol lg="4">
                      <validation-provider
                          #default="{errors}"
                          rules="required|min:3|max:100"
                          name="Adres">
                        Adres <span class="text-danger">*</span>
                        <span class="text-danger">{{ errors[0] }}</span>
                        <CTextarea
                            :rows="3"
                            description=""
                            autocomplete="autocomplete"
                            v-model="staff.address"
                            :state="errors.length > 0 ? false:null"
                        />
                      </validation-provider>
                    </CCol>
                  </CRow>
                </validation-observer>
                <div class="form-actions">
                  <CButton type="submit" color="primary" @click="validationForm"
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
                    :items="staffs"
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
                  <template #group="{ item, index }">
                    <td class="py-2">
                      {{ item.group.label }}
                    </td>
                  </template>

                  <template #actions="{ item, index }">
                    <td class="py-2">
                      <CDropdown toggler-text="İşlemler">
                        <CDropdownItem>


                          <CButton @click="setDeleteModal(item.uuid)" class="mr-2">Sil</CButton>
                        </CDropdownItem>
                        <CDropdownItem>

                          <CButton @click="getSingleStaff(item.uuid)">Düzenle</CButton>

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
      Personeli silmek istediğinizden emin misiniz?


      <template #header>
        <h6 class="modal-title">Uyarı</h6>
        <CButtonClose @click="deleteModel = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="deleteModel = false" color="danger">Hayır</CButton>
        <CButton @click="deleteStaff" color="success">Evet</CButton>
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
                          Ad <span class="text-danger">*</span>
                          <span class="text-danger">{{ errors[0] }}</span>
                          <CInput
                              description=""
                              autocomplete="autocomplete"
                              v-model="staffUpdate.firstName"
                              :state="errors.length > 0 ? false:null"
                          />
                        </validation-provider>
                      </CCol>
                      <CCol lg="4">
                        <validation-provider
                            #default="{errors}"
                            rules="required|min:3|max:100"
                            name="Soyad">
                          Soyad <span class="text-danger">*</span>
                          <span class="text-danger">{{ errors[0] }}</span>
                          <CInput
                              description=""
                              autocomplete="autocomplete"
                              v-model="staffUpdate.lastName"
                              :state="errors.length > 0 ? false:null"
                          />
                        </validation-provider>
                      </CCol>
                      <CCol lg="4">
                        <validation-provider
                            #default="{errors}"
                            rules="required|min:3|max:100"
                            name="E-mail">
                          E-Mail <span class="text-danger">*</span>
                          <span class="text-danger">{{ errors[0] }}</span>
                          <CInput
                              description=""
                              type="email"
                              autocomplete="email"
                              prepend="@"
                              v-model="staffUpdate.email"
                              :state="errors.length > 0 ? false:null"
                          />
                        </validation-provider>
                      </CCol>
                      <CCol lg="4">
                        <validation-provider
                            #default="{errors}"
                            rules="required|min:3|max:100"
                            name="Telefon Numarası">
                          Telefon Numarası <span class="text-danger">*</span>
                          <span class="text-danger">{{ errors[0] }}</span>
                          <CInput
                              description=""
                              autocomplete="autocomplete"
                              v-model="staffUpdate.mobilePhone"
                              :state="errors.length > 0 ? false:null"
                          />
                        </validation-provider>
                      </CCol>
                      <CCol lg="4">
                        <validation-provider
                            #default="{errors}"
                            rules="required|min:3|max:100"
                            name="Grup">
                          Grup <span class="text-danger">*</span>
                          <span class="text-danger">{{ errors[0] }}</span>

                          <CSelect
                              :options="groups"
                              v-model="staffUpdate.group"
                              :value.sync="staffUpdate.group"
                              :state="errors.length > 0 ? false:null"
                          />
                        </validation-provider>
                      </CCol>
                      <CCol lg="4">
                        <validation-provider
                            #default="{errors}"
                            rules="required|min:3|max:100"
                            name="Adres">
                          Adres <span class="text-danger">*</span>
                          <span class="text-danger">{{ errors[0] }}</span>
                          <CTextarea
                              :rows="3"
                              description=""
                              autocomplete="autocomplete"
                              v-model="staffUpdate.address"
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


import StaffService from "@/services/managementServices/staff.service";
import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css';
import UserService from "@/services/managementServices/user.service";
import Staff from "../../../models/pms/staff";
import {ValidationProvider, ValidationObserver} from 'vee-validate'
import {required, email, min, max} from 'validations'

export default {
  name: "Staff",
  components: {
    ValidationObserver,
    ValidationProvider
  },

  data() {
    return {
      fieldsTable: [
        {key: 'firstName', label: "Ad Soyad", _style: "min-width:200px"},
        {key: "lastName", label: "Email"},
        {key: "group", label: "Personel Grubu"},
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
      staff: new Staff("", "", "", "", "", "", ""),
      staffUpdate: new Staff("", "", "", "", "", "", ""),
      groupUpdate: '',
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
    async getGroups() {
      let response = await new UserService().getGroups();
      this.groups = response.data
      console.log("groups", this.groups)
    },

    async addStaff() {
      console.log("group", this.staff)
      let response = await new StaffService().addStaff(this.staff)
      if (response.status === 200) {
        await this.getStaffs()
        this.staff = new Staff("", "", "", "", "", "")
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
    async getStaffs() {
      let response = await new StaffService().getStaffs()
      this.staffs = response.data.data
    },
    async deleteStaff() {
      let response = await new StaffService().deleteStaff(this.deleteId)
      if (response.status === 200) {
        this.deleteModel = false
        await this.getStaffs()
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
    async getSingleStaff(id) {
      let response = await new StaffService().getSingleStaff(id)
      if (response.status === 200) {
        this.staffUpdateModal = true
        this.staffUpdate = response.data
        this.groupUpdate = response.data.group.value
      }
    },
    async editStaff() {
      this.staffUpdate.group = this.groupUpdate
      console.log("den", this.staffUpdate)
      let response = await new StaffService().editStaff(this.staffUpdate)
      if (response.status === 200) {
        this.staffUpdateModal = false
        await this.getStaffs()
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
    async validationForm() {
      this.$refs.simpleRules.validate().then(async success => {
        if (success) {
          if (this.staffUpdate.uuid) {
            await this.editStaff()
          } else {
            await this.addStaff()
          }

        } else {
        }
      })
    },
  },
  watch: {},
  created() {
    this.getGroups()
    this.getStaffs()
    this.isCorporateControl();
  },
  mounted() {
    this.getGroups()
    this.getStaffs()


  },
  computed: {
    computedItems() {

      return this.staffs.map(item => {
        return {
          ...item,
          userUsername: item.email,
          nameSurname: item.firstName + ' ' + item.lastName,
          userGroup: item.groupName

        }
      })
    }
  }

};
</script>
