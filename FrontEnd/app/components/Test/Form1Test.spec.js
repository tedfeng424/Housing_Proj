import React from "react";
import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Form1 from "../Form1";
import FormFacility from "../FormFacility";
/**
 * Test Cases for the component Form1.js
 * shallow is used for partial rendering so that Google API would not load
 */

configure({ adapter: new Adapter() });
describe("Check successful rendering", () => {
  test("Initial Rendering", () => {
    shallow(<Form1 />);
  });
});

describe("Check default of all", () => {
  test("Checking default of Required Facilities", () => {
    const wrapper = shallow(<Form1 />);
    var all_options = wrapper.find("#all").shallow();
    expect(all_options.props().value).toEqual("no");
    expect(all_options.props().checked).toEqual(false);
  });
});

describe("Check triggering all", () => {
  test("Checking selecting all facilities", () => {
    const wrapper = shallow(<Form1 />);
    var all_options = wrapper.find("#all").shallow();
    var event = { target: { value: all_options.props().value } };
    all_options.props().onChange(event);
    var all_options_new = wrapper.find("#all").shallow();
    expect(all_options_new.props().value).toEqual("yes");
    expect(all_options_new.props().checked).toEqual(true);
  });
});

describe("Check all select all other options as well", () => {
  test("Checking selecting all facilities", () => {
    const mockForm = shallow(<Form1 />);
    const facility = mount(
      <FormFacility
        bulk={mockForm.state("bulk")}
        handleChange={mockForm.instance().handleChange}
        handleAll={mockForm.instance().handleAll}
      />
    );
    var all_options = facility.find("#all");
    all_options.invoke("onChange")({
      target: { name: "all", value: mockForm.state("bulk")["all"] }
    });
    expect(mockForm.state("bulk")["all"]).toEqual("yes");
    expect(mockForm.state("bulk")["washer"]).toEqual("yes");
    expect(mockForm.state("bulk")["patio"]).toEqual("yes");
    expect(mockForm.state("bulk")["fridge"]).toEqual("yes");
    expect(mockForm.state("bulk")["oven"]).toEqual("yes");
    expect(mockForm.state("bulk")["ac"]).toEqual("yes");
    expect(mockForm.state("bulk")["pool"]).toEqual("yes");
    expect(mockForm.state("bulk")["SPA"]).toEqual("yes");
    expect(mockForm.state("bulk")["gym"]).toEqual("yes");
    expect(mockForm.state("bulk")["elevator"]).toEqual("yes");
    expect(mockForm.state("bulk")["hardwood"]).toEqual("yes");
    expect(mockForm.state("bulk")["microwave"]).toEqual("yes");
  });
});

describe("Check deselect all case", () => {
  test("Checking deselecting all facilities", () => {
    const mockForm = shallow(<Form1 />);
    const facility = mount(
      <FormFacility
        bulk={mockForm.state("bulk")}
        handleChange={mockForm.instance().handleChange}
        handleAll={mockForm.instance().handleAll}
      />
    );
    var all_options = facility.find("#all");
    all_options.invoke("onChange")({
      target: { name: "all", value: mockForm.state("bulk")["all"] }
    });
    all_options.invoke("onChange")({
      target: { name: "all", value: mockForm.state("bulk")["all"] }
    });
    expect(mockForm.state("bulk")["all"]).toEqual("no");
    expect(mockForm.state("bulk")["washer"]).toEqual("no");
    expect(mockForm.state("bulk")["patio"]).toEqual("no");
    expect(mockForm.state("bulk")["fridge"]).toEqual("no");
    expect(mockForm.state("bulk")["oven"]).toEqual("no");
    expect(mockForm.state("bulk")["ac"]).toEqual("no");
    expect(mockForm.state("bulk")["pool"]).toEqual("no");
    expect(mockForm.state("bulk")["SPA"]).toEqual("no");
    expect(mockForm.state("bulk")["gym"]).toEqual("no");
    expect(mockForm.state("bulk")["elevator"]).toEqual("no");
    expect(mockForm.state("bulk")["hardwood"]).toEqual("no");
    expect(mockForm.state("bulk")["microwave"]).toEqual("no");
  });
});

describe("Check select one case", () => {
  test("Checking select one facility", () => {
    const mockForm = shallow(<Form1 />);
    const facility = mount(
      <FormFacility
        bulk={mockForm.state("bulk")}
        handleChange={mockForm.instance().handleChange}
        handleAll={mockForm.instance().handleAll}
      />
    );
    var washer_options = facility.find("#washer");
    washer_options.invoke("onChange")({
      target: { name: "washer", value: mockForm.state("bulk")["washer"] }
    });
    expect(mockForm.state("bulk")["all"]).toEqual("no");
    expect(mockForm.state("bulk")["washer"]).toEqual("yes");
    expect(mockForm.state("bulk")["patio"]).toEqual("no");
    expect(mockForm.state("bulk")["fridge"]).toEqual("no");
    expect(mockForm.state("bulk")["oven"]).toEqual("no");
    expect(mockForm.state("bulk")["ac"]).toEqual("no");
    expect(mockForm.state("bulk")["pool"]).toEqual("no");
    expect(mockForm.state("bulk")["SPA"]).toEqual("no");
    expect(mockForm.state("bulk")["gym"]).toEqual("no");
    expect(mockForm.state("bulk")["elevator"]).toEqual("no");
    expect(mockForm.state("bulk")["hardwood"]).toEqual("no");
    expect(mockForm.state("bulk")["microwave"]).toEqual("no");
  });
});

