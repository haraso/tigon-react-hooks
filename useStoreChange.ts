import { useEffect } from "react";
import { IStore } from "@tigon/state-manager";
import useReRender from "./useReRender";

export default function useStoreChange(store: IStore<any>) {
  const { reRender, lastUpdate } = useReRender();
  useEffect(() => store.subscribe(() => reRender()), [reRender]);
  return lastUpdate;
}