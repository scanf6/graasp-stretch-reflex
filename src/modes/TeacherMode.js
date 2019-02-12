import React, { Fragment } from 'react';
import MainView from '../views/MainView';
import Header from '../layout/header/Header';
import SettingManager from '../components/settings/SettingManager';
import './CommonStyle.css';

const TeacherMode = () => (
  <Fragment>
    <Header />
    <MainView />
    <SettingManager />
  </Fragment>
);

export default TeacherMode;
