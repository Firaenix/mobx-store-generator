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

HydrateStore("UserStore", StoreImpl);

export const UserStore = GenerateStore(StoreImpl);
```

### 2. Use your store in a Functional Component using hooks

```typescript
```

### 3. Use your store in a Class Component using Injection

```typescript
```
