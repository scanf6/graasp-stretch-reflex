import React, { Fragment } from 'react';
import MainView from '../views/MainView';
import Header from '../layout/header/Header';
import './CommonStyle.css';

const StudentMode = () => (
  <Fragment>
    <Header />
    <MainView />
  </Fragment>
);

export default StudentMode;
