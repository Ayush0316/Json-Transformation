import React from "react";
import { useState } from "react";
import axios from "axios";
const FormData = require('form-data');

var validited_source = false;
var validited_target = false;

const Donator = () => {
  const [inputs, setInputs] = useState({
    source: "",
    mapping: "",
  });
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("source",inputs.source,inputs.source.name);
    formData.append("source",inputs.mapping,inputs.mapping.name);
    try {
      await axios.post("/output", formData,{
        headers: formData.getHeaders ? formData.getHeaders() : { 'Content-Type': 'multipart/form-data' }
      }).then(
        (response) => {
          let source;
          var Enumeration = {};
          let target = {};
          const file = inputs.source;
          const reader = new FileReader();
          reader.addEventListener("load",()=> {
            source = JSON.parse(new TextDecoder().decode(reader.result));
            let code = response.data;
            let html = "";
            code.forEach(line => {
              eval(line);
              html += line.toString() + "<br />"
            });

            document.querySelector("#target").innerText = JSON.stringify(target,undefined,2); //target
            document.querySelector("#map").innerHTML = html; //mapping
          });
          reader.readAsArrayBuffer(file);
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
            FOLLOWING MODERN DEVELOPERS NEEDS, BANKING PAL is the best solution to get your JSON TRANSFORMED. Get the
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
