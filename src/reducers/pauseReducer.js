import { PAUSE, RUN } from '../types/pauseTypes';

export default (state = '', action) => {
  switch (action.type) {
    case PAUSE:
      return 'pause';
    case RUN:
      return 'run';
    default:
      return 'pause';
  }
};
