import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface SelectItem<T> {
  label: string;
  value: T;
  isInitial?: boolean;
}

interface SelectProps<T> {
  label: string;
  items: SelectItem<T>[];
  onValueChange: (value: T) => void;
}

export function Select<T extends string | number>({ label, items, onValueChange }: SelectProps<T>) {
  const initialItem = items.find((i) => i.isInitial) ?? items[0];
  const [selectedValue, setSelectedValue] = useState<T>(initialItem.value);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selectedValue}
          mode={'dropdown'}
          onValueChange={(value) => {
            setSelectedValue(value);
            onValueChange(value);
          }}
          style={styles.picker}>
          {items.map((item) => (
            <Picker.Item key={item.label} label={item.label} value={item.value} />
          ))}
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    marginBottom: 4,
    fontSize: 14,
    color: '#555',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    overflow: 'hidden',
  },
  picker: {
    height: 44,
  },
});
