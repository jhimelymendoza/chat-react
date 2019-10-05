import React from 'react';
import './App.css';
import {RiftGate, RiftProvider} from "rift-router";
import routeStore from "./core/Stores/RouteStore";
import "antd/dist/antd.css";
import {addLocaleData, IntlProvider} from 'react-intl';
import es from 'react-intl/locale-data/es';
/*import en from 'react-intl/locale-data/en';
import enMessage from './translations/en.json';
*/
import esMessage from './translations/es.json';
import {flattenMessages} from "./core/utils/utils";


const getMessages = (lang: string) => {

    switch (lang) {
        case 'es':
            addLocaleData(es);
            return esMessage;
        /* case 'en':
             addLocaleData(en);
             return enMessage; */
        default:
            addLocaleData(es);
            return esMessage;
    }
};
const App: React.FC = () => {
    const lang: 'es' | 'en' = 'es';
    const messages = getMessages(lang);
    return (
        <>
            <IntlProvider locale={lang} key={lang} messages={flattenMessages(messages)}>
                <RiftProvider routes={routeStore}>
                    <RiftGate/>
                </RiftProvider>
            </IntlProvider>
        </>
    );
};

export default App;
