<template>
  <CRow>
    <CCol lg="12">
      <transition name="fade">
        <CCard v-if="show">
          <CCardHeader>
            <CIcon name="cil-pencil"/>
            Bildirimler
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
              <CTabs variant="pills">
                <CTab title="Manuel" active>
                  <hr>
                  <validation-observer ref="simpleRules">
                    <CRow>
                      <CCol lg="6">
                        <CCol lg="12">
                          <validation-provider
                              #default="{errors}"
                              rules="required|min:3|max:100"
                              name="Başlık">
                            Başlık <span class="text-danger">*</span>
                            <span class="text-danger">{{ errors[0] }}</span>
                            <CInput
                                description=""
                                autocomplete="autocomplete"
                                v-model="notification.title"
                                :state="errors.length > 0 ? false:null"
                            />
                          </validation-provider>
                        </CCol>
                        <CCol lg="12">
                          <validation-provider
                              #default="{errors}"
                              rules="required|min:3|max:100"
                              name="Link">
                            Link <span class="text-danger">*</span>
                            <span class="text-danger">{{ errors[0] }}</span>
                            <CInput
                                description=""
                                autocomplete="autocomplete"
                                v-model="notification.link"
                                :state="errors.length > 0 ? false:null"
                            />
                          </validation-provider>
                        </CCol>
                        <CCol lg="12">
                          <validation-provider
                              #default="{errors}"
                              rules="required|min:3|max:100"
                              name="Açıklama">
                            Açıklama <span class="text-danger">*</span>
                            <span class="text-danger">{{ errors[0] }}</span>
                            <CTextarea
                                :rows="2"
                                description=""
                                autocomplete="autocomplete"
                                v-model="notification.body"
                                :state="errors.length > 0 ? false:null"

                            />
                          </validation-provider>
                        </CCol>
                      </CCol>
                      <CCol lg="6">
                        <CCol lg="12">
                          Yaş Aralığı <span class="text-danger">*</span>
                          <CSelect
                              :options="options"
                              placeholder="Lütfen Seçiniz"
                          />
                        </CCol>
                        <CCol lg="12">
                          İl <span class="text-danger">*</span>
                          <CSelect
                              :options="options"
                              placeholder="Lütfen Seçiniz"
                          />
                        </CCol>
                        <CCol lg="12">
                          Resim <span class="text-danger">*</span>
                          <CInputFile
                              horizontal
                              @change="getBase64"
                              custom
                              :placeholder="selectedFile"
                          />
                        </CCol>
                      </CCol>
                      <CCol class="ml-3" lg="6">
                        <div class="form-actions">
                          <CButton @click="validationForm" type="submit" color="primary"
                          >
                            <c-spinner v-show="loading" size="sm"></c-spinner>
                            Kaydet
                          </CButton>

                        </div>
                      </CCol>

                    </CRow>
                  </validation-observer>
                  <hr>
                  <CRow>
                    <CCol lg="12">
                      <transition name="fade">
                        <CCard v-if="show">
                          <template>
                            <CCardBody>

                              <CDataTable
                                  :items="items"
                                  :fields="fieldsTableNotification"
                                  :border="true"
                                  hover
                                  pagination
                                  :noItemsView="{ noResults: 'Veri bulunamadı', noItems: 'Veri bulunamadı' }"
                                  clickableRows

                              >

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
                </CTab>


                <CTab title="Cron Job">
                  <hr>
                  <CRow>
                    <CCol lg="6">
                      <CCol lg="12">
                        Başlık <span class="text-danger">*</span>
                        <CInput
                            description=""
                            autocomplete="autocomplete"

                        />
                      </CCol>
                      <CCol lg="12">
                        Zamanlama <span class="text-danger">*</span>
                        <CSelect
                            :options="options"
                            placeholder="Lütfen Seçiniz"
                        />
                      </CCol>
                      <CCol lg="12">
                        Link <span class="text-danger">*</span>
                        <CInput
                            description=""
                            autocomplete="autocomplete"
                        />
                      </CCol>
                    </CCol>
                    <CCol lg="6">
                      <CCol lg="12">

                        Logo <span class="text-danger">*</span>
                        <CInputFile
                            horizontal
                            @change="getBase64"
                            custom
                            :placeholder="selectedFile"
                        />
                      </CCol>
                      <CCol lg="12">
                        Açıklama <span class="text-danger">*</span>
                        <CTextarea
                            :rows="3"
                            description=""
                            autocomplete="autocomplete"
                        />
                      </CCol>
                    </CCol>
                    <CCol class="ml-3" lg="6">
                      <div class="form-actions">
                        <CButton type="submit" color="primary"
                        >Kaydet
                        </CButton>

                      </div>
                    </CCol>


                  </CRow>
                  <hr>
                  <CRow>
                    <CCol lg="12">
                      <transition name="fade">
                        <CCard v-if="show">
                          <template>
                            <CCardBody>

                              <CDataTable
                                  :items="items"
                                  :fields="fieldsTable"
                                  column-filter
                                  table-filter
                                  hover
                              >
                                <template #status="{item}">
                                  <td>
                                    <CBadge :color="getBadge(item.status)">
                                      {{ item.status }}
                                    </CBadge>
                                  </td>
                                </template>
                                <template #show_details="{item, index}">
                                  <td class="py-2">
                                    <CButton
                                        color="primary"
                                        variant="outline"
                                        square
                                        size="sm"
                                        @click="toggleDetails(item, index)"
                                    >
                                      {{ Boolean(item._toggled) ? 'Hide' : 'Show' }}
                                    </CButton>
                                  </td>
                                </template>
                                <template #details="{item}">
                                  <CCollapse :show="Boolean(item._toggled)" :duration="collapseDuration">
                                    <CCardBody>
                                      <CMedia :aside-image-props="{ height: 102 }">
                                        <h4>
                                          {{ item.username }}
                                        </h4>
                                        <p class="text-muted">User since: {{ item.registered }}</p>
                                        <CButton size="sm" color="info" class="">
                                          User Settings
                                        </CButton>
                                        <CButton size="sm" color="danger" class="ml-1">
                                          Delete
                                        </CButton>
                                      </CMedia>
                                    </CCardBody>
                                  </CCollapse>
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
                </CTab>
              </CTabs>


            </CCardBody>
          </CCollapse>
        </CCard>
      </transition>
    </CCol>
  </CRow>
