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
                <div>
                </div>
                <CRow></CRow>
                <CRow>
                  <CCol lg="6">
                    Ad <span class="text-danger">*</span>
                    <CInput
                        description=""
                        autocomplete="autocomplete"
                        v-model="staff.firstName"
                    />
                    Soyad <span class="text-danger">*</span>
                    <CInput
                        description=""
                        autocomplete="autocomplete"
                        v-model="staff.lastName"
                    />
                    E-Mail <span class="text-danger">*</span>
                    <CInput
                        description=""
                        type="email"
                        autocomplete="email"
                        prepend="@"
                        v-model="staff.email"
                    />
                  </CCol>

                  <CCol lg="6">
                    Telefon Numarası <span class="text-danger">*</span>
                    <CInput
                        description=""
                        autocomplete="autocomplete"
                        v-model="staff.mobilePhone"
                    />

                    Grup <span class="text-danger">*</span>
                    <CSelect
                        :options="groups"
                        v-model="staff.group"
                        :value.sync="staff.group"

                    />
                    <!--                    Adres <span class="text-danger">*</span>-->
                    <!--                    <CTextarea-->
                    <!--                        :rows="3"-->
                    <!--                        description=""-->
                    <!--                        autocomplete="autocomplete"-->
                    <!--                        v-model="staff.address"-->
                    <!--                    />-->

                  </CCol>


                </CRow>

                <div class="form-actions">
                  <CButton type="submit" color="primary" @click="addStaff"
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
                      <CButton @click="setDeleteModal(item.uuid)" color="danger" class="mr-2">Sil</CButton>
                      <CButton @click="getSingleStaff(item.uuid)" color="primary" class="mr-2">Düzenle</CButton>
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
                  <CRow>
                    <CCol lg="6">
                      <CInput
                          label="Ad *"
                          description=""
                          autocomplete="autocomplete"
                          v-model="staffUpdate.firstName"
                      />

                      <CInput
                          label="Soyad *"
                          description=""
                          autocomplete="autocomplete"
                          v-model="staffUpdate.lastName"
                      />

                      <CInput
                          label="Email *"
                          description=""
                          type="email"
                          autocomplete="email"
                          prepend="@"
                          v-model="staffUpdate.email"
                      />
                    </CCol>

                    <CCol lg="6">
                      <CInput
                          label="Telefon Numarası *"
                          description=""
                          autocomplete="autocomplete"
                          v-model="staffUpdate.mobilePhone"
                      />


                      <CSelect
                          :options="groups"
                          label="Grup *"
                          v-model="groupUpdate"
                          :value.sync="groupUpdate"

                      />

                      <!--                      <CTextarea-->
                      <!--                          :rows="3"-->
                      <!--                          label="Adres"-->
                      <!--                          description=""-->
                      <!--                          autocomplete="autocomplete"-->
                      <!--                          v-model="staffUpdate.address"-->
                      <!--                      />-->

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
        <CButton @click="editStaff" color="success">Güncelle</CButton>
      </template>
    </CModal>


  </div>
</template>

<script>


import StaffService from "@/services/managementServices/staff.service";
import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css';
import UserService from "@/services/managementServices/user.service";
import Staff from "../../../models/pms/staff";


export default {
  name: "Group",

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
      staff: new Staff("", "", "", "", "", ""),
      staffUpdate: new Staff("", "", "", "", "", ""),
      groupUpdate: ''
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
      }
    },
    async getSingleStaff(id) {
      let response = await new StaffService().getSingleStaff(id)
      if (response.status === 200) {
        this.staffUpdateModal = true
        this.staffUpdate = response.data
        this.groupUpdate = response.data.group
        console.log("up", this.groupUpdate)
        console.log("staff", this.staffUpdate)
      }
    },
    async editStaff() {
      this.staffUpdate.group = this.groupUpdate
      console.log("den", this.staffUpdate)
      let response = await new StaffService().editStaff(this.staffUpdate)
      if (response.status === 200) {
        this.staffUpdateModal = false
        await this.getStaffs()
      }
    }
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
