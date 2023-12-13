import { useState } from 'react';

export function useDelayedRefresh() {
  const [refreshing, setIsRefreshing] = useState(false);

  const onRefresh = () => {
    if (refreshing) {
      return;
    }

    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  return { refreshing, onRefresh };
}
