
import PushNotification from "react-native-push-notification";


const showNotification = (title,message) => {
    PushNotification.localNotification({
        title : title,
        message : message,
    });
};

const handScheduleNotification = (title, message) => {
    PushNotification.localNotificationSchedule({
        title : title,
        message : message,
        date : new Date(Date.now() + 5 * 1000),

    });
};

const handCancel = () => {
    PushNotification.cancelAllLocalNotifications
};

export {showNotification, handScheduleNotification , handCancel};