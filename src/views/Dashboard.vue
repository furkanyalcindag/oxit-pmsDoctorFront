<template>
  <div>
    <WidgetsDropdown :dashData="data"/>
    <CRow>
      <CCol lg="6">
        <CCard>
          <CCardHeader>Servis Durumları</CCardHeader>
          <CCardBody>
            <CChartPieExample :dashData="data"/>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>


  </div>
</template>

<script>
import MainChartExample from "./charts/MainChartExample";
import WidgetsDropdown from "./widgets/WidgetsDropdown";
import WidgetsBrand from "./widgets/WidgetsBrand";
import AuthService from "../services/auth.service"
import DashboardService from "@/services/dashboard.service";
import {freeSet} from "@coreui/icons";
import * as Charts from "@/views/charts";


export default {
  name: "Dashboard",
  components: {
    MainChartExample,
    WidgetsDropdown,
    WidgetsBrand,
    ...Charts,
  },
  freeSet,
  data() {
    return {

      data: {


        productCount: 0,
        outOfStockCount: 0,
        carCount: 0,
        customerCount: 0,
        remainingDebt: 0,
        uncompletedServiceCount: 0,
        completedServiceCount: "0",
        waitingApproveServiceCount: 0,
        totalCheckingAccountDaily: 0,
        totalCheckingAccountMonthly: 0,
        totalCheckingAccountYearly: 0


      }


    }
  },
  methods: {

    async getDashboardData() {

      /*this.$toast.success({
        title:'',
        message:this.denemes()
      })*/

      let response = await new DashboardService().getAdminDashboard();
      if(response.status===200){
        this.data = response.data
      }
      else {
        await this.$router.push("/pages/login");
      }
      console.log(response)



    },

  },


  async beforeCreate() {
    if (!AuthService.localStorageControl()) {
      this.$router.push('/pages/login');
    }


  },

  async mounted() {
    await this.getDashboardData();


  },


};
</script>
