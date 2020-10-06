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
                      :headers="headers"
                      :items="customer"
                      :search="search"
                      :items-per-page="10"
                      item-key="name"
                      class="elevation-1"
                      :total-items="total"
                      :loading="loading"


                  >

                    <template v-slot:item="{ item }">
                      <CButtonGroup>
                        <CButton color="success">Button</CButton>
                        <CButton color="info">Button</CButton>
                        <CButton color="primary">Button</CButton>
                      </CButtonGroup>
                    </template>

                  </v-data-table>
                  </template>
                </v-card>
              </template>
            </CCardBody>
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
import * as axios from "core-js";



const fields = [
  {key: "Müşteri", _style: "min-width:200px"},
  {key: "Telefon Numarası"},
];



export default {
  name: "Customer",
  vuetify: new Vuetify(),
  data() {
    return {

      selected: [],
      rowsPerPageItems: [10],
      search: '',
      total: 0,
      loading: false,
      pagination: {},
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%",
          actions:true
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
          text: "Dessert (100g serving)",
          align: "start",
          sortable: false,
          value: "gender",
        },
        {text: "Tax", value: "tax_number"},

        {text: "Actions (%)", value: "actions"}
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
      this.loading = true;
      // get by search keyword


      if (this.search) {
        axios.get(`localhost:8000/car-service/customer-api/?search=${this.search}&page=${this.pagination.page}&per_page=${this.pagination.rowsPerPage}`)
            .then(res => {
              this.customer = res.data.data;
              this.total = res.data.recordsTotal;
            })
            .catch(err => console.log(err.response.data))
            .finally(() => this.loading = false);
      }
    }


  },
  watch: {
    pagination() {
      this.getCategoriesByPagination();
    },
    search() {
      this.getCategoriesByPagination();
    }
  },
  created() {
    this.isCorporateControl();
    this.getCategoriesByPagination();
  },
  mounted() {
  },
};
</script>
