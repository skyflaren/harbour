import React, { useState, FC } from "react";

interface CollapsibleProps {
  content: string;
}

const Collapsible: FC<CollapsibleProps> = ({ content }) => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div className="handleToggle">
      <button onClick={handleToggle}>toggle</button>
      {open && <p>{content}</p>}
    </div>
  );
};

export default Collapsible;
