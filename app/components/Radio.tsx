"use client";

import React from "react";
import styled from "styled-components";

const Radio = ({
  onchange,
  value,
}: {
  onchange: (data: string) => void;
  value: string;
}) => {
  return (
    <StyledWrapper>
      <div className="radio-input">
        <div className=" flex flex-row gap-2 items-center">
          <input
            id="veg"
            name="radio"
            type="radio"
            defaultChecked={value === "vegetarian"}
            className="input"
            value={"vegetarian"}
            onChange={(e) => onchange(e.target.value)}
          />
          <label htmlFor="veg" className="cursor-pointer">
            Vegetarian
          </label>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <input
            id="non-veg"
            name="radio"
            type="radio"
            className="input"
            defaultChecked={value === "non-vegetarian"}
            value={"non-vegetarian and vegetarian"}
            onChange={(e) => onchange(e.target.value)}
          />
          <label htmlFor="non-veg" className="cursor-pointer">
            Non - Vegetarian
          </label>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <input
            id="jain"
            name="radio"
            type="radio"
            className="input"
            value={"jain"}
            defaultChecked={value === "jain"}
            onChange={(e) => onchange(e.target.value)}
          />
          <label htmlFor="jain" className="cursor-pointer">
            Jain
          </label>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .input {
    -webkit-appearance: none;
    /* remove default */
    display: block;
    margin: 10px;
    width: 24px;
    height: 24px;
    border-radius: 12px;
    cursor: pointer;
    vertical-align: middle;
    box-shadow: hsla(0, 0%, 100%, 0.15) 0 1px 1px,
      inset hsla(0, 0%, 0%, 0.5) 0 0 0 1px;
    background-color: hsla(0, 0%, 0%, 0.2);
    background-image: -webkit-radial-gradient(
      hsla(200, 100%, 90%, 1) 0%,
      hsla(200, 100%, 70%, 1) 15%,
      hsla(200, 100%, 60%, 0.3) 28%,
      hsla(200, 100%, 30%, 0) 70%
    );
    background-repeat: no-repeat;
    -webkit-transition: background-position 0.15s cubic-bezier(0.8, 0, 1, 1),
      -webkit-transform 0.25s cubic-bezier(0.8, 0, 1, 1);
    outline: none;
  }

  .input:checked {
    -webkit-transition: background-position 0.2s 0.15s
        cubic-bezier(0, 0, 0.2, 1),
      -webkit-transform 0.25s cubic-bezier(0, 0, 0.2, 1);
  }

  .input:active {
    -webkit-transform: scale(1.5);
    -webkit-transition: -webkit-transform 0.1s cubic-bezier(0, 0, 0.2, 1);
  }

  /* The up/down direction logic */

  .input,
  .input:active {
    background-position: 0 24px;
  }

  .input:checked {
    background-position: 0 0;
  }

  .input:checked ~ .input,
  .input:checked ~ .input:active {
    background-position: 0 -24px;
  }
`;

export default Radio;
