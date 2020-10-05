<template>
  <div>
    <CRow>
      <CCol lg="12">
        <transition name="fade">
          <CCard v-if="show">
            <CCardHeader>
              <CIcon name="cil-pencil" />
              Müşteri
              <div class="card-header-actions">
                <CLink href="#" class="card-header-action btn-setting">
                  <CIcon name="cil-settings" />
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
                  <CIcon name="cil-x-circle" />
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
              <CDataTable
                :items="items"
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
                <template #status="{ item }">
                  <td>
                    <CBadge :color="getBadge(item.status)">
                      {{ item.status }}
                    </CBadge>
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
                    <CCardBody>
                      <CMedia :aside-image-props="{ height: 102 }">
                        <h4>
                          {{ item.username }}
                        </h4>
                        <p class="text-muted">
                          User since: {{ item.registered }}
                        </p>
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
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
    ></v-data-table>
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

const items = [
  {
    username: "Samppa Nori",
    registered: "2012/01/01",
    role: "Member",
    status: "Active",
  },
  {
    username: "Estavan Lykos",
    registered: "2012/02/01",
    role: "Staff",
    status: "Banned",
  },
  {
    username: "Chetan Mohamed",
    registered: "2012/02/01",
    role: "Admin",
    status: "Inactive",
  },
  {
    username: "Derick Maximinus",
    registered: "2012/03/01",
    role: "Member",
    status: "Pending",
  },
  {
    username: "Friderik Dávid",
    registered: "2012/01/21",
    role: "Staff",
    status: "Active",
  },
  {
    username: "Yiorgos Avraamu",
    registered: "2012/01/01",
    role: "Member",
    status: "Active",
  },
  {
    username: "Avram Tarasios",
    registered: "2012/02/01",
    role: "Staff",
    status: "Banned",
    _classes: "table-success",
  },
  {
    username: "Quintin Ed",
    registered: "2012/02/01",
    role: "Admin",
    status: "Inactive",
  },
  {
    username: "Enéas Kwadwo",
    registered: "2012/03/01",
    role: "Member",
    status: "Pending",
  },
  {
    username: "Agapetus Tadeáš",
    registered: "2012/01/21",
    role: "Staff",
    status: "Active",
  },
  {
    username: "Carwyn Fachtna",
    registered: "2012/01/01",
    role: "Member",
    status: "Active",
    _classes: "table-info",
  },
  {
    username: "Nehemiah Tatius",
    registered: "2012/02/01",
    role: "Staff",
    status: "Banned",
  },
  {
    username: "Ebbe Gemariah",
    registered: "2012/02/01",
    role: "Admin",
    status: "Inactive",
  },
  {
    username: "Eustorgios Amulius",
    registered: "2012/03/01",
    role: "Member",
    status: "Pending",
  },
  {
    username: "Leopold Gáspár",
    registered: "2012/01/21",
    role: "Staff",
    status: "Active",
  },
  {
    username: "Pompeius René",
    registered: "2012/01/01",
    role: "Member",
    status: "Active",
  },
  {
    username: "Paĉjo Jadon",
    registered: "2012/02/01",
    role: "Staff",
    status: "Banned",
  },
  {
    username: "Micheal Mercurius",
    registered: "2012/02/01",
    role: "Admin",
    status: "Inactive",
  },
  {
    username: "Ganesha Dubhghall",
    registered: "2012/03/01",
    role: "Member",
    status: "Pending",
  },
  {
    username: "Hiroto Šimun",
    registered: "2012/01/21",
    role: "Staff",
    status: "Active",
  },
  {
    username: "Vishnu Serghei",
    registered: "2012/01/01",
    role: "Member",
    status: "Active",
  },
  {
    username: "Zbyněk Phoibos",
    registered: "2012/02/01",
    role: "Staff",
    status: "Banned",
  },
  {
    username: "Einar Randall",
    registered: "2012/02/01",
    role: "Admin",
    status: "Inactive",
    _classes: "table-danger",
  },
  {
    username: "Félix Troels",
    registered: "2012/03/21",
    role: "Staff",
    status: "Active",
  },
  {
    username: "Aulus Agmundr",
    registered: "2012/01/01",
    role: "Member",
    status: "Pending",
  },
];

const fields = [
  { key: "Müşteri", _style: "min-width:200px" },
  { key: "Telefon Numarası" },
];

const fieldsTable = [
  { key: "username", _style: "min-width:200px" },
  "registered",
  { key: "role", _style: "min-width:100px;" },
  { key: "status", _style: "min-width:100px;" },
  {
    key: "show_details",
    label: "",
    _style: "width:1%",
    sorter: false,
    filter: false,
  },
];

export default {
  name: "Customer",
  vuetify: new Vuetify(),
  data() {
    return {
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%",
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
          value: "name",
        },
        { text: "Calories", value: "calories" },
        { text: "Fat (g)", value: "fat" },
        { text: "Carbs (g)", value: "carbs" },
        { text: "Protein (g)", value: "protein" },
        { text: "Iron (%)", value: "iron" },
      ],
      customer: new Customer("", "", "", "", "", "", "", ""),
      items: items.map((item, id) => {
        return { ...item, id };
      }),
      isSuccess: false,
      isError: false,
      fieldsTable,
      details: [],
      errors: [],
      isCorporate: false,
      collapseDuration: 0,
      selected: [], // Must be an array reference!
      show: true,
      horizontal: { label: "col-3", input: "col-9" },
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
  },
  created() {
    this.isCorporateControl();
  },
  mounted() {},
};
</script>
