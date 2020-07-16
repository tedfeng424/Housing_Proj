import { Redirect } from "react-router-dom";
import Select from "react-dropdown-select";
import React from "react";
import Slider from "rc-slider";
import {
  options_transportation,
  options_time,
  options_number,
  options_lease,
  options_months,
  options_timecategories
} from "./options";
import "rc-tooltip/assets/bootstrap.css";
import "rc-slider/assets/index.css";
import ImageUploader from "react-images-upload";
import Map from "./Map";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
const styles = { display: "none" };

export default class Form1 extends React.Component {
  state = {
    bulk: {
      negotiable: "",
      utility: "",
      address: "",
      transportation: "",
      time: "",
      bus_cnt: "0",
      price_range: "",
      private: "",
      gender: "",
      living: "",
      pets: "",
      parking: "",
      furnished: "",
      latlng: {},
      master: "no",
      guest: "no",
      single: "no",
      double: "no",
      triple: "no",
      living_room: "no",
      den: "no",
      studio: "no",
      suite: "no",
      others_room: "no",
      all: "no",
      washer: "no",
      patio: "no",
      fridge: "no",
      microwave: "no",
      oven: "no",
      ac: "no",
      pool: "no",
      SPA: "no",
      gym: "no",
      elevator: "no",
      hardwood: "no",
      Nearby: "",
      roommmate: "",
      bedroom: "1B",
      bathroom: "1B",
      host_gender: "",
      move_time1: "Early",
      move_time2: "January",
      stay_period: "One Year Lease"
    },
    photos: [],
    hidden: false,
    redirect: false
  };

  LatLngHelper = () => {
    var code = geocodeByAddress(this.state.bulk.address);
    var location = code.then(results => getLatLng(results[0]));
    return location;
  };

  handleSubmit = event => {
    event.preventDefault();
    const formData = new FormData();
    this.LatLngHelper()
      .then(lL => {
        this.setState(({ bulk }) => ({
          bulk: {
            ...bulk,
            latlng: lL
          }
        }));
      })
      .then(() => {
        formData.append("json", JSON.stringify(this.state.bulk));
        for (let i = 0; i < this.state.photos.length; i++) {
          formData.append("photos", this.state.photos[i]);
        }
        console.log(this.state.photos);
      })
      .then(() =>
        fetch(this.props.location.endpoint, {
          mode: "cors",
          method: "POST",
          credentials: "include",
          body: formData
        }).then(() => this.setState({ redirect: true }))
      );
  };

  handleNext = () => {
    if (
      this.state.bulk.address &&
      this.state.bulk.transportation &&
      this.state.bulk.time &&
      this.state.bulk.price_range &&
      this.state.photos &&
      this.state.bulk.private &&
      this.state.bulk.gender &&
      this.state.bulk.living &&
      this.state.bulk.pets &&
      this.state.bulk.parking &&
      this.state.bulk.furnished
    ) {
      console.log(this.state.photos);
      this.setState({ hidden: true });
    } else {
      alert("Please fill out the required form!");
    }
  };

  handleBack = () => {
    this.setState({ hidden: false });
  };

  handleRange = props => {
    this.setState(({ bulk }) => ({
      bulk: {
        ...bulk,
        price_range: props
      }
    }));
  };

  handleUpload = (pictureFiles, url) => {
    this.setState(
      {
        photos: pictureFiles // this.state.photos.concat(pictureFiles[pictureFiles.length-1])
      },
      () => console.log(this.state.photos, url)
    );
  };

  handleMap = address => {
    this.setState(({ bulk }) => ({
      bulk: {
        ...bulk,
        address: address
      }
    }));
  };

  handleAll = event => {
    var val = event.target.value;
    if (val === "yes" || val === "no") {
      val = val === "yes" ? "no" : "yes";
    }
    this.setState(({ bulk }) => ({
      bulk: {
        ...bulk,
        all: val,
        washer: val,
        patio: val,
        fridge: val,
        microwave: val,
        oven: val,
        ac: val,
        pool: val,
        SPA: val,
        gym: val,
        elevator: val,
        hardwood: val
      }
    }));
  };

  handleDrop = (name, val) => {
    this.setState(
      ({ bulk }) => ({
        bulk: {
          ...bulk,
          [name]: val[0].name
        }
      }),
      () => {
        console.log(this.state.bulk);
      }
    );
  };

