import { useCallback, useMemo, useState } from 'react';

const useLoadingQueue = () => {
  const [loadingQueue, setLoadingQueue] = useState<string[]>([])

  const addToLoadingQueue = useCallback((id: string) => {
    setLoadingQueue((prevloadingQueue) => {
      if (!prevloadingQueue.includes(id)) {
        return [...prevloadingQueue, id];
      }
      return prevloadingQueue;
    });
  }, []);

  const removeFromLoadingQueue = useCallback((id: string) => {
    setLoadingQueue((prevloadingQueue) => {
      if (prevloadingQueue.includes(id)) {
        return prevloadingQueue.filter((item) => item !== id);
      }
      return prevloadingQueue;
    });
  }, []);

  const isLoading = useMemo(() => {
    return loadingQueue.length > 0;
  }, [loadingQueue]);

  return { addToLoadingQueue, removeFromLoadingQueue, isLoading }
}

export default useLoadingQueue;
