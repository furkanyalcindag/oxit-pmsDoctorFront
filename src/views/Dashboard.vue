<template>
  <div>
    <WidgetsDropdown :cars="cars" />
  
 
   
  </div>
</template>

<script>
import MainChartExample from "./charts/MainChartExample";
import WidgetsDropdown from "./widgets/WidgetsDropdown";
import WidgetsBrand from "./widgets/WidgetsBrand";
import ProductService from "../services/product.service";
import AuthService from "../services/auth.service"

export default {
  name: "Dashboard",
  components: {
    MainChartExample,
    WidgetsDropdown,
    WidgetsBrand,
  },
 


beforeCreate(){
if(!AuthService.localStorageControl()){
       this.$router.push('/pages/login');
    }
},


};
</script>
