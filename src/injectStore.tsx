import React from "react";

export const injectStore = <K extends object>(MobxStore: React.Context<K>) =>
  function applyContext<T extends K, S>(WrappedClass: React.ComponentClass<T, S>) {
    return class extends React.Component<T, S> {
      public render() {
        return (
          <MobxStore.Consumer>
            {store => {
              if (!store) {
                // this is especially useful in TypeScript so you don't need to be checking for null all the time
                throw new Error('You have forgot to use StoreProvider, shame on you.');
              }

              return <WrappedClass {...{ ...store, ...this.props }} />;
            }}
          </MobxStore.Consumer>
        );
      }
    } as any;
  };
