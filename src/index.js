import React from "react";
import PropTypes from "prop-types";

const CpfCnpj = (props) => {
  const TYPES = {
    CPF: "999.999.999-999",
    CNPJ: "99.999.999/9999-99",
  };
  const MAX_LENGTH = clear(TYPES.CNPJ).length;

  const { onChange, type } = props;

  let value = clear(props.value);

  if (value) {
    value = applyMask(value, TYPES[getMask(value)]);
  }

  function onLocalChange(ev) {
    let value = clear(ev.target.value);
    const mask = getMask(value);

    let nextLength = value.length;

    if (nextLength > MAX_LENGTH) return;

    value = applyMask(value, TYPES[mask]);

    ev.target.value = value;

    onChange(ev, mask);
  }

  function getMask(value) {
    return value.length > 11 ? "CNPJ" : "CPF";
  }

  function applyMask(value, mask) {
    let result = "";

    let inc = 0;
    Array.from(value).forEach((letter, index) => {
      if (!mask[index + inc].match(/[0-9]/)) {
        result += mask[index + inc];
        inc++;
      }
      result += letter;
    });
    return result;
  }

  function clear(value) {
    return value && value.replace(/[^0-9]/g, "");
  }

  return (
    <input {...props} type={type} value={value} onChange={onLocalChange} />
  );
};

CpfCnpj.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

CpfCnpj.defaultProps = {
  type: "tel",
  value: "",
  onChange: () => {},
};

export default CpfCnpj;
