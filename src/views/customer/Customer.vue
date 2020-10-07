<template>
  <div>
    <CRow>
      <CCol lg="12">
        <transition name="fade">
          <CCard v-if="show">
            <CCardHeader>
              <CIcon name="cil-pencil"/>
              Müşteri
              <div class="card-header-actions">
                <CLink href="#" class="card-header-action btn-setting">
                  <CIcon name="cil-settings"/>
                </CLink>
                <CLink
                    class="card-header-action btn-minimize"
                    @click="formCollapsed = !formCollapsed"
                >
                  <CIcon
                      :name="`cil-chevron-${formCollapsed ? 'bottom' : 'top'}`"
                  />
                </CLink>
                <CLink
                    href="#"
                    class="card-header-action btn-close"
                    v-on:click="show = !show"
                >
                  <CIcon name="cil-x-circle"/>
                </CLink>
              </div>
            </CCardHeader>
            <CCollapse :show="formCollapsed">
              <CCardBody>
                <div>
                  <CAlert color="success" :show="isSuccess">
                    Müşteri başarıyla kaydedildi.
                  </CAlert>

                  <CAlert
                      v-for="item in errors"
                      :key="item.message"
                      color="danger"
                      :show="isError"
                  >
                    E-mail: {{ item }}
                  </CAlert>
                </div>
                <CRow></CRow>
                <CRow>
                  <CCol lg="3">
                    <CInput
                        label="İsim"
                        description=""
                        autocomplete="autocomplete"
                        v-model="customer.firstName"
                    />

                    <CInput
                        label="Soyisim"
                        description=""
                        autocomplete="autocomplete"
                        v-model="customer.lastName"
                    />

                    <CInput
                        label="Email"
                        description=""
                        type="email"
                        autocomplete="email"
                        prepend="@"
                        v-model="customer.username"
                    />
                  </CCol>

                  <CCol lg="3">
                    <CInput
                        label="Telefon Numarası"
                        description=""
                        autocomplete="autocomplete"
                        v-model="customer.mobilePhone"
                    />
                    <CTextarea
                        :rows="3"
                        label="Adres"
                        description=""
                        autocomplete="autocomplete"
                        v-model="customer.address"
                    />

                    <CRow form class="form-group">
                      <CCol tag="label" sm="4" class="col-form-label">
                        Kurumsal
                      </CCol>

                      <CCol sm="8" :class="'form-inline'">
                        <CInputCheckbox
                            :label="'evet'"
                            :value="'true'"
                            :checked="isCorporate"
                            v-on:change="isCorporateControl"
                        />
                      </CCol>
                    </CRow>
                  </CCol>

                  <CCol lg="3">
                    <CInput
                        label="Firma Adı"
                        description=""
                        autocomplete="autocomplete"
                        v-model="customer.firmName"
                    />

                    <CInput
                        label="Vergi Numarası"
                        description=""
                        autocomplete="autocomplete"
                        v-model="customer.taxNumber"
                    />
                  </CCol>
                </CRow>

                <div class="form-actions">
                  <CButton type="submit" color="primary" @click="addCustomer"
                  >Save changes
                  </CButton>
                  <CButton color="secondary">Cancel</CButton>
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
            <CCardBody>
              <template>
                <v-card>
                  <v-card-title>
                    Nutrition
                    <v-spacer></v-spacer>
                    <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Search"
                        single-line
                        hide-details
                    ></v-text-field>
                  </v-card-title>
                  <template>
                    <v-data-table
                        :page="page"
                        :pageCount="numberOfPages"
                        :headers="headers"
                        :items="customers"
                        :options.sync="options"
                        :server-items-length="total"
                        :loading="loading"
                        class="elevation-1"
                        :items-per-page="5"


                    >

                      <template v-slot:item.isCorporate="{ item }">
                        <CButtonGroup>
                          <CButton color="success">{{ item.isCorporate }}</CButton>
                          <CButton color="info">Button</CButton>
                          <CButton color="primary">Button</CButton>
                        </CButtonGroup>
                      </template>

                    </v-data-table>
                  </template>

                  <CRow>

                  </CRow>
                </v-card>
              </template>
            </CCardBody>
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
                    :items="customers"
                    :fields="fieldsTable"
                    column-filter
                    table-filter
                    items-per-page-select
                    :items-per-page="5"
                    :activePage="4"
                    hover
                    sorter
                    pagination

                >
                  <template #deneme="{ item }">
                    <td>
                      {{ item.user.username }}

                    </td>
                  </template>
                  <template #show_details="{ item, index }">
                    <td class="py-2">
                      <CButton
                          color="primary"
                          variant="outline"
                          square
                          size="sm"
                          @click="toggleDetails(item, index)"
                      >
                        {{ Boolean(item._toggled) ? "Hide" : "Show" }}
                      </CButton>
                    </td>
                  </template>
                  <template #details="{ item }">
                    <CCollapse
                        :show="Boolean(item._toggled)"
                        :duration="collapseDuration"
                    >

                    </CCollapse>
                  </template>
                </CDataTable>


              </CCardBody>
            </template>
          </CCard>
        </transition>
      </CCol>
    </CRow>


  </div>
