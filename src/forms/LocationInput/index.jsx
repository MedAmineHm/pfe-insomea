import React from "react";
import { Select } from "@mantine/core";
import { Controller } from "react-hook-form";

const LocationInput = ({
  control,
  disabled = false,
  required = false,
  ...rest
}) => {
  const rules = required || disabled ? { required: "Required!" } : {};

  return (
    <Controller
      control={control}
      name="location"
      rules={rules}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => {
        return (
          <Select
            mt="md"
            size="sm"
            label="Location"
            placeholder="location"
            control={control}
            disabled={disabled}
            value={value ?? ""}
            error={error?.message}
            withAsterisk={required}
            ref={ref}
            onChange={onChange}
            data={["East US", "East US 2", "South Central US", "West US 2"]}
            {...rest}
          />
        );
      }}
    />
  );
};

export default LocationInput;
