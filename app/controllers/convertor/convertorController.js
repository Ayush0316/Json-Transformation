// this file is for the conversion of source into target based on the code snippets (provided by the mapping to codeconverter)

const csv = require("csv-parser");
const {Readable} = require("stream");
const code_convert = require("./helperConvertor")

var source;

var data_csv = [];
var Enumeration = {};
var target = {};
var code = "";

function evaluator(file) {
  const stream = Readable.from(file.buffer);
  data_csv = [];
  stream.pipe(csv())
    .on("data",(data)=>{
      data_csv.push(data);
    })
    .on("end", ()=>{
      console.log(data_csv);
      const code1 = code_convert.code_generator(data_csv);
      code = code1;
      code1.forEach((line) => {
        eval(line);
      });
    });
}

exports.output = async (req, res) => {
  // data_csv = [];
  source = JSON.parse(req.files[0].buffer.toString());
  const file = req.files[1];
  evaluator(file);
  setTimeout(() => {
    var final_output = [target, code];
    // console.log(final_output);
    res.json(final_output);
  }, 800);
};
