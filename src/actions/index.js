import { SET_THEME_COLOR, SET_LANGUAGE, SET_TITLE_STATE } from './types';

export function themeColor({ newColor }) {
  return {
    type: SET_THEME_COLOR,
    payload: newColor,
  };
}

export function defaultLang({ newLang }) {
  return {
    type: SET_LANGUAGE,
    payload: newLang,
  };
}

export function titleState({ showTitle }) {
  return {
    type: SET_TITLE_STATE,
    payload: showTitle,
  };
}
