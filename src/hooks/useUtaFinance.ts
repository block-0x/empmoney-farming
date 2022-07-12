import {useContext} from 'react';
import {Context} from '../contexts/BombFinanceProvider';

const useUtaFinance = () => {
  const {empFinance} = useContext(Context);
  return empFinance;
};

export default useUtaFinance;
