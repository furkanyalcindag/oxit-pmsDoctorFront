<template>
  <div>
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
                    <CRow>
                      <CCol lg="6">
                        <CInput
                            label="Bildirim Başlığı (Zorunlu Alan)"
                            description=""
                            autocomplete="autocomplete"
                            v-model="notification.title"

                        />


                        <CInput
                            label="Bildirim Linki (Zorunlu Alan)"
                            description=""
                            autocomplete="autocomplete"
                            v-model="notification.link"
                        />

                        <CInputFile
                            label="Resim Ekle"
                            horizontal
                            @change="getBase64"
                            custom
                            multiple
                            :placeholder="selectedFile"
                        />


                      </CCol>

                      <CCol lg="6">


                        <CSelect
                            label="Yaş Aralığı"
                            :options="options"
                            placeholder="Lütfen Seçiniz"
                        />

                        <CSelect
                            label="Şehir"
                            :options="options"
                            placeholder="Lütfen Seçiniz"
                        />


                        <CTextarea
                            :rows="2"
                            label="Bildirim Açıklaması (Zorunlu Alan)"
                            description=""
                            autocomplete="autocomplete"
                            v-model="notification.body"

                        />


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
                                    :fields="fieldsTableNotification"
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
                                </CDataTable>


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
                        <CInput
                            label="Bildirim Başlığı (Zorunlu Alan)"
                            description=""
                            autocomplete="autocomplete"

                        />
                        <CSelect
                            label="Zamanlama"
                            :options="options"
                            placeholder="Lütfen Seçiniz"
                        />


                        <CInput
                            label="Bildirim Linki (Zorunlu Alan)"
                            description=""
                            autocomplete="autocomplete"
                        />


                      </CCol>
                      <CCol lg="6">


                        <CInput
                            label="Bildirim Logo Url (Zorunlu Alan)"
                            description=""
                            autocomplete="autocomplete"
                        />


                        <CTextarea
                            :rows="2"
                            label="Bildirim Açıklaması (Zorunlu Alan)"
                            description=""
                            autocomplete="autocomplete"

                        />


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
                                    :fields="fields"
                                    column-filter
                                    table-filter
                                    items-per-page-select
                                    :items-per-page="5"
                                    hover
                                    sorter
                                    pagination
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


                              </CCardBody>
                            </template>
                          </CCard>
                        </transition>
                      </CCol>
                    </CRow>
                  </CTab>
                  <!--                  <CTab title="Otomatik">-->
                  <!--                    <hr>-->
                  <!--                    <CRow>-->
                  <!--                      <CCol lg="6">-->

                  <!--                        <CSelect-->
                  <!--                            label="Gün"-->
                  <!--                            :options="options"-->
                  <!--                            placeholder="Lütfen Seçiniz"-->
                  <!--                        />-->

                  <!--                        <CInput-->
                  <!--                            label="Bildirim Başlığı (Zorunlu Alan)"-->
                  <!--                            description=""-->
                  <!--                            autocomplete="autocomplete"-->

                  <!--                        />-->


                  <!--                        <CInput-->
                  <!--                            label="Bildirim Linki (Zorunlu Alan)"-->
                  <!--                            description=""-->
                  <!--                            autocomplete="autocomplete"-->
                  <!--                        />-->


                  <!--                      </CCol>-->
                  <!--                      <CCol lg="6">-->


                  <!--                        <CInput-->
                  <!--                            label="Bildirim Logo Url (Zorunlu Alan)"-->
                  <!--                            description=""-->
                  <!--                            autocomplete="autocomplete"-->
                  <!--                        />-->


                  <!--                        <CTextarea-->
                  <!--                            :rows="2"-->
                  <!--                            label="Bildirim Açıklaması (Zorunlu Alan)"-->
                  <!--                            description=""-->
                  <!--                            autocomplete="autocomplete"-->

                  <!--                        />-->


                  <!--                      </CCol>-->


                  <!--                    </CRow>-->
                  <!--                    <hr>-->
                  <!--                    <CRow>-->
                  <!--                      <CCol lg="12">-->
                  <!--                        <transition name="fade">-->
                  <!--                          <CCard v-if="show">-->
                  <!--                            <template>-->
                  <!--                              <CCardBody>-->

                  <!--                                <CDataTable-->
                  <!--                                    :items="items"-->
                  <!--                                    :fields="fields"-->
                  <!--                                    column-filter-->
                  <!--                                    table-filter-->
                  <!--                                    items-per-page-select-->
                  <!--                                    :items-per-page="5"-->
                  <!--                                    hover-->
                  <!--                                    sorter-->
                  <!--                                    pagination-->
                  <!--                                >-->
                  <!--                                  <template #status="{item}">-->
                  <!--                                    <td>-->
                  <!--                                      <CBadge :color="getBadge(item.status)">-->
                  <!--                                        {{ item.status }}-->
                  <!--                                      </CBadge>-->
                  <!--                                    </td>-->
                  <!--                                  </template>-->
                  <!--                                  <template #show_details="{item, index}">-->
                  <!--                                    <td class="py-2">-->
                  <!--                                      <CButton-->
                  <!--                                          color="primary"-->
                  <!--                                          variant="outline"-->
                  <!--                                          square-->
                  <!--                                          size="sm"-->
                  <!--                                          @click="toggleDetails(item, index)"-->
                  <!--                                      >-->
                  <!--                                        {{ Boolean(item._toggled) ? 'Hide' : 'Show' }}-->
                  <!--                                      </CButton>-->
                  <!--                                    </td>-->
                  <!--                                  </template>-->
                  <!--                                  <template #details="{item}">-->
                  <!--                                    <CCollapse :show="Boolean(item._toggled)" :duration="collapseDuration">-->
                  <!--                                      <CCardBody>-->
                  <!--                                        <CMedia :aside-image-props="{ height: 102 }">-->
                  <!--                                          <h4>-->
                  <!--                                            {{ item.username }}-->
                  <!--                                          </h4>-->
                  <!--                                          <p class="text-muted">User since: {{ item.registered }}</p>-->
                  <!--                                          <CButton size="sm" color="info" class="">-->
                  <!--                                            User Settings-->
                  <!--                                          </CButton>-->
                  <!--                                          <CButton size="sm" color="danger" class="ml-1">-->
                  <!--                                            Delete-->
                  <!--                                          </CButton>-->
                  <!--                                        </CMedia>-->
                  <!--                                      </CCardBody>-->
                  <!--                                    </CCollapse>-->
                  <!--                                  </template>-->
                  <!--                                </CDataTable>-->


                  <!--                              </CCardBody>-->
                  <!--                            </template>-->
                  <!--                          </CCard>-->
                  <!--                        </transition>-->
                  <!--                      </CCol>-->
                  <!--                    </CRow>-->
                  <!--                  </CTab>-->
                </CTabs>


                <div class="form-actions">
                  <CButton @click="addNotification" type="submit" color="primary"
                  >Kaydet
                  </CButton>

                </div>
              </CCardBody>
            </CCollapse>
          </CCard>
        </transition>
      </CCol>
    </CRow>


  </div>
</template>

<script>
import Notification from "../../../models/pms/notification";
import NotificationService from "../../../services/managementServices/notification.service";

export default {
  name: "Notifications",


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
        {key: "link", label: "Link"},]
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
      console.log("not", this.notification)
      let response = await new NotificationService().addNotification(this.notification)
      if (response.status === 200) {

      }

    },
    async getNotifications() {
      let response = await new NotificationService().getNotifications()
      this.items = response.data

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
    }


  },
  watch: {},
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


