import React from "react";

export const useStore = <K extends object>(MobxStore: React.Context<K>) => {
    const store = React.useContext(MobxStore);
  
    if (!store) {
      // this is especially useful in TypeScript so you don't need to be checking for null all the time
      throw new Error('You have forgot to use StoreProvider, shame on you.');
    }
  
    return store;
  };