describe("Check deselect one case", () => {
  test("Checking deselect one facility", () => {
    const mockForm = shallow(<Form1 />);
    const facility = mount(
      <FormFacility
        bulk={mockForm.state("bulk")}
        handleChange={mockForm.instance().handleChange}
        handleAll={mockForm.instance().handleAll}
      />
    );
    var washer_options = facility.find("#washer");
    washer_options.invoke("onChange")({
      target: { name: "washer", value: mockForm.state("bulk")["washer"] }
    });
    washer_options.invoke("onChange")({
      target: { name: "washer", value: mockForm.state("bulk")["washer"] }
    });
    expect(mockForm.state("bulk")["all"]).toEqual("no");
    expect(mockForm.state("bulk")["washer"]).toEqual("no");
    expect(mockForm.state("bulk")["patio"]).toEqual("no");
    expect(mockForm.state("bulk")["fridge"]).toEqual("no");
    expect(mockForm.state("bulk")["oven"]).toEqual("no");
    expect(mockForm.state("bulk")["ac"]).toEqual("no");
    expect(mockForm.state("bulk")["pool"]).toEqual("no");
    expect(mockForm.state("bulk")["SPA"]).toEqual("no");
    expect(mockForm.state("bulk")["gym"]).toEqual("no");
    expect(mockForm.state("bulk")["elevator"]).toEqual("no");
    expect(mockForm.state("bulk")["hardwood"]).toEqual("no");
    expect(mockForm.state("bulk")["microwave"]).toEqual("no");
  });
});

describe("Check select multiple cases", () => {
  test("Checking select multiple facilities", () => {
    const mockForm = shallow(<Form1 />);
    const facility = mount(
      <FormFacility
        bulk={mockForm.state("bulk")}
        handleChange={mockForm.instance().handleChange}
        handleAll={mockForm.instance().handleAll}
      />
    );
    var washer_options = facility.find("#washer");
    washer_options.invoke("onChange")({
      target: { name: "washer", value: mockForm.state("bulk")["washer"] }
    });
    var SPA_options = facility.find("#SPA");
    SPA_options.invoke("onChange")({
      target: { name: "SPA", value: mockForm.state("bulk")["SPA"] }
    });
    expect(mockForm.state("bulk")["all"]).toEqual("no");
    expect(mockForm.state("bulk")["washer"]).toEqual("yes");
    expect(mockForm.state("bulk")["patio"]).toEqual("no");
    expect(mockForm.state("bulk")["fridge"]).toEqual("no");
    expect(mockForm.state("bulk")["oven"]).toEqual("no");
    expect(mockForm.state("bulk")["ac"]).toEqual("no");
    expect(mockForm.state("bulk")["pool"]).toEqual("no");
    expect(mockForm.state("bulk")["SPA"]).toEqual("yes");
    expect(mockForm.state("bulk")["gym"]).toEqual("no");
    expect(mockForm.state("bulk")["elevator"]).toEqual("no");
    expect(mockForm.state("bulk")["hardwood"]).toEqual("no");
    expect(mockForm.state("bulk")["microwave"]).toEqual("no");
  });
});

describe("Check deselect multiple cases", () => {
  test("Checking deselect multiple facilities", () => {
    const mockForm = shallow(<Form1 />);
    const facility = mount(
      <FormFacility
        bulk={mockForm.state("bulk")}
        handleChange={mockForm.instance().handleChange}
        handleAll={mockForm.instance().handleAll}
      />
    );
    var washer_options = facility.find("#washer");
    washer_options.invoke("onChange")({
      target: { name: "washer", value: mockForm.state("bulk")["washer"] }
    });
    var SPA_options = facility.find("#SPA");
    SPA_options.invoke("onChange")({
      target: { name: "SPA", value: mockForm.state("bulk")["SPA"] }
    });
    var elevator_options = facility.find("#elevator");
    elevator_options.invoke("onChange")({
      target: { name: "elevator", value: mockForm.state("bulk")["elevator"] }
    });
    washer_options.invoke("onChange")({
      target: { name: "washer", value: mockForm.state("bulk")["washer"] }
    });
    SPA_options.invoke("onChange")({
      target: { name: "SPA", value: mockForm.state("bulk")["SPA"] }
    });
    expect(mockForm.state("bulk")["all"]).toEqual("no");
    expect(mockForm.state("bulk")["washer"]).toEqual("no");
    expect(mockForm.state("bulk")["patio"]).toEqual("no");
    expect(mockForm.state("bulk")["fridge"]).toEqual("no");
    expect(mockForm.state("bulk")["oven"]).toEqual("no");
    expect(mockForm.state("bulk")["ac"]).toEqual("no");
    expect(mockForm.state("bulk")["pool"]).toEqual("no");
    expect(mockForm.state("bulk")["SPA"]).toEqual("no");
    expect(mockForm.state("bulk")["gym"]).toEqual("no");
    expect(mockForm.state("bulk")["elevator"]).toEqual("yes");
    expect(mockForm.state("bulk")["hardwood"]).toEqual("no");
    expect(mockForm.state("bulk")["microwave"]).toEqual("no");
  });
});

