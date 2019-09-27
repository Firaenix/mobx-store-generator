import React from "react";
export { persist } from "mobx-persist";
/**
 * Sets up the auto hydration of the store when the app starts.
 * In React Native, saves to AsyncStorage
 * @param storageType (In Browser, LocalStorage. React Native, AsyncStorage)
 */
export declare const HydrateStore: (storageType: any) => <T extends Object>(key: string, store: T, initialState?: any) => import("mobx-persist").IHydrateResult<T>;
/**
 *
 * @param newStore
 */
export declare const GenerateStore: <T extends object>(newStore: T) => {
    inject: <T extends T, S>(baseComponent: React.ComponentClass<T, S>) => any;
    useStore: () => T;
    Provider: ({ children }: {
        children: React.ReactNode;
    }) => JSX.Element;
    Consumer: React.ExoticComponent<React.ConsumerProps<T>>;
    Context: React.Context<T>;
};
