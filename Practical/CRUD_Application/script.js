//Validate form inputs before submitting data
function validateForm() {
  var pname = document.getElementById("pname").value;
  var pid = document.getElementById("pid").value;
  var pi = document.getElementById("pi").value;
  var pd = document.getElementById("pd").value;
  var pp = document.getElementById("pp").value;

  if (pname == "" || pp == "" || pd == "") {
    alert("All fields are required!");
    return false;
  }

  // if (pname == "") {
  //   alert("Product Name is required");
  //   return false;
  // }

  // if (pid == "") {
  //   alert("Product Identification must be specified");
  //   return false;
  // }

  // if (pi == "") {
  //   alert("Please upload a product image");
  //   return false;
  // }

  // if (pd == "") {
  //   alert("Please enter a product details");
  //   return false;
  // }

  // if (pp == "") {
  //   alert("Product price must be specified");
  //   return false;
  // }

  if (isNaN(pid)) {
    alert("Only numeric Value");
    return false;
  }
  if (pp < 0) {
    alert("Price must be positive.");
    return false;
  }

  return true;
}

var inputBox = document.getElementById("pp");

var invalidChars = ["-", "+", "E", "e"];

inputBox.addEventListener("keydown", function (e) {
  if (invalidChars.includes(e.key)) {
    e.preventDefault();
  }
});

//function to show data from local storage
function showData() {
  pid.disabled = false;
  var productlist;
  if (localStorage.getItem("productlist") == null) {
    productlist = [];
  } else {
    productlist = JSON.parse(localStorage.getItem("productlist"));
  }

  var html = "";
  productlist.forEach(function (element, index) {
    html += `<tr>
                <td> ${element.pname} </td>
                <td> ${element.pid} </td>
                <td> <img src= "${element.pi}" style='height:100px; width:100px;' alt='Product Image'></td>
                <td> ${element.pd} </td>
                <td> ${element.pp} &#8377; </td>
                <td> <button onclick="updateData(${index})" class="btn btn-warning m-2">Edit</button></td>
                <td> <button onclick='deleteData(${index})' class="btn btn-danger">Delete</button></td>
              </tr>`;
  });

  document.querySelector("#CRUDTable tbody").innerHTML = html;
}

//Loads all data from local storage when document or page loaded
document.onload = showData();

// function to add data to local storage
function AddData() {
  //If form is validate
  if (validateForm() == true) {
    var pname = document.getElementById("pname").value;
    var pid = document.getElementById("pid").value;
    // var pi = document.getElementById("pi").value;
    var pi = document.getElementById("pi").files[0];
    var pd = document.getElementById("pd").value;
    var pp = document.getElementById("pp").value;

    let reader = new FileReader();
    reader.readAsDataURL(pi);
    reader.addEventListener("load", () => {
      var url = reader.result;
      var productlist;
      if (localStorage.getItem("productlist") == null) {
        productlist = [];
      } else {
        productlist = JSON.parse(localStorage.getItem("productlist"));
      }

      productlist.push({
        pname: pname,
        pid: pid,
        pi: url,
        pd: pd,
        pp: pp,
      });
      localStorage.setItem("productlist", JSON.stringify(productlist));
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your file has been added",
        showConfirmButton: false,
        timer: 1500,
      });
      showData();
    });

    document.getElementById("pname").value = "";
    document.getElementById("pid").value = "";
    document.getElementById("pi").value = "";
    document.getElementById("pd").value = "";
    document.getElementById("pp").value = "";
    document.getElementById("imgedit").src = "";
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
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      productlist.splice(index, 1);
      localStorage.setItem("productlist", JSON.stringify(productlist));
      showData();
      Swal.fire("Deleted!", "Your entry has been deleted.", "success");
    }
  });
}



