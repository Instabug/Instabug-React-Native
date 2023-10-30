import React, { useState } from 'react';
import { RefreshControl } from 'react-native';

/**
 * A refresh control that simulates a refresh behavior for 1 second.
 */
const DelayedRefreshControl: React.FC = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    if (isRefreshing) {
      return;
    }

    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  return <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />;
};

export default DelayedRefreshControl;