</template>

<script>
import Notification from "../../../models/pms/notification";
import NotificationService from "../../../services/managementServices/notification.service";
import {ValidationProvider, ValidationObserver} from 'vee-validate'
import {required, email, min, max} from 'validations'

export default {
  name: "Notifications",
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data() {
    return {
      fieldsTable: [
        {key: 'title', label: "Başlık", _style: "min-width:200px"},
        {key: "link", label: "Link"},
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
      notification: new Notification("", "", "", ""),
      selectedFile: '',
      items: [],
      fieldsTableNotification: [
        {key: "title", label: "Başlık"},
        {key: "link", label: "Link"},],
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
    async addNotification() {
      this.loading = true
      let response = await new NotificationService().addNotification(this.notification)
      if (response.status === 200) {
        this.loading = false
        await this.getNotifications()
      } else {
        this.loading = false
      }
    },
    async getNotifications(page) {
      let response = await new NotificationService().getNotifications(page)
      this.items = response.data
      this.pageCount = response.data.activePage

    },
    getBase64(event) {
      var reader = new FileReader();
      reader.readAsDataURL(event[0]);
      this.selectedFile = event.length + ' dosya seçildi'
      var x = this
      reader.onload = function () {
        x.notification.pic = reader.result


      };
      reader.onerror = function (error) {
      };


      this.notification.pic = x
    },
    async validationForm() {
      this.$refs.simpleRules.validate().then(async success => {
        if (success) {
          await this.addNotification()
        } else {
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
    await this.getNotifications()

  },
  async mounted() {
    await this.getNotifications()

  },
  computed: {
    // computedItems() {
    //   return this.staffs.map(item => {
    //     return {
    //       ...item,
    //       userUsername: item.user.username,
    //       nameSurname: item.user.first_name + ' ' + item.user.last_name,
    //       userGroup: item.user.groups[0].name
    //     }
    //   })
    // }
  }
};
</script>


