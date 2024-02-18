import React from "react";
import { Select, Space } from "antd";

const UiSelect = ({type, options, onSelectChange}) => {

  const handleChange = (value) => {
    onSelectChange(value)
  };

  const customOptions = options.map((option) => ({
    value: option,
    label: option,
  }));

  return (
    <Space wrap>
      <Select
        defaultValue={type}
        onChange={handleChange}
        options={customOptions.map(option => ({
          ...option,
          label: (
            <p><span>{`${type}`} </span>{`${option.label}`}</p>
          ),
        }))}
      />
    </Space>
  );
};

export default UiSelect;
