import { IStore } from "@tigon/state-manager";
import useStoreChange from "./useStoreChange";

export default function useStore<T>(store: IStore<T>, detector?: (store: T) => any[], deps?: any[]) {
  useStoreChange(store, detector, deps);
  return store();
}