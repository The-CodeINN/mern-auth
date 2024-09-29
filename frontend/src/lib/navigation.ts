import { NavigateFunction } from 'react-router-dom';

export let navigate: NavigateFunction = () => {
  throw new Error('Navigation function not initialized');
};

export const setNavigate = (fn: NavigateFunction): void => {
  navigate = fn;
};
