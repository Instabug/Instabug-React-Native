import React, { createContext, useContext, useState } from 'react';

// A single key/value pair
export type KeyValuePair = { key: string; value: string };

// An item that contains multiple key/value pairs
export type Item = {
  id: string;
  fields: KeyValuePair[]; // list of key/value pairs
};

// CallbackHandlersType = { [title: string]: Item[] }
export type CallbackHandlersType = Record<string, Item[]>;

type CallbackHandlersContextType = {
  callbackHandlers: CallbackHandlersType;
  clearList: (title: string) => void;
  addItem: (title: string, item: Item) => void;
};

const CallbackHandlersContext = createContext<CallbackHandlersContextType | undefined>(undefined);

export const CallbackHandlersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [callbackHandlers, setCallbackHandlers] = useState<CallbackHandlersType>({});

  // Clears all items under a specific title
  const clearList = (title: string) => {
    setCallbackHandlers((prev) => ({ ...prev, [title]: [] }));
  };

  // Adds an item (with multiple key/value pairs) to a specific title list
  const addItem = (title: string, item: Item) => {
    setCallbackHandlers((prev) => {
      const existingList = prev[title] || [];
      return {
        ...prev,
        [title]: [...existingList, item],
      };
    });
  };

  return (
    <CallbackHandlersContext.Provider value={{ callbackHandlers, clearList, addItem }}>
      {children}
    </CallbackHandlersContext.Provider>
  );
};

// Hook to use the context
export const useCallbackHandlers = () => {
  const ctx = useContext(CallbackHandlersContext);
  if (!ctx) {
    throw new Error('useCallbackHandlers must be used within CallbackHandlersProvider');
  }
  return ctx;
};
