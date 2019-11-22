import React, { Fragment } from 'react';
import MainView from '../views/MainView';
import Header from '../layout/header/Header';
import SettingsModal from '../components/settings/SettingsModal';
import './CommonStyle.css';

const TeacherMode = () => (
  <Fragment>
    <Header />
    <MainView />
    <SettingsModal />
  </Fragment>
);

export default TeacherMode;
