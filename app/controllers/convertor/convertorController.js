// this file is for the conversion of source into target based on the code snippets (provided by the mapping to codeconverter)

const { rejects } = require("assert");
const csv = require("csv-parser");
const { resolve } = require("path");
const {Readable} = require("stream");
const code_convert = require("./helperConvertor")

function evaluator(file) {
  return new Promise((resolve,reject) => {
    let data_csv = [];
    const stream = Readable.from(file.buffer);
    stream.pipe(csv())
      .on("data",(data)=>{
        data_csv.push(data);
      })
      .on("end", ()=>{
        resolve(code_convert.code_generator(data_csv));
      });
  }
  )
}

exports.output = async (req, res) => {
  // source = JSON.parse(req.files[0].buffer.toString());
  const file = req.files[1];
  evaluator(file).then((code)=>res.json(code))
};
