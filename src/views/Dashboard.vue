<template>
  <div>
    <WidgetsDropdown :dashData="data"/>


  </div>
</template>

<script>
import MainChartExample from "./charts/MainChartExample";
import WidgetsDropdown from "./widgets/WidgetsDropdown";
import WidgetsBrand from "./widgets/WidgetsBrand";
import AuthService from "../services/auth.service"
import DashboardService from "@/services/dashboard.service";
import {freeSet} from "@coreui/icons";


export default {
  name: "Dashboard",
  components: {
    MainChartExample,
    WidgetsDropdown,
    WidgetsBrand,
  },
  freeSet,
  data() {
    return {

      data: {}


    }
  },
  methods: {

    async getDashboardData() {

      /*this.$toast.success({
        title:'',
        message:this.denemes()
      })*/

      let response = await new DashboardService().getAdminDashboard();
      console.log(response)
      this.data = response.data


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
