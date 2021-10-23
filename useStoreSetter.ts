import { IStore } from "@tigon/state-manager";

export default function useStoreValue<T>(store: IStore<T>) {
  return store()[1];
}