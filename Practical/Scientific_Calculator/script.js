let isCalculated = false;
let isDecimalLegal = true;
let operator = true;
const result = document.getElementById("result");
let memory = [];
if (memory.length == 0) {
  document.getElementById("mr").disabled = true;
  document.getElementById("mc").disabled = true;
}

function onlyNumberKey(evt) {
  // Only ASCII character in that range allowed
  var ASCIICode = evt.which ? evt.which : evt.keyCode;
  if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) return false;
  return true;
}

function display(val) {
  console.log(val, "first isCalculated" + isCalculated);

  if (val === ")" && !result.value.toString().includes("(")) {
    return;
  }

  if (
    (val === "+" ||
      val === "-" ||
      val === "*" ||
      val === "/" ||
      val === "**") &&
    operator === false
  ) {
    return;
  }
  // check first value is oprator
  if (
    (val === "+" ||
      val === "-" ||
      val === "*" ||
      val === "/" ||
      val === "**") &&
    operator === true
  ) {
    operator = false;
    isDecimalLegal = true;
  } else {
    operator = true;
  }
  if (val === ".") {
    if (isDecimalLegal === false) {
      return;
    } else {
      isDecimalLegal = false;
    }
  }

  if (isCalculated === false) {
    console.log(val, "Second isCalculated" + isCalculated);
    result.value += val;
  } else if (
    (val === "+" ||
      val === "-" ||
      val === "*" ||
      val === "/" ||
      val === "**") &&
    isCalculated === true
  ) {
    result.value += val;
    isCalculated = false;
  } else {
    result.value = val;
    isCalculated = false;
  }

  if (document.getElementById("result").value != "") {
    document.getElementById("c").style.display = "none";
    document.getElementById("ce").style.display = "block";
  } else {
    document.getElementById("ce").style.display = "none";
    document.getElementById("c").style.display = "block";
  }
}

function fe_btn() {
  result.value = Number(result.value).toExponential();
}
function Memory(opration) {
  document.getElementById("mr").disabled = false;
  document.getElementById("mc").disabled = false;

  let num = result.value;
  let ans1 = 0;
  switch (opration) {
    case "ms":
      memory.push(num);
      console.log(memory);
      localStorage.setItem("memory", num);
      break;
    case "mc":
      memory = [];
      console.log(memory);
      break;

    case "mr":
      ans1 = localStorage.getItem("memory");
      console.log(memory);
      break;

    case "m_plus":
      memory.push(num);
      clearScreen();

      let final_answer1;
      ans1 = localStorage.getItem("memory");
      final_answer1 = Number(ans1) + Number(num);
      localStorage.setItem("memory", final_answer1);
      console.log(final_answer1);
      console.log(memory);

      break;

    case "m_minus":
      memory.push(num);
      clearScreen();

      let final_answer2;
      ans1 = localStorage.getItem("memory");
      final_answer2 = Number(ans1) - Number(num);
      localStorage.setItem("memory", final_answer2);
      console.log(final_answer2);
      console.log(memory);

      break;

    default:
      return 0;
  }
  document.getElementById("result").value = ans1;
  return ans1;
}

