import axios from 'axios';
import authHeader from './auth-header';
const API_URL = process.env.VUE_APP_API_URL;

class ProductService {

    getProducts()
    {
      
       return  axios.get(API_URL + '/car-service/product-api/', { headers: authHeader() })
        
      
    }

    /*



    "barcodeNumber": "dddd",
    "name": "fdgdgdfgfdgdfg",
    "quantity": 3,
    "netPrice": 15.23,
    "isOpen": true,
    "taxRate": 18,
    "totalProduct": 18.34,
    "categories": [
       1,2,3
    ]
     */

    addProduct(product) {
        return axios.post(process.env.VUE_APP_API_URL + '/car-service/product-api/',
            {
                barcodeNumber : product.barcode_number,
                name : product.name,
                quantity : product.quantity,
                netPrice : product.netPrice,
                isOpen : product.isOpen,
                taxRate : product.taxRate,
                categories : product.categories,
                productImage :product.productImages,
                shelf :product.shelf

            }, {headers: authHeader()}).then(response => {
            console.log(response)


            return response;
        }).catch(error => {
            console.log("hata", error)
            return error
        });


    }





}

export default ProductService