  handleChange = event => {
    const name = event.target.name;
    var val = event.target.value;
    if (
      [
        "master",
        "guest",
        "single",
        "double",
        "triple",
        "living_room",
        "den",
        "studio",
        "suite",
        "others_room",
        "all",
        "washer",
        "patio",
        "fridge",
        "microwave",
        "oven",
        "ac",
        "pool",
        "SPA",
        "gym",
        "elevator",
        "hardwood"
      ].includes(name) &&
      (val === "yes" || val === "no")
    ) {
      console.log(val);
      val = val === "yes" ? "no" : "yes";
    }
    this.setState(
      ({ bulk }) => ({
        bulk: {
          ...bulk,
          [name]: val
        }
      }),
      () => {
        console.log(this.state.bulk);
      }
    );
  };

  render() {
    if (this.state.redirect === true) {
      return (
        <Redirect
          to={{
            pathname: "/housing",
            update: true
          }}
        />
      );
    }

    return (
      <>
        <div
          style={{
            marginLeft: "180px",
            marginRight: "180px",
            "font-family": "Chilanka"
          }}
        >
          <h2>Create an account</h2>
          <form onSubmit={this.handleSubmit}>
            <ImageUploader
              style={this.state.hidden ? styles : null}
              type="file"
              name="photos"
              withIcon
              buttonText="Choose images"
              onChange={this.handleUpload}
              imgExtension={[".jpg", ".jpeg", ".png", ".gif"]}
              maxFileSize={5242880}
              withPreview
            />
            <ol style={this.state.hidden ? styles : null}>
              <li style={{ background: "#FAFAF4" }}>
                <div className="row form">
                  <div> My Location (Make sure it is searchable!): </div>
                  {/* TODO: Prop key for handleMap must begin with 'on' */}
                  <Map
                    name="address"
                    address={this.state.bulk.address || ""}
                    handleChange={this.handleMap}
                    handleSelect={this.handleMap}
                    required
                  />
                </div>
              </li>
              <li>
                <div className="row space-between form">
                  <div> Distance to school: </div>
                  <div>
                    {" "}
                    Type of Transportation
                    <Select
                      style={{
                        width: "135px",
                        "min-height": "13px",
                        height: "20px"
                      }}
                      options={options_transportation}
                      placeholder="selected ...."
                      labelField="name"
                      valueField={this.state.bulk.transportation || ""}
                      onChange={val => this.handleDrop("transportation", val)}
                      required
                    />
                  </div>
                  <div>
                    {" "}
                    # of Bus(if applicable)
                    <Select
                      style={{
                        width: "135px",
                        "min-height": "13px",
                        height: "20px"
                      }}
                      options={options_number}
                      placeholder="selected ...."
                      labelField="name"
                      valueField={this.state.bulk.bus_cnt || ""}
                      onChange={val => this.handleDrop("bus_cnt", val)}
                    />
                  </div>
                  <div>
                    {" "}
                    Time
                    <Select
                      style={{
                        width: "135px",
                        "min-height": "13px",
                        height: "20px"
                      }}
                      options={options_time}
                      placeholder="selected ...."
                      labelField="name"
                      valueField={this.state.bulk.time || ""}
                      onChange={val => this.handleDrop("time", val)}
                      required
                    />
                  </div>
                </div>
              </li>
              <li style={{ background: "#FAFAF4" }}>
                <div className="row">
                  <div>Room Type:</div>
                  <Select
                    style={{
                      width: "135px",
                      "min-height": "13px",
                      height: "13px",
                      marginLeft: "200px",
                      marginRight: "10px"
                    }}
                    options={options_number}
                    placeholder="selected ...."
                    labelField="name"
                    valueField={this.state.bulk.bedroom || ""}
                    onChange={val => this.handleDrop("bedroom", val)}
                    required
                  />
                  <span> Bedroom</span>
                  <Select
                    style={{
                      width: "135px",
                      "min-height": "13px",
                      height: "13px",
                      marginLeft: "10px",
                      marginRight: "10px"
                    }}
                    options={options_number}
                    placeholder="selected ...."
                    labelField="name"
                    valueField={this.state.bulk.bathroom || ""}
                    onChange={val => this.handleDrop("bathroom", val)}
                    required
                  />
                  <span> Bathroom</span>
                </div>
                <div className="row rt2">
                  <div>
                    <input
                      type="checkbox"
                      id="master"
                      name="master"
                      value={this.state.bulk.master}
                      checked={this.state.bulk.master === "yes"}
                      onChange={this.handleChange}
                    />
                    <label for="master"> Master </label>
                    <br />
                    <input
                      type="checkbox"
                      id="guest"
                      name="guest"
                      value={this.state.bulk.guest}
                      checked={this.state.bulk.guest === "yes"}
                      onChange={this.handleChange}
                    />
                    <label for="guest"> Guest </label>
                    <br />
                    <input
                      type="checkbox"
                      id="single"
                      name="single"
                      value={this.state.bulk.single}
                      checked={this.state.bulk.single === "yes"}
                      onChange={this.handleChange}
                    />
                    <label for="single"> Single</label>
                    <input
                      type="checkbox"
                      id="double"
                      name="double"
                      value={this.state.bulk.double}
                      checked={this.state.bulk.double === "yes"}
                      onChange={this.handleChange}
                    />
                    <label for="double"> Double </label>
                    <br />
                    <input
                      type="checkbox"
                      id="triple"
                      name="triple"
                      value={this.state.bulk.triple}
                      checked={this.state.bulk.triple === "yes"}
                      onChange={this.handleChange}
                    />
                    <label for="triple"> Triple </label>
                    <br />
                    <input
                      type="checkbox"
                      id="living_room"
                      name="living_room"
                      value={this.state.bulk.living_room}
                      checked={this.state.bulk.living_room === "yes"}
                      onChange={this.handleChange}
                    />
                    <label for="living_room"> Living Room</label>
                    <input
                      type="checkbox"
                      id="den"
                      name="den"
                      value={this.state.bulk.den}
                      checked={this.state.bulk.den === "yes"}
                      onChange={this.handleChange}
                    />
                    <label for="den"> Den</label>
                    <input
                      type="checkbox"
                      id="studio"
                      name="studio"
                      value={this.state.bulk.studio}
                      checked={this.state.bulk.studio === "yes"}
                      onChange={this.handleChange}
                    />
                    <label for="studio"> Studio</label>
                    <input
                      type="checkbox"
                      id="suite"
                      name="suite"
                      value={this.state.bulk.suite}
                      checked={this.state.bulk.suite === "yes"}
                      onChange={this.handleChange}
                    />
                    <label for="suite"> Suite</label>
                  </div>
                </div>
              </li>
              <li>
                Price Range(Drag the dot to set lower and upper bound):
                <div className="form">
                  <Range
                    min={0}
                    max={10000}
                    marks={{
                      1000: 1000,
                      2500: 2500,
                      5000: 5000,
                      7500: 7500,
                      10000: 10000
                    }}
                    onChange={this.handleRange}
                    tipFormatter={value => `${value}`}
                  />
                </div>
              </li>
              <li style={{ background: "#FAFAF4" }}>
                Price Negotiable?:
                <input
                  type="radio"
                  name="negotiable"
                  value="yes"
                  checked={this.state.bulk.negotiable === "yes"}
                  onChange={this.handleChange}
                  required
                />{" "}
                Yes
                <input
                  type="radio"
                  name="negotiable"
                  value="no"
                  checked={this.state.bulk.negotiable === "no"}
                  onChange={this.handleChange}
                />{" "}
                No
              </li>
              <li>
                Utilities included?:
                <input
                  type="radio"
                  name="utility"
                  value="yes"
                  checked={this.state.bulk.utility === "yes"}
                  onChange={this.handleChange}
                  required
                />{" "}
                Yes
                <input
                  type="radio"
                  name="utility"
                  value="no"
                  checked={this.state.bulk.utility === "no"}
                  onChange={this.handleChange}
                />{" "}
                No
              </li>
              <li style={{ background: "#FAFAF4" }}>
                Private Bathroom:
                <input
                  type="radio"
                  name="private"
                  value="yes"
                  checked={this.state.bulk.private === "yes"}
                  onChange={this.handleChange}
                  required
                />{" "}
                Yes
                <input
                  type="radio"
                  name="private"
                  value="no"
                  checked={this.state.bulk.private === "no"}
                  onChange={this.handleChange}
                />{" "}
                No
              </li>
              <li>
                Any preference on prospect tenants?
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={this.state.bulk.gender === "female"}
                  onChange={this.handleChange}
                  required
                />{" "}
                Female
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={this.state.bulk.gender === "male"}
                  onChange={this.handleChange}
                />{" "}
                Male
                <input
                  type="radio"
                  name="gender"
                  value="LGBTQ"
                  checked={this.state.bulk.gender === "LGBTQ"}
                  onChange={this.handleChange}
                />{" "}
                LGBTQ
                <input
                  type="radio"
                  name="gender"
                  value="Gender Inclusive"
                  checked={this.state.bulk.gender === "Gender Inclusive"}
                  onChange={this.handleChange}
                />{" "}
                Gender Inclusive
                <input
                  type="radio"
                  name="gender"
                  value="others"
                  checked={this.state.bulk.gender === "others"}
                  onChange={this.handleChange}
                />{" "}
                Others
              </li>
              <li style={{ background: "#FAFAF4" }}>
                Do you mind if other tenants are in the living room?
                <input
                  type="radio"
                  name="living"
                  value="yes"
                  checked={this.state.bulk.living === "yes"}
                  onChange={this.handleChange}
                  required
                />{" "}
                Yes
                <input
                  type="radio"
                  name="living"
                  value="no"
                  checked={this.state.bulk.living === "no"}
                  onChange={this.handleChange}
                />{" "}
                No
              </li>
              <li>
                Do you have pets?
                <input
                  type="radio"
                  name="pets"
                  value="yes"
                  checked={this.state.bulk.pets === "yes"}
                  onChange={this.handleChange}
                  required
                />{" "}
                Yes
                <input
                  type="radio"
                  name="pets"
                  value="no"
                  checked={this.state.bulk.pets === "no"}
                  onChange={this.handleChange}
                />{" "}
                No
              </li>
              <li style={{ background: "#FAFAF4" }}>
                Parking:
                <input
                  type="radio"
                  name="parking"
                  value="yes"
                  checked={this.state.bulk.parking === "yes"}
                  onChange={this.handleChange}
                  required
                />{" "}
                Yes
                <input
                  type="radio"
                  name="parking"
                  value="no"
                  checked={this.state.bulk.parking === "no"}
                  onChange={this.handleChange}
                />{" "}
                No
              </li>
              <li>
                Furnished:
                <input
                  type="radio"
                  name="furnished"
                  value="yes"
                  checked={this.state.bulk.furnished === "yes"}
                  onChange={this.handleChange}
                  required
                />{" "}
                Yes
                <input
                  type="radio"
                  name="furnished"
                  value="no"
                  checked={this.state.bulk.furnished === "no"}
                  onChange={this.handleChange}
                />{" "}
                No
              </li>
              <li style={{ background: "#FAFAF4" }}>
                Required Facilities:
                <input
                  type="checkbox"
                  id="all"
                  name="all"
                  value={this.state.bulk.all}
                  checked={this.state.bulk.all === "yes"}
                  onChange={this.handleAll}
                />
                <label for="all"> All</label>
                <input
                  type="checkbox"
                  id="washer"
                  name="washer"
                  value={this.state.bulk.washer}
                  checked={this.state.bulk.washer === "yes"}
                  onChange={this.handleChange}
                />
                <label for="washer"> Indoor Washer </label>
                <br />
                <input
                  type="checkbox"
                  id="patio"
                  name="patio"
                  value={this.state.bulk.patio}
                  checked={this.state.bulk.patio === "yes"}
                  onChange={this.handleChange}
                />
                <label for="patio"> Patio/Balcony </label>
                <br />
                <input
                  type="checkbox"
                  id="fridge"
                  name="fridge"
                  value={this.state.bulk.fridge}
                  checked={this.state.bulk.fridge === "yes"}
                  onChange={this.handleChange}
                />
                <label for="fridge"> Refrigerator</label>
                <input
                  type="checkbox"
                  id="microwave"
                  name="microwave"
                  value={this.state.bulk.microwave}
                  checked={this.state.bulk.microwave === "yes"}
                  onChange={this.handleChange}
                />
                <label for="microwave"> Microwave </label>
                <br />
                <input
                  type="checkbox"
                  id="oven"
                  name="oven"
                  value={this.state.bulk.oven}
                  checked={this.state.bulk.oven === "yes"}
                  onChange={this.handleChange}
                />
                <label for="oven"> Oven </label>
                <br />
                <input
                  type="checkbox"
                  id="ac"
                  name="ac"
                  value={this.state.bulk.ac}
                  checked={this.state.bulk.ac === "yes"}
                  onChange={this.handleChange}
                />
                <label for="ac"> AC </label>
                <input
                  type="checkbox"
                  id="pool"
                  name="pool"
                  value={this.state.bulk.pool}
                  checked={this.state.bulk.pool === "yes"}
                  onChange={this.handleChange}
                />
                <label for="pool"> Pool </label>
                <input
                  type="checkbox"
                  id="SPA"
                  name="SPA"
                  value={this.state.bulk.SPA}
                  checked={this.state.bulk.SPA === "yes"}
                  onChange={this.handleChange}
                />
                <label for="SPA"> SPA</label>
                <input
                  type="checkbox"
                  id="gym"
                  name="gym"
                  value={this.state.bulk.gym}
                  checked={this.state.bulk.gym === "yes"}
                  onChange={this.handleChange}
                />
                <label for="gym"> Gym</label>
                <input
                  type="checkbox"
                  id="elevator"
                  name="elevator"
                  value={this.state.bulk.elevator}
                  checked={this.state.bulk.elevator === "yes"}
                  onChange={this.handleChange}
                />
                <label for="elevator"> Elevator</label>
                <input
                  type="checkbox"
                  id="hardwood"
                  name="hardwood"
                  value={this.state.bulk.hardwood}
                  checked={this.state.bulk.hardwood === "yes"}
                  onChange={this.handleChange}
                />
                <label for="hardwood"> Hardwood floor</label>
              </li>
              <li>
                Nearby:{" "}
                <input
                  name="Nearby"
                  value={this.state.bulk.Nearby}
                  onChange={this.handleChange}
                />
              </li>
              <li style={{ background: "#FAFAF4" }}>
                Roommates/Suitmates:{" "}
                <input
                  name="roommate"
                  value={this.state.bulk.roommate}
                  onChange={this.handleChange}
                />
              </li>
              <button
                type="button"
                value="Submit"
                onClick={this.handleNext}
                style={{ border: "none" }}
              >
                {" "}
                <img src="./app/resources/next.svg" alt="next" />{" "}
              </button>
            </ol>
            <ol style={!this.state.hidden ? styles : null}>
              <li>
                About Your Gender
                <input
                  type="radio"
                  name="host_gender"
                  value="female"
                  checked={this.state.bulk.host_gender === "female"}
                  onChange={this.handleChange}
                  required
                />{" "}
                Female
                <input
                  type="radio"
                  name="host_gender"
                  value="male"
                  checked={this.state.bulk.host_gender === "male"}
                  onChange={this.handleChange}
                />{" "}
                Male
                <input
                  type="radio"
                  name="host_gender"
                  value="LGBTQ"
                  checked={this.state.bulk.host_gender === "LGBTQ"}
                  onChange={this.handleChange}
                />{" "}
                LGBTQ
                <input
                  type="radio"
                  name="host_gender"
                  value="other_gender"
                  checked={this.state.bulk.host_gender === "other_gender"}
                  onChange={this.handleChange}
                />{" "}
                Others
              </li>
              <li>
                <div className="row">
                  <div>Ideal Move in Time</div>
                  <Select
                    style={{
                      width: "135px",
                      "min-height": "13px",
                      height: "20px",
                      marginLeft: "10px",
                      marginRight: "10px"
                    }}
                    options={options_timecategories}
                    placeholder="selected ...."
                    labelField="name"
                    valueField={this.state.bulk.move_time1}
                    onChange={val => this.handleDrop("move_time1", val)}
                    required
                  />
                  <Select
                    style={{
                      width: "135px",
                      "min-height": "13px",
                      height: "20px"
                    }}
                    options={options_months}
                    placeholder="selected ...."
                    labelField="name"
                    valueField={this.state.bulk.move_time2}
                    onChange={val => this.handleDrop("move_time2", val)}
                    required
                  />
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Minimum Stay Period</div>
                  <Select
                    style={{
                      width: "135px",
                      "min-height": "13px",
                      height: "20px",
                      marginLeft: "10px",
                      marginRight: "10px"
                    }}
                    options={options_lease}
                    placeholder="selected ...."
                    labelField="name"
                    valueField={this.state.bulk.stay_period}
                    onChange={val => this.handleDrop("stay_period", val)}
                    required
                  />
                  <div>
                    Others/Notes:{" "}
                    <input
                      name="host_stay_period_notes"
                      value={this.state.bulk.host_stay_period_notes}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              </li>
            </ol>
            <button
              type="button"
              value="Submit"
              onClick={this.handleBack}
              style={!this.state.hidden ? styles : null}
            >
              {" "}
              Go Back{" "}
            </button>
            <input
              type="submit"
              name="submit"
              value="submit"
              style={!this.state.hidden ? styles : null}
            />
          </form>
        </div>
      </>
    );
  }
}
