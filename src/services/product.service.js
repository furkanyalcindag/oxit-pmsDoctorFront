import axios from 'axios';
import authHeader from './auth-header';
const API_URL = process.env.VUE_APP_API_URL;

class ProductService {

    getProducts()
    {
      
       return  axios.get(API_URL + '/car-service/product-api/', { headers: authHeader() })
        
      
    }





}

export default ProductService