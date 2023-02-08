//Validate form inputs before submitting data
function validateForm() {
  var pname = document.getElementById("pname").value;
  var pid = document.getElementById("pid").value;
  var pi = document.getElementById("pi").value;
  var pd = document.getElementById("pd").value;
  var pp = document.getElementById("pp").value;

  if (pname == "") {
    alert("Producrt Name is required");
    return false;
  }

  if (pid == "") {
    alert("Producrt Identification must be specified");
    return false;
  }

  if (pi == "") {
    alert("Please upload a product image");
    return false;
  }

  if (pd == "") {
    alert("Please enter a product deatils");
    return false;
  }

  if (pp == "") {
    alert("Product price must be specified");
    return false;
  }

  return true;
}

//function to show data from local storage
function showData() {
  var productlist;
  if (localStorage.getItem("productlist") == null) {
    productlist = [];
  } else {
    productlist = JSON.parse(localStorage.getItem("productlist"));
  }

  var html = "";
  productlist.forEach(function (element, index) {
    html += "<tr>";
    html += "<td>" + element.pname + "</td>";
    html += "<td>" + element.pid + "</td>";
    html += "<td>" + element.pi + "</td>";
    html += "<td>" + element.pd + "</td>";
    html += "<td>" + element.pp + "</td>";
    html +=
      '<td><button onclick="deleteData(' +
      index +
      ')" class="btn btn-danger">Delete</button> <button onclick="updateData(' +
      index +
      ')" class="btn btn-warning m-2">Edit</button>  </td>';
    html += "</tr>";
  });
  document.querySelector("#CRUDTable tbody").innerHTML = html;
  console.log("html");
}


//Loads all data from local storage when document or page loded
document.onload = showData();

// function to add data to local storage
function AddData() {
  //If form is validate
  if (validateForm() == true) {
    var pname = document.getElementById("pname").value;
    var pid = document.getElementById("pid").value;
    var pi = document.getElementById("pi").value;
    var pd = document.getElementById("pd").value;
    var pp = document.getElementById("pp").value;

    var productlist;
    if (localStorage.getItem("productlist") == null) {
      productlist = [];
    } else {
      productlist = JSON.parse(localStorage.getItem("productlist"));
    }

    productlist.push({
      pname: pname,
      pid: pid,
      pi: pi,
      pd: pd,
      pp: pp,
    });

    localStorage.setItem("productlist", JSON.stringify(productlist));
    showData();
    document.getElementById("pname").value = "";
    document.getElementById("pid").value = "";
    document.getElementById("pi").value = "";
    document.getElementById("pd").value = "";
    document.getElementById("pp").value = "";
  }
}

//function to delete data from local storage
function deleteData(index) {
  var productlist;
  if (localStorage.getItem("productlist") == null) {
    productlist = [];
  } else {
    productlist = JSON.parse(localStorage.getItem("productlist"));
  }

  productlist.splice(index, 1);
  localStorage.setItem("productlist", JSON.stringify(productlist));
  showData();
}

//function to update data from local storage
function updateData(index) {
  //submit button will hide and update button will show for updating of data in local storage
  document.getElementById("submit").style.display = "none";
  document.getElementById("update").style.display = "block";

  var productlist;
  if (localStorage.getItem("productlist") == null) {
    productlist = [];
  } else {
    productlist = JSON.parse(localStorage.getItem("productlist"));
  }

  document.getElementById("pname").value = productlist[index].pname;
  document.getElementById("pid").value = productlist[index].pid;
  //document.getElementById("pi").value = productlist[index].pi;
  document.getElementById("pd").value = productlist[index].pd;
  document.getElementById("pp").value = productlist[index].pp;

  document.querySelector("#update").onclick = function () {
    if (validateForm() == true) {
      productlist[index].pname = document.getElementById("pname").value;
      productlist[index].pid = document.getElementById("pid").value;
      productlist[index].pi = document.getElementById("pi").value;
      productlist[index].pd = document.getElementById("pd").value;
      productlist[index].pp = document.getElementById("pp").value;

      localStorage.setItem("productlist", JSON.stringify(productlist));
      showData();
      document.getElementById("pname").value = "";
      document.getElementById("pid").value = "";
      document.getElementById("pi").value = "";
      document.getElementById("pd").value = "";
      document.getElementById("pp").value = "";

      //update button will hide and submit button will show
      document.getElementById("submit").style.display = "block";
      document.getElementById("update").style.display = "none";
    }
  };
}
