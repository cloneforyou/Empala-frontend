import React from 'react';


const PlusIcon = ({
                    height = '12px',
                    backgroundColor = '#b2d56b',
                    color = 'white',
                    lineWidth = `${parseFloat(height) - 5}px`,
                    lineHeight = '2px',
                    rotate = '', // '45deg'
                    cursor = '',

                  }) => (
  <div
    className="plus-button-component"
    style={{
      backgroundColor,
      width: height,
      height,
      transform: `rotate(${rotate})`,
      cursor,
    }}
  >
    <div
      className="plus-button-component__hor"
      style={{
        backgroundColor: color,
        width: lineWidth,
        height: lineHeight,
      }}
    />
    <div
      className="plus-button-component__ver"
      style={{
        backgroundColor: color,
        width: lineHeight,
        height: lineWidth,
      }}
    />
  </div>
);

export default PlusIcon;