</template>

<script>
import Customer from "../../models/customer";
import CustomerService from "@/services/customer.service";
import Vuetify from "vuetify/lib";
import axios from "axios";
import authHeader from "@/services/auth-header";


export default {
  name: "Customer",
  vuetify: new Vuetify(),
  data() {
    return {
      fieldsTable: [
        {key: 'userUsername', label: "Kullanıcı Adı", _style: "min-width:200px"},
        {key: "firstName"},
        {key: "lastName"},
        {key: "deneme"},
      ],
      page: 1,
      numberOfPages: 0,
      selected: [],
      rowsPerPageItems: [5],
      search: '',
      total: 0,
      loading: false,
      pagination: { external: true },
      customers: [],
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%",
          actions: true
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%",
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%",
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8%",
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: "16%",
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: "0%",
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: "2%",
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: "45%",
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: "22%",
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: "6%",
        },
      ],
      headers: [
        {
          text: "Müşteri",
          align: "start",
          sortable: false,
          value: "user.first_name",
        },
        {text: "Tax", value: "taxNumber"},

        {text: "Actions (%)", value: "isCorporate"}
      ],
      customer: new Customer("", "", "", "", "", "", "", ""),

      isSuccess: false,
      isError: false,

      details: [],
      errors: [],
      isCorporate: false,
      collapseDuration: 0,

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
    };
  },

  methods: {


    computedItems() {
      console.log("burada", this.customers)
      this.customers = this.customers.map(item => {

        return {
          ...item,
          userUsername: item.user.username,
          firstName: item.user.first_name,
          lastName: item.user.last_name,

        }
      })
    },

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
      console.log(this.isCorporate);
      this.isCorporate = !this.isCorporate;
      this.customer.isCorporate = this.isCorporate;
    },

    async addCustomer() {
      let a = await new CustomerService().customerAdd(this.customer);

      console.log("status", a);
      if (a.status === 200) {
        this.isSuccess = false;
        this.isSuccess = true;
        this.successHide();
        this.getCategoriesByPagination();
      } else if (a.response.status === 401) {
        this.isError = false;
        this.isError = true;
        this.errorHide();

        await this.$router.push("/pages/login");
      } else {
        this.isError = false;
        this.isError = true;

        this.errors = a.response.data["username"];

        this.errorHide();
      }
    },

    errorHide() {
      setTimeout(() => (this.isError = false), 5000);
    },
    successHide() {
      setTimeout(() => (this.isSuccess = false), 5000);
      console.log("naber");
    },

    getCategoriesByPagination() {

      // get by search keyword
      console.log("search", this.search)
      console.log("pagination", this.pagination.page)
      console.log("pagination", this.pagination.rowsPerPage)
      this.loading = true;
      const {page, itemsPerPage} = this.options;
      let pageNumber = page;


      axios.get(`http://localhost:8000/car-service/customer-api/?search=${this.search}&page=1&per_page=10`, {headers: authHeader()})
          .then(res => {
            this.customers = res.data.data;
            console.log("ssa", res.data.data)
            this.total = res.data.recordsTotal;
            this.numberOfPages = 2;

          })
          .catch(err => console.log(err.response.data))
          .finally(() => this.loading = false);
    }


  },

  watch: {
    options: {
      handler() {
        this.getCategoriesByPagination();
      },
      deep: true,
    },
    customers: {
      handler() {
        console.log("değiştiii")

        this.computedItems()
      },
      deep: true
    }

  },

  created() {
    this.isCorporateControl();

  },
  mounted() {
    this.getCategoriesByPagination();
    this.computedItems();
  },
  computed: {}

};
</script>
