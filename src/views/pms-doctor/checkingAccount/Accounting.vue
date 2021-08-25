<template>
  <CCard>
    <CTabs>
      <CTab title="Günlük İşlemler">







        <CDataTable
            :items="locations"
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
        </CDataTable>







      </CTab>
      <CTab title="Tüm İşlemler">
        <CDataTable
            :items="locations"
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
        </CDataTable>


      </CTab>
    </CTabs>


  </CCard>


</template>

<script>
import {CChartLineSimple, CChartBarSimple} from '@/views/charts'
import {freeSet} from "@coreui/icons";
import CheckingAccountService from "@/services/managementServices/checkingAccount.service";

export default {
  name: 'WidgetsDropdown',
  components: {CChartBarSimple, CChartLineSimple},
  freeSet,
  props: {
    dashData: {
      type: Object,
      default: () => {
        return {}
      }


    },

  },
  data() {
    return {
      totalMonthly: 0,
      totalDaily: 0,
      totalYearly: 0,
      remainingDebtMonthly: 0,
      remainingDebtDaily: 0,
      remainingDebtYearly: 0,
      paidPriceMonthly: 0,
      paidPriceDaily: 0,
      paidPriceYearly: 0,
      fieldsTable: [
        {key: "name", label: "Hasta Adı"},
        {key: "name", label: "Tarih"},
        {key: "name", label: "Yapılan İşlem"},
        {key: "name", label: "Günlük Kalan Tutar"},

      ],

      fieldsTableTotal: [

        {key: "name", label: "Toplam Tutar"},
        {key: "name", label: "Toplam Ödenen Tutar"},
        {key: "name", label: "Toplam Kalan Tutar"},


      ],


    }
  },
  methods: {


    validator(val) {
      return val ? val.length >= 4 : false;
    },
    getBadge(status) {
      switch (status) {
        case "Ödendi":
          return "success";
        case "Kısmi Ödendi":
          return "warning";
        case "Ödenmedi":
          return "danger";
        default:
          return "warning";
      }
    },


    async getAccountingData() {
      let response = await new CheckingAccountService().getCheckingAccountData()
      this.totalMonthly = response.data.totalMonthly
      this.totalDaily = response.data.totalDaily
      this.totalYearly = response.data.totalYearly
      this.remainingDebtMonthly = response.data.remainingDebtMonthly
      this.remainingDebtDaily = response.data.remainingDebtDaily
      this.remainingDebtYearly = response.data.remainingDebtYearly
      this.paidPriceMonthly = response.data.paidPriceMonthly
      this.paidPriceDaily = response.data.paidPriceDaily
      this.paidPriceYearly = response.data.paidPriceYearly

    }
  },


  mounted() {
  },
  async created() {
    await this.getAccountingData()
  }
}
</script>