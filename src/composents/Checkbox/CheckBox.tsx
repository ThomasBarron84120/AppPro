import React, { useState } from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';

interface CheckBoxProps {
  label: string;
  onChange: (checked: boolean) => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({ label, onChange }) => {
  const [checked, setChecked] = useState(false);

  const handleToggle = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    onChange(newChecked);
  };

  return (
    <Pressable onPress={handleToggle} style={({ pressed }) => [styles.container, pressed && styles.containerPressed]}>
      <View style={[styles.checkBox, checked && styles.checkBoxChecked]}>
        {checked && <Text style={styles.checkMark}>✓</Text>}
      </View>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding:25,
  },
  containerPressed: {
    opacity: 0.6,
  },
  checkBox: {
    width: 20,
    height: 20,
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#8D9BB5',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkBoxChecked: {
    backgroundColor: '#8D9BB5',
  },
  checkMark: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  label: {
    fontSize: 16,
    color:'#4F63AC'
  },
});

export default CheckBox;
