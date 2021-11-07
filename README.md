# tigon-react-hooks

## How to install

---

1. Install [Tigon State Manager](https://www.npmjs.com/package/@tigon/state-manager) 
    ```
    npm install @tigon/state-manager
    ```
2. Install [Tigon React Hooks](https://www.npmjs.com/package/@tigon/react-hooks)
    ```
    npm install @tigon/react-hooks
    ```

---
---

## How to use

---

### useStore

```tsx
import { Store } from "@tigon/state-manager";

const userNameStore = Store<string>("Mr. Developer");

...

import useStore from "@tigon/react-hooks/useStore";

const Component: FC = () => {
    const [userName, setUserName] = useStore(userNameStore);
    return (
        <input value={userName} onChange={(e) => setUserName(e.target.value)}/>
    )
}
```

---

### useStore with detector

```tsx
import { Store } from "@tigon/state-manager";

const userNameStore = Store<string>("Mr. Developer");

...

import useStore from "@tigon/react-hooks/useStore";

const Component: FC = () => {
    const [userName, setUserName] = useStore(userNameStore, (state) => [state]);
    return (
        <input value={userName} onChange={(e) => setUserName(e.target.value)}/>
    )
}
```

---

### useStore with detector and deps

```tsx
import { Store } from "@tigon/state-manager";

const userNamesStore = Store<string[]>(["Mr. Developer", "user", "other user"]);

...

import useStore from "@tigon/react-hooks/useStore";

const Component: FC<{idx: number}> = ({ idx }) => {
    const [userName, setUserName] = useStore(userNameStore, (state) => [state[idx]], [idx]);
    const onChange = (e) => setUserName((state) => {
        state[idx] = e.target.value;
        return state;
    });
    return (
        <input value={userName[idx]} onChange={onChange}/>
    )
}
```

---

### useStoreValue
 - `useStoreValue(store, detector?, deps?)` It can be use with detector and deps.
```tsx
import { Store } from "@tigon/state-manager";

const userNameStore = Store<string>("Mr. Developer");

...

import useStoreValue from "@tigon/react-hooks/useStoreValue";

const Component: FC = () => {
    const userName = useStoreValue(userNameStore);
    return (
        <h1>{userName}</h1>
    )
}
```

---

### useStoreSetter

```tsx
import { Store } from "@tigon/state-manager";

const userNameStore = Store<string>("Mr. Developer");

...

import useStoreSetter from "@tigon/react-hooks/useStoreSetter";

const Component: FC = () => {
    const setUserName = useStoreSetter(userNameStore);
    return (
        <button onClick={() => setUserName("Mr. Admin")}>
            Set developer as admin
        </button>
    )
}
```