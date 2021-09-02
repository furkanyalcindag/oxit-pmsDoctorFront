import axios from "axios";
import authHeader from "@/services/auth-header";

class NotificationService {

    getNotifications(page) {
        const params = {
            activePage: page,
        }
        return axios.get(process.env.VUE_APP_API_URL + '/management/notification-api/', {headers: authHeader(),params})
    }

    addNotification(notification) {
        return axios.post(process.env.VUE_APP_API_URL + '/management/notification-api/', {
            title: notification.title,
            body: notification.body,
            link: notification.link,
            image: notification.pic
        }, {headers: authHeader()})

    }
}

export default NotificationService