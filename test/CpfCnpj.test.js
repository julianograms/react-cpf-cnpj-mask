import React from "react";
import { shallow } from "enzyme";

import CpfCnpj from "../src";

const map = (fn) => (mappable) => mappable.map(fn);

const ShallowCpfCnpj = function (value) {
  this.output = value;
  this.onChange = (value) => {
    this.output = value.target.value;
  };

  const whithComponentOutput = (valueToBePressed) => {
    return `${this.output}${valueToBePressed}`;
  };

  const wrapper = shallow(
    <CpfCnpj value={this.output} onChange={this.onChange} />
  );

  const simulateWith = (component) => (valueToBePressed) => {
    component.simulate("change", {
      target: {
        name: "document",
        value: whithComponentOutput(valueToBePressed),
      },
    });
  };

  const simulate = simulateWith(wrapper);

  this.simulateTextInsertion = map(simulate);
};

describe("CpfCnpj component", () => {
  it("Should switch between masks as you type.", () => {
    const TEXT_TO_WRITE_1 = "82098902";
    const TEXT_TO_WRITE_2 = "000";
    const TEXT_TO_WRITE_3 = "1";
    const TEXT_TO_WRITE_4 = "77";

    const shallowCpfCnpj = new ShallowCpfCnpj("");

    shallowCpfCnpj.simulateTextInsertion(TEXT_TO_WRITE_1.split(""));
    expect(shallowCpfCnpj.output).toEqual("820.989.02");
    shallowCpfCnpj.simulateTextInsertion(TEXT_TO_WRITE_2.split(""));
    expect(shallowCpfCnpj.output).toEqual("820.989.020-00");
    shallowCpfCnpj.simulateTextInsertion(TEXT_TO_WRITE_3.split(""));
    expect(shallowCpfCnpj.output).toEqual("82.098.902/0001");
    shallowCpfCnpj.simulateTextInsertion(TEXT_TO_WRITE_4.split(""));
    expect(shallowCpfCnpj.output).toEqual("82.098.902/0001-77");
  });

  it("Should ensure max length", () => {
    const TEXT_TO_WRITE = "8209890200017787879";
    const EXPECTED_VALUE = "82.098.902/0001-77";
    const VALUES_TO_BE_PRESSED = TEXT_TO_WRITE.split("");

    const shallowCpfCnpj = new ShallowCpfCnpj("");
    shallowCpfCnpj.simulateTextInsertion(VALUES_TO_BE_PRESSED);

    expect(shallowCpfCnpj.output).toEqual(EXPECTED_VALUE);
  });

  describe("CPF", () => {
    it("Should apply mask to received unmasked value", () => {
      const wrapper = shallow(
        <CpfCnpj value="62262839042" onChange={() => {}} />
      );
      expect(wrapper.get(0).props.value).toEqual("622.628.390-42");
    });

    it("Should apply mask to received masked value", () => {
      const wrapper = shallow(
        <CpfCnpj value="295.393.430-89" onChange={() => {}} />
      );
      expect(wrapper.get(0).props.value).toEqual("295.393.430-89");
    });
  });

  describe("CNPJ", () => {
    it("Should apply mask to received unmasked value", () => {
      const wrapper = shallow(
        <CpfCnpj value="58204134000104" onChange={() => {}} />
      );
      expect(wrapper.get(0).props.value).toEqual("58.204.134/0001-04");
    });

    it("Should apply mask to received masked value", () => {
      const wrapper = shallow(
        <CpfCnpj value="58.204.134/0001-04" onChange={() => {}} />
      );
      expect(wrapper.get(0).props.value).toEqual("58.204.134/0001-04");
    });
  });

  it("Should not accept invalid characters", () => {
    const TEXT_TO_WRITE = "a8- .00,*1-_0-1";
    const EXPECTED_VALUE = "800.101";
    const VALUES_TO_BE_PRESSED = TEXT_TO_WRITE.split("");

    const shallowCpfCnpj = new ShallowCpfCnpj("");
    shallowCpfCnpj.simulateTextInsertion(VALUES_TO_BE_PRESSED);

    expect(shallowCpfCnpj.output).toEqual(EXPECTED_VALUE);
  });
});
