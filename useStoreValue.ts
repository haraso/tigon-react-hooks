import { IStore } from "@tigon/state-manager";
import useStore from "./useStore";

export default function useStoreValue<T>(store: IStore<T>) {
  return useStore(store)[0];
}