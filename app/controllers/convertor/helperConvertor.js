const code_csv = [];

// This function take mapping file in json format as input and convert the json file line by line into code snippet.
exports.code_generator = ((data_csv) =>{
  data_csv.forEach((data) => {
    const target = data.Target;
    const data_source = data[" Source"];
    const Enumeration = data[" Enumeration"];
    handler(data_source, target, Enumeration);
  });
  return code_csv;
})

function dot_notation(text) {
  const refined_text = text.toString().replace(" ", "");
  if (refined_text.indexOf(".") == -1) {
    return refined_text;
  }
  const code = "source" + refined_text;
  return code.replace(" ", "");
}

function cct_notation(text) {
  const arr = text.split("+");
  const ans_arr = [];
  arr.forEach((element) => {
    ans_arr.push(dot_notation(element));
  });
  var ans = "";
  ans_arr.forEach((ans_ele) => {
    ans += ans_ele;
    ans += " + ";
  });
  const len = ans.length;
  ans = ans.substr(0, len - 2);
  return ans.replace(" ", ""); // i will change it to strip function.
}

function enum_notation_helper(text) {
  const dot_index = text.indexOf(".");
  const close_index = text.indexOf(")");
  var index = close_index - dot_index;
  let enum_text = text.substr(dot_index, index);
  enum_text = "Enumeration[source" + enum_text + "]";
  return enum_text;
}

function enum_notation(text) {
  const enum_index = text.indexOf("ENUM");
  const close_index = text.indexOf(")");

  const helper_text = text.substr(enum_index, close_index + 1);
  const enum_text = enum_notation_helper(helper_text);

  let ans = enum_text;
  const plus_index = text.indexOf("+");
  if (plus_index != -1) {
    const additional_text = text.substr(plus_index + 1);
    const temp = cct_notation(additional_text);
    ans += " + " + temp;
  }
  return ans;
}

function if_notation(text, target) {
  const I_index = text.indexOf("(");
  const end_index = text.indexOf(")");
  const if_cmd = text.substr(I_index + 1, end_index - I_index - 1);
  //then command
  const then_index = text.indexOf("[");
  const then_end = text.indexOf("]");
  const then_cmd = text.substr(then_index + 1, then_end - then_index - 1);
  //if cmd division
  const ifr_index = if_cmd.indexOf(".item");
  const ifr_cmd = if_cmd.substr(ifr_index + 1);
  const ifr_cmd1 = if_cmd.substr(0, ifr_index);

  // Generating fuction
  var ans = "";
  ans +=
    "source" +
    ifr_cmd1 +
    ".forEach((item) => { if (" +
    ifr_cmd +
    "){" +
    target +
    ".push(" +
    then_cmd +
    ")}})";
  return ans;
}

// This funciton call different funciton to convert specific parts of the text into code.
let handler = (source_value, target, Enumeration) => {
  const initial_text = "target." + target.replace(" ", "") + " = ";
  if (
    !source_value.includes("ENUM") &&
    !source_value.includes("+") &&
    !source_value.includes("IF")
  ) {
    var call_fun = dot_notation(source_value);
    call_fun = initial_text + call_fun;
    code_csv.push(call_fun);
  } else if (!source_value.includes("ENUM") && !source_value.includes("IF")) {
    var call_fun = cct_notation(source_value);
    call_fun = initial_text + call_fun;
    code_csv.push(call_fun);
  } else if (!source_value.includes("IF")) {
    var call_fun = enum_notation(source_value);
    call_fun = initial_text + call_fun;
    call_fun = "Enumeration = " + Enumeration + "; " + call_fun;
    call_fun = call_fun.replaceAll('","', '",').replaceAll("','", ",");
    code_csv.push(call_fun);
  } else {
    var call_fun = if_notation(source_value, target);
    call_fun = initial_text + call_fun;
    call_fun = "eval(target." + target.replace(" ", "") + " = [];); " + call_fun;
    code_csv.push(call_fun);
  }
};

