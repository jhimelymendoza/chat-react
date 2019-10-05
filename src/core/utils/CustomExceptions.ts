const appExcepMessage = 'com.vertrax.wellsite.common.exception.ApplicationException';// todo
const appCustomExcepMessage = 'com.vertrax.wellsite.common.exception.CustomException';

interface IResponse {
    class: string;
    message: string;
    stackTraceList: string[];
}

export class CustomExceptions {
    response: IResponse;

    constructor(response: IResponse) {
        this.response = response;
    }

    getCustomMessage() {

        let error = this.getServerError();
         error = error !== undefined ? error : 'An error occurred on the server';
        console.log('error', error);
        return error ;
    }

    getServerError = (): string | void => {
        if (
            this.response &&
            this.response.hasOwnProperty('class') &&
            this.response.class === appCustomExcepMessage &&
            this.response.hasOwnProperty('message')
        ) {
            const message = this.response.message;
            if (message.includes(appExcepMessage)) {
                const split = message.split(`${appExcepMessage}:`);
                try {
                    if (split.length > 1) {
                        const obj = JSON.parse(split[1].trimLeft().trimRight());
                        if (obj.hasOwnProperty('class') && obj.class === appCustomExcepMessage && obj.hasOwnProperty('message')) {
                            return obj.message;
                        }
                    }
                } catch (e) {
                    console.log(e);
                }
            }
        }

    };
}
