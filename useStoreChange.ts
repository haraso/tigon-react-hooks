import { useMemo, useEffect } from "react";
import { IStore } from "@tigon/state-manager";
import useReRender from "./useReRender";

export default function useStoreChange(store: IStore<any>, detector?: (store: any) => any[], deps: any[] = []) {
  const { reRender, lastUpdate } = useReRender();
  const protectedDetector = useMemo(() => detector, deps);
  useEffect(() => {
    if (protectedDetector) return store.detect(protectedDetector).subscribe(reRender);
    return store.subscribe(reRender);
  }, [reRender, protectedDetector]);
  return lastUpdate;
}