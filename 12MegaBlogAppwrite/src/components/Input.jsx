import React, { useId } from "react";

// here we use forwardRef hook and forwarded it to that main file where is use
// as a component to acces and set the value and state
const InPut = React.forwardRef(function Input(
  {
    label,
    type = "text",
    className = "",
    ...props // remaining all properties which send by sender
  },
  ref // this is the thing which provide us reference
) {
  const id = useId();
  return (
    <div className="w-full text-left">
      {label && (
        <label
          className="inline-block mb-1 pl-1 font-serif text-xl"
          htmlFor={props.id || id}
        >
          {label}
        </label>
      )}
      <input
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none
         focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        type={type}
        ref={ref}
        {...props}
        id={props.id || id}
      />
    </div>
  );
});

export default InPut;
