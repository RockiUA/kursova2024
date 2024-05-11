import { FC, forwardRef, ReactNode } from 'react';
import { View } from 'react-native';
import { Control, Controller, FieldError, FieldErrorsImpl, FieldValues, Merge, RegisterOptions } from 'react-hook-form';
import { Text, TextInput, TextInputProps } from 'react-native-paper';
import { styles } from './styles';

interface InputProps extends TextInputProps {
  label: string;
  name: string;
  control: Control<FieldValues>;
  errors?: FieldError | Merge<FieldError, FieldErrorsImpl>;
  rules?: Omit<RegisterOptions, 'setValueAs' | 'disabled' | 'valueAsNumber' | 'valueAsDate'>;
  right?: ReactNode;
}

export const Input: FC<InputProps> = forwardRef(
  ({ label, name, control, errors, rules, style, placeholder, right, ...props }, ref) => {
    return (
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, ...fieldProps } }) => (
          <View style={style}>
            <Text variant="titleMedium">{label}</Text>

            <TextInput
              {...props}
              {...fieldProps}
              ref={ref}
              onChangeText={onChange}
              mode="outlined"
              style={styles.input}
              placeholder={placeholder}
              placeholderTextColor="#8F8FA3"
              outlineColor="transparent"
              outlineStyle={styles.inputOutline}
              activeOutlineColor="#096BDE"
              right={right}
            />

            {errors && (
              <Text variant="bodyMedium" style={styles.errorMessage}>
                {errors?.message as string}
              </Text>
            )}
          </View>
        )}
      />
    );
  },
);
