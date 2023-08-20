import React, { FC, useState } from "react";

interface DropdownMenuProps {
  title?: string;
  name: string;
  options: string[];
  value: string;
  disabled?: boolean;
  onSelect: (value: string) => void;
}


const DropdownMenu: FC<DropdownMenuProps> = ({
  options,
  name,
  title,
  disabled,
  value,
  onSelect,
}) => {
  return (
    <div className="dropdown">
      <div className="title">{title}</div>
      <select
        name={name}
        id="items"
        value={value}
        onChange={(e) => onSelect(e.target.value)}
        disabled={disabled===true? true : false}
      >
        {options.map((element, idx) => (
          <option key={element} value={element}>
            {element}
          </option>
        ))}
      </select>
    </div>
  );
};
export default DropdownMenu;
