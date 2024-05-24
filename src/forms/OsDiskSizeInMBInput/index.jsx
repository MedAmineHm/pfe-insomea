import React from "react";
import { Select } from "@mantine/core";
import { Controller } from "react-hook-form";

const OsDiskSizeInMBInput = ({
  control,
  disabled = false,
  required = false,
  ...rest
}) => {
  const rules = required || disabled ? { required: "Required!" } : {};

  return (
    <Controller
      control={control}
      name="osDiskSizeInMB"
      rules={rules}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => {
        return (
          <Select
            mt="md"
            size="sm"
            label="OS disk size in MB"
            placeholder="OS disk size in MB"
            control={control}
            disabled={disabled}
            value={value ?? ""}
            error={error?.message}
            withAsterisk={required}
            ref={ref}
            onChange={onChange}
            data={["1", "2", "3"]}
            {...rest}
          />
        );
      }}
    />
  );
};

export default OsDiskSizeInMBInput;
