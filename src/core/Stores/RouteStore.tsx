import * as React from 'react';
import {IRiftRoute} from "rift-router";
import Login from "../components/Security/Login/Login";
import Home from "../components/commun/Home";

const routeStore: IRiftRoute[]=[
    {
        component: () => <Home />,
        path: '/Home',
    },
    {
        component: () => '',
        onEnter: () => '/login',
        path: '*'
    },
    {
        component: () => <Login />,
        path: '/login'
    }

];

export default routeStore;
