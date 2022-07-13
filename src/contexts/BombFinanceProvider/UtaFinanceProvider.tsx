import React, {createContext, useEffect, useState} from 'react';
import {useWallet} from 'use-wallet';
import UtaFinance from '../../emp-finance';
import config from '../../config';

export interface EmpFinanceContext {
  utaFinance?: UtaFinance;
}

export const Context = createContext<EmpFinanceContext>({utaFinance: null});

export const UtaFinanceProvider: React.FC = ({children}) => {
  const {ethereum, account} = useWallet();
  const [utaFinance, setUtaFinance] = useState<UtaFinance>();

  useEffect(() => {
    if (!utaFinance) {
      const uta = new UtaFinance(config);
      if (account) {
        // wallet was unlocked at initialization
        uta.unlockWallet(ethereum, account);
      }
      setUtaFinance(uta);
    } else if (account) {
      utaFinance.unlockWallet(ethereum, account);
    }
  }, [account, ethereum, utaFinance]);

  return <Context.Provider value={{utaFinance}}>{children}</Context.Provider>;
};
