import {notification} from "antd";
import {IconType} from "antd/es/notification";

export class NotificationsService {

    showSuccess(title: string, description?: string): void {
        this.showByType('success', title, description)
    }

    showWarning(title: string, description?: string): void {
        this.showByType('warning', title, description)
    }

    showInfo(title: string, description?: string): void {
        this.showByType('info', title, description)
    }

    showError(title: string, description?: string): void {
        this.showByType('error', title, description)
    }

    showByType(type: IconType, title: string, description?: string):void {
        notification["success"]({
            message: title,
            description: description,
            duration:3
        });
    }
}

const notificationsService = new NotificationsService();

export default notificationsService;
