// this file is for the conversion of source into target based on the code snippets (provided by the mapping to codeconverter)

const csv = require("csv-parser");
const fs = require("fs");
const code_convert = require("./helperConvertor")
const source = require("../uploads/source1.json")

var data_csv = [];
var Enumeration = {};
var target = {};
var code = "";

function evaluator(mapping_path, source_path) {
  fs.createReadStream(mapping_path)
    .pipe(csv({}))
    .on("data", (data) => {
      data_csv.push(data);
    })
    .on("end", () => {
      const code1 = code_convert.code_generator(data_csv);
      code = code1;
      code1.forEach((line) => {
        eval(line);
      });
    });
}

exports.output = async (req, res) => {
  // const reader = new FileReader();
  // reader.addEventListener("load", ()=>{
  //   console.log(reader.result?.toString());
  // })
  console.log(req.body.source);
  var source_name = req.body.source.split("\\")[2];
  var mapping_name = req.body.mapping.split("\\")[2];

  var mapping_path = "./controllers/uploads/" + mapping_name;
  var source_path = source_name;
  evaluator(mapping_path);
  setTimeout(() => {
    var final_output = [target, code];
    console.log(final_output);
    res.json(final_output);
  }, 800);
};
