import React, { FC, useState } from 'react';

interface DropdownMenuProps {
  options: string[];
}

const DropdownMenu: FC<DropdownMenuProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <button onClick={toggleDropdown} className="dropdown-toggle">
        {props.options[0]}
      </button>
      {isOpen && (
        <ul className="dropdown-list">
          options.length()
          <li>options</li>
          <li>sdf</li>
          <li>sdf</li>
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;
