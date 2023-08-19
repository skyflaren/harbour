import React, { FC, useState } from "react";

interface DropdownMenuProps {
  title: string;
  options: string[];
  value: string;
  onSelect: (value: string) => void;
}

const DropdownMenu: FC<DropdownMenuProps> = ({
  options,
  title,
  value,
  onSelect,
}) => {
  return (
    <div className="dropdown">
      <div className="title">{title}</div>
      <select
        name="items"
        id="items"
        value={value}
        onChange={(e) => onSelect(e.target.value)}
      >
        {options.map((element) => (
          <option key={element} value={element}>
            {element}
          </option>
        ))}
      </select>
    </div>
  );
};
export default DropdownMenu;
