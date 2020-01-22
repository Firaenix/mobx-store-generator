import { create } from "mobx-persist";
import { useObserver } from "mobx-react";
import React, { ReactNode } from "react";

export { persist } from "mobx-persist";

/**
 * Sets up the auto hydration of the store when the app starts.
 * In React Native, saves to AsyncStorage
 * @param storageType (In Browser, LocalStorage. React Native, AsyncStorage)
 */
export const HydrateStore = (storageType: any) =>
  create({
    storage: storageType,
    jsonify: true
  });

/**
 *
 * @param newStore
 */
export const GenerateStore = <T extends object>(newStore: T) => {
  console.debug("Generating Store for Object:", newStore);
  const StoreContext = React.createContext<T>(newStore);

  const StoreProvider = ({ children }: { children: ReactNode }) => {
    return (
      <StoreContext.Provider value={newStore}>{children}</StoreContext.Provider>
    );
  };

  return {
    inject: injectStore(StoreContext),
    useStore: useStore(StoreContext),
    Provider: StoreProvider,
    Consumer: StoreContext.Consumer,
    Context: StoreContext,
    /**
     * This should only be referenced from within another mobx store to allow cross store interactions
     */
    rawStore: newStore
  };
};

type GetProps<Comp> = Comp extends React.ComponentType<infer P> ? P : never;
type InjectedComponent<Props, C extends React.ComponentType<Props>, StoreProps> =  React.ComponentType<Pick<GetProps<C>, Exclude<keyof GetProps<C>, keyof StoreProps>>>;
        
const injectStore = <K extends object>(MobxStore: React.Context<K>) =>
  function inject<T extends Partial<K>>(
    baseComponent: React.ComponentType<Props>
  ) {
    const component = (ownProps: T) => {
      const store = React.useContext(MobxStore);

      if (store === {}) {
        console.error(
          new Error(
            "You may not have assigned value to your store properties in the constructor. Move your default value assignations to the constructor."
          )
        );
      }

      return useObserver(() =>
        React.createElement(baseComponent, { ...ownProps, ...store })
      );
    };

    component.displayName = baseComponent.name;
    return component as InjectedComponent<Props, typeof baseComponent, K>;
  };

const useStore = <K extends object>(MobxStore: React.Context<K>) => () => {
  const store = React.useContext(MobxStore);
  // const [store, setStore] = useState({ userHandle: 'heeee' });
  // const store = { userHandle: '' };

  if (!store) {
    // this is especially useful in TypeScript so you don't need to be checking for null all the time
    throw new Error("You have forgot to use StoreProvider, shame on you.");
  }

  return store;
};
