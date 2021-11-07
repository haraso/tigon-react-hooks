import { IStore } from "@tigon/state-manager";
import useStore from "./useStore";

export default function useStoreValue<T>(store: IStore<T>, detector?: (store: T) => any[], deps?: any[]) {
  return useStore(store, detector, deps)[0];
}