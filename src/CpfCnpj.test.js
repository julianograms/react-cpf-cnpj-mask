import React from "react";
import { shallow } from "enzyme";
// import "isomorphic-fetch";

import Cep from "./Cep";

const map = (fn) => (mappable) => mappable.map(fn);

describe("Zipcode component", () => {
  describe("Reducer", () => {});

  it("Should apply mask to received unmasked value", () => {
    const wrapper = shallow(<Cep value="80010130" onChange={() => {}} />);
    expect(wrapper.get(0).props.value).toEqual("80010-130");
  });

  it("Should apply mask to received masked value", () => {
    const wrapper = shallow(<Cep value="80010-130" onChange={() => {}} />);
    expect(wrapper.get(0).props.value).toEqual("80010-130");
  });

  it("Should not accept invalid characters", () => {
    const TEXT_TO_WRITE = "a8- .00,*1-_0-1";
    const EXPECTED_VALUE = "80010-1";
    const VALUES_TO_BE_PRESSED = TEXT_TO_WRITE.split("");

    let componentOutputValue = "";

    const wrapper = shallow(
      <Cep
        value=""
        onChange={(value) => {
          componentOutputValue = value;
        }}
      />
    );

    const whithComponentOutput = (valueToBePressed) => {
      return `${componentOutputValue}${valueToBePressed}`;
    };

    const simulateWith = (component) => (valueToBePressed) => {
      component.simulate("change", {
        target: {
          name: "zipcode",
          value: whithComponentOutput(valueToBePressed),
        },
      });
    };

    const simulate = simulateWith(wrapper);

    const simulateAll = map(simulate);
    simulateAll(VALUES_TO_BE_PRESSED);

    expect(componentOutputValue).toEqual(EXPECTED_VALUE);
  });

  it("Should ensure max length", () => {
    const TEXT_TO_WRITE = "80010130120393";
    const EXPECTED_VALUE = "80010-130";
    const VALUES_TO_BE_PRESSED = TEXT_TO_WRITE.split("");

    let componentOutputValue = "";

    const wrapper = shallow(
      <Cep
        value=""
        onChange={(value) => {
          componentOutputValue = value;
        }}
      />
    );

    const whithComponentOutput = (valueToBePressed) => {
      return `${componentOutputValue}${valueToBePressed}`;
    };

    const simulateWith = (component) => (valueToBePressed) => {
      component.simulate("change", {
        target: {
          name: "zipcode",
          value: whithComponentOutput(valueToBePressed),
        },
      });
    };

    const simulateChangeEvent = simulateWith(wrapper);

    const simulateAllChangeEvents = map(simulateChangeEvent);
    simulateAllChangeEvents(VALUES_TO_BE_PRESSED);

    expect(componentOutputValue).toEqual(EXPECTED_VALUE);
  });
});
