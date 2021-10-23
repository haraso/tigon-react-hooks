import { IStore } from "@tigon/state-manager";
import useStoreChange from "./useStoreChange";

export default function useStore<T>(store: IStore<T>) {
  useStoreChange(store);
  return store();
}