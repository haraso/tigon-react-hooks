import { useCallback, useMemo, useState } from "react";

function createTimestamp() {
  return {
    timestamp: Date.now()
  }
}

export default function useReRender() {
  const [lastUpdate, setLastUpdate] = useState(createTimestamp());
  const reRender = useCallback(() => {
    setLastUpdate(createTimestamp())
  }, [setLastUpdate])
  return useMemo(() => ({ lastUpdate, reRender }), [lastUpdate, reRender]);
}
