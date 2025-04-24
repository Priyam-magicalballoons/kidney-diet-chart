"use client";

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface InputProps {
  placeholder: string;
  value: string;
  onchange: (data: string) => void;
  type?: "number" | "text" | "password" | "email";
}

const Input = ({ onchange, placeholder, value, type = "text" }: InputProps) => {
  const [hasValue, setHasValue] = useState(false);

  useEffect(() => {
    setHasValue(!!value);
  }, [value]);

  return (
    <StyledWrapper>
      <div className={`input-container ${hasValue ? "has-value" : ""}`}>
        <input
          type={type}
          onChange={(e) => onchange(e.target.value)}
          id="input"
          value={value}
          required
        />
        <label htmlFor="input" className="label">{placeholder}</label>
        <div className="underline" />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .input-container {
    position: relative;
    margin: 15px auto;
    width: 80%;
  }

  .input-container input[type="text"],
  .input-container input[type="number"] {
    font-size: 15px;
    width: 100%;
    border: none;
    border-bottom: 2px solid #ccc;
    padding: 0px 0;
    background-color: transparent;
    outline: none;
  }

  .input-container .label {
    position: absolute;
    top: 0;
    left: 0;
    color: #808080;
    transition: all 0.3s ease;
    pointer-events: none;
  }

  .input-container input:focus ~ .label,
  .input-container.has-value .label {
    top: -15px;
    font-size: 12px;
    color: #707070;
  }

  .input-container .underline {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    width: 100%;
    background-color: #333;
    transform: scaleX(0);
    transition: all 0.5s ease;
  }

  .input-container input:focus ~ .underline,
  .input-container.has-value .underline {
    transform: scaleX(1);
  }
`;

export default Input;
