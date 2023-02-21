import React from "react";
import { useState } from "react";
import axios from "axios";

var validited_source = false;
var validited_target = false;

const Donator = () => {
  const [inputs, setInputs] = useState({
    source: "",
    mapping: "",
  });
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/output", inputs).then(
        (response) => { //output as list
          document.querySelector("#target").innerText = JSON.stringify(response.data[0]); //target
          var code = response.data[1];
          document.querySelector("#map").innerText = code.toString(); //mapping
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  const isValidFileUploaded = (target) => {
    var validExtensions;
    if(target.name === "source"){
      validExtensions = "json" ;
    }else{
      validExtensions = "csv";
    }
    const fileExtension = target.files[0].type.split("/")[1];
    return validExtensions === fileExtension;
  };

  const fileChange = (e) => {
    // const file = e.target.files[0];
    // const reader = new FileReader();
    // reader.addEventListener("load",()=> {
    //   console.log(reader.result?.toString())
    // });
    // reader.readAsDataURL(file);
    if (e.target.files.length < 1) {
      return;
    }

    if (!isValidFileUploaded(e.target)) {
      if(e.target.name === "source"){
        validited_source = false;
      }else{
        validited_target = false;
      }
      alert("Invalid file format");
    } else {
      if(e.target.name === "source"){
        validited_source = true;
      }else{
        validited_target = true;
      }
      handleChange(e);
    }
  };
  const chechValidity = (e) => {
    e.preventDefault();
    if (validited_source === false || validited_target === false) {
      alert("Please Input corret file format");
    } else {
      handleSubmit(e);
    }
  };
  return (
    <div className="home">
      <div className="continer">
        <div className="about">
          <h2>
            FOLLOWING MODERN BANKING NEEDS, BANKING PAL is the best solution to get DATA. Get the
            BEST CODE to transform the DATA ACCORDING to your needs.
            <br />
            FOR THE DEVELOPERS BY THE DEVELOPERS.
          </h2>
          <div className="inputform">
            <form>
              <label>SOURCE FILE</label>
              <input required type="file" onChange={fileChange} name="source"></input>
              <label>MAPPING FILE</label>
              <input required type="file" onChange={fileChange} name="mapping"></input>
              <button onClick={chechValidity}>SUBMIT</button>
            </form>
          </div>
        </div>
        <div className="gallery">
          <h1>TARGET</h1>
          <div className="output" id="target">
            {/* <h1>output part</h1> */}
          </div>
          <h1>GENERATED CODE</h1>
          <div className="output" id="map">
            {/* <h1>output part</h1> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Donator;
