import React, { useState } from "react";
import ReactDOM from "react-dom";
import CpfCnpj from "../src/CpfCnpj.js";
import "./styles.css";

const isEmpty = (value) => {
  return value === "";
};

const getDocumentTypeDescription = (cpfCnpj, isCpf) => {
  if (isEmpty(cpfCnpj)) {
    return "Empty";
  } else if (isCpf) {
    return "CPF";
  } else {
    return "CNPJ";
  }
};

const BasicCpfCnpj = () => {
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [mask, setMask] = useState("");

  return (
    <div style={{ marginBottom: "12px;" }}>
      <h2>Basic example</h2>
      <br />
      <CpfCnpj
        value={cpfCnpj}
        onChange={(ev, type) => {
          setCpfCnpj(ev.target.value);
          setMask(type === "CPF");
        }}
      />
      <br />
      <h4>Masked value: {cpfCnpj}</h4>
      <h4>Mask: {getDocumentTypeDescription(cpfCnpj, mask)}</h4>
    </div>
  );
};

const CustomizedCpfCnpj = () => {
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [mask, setMask] = useState("");
  return (
    <div style={{ marginBottom: "12px;" }}>
      <h2>Customized input</h2>
      <br />
      <CpfCnpj
        className="customizedInput"
        placeholder="Digite um CPF ou CNPJ"
        type="tel"
        value={cpfCnpj}
        onChange={(value, type) => {
          setCpfCnpj(value);
          setMask(type === "CPF");
        }}
      />
      <br />
      <h4>Masked value: {cpfCnpj}</h4>
      <h4>Mask: {getDocumentTypeDescription(cpfCnpj, mask)}</h4>
    </div>
  );
};

const App = () => {
  return (
    <>
      <BasicCpfCnpj />
      <CustomizedCpfCnpj />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
