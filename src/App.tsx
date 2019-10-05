import React from 'react';
import './App.css';
import {RiftGate, RiftProvider} from "rift-router";
import routeStore from "./core/Stores/RouteStore";
import "antd/dist/antd.css";

const App: React.FC = () => {
  return (
    <>
      <RiftProvider routes={routeStore}>
        <RiftGate />
      </RiftProvider>
    </>
  );
};

export default App;