//function to update data from local storage
function updateData(index) {
  //submit button will hide and update button will show for updating of data in local storage
  document.getElementById("submit").style.display = "none";
  document.getElementById("update").style.display = "block";
  let newimg = document.getElementById("pi");

  var productlist;
  if (localStorage.getItem("productlist") == null) {
    productlist = [];
  } else {
    productlist = JSON.parse(localStorage.getItem("productlist"));
  }
  pid.disabled = true;
  document.getElementById("pname").value = productlist[index].pname;
  document.getElementById("pid").value = productlist[index].pid;
  document.getElementById("imgedit").src = productlist[index].pi;
  document.getElementById("pd").value = productlist[index].pd;
  document.getElementById("pp").value = productlist[index].pp;

  document.querySelector("#update").onclick = function () {
    if (newimg.value == "") {
      if (validateForm() == true) {
        productlist[index].pname = document.getElementById("pname").value;
        productlist[index].pd = document.getElementById("pd").value;
        productlist[index].pp = document.getElementById("pp").value;

        localStorage.setItem("productlist", JSON.stringify(productlist));
        showData();

        document.getElementById("pname").value = "";
        document.getElementById("pid").value = "";
        document.getElementById("pi").value = "";
        document.getElementById("pd").value = "";
        document.getElementById("pp").value = "";
        document.getElementById("imgedit").src = "";
        Swal.fire("Congrats!", "You changes has been saved", "success");

        //update button will hide and submit button will show
        document.getElementById("submit").style.display = "block";
        document.getElementById("update").style.display = "none";
      }
    } else if (validateForm() == true) {
      let pi = newimg.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(pi);

      reader.addEventListener("load", () => {
        url = reader.result;
        productlist[index].pname = document.getElementById("pname").value;
        productlist[index].pi = url;
        productlist[index].pp = document.getElementById("pp").value;
        productlist[index].pd = document.getElementById("pd").value;

        localStorage.setItem("productlist", JSON.stringify(productlist));
        showData();

        document.getElementById("pname").value = "";
        document.getElementById("pid").value = "";
        document.getElementById("pi").value = "";
        document.getElementById("pd").value = "";
        document.getElementById("pp").value = "";
        document.getElementById("imgedit").src = "";
        Swal.fire("Congrats!", "You changes has been saved", "success");
      });

      //update button will hide and submit button will show
      document.getElementById("submit").style.display = "block";
      document.getElementById("update").style.display = "none";
    }
  };
}

//function to Sort and Filter data
function arrangeBy(x) {
  var productlist;
  if (localStorage.getItem("productlist") == null) {
    productlist = [];
  } else {
    productlist = JSON.parse(localStorage.getItem("productlist"));
  }

  switch (x) {
    case "lowest":
      productlist.sort((a, b) => {
        return a.pp - b.pp;
      });
      localStorage.setItem("productlist", JSON.stringify(productlist));
      showData();
      break;

    case "highest":
      productlist.sort((a, b) => {
        return b.pp - a.pp;
      });
      localStorage.setItem("productlist", JSON.stringify(productlist));
      showData();
      break;

    case "1ton":
      productlist.sort((a, b) => {
        return a.pid - b.pid;
      });
      localStorage.setItem("productlist", JSON.stringify(productlist));
      showData();
      break;

    case "atoz":
      productlist.sort(function (a, b) {
        var x = a.pname.toLowerCase();
        var y = b.pname.toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
      });
      localStorage.setItem("productlist", JSON.stringify(productlist));
      showData();
      break;
  }
}

//Function to validate Image
function validateImage() {
  var pi = document.getElementById("pi");
  var file = pi.value;
  var extensions = /(\.webp|\.jpg|\.jpeg|\.svg|\.png|\.gif)$/i;

  if (!extensions.exec(file)) {
    alert("Invalid file type");
    fileInput.value = "";
    return false;
  }
  return true;
}

//Function to display image
function readURL(input) {
  document.getElementById("pi").src = "";
  if (input.files || input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $("#imgedit").attr("src", e.target.result).width(100).height(100);
    };

    reader.readAsDataURL(input.files[0]);
  }
}

//Function to search by id in search bar
function searchById() {
  var input, filter, table, tr, td, i, txtValue, j;
  input = document.getElementById("search-input");
  filter = input.value;
  table = document.getElementById("CRUDTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    for (j = 0; j <= i; j++) {
      td = tr[j].getElementsByTagName("td")[1];
      if (td) {
        txtValue = td.innerText;
        if (txtValue.indexOf(filter) > -1) {
          tr[j].style.display = "";
        } else {
          tr[j].style.display = "none";
        }
      }
    }
  }
}