let on = 1;
function showrows() {
  on++;
  if (on % 2 == 0) {
    document.getElementById("x_square").style.display = "none";
    document.getElementById("sqrt").style.display = "none";
    // document.getElementById("**").style.display = "none";
    document.getElementById("10px").style.display = "none";
    // document.getElementById("log").style.display = "none";
    document.getElementById("ln").style.display = "none";

    document.getElementById("x_cube").style.display = "block";
    document.getElementById("cqrt").style.display = "block";
    // document.getElementById("yuqrtx").style.display = "block";
    document.getElementById("2px").style.display = "block";
    // document.getElementById("logxby").style.display = "block";
    document.getElementById("epx").style.display = "block";

    document.getElementById("sin").style.display = "none";
    document.getElementById("cos").style.display = "none";
    document.getElementById("tan").style.display = "none";
    document.getElementById("sec").style.display = "none";
    document.getElementById("csc").style.display = "none";
    document.getElementById("cot").style.display = "none";

    document.getElementById("sin1").style.display = "block";
    document.getElementById("cos1").style.display = "block";
    document.getElementById("tan1").style.display = "block";
    document.getElementById("sec1").style.display = "block";
    document.getElementById("csc1").style.display = "block";
    document.getElementById("cot1").style.display = "block";
  } else {
    document.getElementById("x_square").style.display = "block";
    document.getElementById("sqrt").style.display = "block";
    // document.getElementById("**").style.display = "block";
    document.getElementById("10px").style.display = "block";
    // document.getElementById("log").style.display = "block";
    document.getElementById("ln").style.display = "block";

    document.getElementById("x_cube").style.display = "none";
    document.getElementById("cqrt").style.display = "none";
    // document.getElementById("yuqrtx").style.display = "none";
    document.getElementById("2px").style.display = "none";
    // document.getElementById("logxby").style.display = "none";
    document.getElementById("epx").style.display = "none";

    document.getElementById("sin").style.display = "block";
    document.getElementById("cos").style.display = "block";
    document.getElementById("tan").style.display = "block";
    document.getElementById("sec").style.display = "block";
    document.getElementById("csc").style.display = "block";
    document.getElementById("cot").style.display = "block";

    document.getElementById("sin1").style.display = "none";
    document.getElementById("cos1").style.display = "none";
    document.getElementById("tan1").style.display = "none";
    document.getElementById("sec1").style.display = "none";
    document.getElementById("csc1").style.display = "none";
    document.getElementById("cot1").style.display = "none";
  }
}
function clearScreen() {
  document.getElementById("result").value = "";

  if (document.getElementById("result").value != "") {
    document.getElementById("c").style.display = "none";
    document.getElementById("ce").style.display = "block";
  } else {
    document.getElementById("ce").style.display = "none";
    document.getElementById("c").style.display = "block";
  }
}
function solve() {
  let x = document.getElementById("result").value;
  let y = eval(x);
  isCalculated = true;

  document.getElementById("result").value = y;

  return y;
}

function backspace() {
  document.getElementById("result").value = result.value.slice(0, -1);
}

function Arithmatic(math_obj) {
  let z = result.value;
  let ans;

  switch (math_obj) {
    case "dfg":
      ans = (z * 180) / Math.PI;
      break;

    case "log":
      ans = Math.log10(z);
      break;

    case "ln":
      ans = Math.log(z);
      break;

    case "exp":
      ans = z.toExponential();
      break;

    case "pi":
      ans = Math.PI;
      break;

    case "e":
      ans = Math.E;
      break;

    case "sqrt":
      ans = Math.sqrt(z);
      break;

    case "cqrt":
      ans = Math.cbrt(z);
      break;

    case "x_square":
      ans = Math.pow(z, 2);
      break;

    case "x_cube":
      ans = Math.pow(z, 3);
      break;

    case "10px":
      ans = Math.pow(10, z);
      break;

    case "2px":
      ans = Math.pow(2, z);
      break;

    case "epx":
      let e;
      e = Math.E;
      ans = Math.pow(e, z);

    case "fact":
      let factorial = (number) => {
        let temp = 1;
        for (let i = 2; i <= number; i++) {
          temp = temp * i;
        }
        return temp;
      };
      ans = factorial(z);
      break;

    case "onebyx":
      ans = 1 / z;
      break;

    // function dropdown
    case "|x|":
      ans = Math.abs(z);
      break;

    case "rand":
      ans = Math.random();
      break;

    case "ceil_x":
      ans = Math.ceil_x(z);
      break;

    case "floor_x":
      ans = Math.floor_x(z);
      break;

    // Trigonometry drop down

    case "sin":
      ans = Math.sin(z);
      break;

    case "cos":
      ans = Math.cos(z);
      break;

    case "tan":
      ans = Math.tan(z);
      break;

    case "hyp":
      ans = Math.hypot(z);
      break;

    case "sec":
      ans = 1 / Math.cos(z);
      break;

    case "csc":
      ans = 1 / Math.sin(z);
      break;

    case "cot":
      ans = 1 / Math.tan(z);
      break;

    case "plus_or_minus":
      ans = z * -1;
      break;

    default:
      return 0;
  }
  document.getElementById("result").value = ans;
  return ans;
}
