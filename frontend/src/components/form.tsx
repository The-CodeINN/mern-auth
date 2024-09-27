/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Select,
  Checkbox,
  Textarea,
  FormErrorMessage,
} from '@chakra-ui/react';

interface BaseFieldProps {
  name: string;
  label: string;
  required?: boolean;
}

interface TextFieldProps extends BaseFieldProps {
  type: 'text' | 'email' | 'password';
  placeholder?: string;
}

interface SelectFieldProps extends BaseFieldProps {
  type: 'select';
  options: Array<{ value: string; label: string }>;
}

interface CheckboxFieldProps extends BaseFieldProps {
  type: 'checkbox';
}

interface TextareaFieldProps extends BaseFieldProps {
  type: 'textarea';
  placeholder?: string;
}

export type FieldProps =
  | TextFieldProps
  | SelectFieldProps
  | CheckboxFieldProps
  | TextareaFieldProps;

interface ReusableFormProps<T extends Record<string, any>> {
  fields: FieldProps[];
  onSubmit: (data: T) => void;
  submitButtonText: string;
  isLoading?: boolean;
  errors?: Record<string, string>;
}

function ReusableForm<T extends Record<string, any>>({
  fields,
  onSubmit,
  submitButtonText,
  isLoading,
  errors = {},
}: ReusableFormProps<T>) {
  const [formData, setFormData] = React.useState<Partial<T>>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as T);
  };

  const renderField = (field: FieldProps) => {
    const error = errors[field.name];

    switch (field.type) {
      case 'text':
      case 'email':
      case 'password':
        return (
          <Input
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            value={formData[field.name] || ''}
            onChange={handleChange}
            required={field.required}
            isInvalid={!!error}
          />
        );
      case 'select':
        return (
          <Select
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleChange}
            required={field.required}
            isInvalid={!!error}
          >
            {field.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        );
      case 'checkbox':
        return (
          <Checkbox
            name={field.name}
            isChecked={formData[field.name] || false}
            onChange={handleChange as any}
            isInvalid={!!error}
          >
            {field.label}
          </Checkbox>
        );
      case 'textarea':
        return (
          <Textarea
            name={field.name}
            placeholder={field.placeholder}
            value={formData[field.name] || ''}
            onChange={handleChange}
            required={field.required}
            isInvalid={!!error}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box as='form' onSubmit={handleSubmit}>
      <Stack spacing={4}>
        {fields.map((field) => (
          <FormControl
            key={field.name}
            id={field.name}
            isRequired={field.required}
            isInvalid={!!errors[field.name]}
          >
            {field.type !== 'checkbox' && <FormLabel>{field.label}</FormLabel>}
            {renderField(field)}
            <FormErrorMessage
              display={'flex'}
              justifyContent={'flex-start'}
              alignItems={'start'}
            >
              {errors[field.name]}
            </FormErrorMessage>
          </FormControl>
        ))}
        <Button
          type='submit'
          isLoading={isLoading}
          loadingText='Submitting'
          width='full'
        >
          {submitButtonText}
        </Button>
      </Stack>
    </Box>
  );
}

export default ReusableForm;
