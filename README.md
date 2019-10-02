# mobx-store-generator

Generates React Hooks and React Context for Mobx Stores.
Includes Store persistance out of the box thanks to `mobx-persist`.

## Usage

### 1. Create your store

```typescript
import { HydrateStore, persist, GenerateStore } from "mobx-store-generator";

export type UserStoreProps = typeof StoreImpl;

class Store {
  @persist
  @observable
  public username?: string;

  @persist("object")
  @observable
  public funObject?: { name: string; titles: Array<string> };

  constructor() {
    this.username = "hello world!";
    this.funObject = {
      name: "Firaenix",
      titles: ["Software Developer"]
    };
  }
}
const StoreImpl = new Store();

// React Native
HydrateStore(AsyncStorage)("UserStore", StoreImpl);

// Web
HydrateStore(localStorage)("UserStore", StoreImpl);

export const UserStore = GenerateStore(StoreImpl);
```

### 2. Use your store in a Functional Component using hooks

```typescript
import { observer } from 'mobx-react';
import { UserStore, UserStoreProps } from "./UserStore";

type HomePageProps = UserStoreProps;

export const HomePage = observer((props: HomePageProps) => {
  const userStore = UserStore.useStore();

  return <div>{userStore.username}</div>;
});
```

### 3. Use your store in a Class Component using Injection

```typescript
import { UserStore, UserStoreProps } from "./UserStore";

type HomePageProps = UserStoreProps;

@UserStore.inject
export class HomePage extends React.Component<HomePageProps> {
  public render() {
    return <div>{this.props.username}</div>;
  }
}
```

### 4. Add your Provider to the Root of your application
Note: You only need to do this for a single store, if you have multiple, you dont need to do it again.

```typescript
<UserStore.Provider>
  <App />
</UserStore.Provider>
```

## Thanks

- Mobx
- Mobx-React
- React
- https://github.com/pinqy520/mobx-persist
