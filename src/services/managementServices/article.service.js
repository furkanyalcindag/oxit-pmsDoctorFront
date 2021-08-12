import axios from "axios";
import authHeader from "@/services/auth-header";

class ArticleService {


    getArticles() {

        return axios.get(process.env.VUE_APP_API_URL + `/pmsDoctor/article-api/`, {headers: authHeader()})

    }

    addArticle(article) {
        return axios.post(process.env.VUE_APP_API_URL + '/pmsDoctor/article-api/',
            {

                title: article.title,
                link: article.link,
                date: article.date,


            }, {headers: authHeader()}).then(response => {


            return response;
        }).catch(error => {
            return error
        });


    }

    editArticle(article) {
        const params = {id: article.uuid}
        return axios.put(process.env.VUE_APP_API_URL + '/pmsDoctor/article-api/',
            {
                title: article.title,
                link: article.link,
                date: article.date,

            }, {headers: authHeader(), params}).then(response => {


            return response;
        }).catch(error => {
            return error
        });


    }

    getSingleArticle(id) {
        const params = {
            id: id
        }
        return axios.get(process.env.VUE_APP_API_URL + `/pmsDoctor/article-api/`, {headers: authHeader(), params})
    }


    deleteArticle(id) {
        const params = {
            id: id
        }
        return axios.delete(process.env.VUE_APP_API_URL + `/pmsDoctor/article-api/`, {headers: authHeader(), params})
    }

    getArticleTimeline() {
        return axios.get(process.env.VUE_APP_API_URL + '/pmsDoctor/article-timeline-api/', {
            headers: authHeader()
        })
    }


}


export default ArticleService
