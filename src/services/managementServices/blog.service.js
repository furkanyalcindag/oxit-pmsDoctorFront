import axios from "axios";
import authHeader from "@/services/auth-header";

class BlogService {


    getBlogs(page) {

        const params = {
            activePage: page,

        }
        return axios.get(process.env.VUE_APP_API_URL + `/pmsDoctor/blog-api/`, {headers: authHeader(), params})

    }


    addBlog(blog) {
        return axios.post(process.env.VUE_APP_API_URL + '/pmsDoctor/blog-api/',
            {
                title: blog.title,
                keyword: blog.keyword,
                departmentId: blog.department,
                image: blog.image,
                description: blog.description,
                isPublish: blog.isPublish,
                isSponsored: blog.isSponsored


            }, {headers: authHeader()}).then(response => {


            return response;
        }).catch(error => {
            return error
        });


    }

    editBlog(blog) {
        const params = {id: blog.uuid}
        return axios.put(process.env.VUE_APP_API_URL + '/pmsDoctor/blog-api/',
            {
                title: blog.title,
                keyword: blog.keyword,
                departmentId: blog.department,
                description: blog.description,
                image: blog.image,
                isPublish: blog.isPublish,
                isSponsored: blog.isSponsored


            }, {headers: authHeader(), params}).then(response => {


            return response;
        }).catch(error => {
            return error
        });


    }

    deleteBlog(id) {
        const params = {
            id: id
        }
        return axios.delete(process.env.VUE_APP_API_URL + `/pmsDoctor/blog-api/`, {headers: authHeader(), params})
    }


    getSingleBlog(id) {
        const params = {
            id: id
        }
        return axios.get(process.env.VUE_APP_API_URL + `/pmsDoctor/blog-api/`, {headers: authHeader(), params})
    }


}


export default BlogService
