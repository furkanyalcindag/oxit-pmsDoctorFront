<template>
  <CCard>
    <CCardBody>
      <CTabs>
        <CTab title="Günlük İşlemler">
          <CCard>
            <CCardBody>
              <CDataTable
                  :items="momentaryData"
                  :fields="fieldsTable"
                  :border="true"
                  :items-per-page="5"
                  :activePage="4"
                  pagination
                  :noItemsView="{ noResults: 'Veri bulunamadı', noItems: 'Veri bulunamadı' }"
                  clickableRows

              >
                <template #paymentAmount="{ item, index }">
                  <td class="py-2">

                    {{ item.paymentAmount }} TL
                  </td>
                </template>
              </CDataTable>
            </CCardBody>

          </CCard>

        </CTab>
        <CTab title="Tüm İşlemler">
          <CCard>
            <CCardBody>
              <CDataTable
                  :items="allData"
                  :fields="fieldsTableTotal"
                  :border="true"
                  :items-per-page="5"
                  :activePage="4"
                  hover
                  pagination
                  :noItemsView="{ noResults: 'Veri bulunamadı', noItems: 'Veri bulunamadı' }"
                  clickableRows

              >

              </CDataTable>
            </CCardBody>
          </CCard>
        </CTab>
      </CTabs>
    </CCardBody>

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
        {key: "date", label: "Tarih"},
        {key: "patient", label: "Hasta Adı"},
        {key: "paymentTypeDesc", label: "Yapılan İşlem"},
        {key: "paymentAmount", label: "Tutar"},

      ],

      fieldsTableTotal: [
        {key: "date", label: "Tarih"},
        {key: "protocol", label: "Protokol"},
        {key: "patient", label: "Hasta"},
        {key: "remainingDebt", label: "Kalan Tutar"},
        {key: "total", label: "Toplam Tutar"},
        {key: "paymentTypeDesc", label: "Yapılan İşlem"},


      ],
      momentaryData: [],
      allData: []


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

    },
    async getMomentaryAccountingData() {
      let response = await new CheckingAccountService().getMomentaryCheckingAccount()
      this.momentaryData = response.data
    },
    async getAllAccountingData() {
      let response = await new CheckingAccountService().getAllCheckingAccount()
      this.allData = response.data
    }
  },


  mounted() {
  },
  async created() {
    await this.getAllAccountingData()
    await this.getMomentaryAccountingData()
  }
}
</script>