import React, { useState } from 'react';

import { CheckIcon, Select as NativeBaseSelect } from 'native-base';

interface SelectItem<T> {
  label: string;
  value: T;
  isInitial?: boolean;
  testID?: string;
  accessibilityLabel?: string;
}

interface SelectProps<T> {
  label: string;
  items: SelectItem<T>[];
  onValueChange: (value: T) => void;
  testID?: string;
  accessibilityLabel?: string;
}

export function Select<T>({ label, items, onValueChange, testID, accessibilityLabel }: SelectProps<T>) {
  const initialItem = items.find((i) => i.isInitial) ?? items[0];
  const [selectedItem, setSelectedItem] = useState(initialItem);

  return (
    <NativeBaseSelect
      height="10"
      placeholder={label}
      accessibilityLabel={accessibilityLabel ?? testID}
      selectedValue={selectedItem.label}
      onValueChange={(value) => {
        const item = items.find((i) => i.label === value)!;
        setSelectedItem(item);
        onValueChange(item.value);
      }}
      _selectedItem={{
        bg: 'coolGray.200',
        rounded: '10',
        endIcon: <CheckIcon size="4" />,
      }}>
      {items.map((item) => (
        <NativeBaseSelect.Item
          key={item.label}
          label={item.label}
          value={item.label}
          testID={testID}
        />
      ))}
    </NativeBaseSelect>
  );
}
