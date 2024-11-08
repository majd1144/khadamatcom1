
import React, { useState } from 'react';
import Slider from 'rc-slider';
const CustomSlider = () => {
    const [value, setValue] = useState(50);
  
    return (
      <div>
        <Slider
          min={0}
          max={100}
          value={value}
          onChange={(val) => setValue(val)}
        />
        <p>Value: {value}</p>
        <p>Value: {value}</p>
        <p>Value: {value}</p>
        <p>Value: {value}</p>
        <p>Value: {value}</p>''
      </div>
    );
  };
  
  export default CustomSlider;