describe("Check select all cases then deselect and select", () => {
  test("Checking select all then deselect and select multiple facilities", () => {
    const mockForm = shallow(<Form1 />);
    const facility = mount(
      <FormFacility
        bulk={mockForm.state("bulk")}
        handleChange={mockForm.instance().handleChange}
        handleAll={mockForm.instance().handleAll}
      />
    );
    var all_options = facility.find("#all");
    all_options.invoke("onChange")({
      target: { name: "all", value: mockForm.state("bulk")["all"] }
    });
    var washer_options = facility.find("#washer");
    washer_options.invoke("onChange")({
      target: { name: "washer", value: mockForm.state("bulk")["washer"] }
    });
    var SPA_options = facility.find("#SPA");
    SPA_options.invoke("onChange")({
      target: { name: "SPA", value: mockForm.state("bulk")["SPA"] }
    });
    var elevator_options = facility.find("#elevator");
    elevator_options.invoke("onChange")({
      target: { name: "elevator", value: mockForm.state("bulk")["elevator"] }
    });
    washer_options.invoke("onChange")({
      target: { name: "washer", value: mockForm.state("bulk")["washer"] }
    });
    SPA_options.invoke("onChange")({
      target: { name: "SPA", value: mockForm.state("bulk")["SPA"] }
    });
    expect(mockForm.state("bulk")["all"]).toEqual("no");
    expect(mockForm.state("bulk")["washer"]).toEqual("yes");
    expect(mockForm.state("bulk")["patio"]).toEqual("yes");
    expect(mockForm.state("bulk")["fridge"]).toEqual("yes");
    expect(mockForm.state("bulk")["oven"]).toEqual("yes");
    expect(mockForm.state("bulk")["ac"]).toEqual("yes");
    expect(mockForm.state("bulk")["pool"]).toEqual("yes");
    expect(mockForm.state("bulk")["SPA"]).toEqual("yes");
    expect(mockForm.state("bulk")["gym"]).toEqual("yes");
    expect(mockForm.state("bulk")["elevator"]).toEqual("no");
    expect(mockForm.state("bulk")["hardwood"]).toEqual("yes");
    expect(mockForm.state("bulk")["microwave"]).toEqual("yes");
  });
});

describe("Check autoselect all option", () => {
  test("Checking autoselect all when selecting all facilities", () => {
    const mockForm = shallow(<Form1 />);
    const facility = mount(
      <FormFacility
        bulk={mockForm.state("bulk")}
        handleChange={mockForm.instance().handleChange}
        handleAll={mockForm.instance().handleAll}
      />
    );
    var all_options = facility.find("#all");
    all_options.invoke("onChange")({
      target: { name: "all", value: mockForm.state("bulk")["all"] }
    });
    var washer_options = facility.find("#washer");
    washer_options.invoke("onChange")({
      target: { name: "washer", value: mockForm.state("bulk")["washer"] }
    });
    var SPA_options = facility.find("#SPA");
    SPA_options.invoke("onChange")({
      target: { name: "SPA", value: mockForm.state("bulk")["SPA"] }
    });
    var elevator_options = facility.find("#elevator");
    elevator_options.invoke("onChange")({
      target: { name: "elevator", value: mockForm.state("bulk")["elevator"] }
    });
    washer_options.invoke("onChange")({
      target: { name: "washer", value: mockForm.state("bulk")["washer"] }
    });
    SPA_options.invoke("onChange")({
      target: { name: "SPA", value: mockForm.state("bulk")["SPA"] }
    });
    elevator_options.invoke("onChange")({
      target: { name: "elevator", value: mockForm.state("bulk")["elevator"] }
    });
    expect(mockForm.state("bulk")["all"]).toEqual("yes");
    expect(mockForm.state("bulk")["washer"]).toEqual("yes");
    expect(mockForm.state("bulk")["patio"]).toEqual("yes");
    expect(mockForm.state("bulk")["fridge"]).toEqual("yes");
    expect(mockForm.state("bulk")["oven"]).toEqual("yes");
    expect(mockForm.state("bulk")["ac"]).toEqual("yes");
    expect(mockForm.state("bulk")["pool"]).toEqual("yes");
    expect(mockForm.state("bulk")["SPA"]).toEqual("yes");
    expect(mockForm.state("bulk")["gym"]).toEqual("yes");
    expect(mockForm.state("bulk")["elevator"]).toEqual("yes");
    expect(mockForm.state("bulk")["hardwood"]).toEqual("yes");
    expect(mockForm.state("bulk")["microwave"]).toEqual("yes");
  });
});
