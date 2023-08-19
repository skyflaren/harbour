import React, { useState } from 'react';

const Collapsible =()=> {
  const [open, setOpen] = useState(false);
  return(
    <div>
      <button>toggle</button>
      {open && <div>toggle me</div>}
    </div>
  );
};

export default Collapsible