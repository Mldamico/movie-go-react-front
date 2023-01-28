import React from "react";

export const Checkbox = (props) => {
  return (
    <div className="form-check">
      <input
        type="checkbox"
        id={props.name}
        className="form-check-input"
        value={props.value}
        name={props.name}
        onChange={props.onChange}
        checked={props.checked}
      />
    </div>
  );
};
