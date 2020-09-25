import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'

const FlexButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...buttonProps }) => (
  <div className='d-flex'>
    <Button style={{ flex: '100%' }} {...buttonProps}>
      {children}
    </Button>
  </div>
);

export default FlexButton;