import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import {CustomExceptions} from '../utils/CustomExceptions';
import {notification} from "antd";
import {ArgsProps} from "antd/lib/notification";

const config: AxiosRequestConfig = {
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    maxContentLength: 8000,
    maxRedirects: 5,
    responseType: 'json',
    timeout: 120000,
    withCredentials: false,
    validateStatus: (status: number) => status >= 200 && status < 300
};

function getToken() {
    const token = localStorage.getItem('token');
    if (token) {
        return token;
    }
    return '';
}

function clearToken(): void {
    localStorage.removeItem('userdata');
    localStorage.removeItem('token');
    localStorage.removeItem('readyLogout');
}

const showNotification = (sessionExp: string) => {
    const args: ArgsProps = {
        message: 'Error',
        description: sessionExp,
        duration: 20000,
    };
    notification.error(args);
};

export function createHttpAxios(url: string, cnf?: AxiosRequestConfig): AxiosInstance {
    const resultConfig = {...config, ...cnf};
    resultConfig.baseURL += url;
    const axiosInstance = axios.create(resultConfig);

    axiosInstance.interceptors.request.use((conf: any) => {
        if (!conf.headers.Authentication) {
            conf.headers.Authentication = `${getToken()}`;
        }

        return conf;
    });
    axiosInstance.interceptors.response.use(
        (response: any) => {


            if (response && response.data && response.data.statusCode && response.data.statusCode > 200) {
                const sessionExp = 'Your session has timed out or you are not authorized';
                if (process.env.REACT_APP_DS !== 'DEPLOY') {
                    if (response.data.message && response.data.message.includes(sessionExp)) {
                        if (!localStorage.getItem('readyLogout')) {
                            showNotification(sessionExp);

                            localStorage.setItem('readyLogout', '');
                        }

                        clearToken();
                        if (window.location.pathname !== '/login') {
                            window.location.href = '/login';
                        }
                        return Promise.reject(sessionExp);
                    }
                }

                // todo add i18n
                const err = new CustomExceptions(response.data).getCustomMessage();
                showNotification(err);
                return Promise.reject(err);
            }

            return response;
        },
        (error: any) => {
            let err = 'An error occurred on the server';
            if (error.response && error.response.status && error.response.data) {
                const status = error.response.status!;
                if (400 === status) {
                    err = error.response.data.error_description || err;
                } else if (status > 405 && 499 <= status) {
                    err = error.response.data.message || err;
                } else if (401 === status || 403 === status) {
                    err = 'Session Expired';
                    clearToken();
                    if (window.location.pathname !== '/login') {
                        window.location.href = '/login';
                    }
                }
                // else if (500 === status) {
                //   err = 'An error occurred on the server';
                // }
            }
            showNotification(err);
            return Promise.reject(err);
        }
    );

    return axiosInstance;
}
