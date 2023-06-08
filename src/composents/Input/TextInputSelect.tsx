import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { categories } from '../../data/categories';

type SelectProps = {
  title: string;
  selectedValue: number;
  onValueChange: (value: number) => void;
};

export default function Select(props: SelectProps) {
  const [selectedValue, setSelectedValue] = useState(props.selectedValue);

  const handleValueChange = (value: number) => {
    setSelectedValue(value);
    props.onValueChange(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.title}</Text>
      <View style={styles.optionsContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.option,
              category.id === selectedValue && styles.selectedOption,
            ]}
            onPress={() => handleValueChange(category.id)}
          >
            <Text style={styles.optionText}>{category.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  label: {
    marginLeft: 15,
    color: '#8D9BB5',
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 17,
  },
  optionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 12,
    borderWidth: 1,
    borderRadius: 14,
    borderColor: '#8D9BB5',
    backgroundColor: '#FFFFFF',
  },
  option: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#D3D8E2',
    borderRadius: 14,
  },
  optionText: {
    color: '#8D9BB5',
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 17,
  },
});
