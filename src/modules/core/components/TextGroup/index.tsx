"use client";

import type React from "react";
import { useState, useEffect, type FocusEventHandler } from "react";

type IProps = {
  value: Array<string>;
  name: string;
  onValueChange?: (name: string, value: Array<string>) => void;
  placeholder?: string;
  onBlur?: FocusEventHandler<HTMLInputElement>;
};

const TextGroup = ({
  name,
  value,
  placeholder = "Type something and press Tab",
  onValueChange,
  onBlur,
  ...rest
}: IProps) => {
  const [text, setText] = useState("");
  const [textArray, setTextArray] = useState(value);

  useEffect(() => {
    setTextArray(value);
  }, [value]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Tab") {
      event.preventDefault();

      if (text.trim()) {
        const newTextArray = [...textArray, text.trim()];
        setTextArray(newTextArray);
        setText("");

        if (onValueChange) {
          onValueChange(name, newTextArray);
        }
      }
    } else if (event.key === "Backspace" && text === "") {
      const newTextArray = textArray.slice(0, -1);
      setTextArray(newTextArray);

      if (onValueChange) {
        onValueChange(name, newTextArray);
      }
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const removeItem = (indexToRemove: number) => {
    const newTextArray = textArray.filter(
      (_, index) => index !== indexToRemove
    );
    setTextArray(newTextArray);

    if (onValueChange) {
      onValueChange(name, newTextArray);
    }
  };

  return (
    <div className="w-full">
      <div className="border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 p-2">
        <div className="flex flex-wrap min-h-20">
          {textArray.map((item, index) => (
            <div
              key={index}
              className="text-sm h-fit mb-2 w-fit p-2 m-1 border border-gray-200 rounded-md bg-gray-50 flex items-center gap-2"
            >
              <span>{item}</span>
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="text-red-500 hover:text-red-700 text-xs"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <input
          id={name}
          type="text"
          value={text}
          name={name}
          onChange={onInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          onBlur={onBlur}
          className="w-full p-2 border placeholder:text-sm border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
          {...rest}
        />
      </div>
    </div>
  );
};

export default TextGroup;
