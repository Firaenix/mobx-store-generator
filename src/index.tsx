import { useLocalStore } from 'mobx-react';
import React, { ReactNode } from 'react';
import { injectStore } from './injectStore';
import { useStore } from './useStore';

export const GenerateStore = <T extends object>(newStore: T) => {
  const StoreContext = React.createContext<T>(newStore);

  const StoreProvider = ({ children }: { children: ReactNode }) => {
    const store = useLocalStore(() => newStore);

    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
  };

  return {
    inject: injectStore(StoreContext),
    useStore: () => useStore(StoreContext),
    Provider: StoreProvider
  };
};



