const cl = console.log;

const generateUuid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    (character) => {
      const random = (Math.random() * 16) | 0;
      const value = character === "x" ? random : (random & 0x3) | 0x8;
      return value.toString(16);
    }
  );
};

let stdArr = JSON.parse(localStorage.getItem("stdArr")) || [
  {
    fname: "Jhon",
    lname: "Doe",
    email: "jd@gmail.com",
    contact: 7895454562,
    id: generateUuid(),
  },
  {
    fname: "May",
    lname: "Brown",
    email: "May@gmail.com",
    contact: 8954574563,
    id: generateUuid(),
  },
 
]; 
 

const sAlert = (icon, msg) => {
  Swal.fire({
    position: "center",
    icon: icon,
    title: msg,
    showConfirmButton: true,
    timer: 1500,
  });
};

const stdContainer = document.getElementById("stdContainer");
const stdForm = document.getElementById("stdForm");
const fnameControl = document.getElementById("fname");
const lnameControl = document.getElementById("lname");
const emailControl = document.getElementById("email");
const contactControl = document.getElementById("contact");
const submitBtn = document.getElementById("submitBtn");
const updateBtn = document.getElementById("updateBtn");

const editOnclick = (ele) => {
  let editId = ele.closest("tr").id;
  localStorage.setItem("editId", editId);
  let EditObj = stdArr.find((std) => std.id === editId);
  fnameControl.value = EditObj.fname;
  lnameControl.value = EditObj.lname;
  emailControl.value = EditObj.email;
  contactControl.value = EditObj.contact;
  submitBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");
};

const removeOnclick = (ele) => {
  let removeId = ele.closest("tr").id;
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
      let getIndex = stdArr.findIndex((std) => std.id === removeId);
      stdArr.splice(getIndex, 1);
      localStorage.setItem("stdArr", JSON.stringify(stdArr));
      ele.closest("tr").remove();
        let stdRow = document.querySelectorAll('tr')
        stdRow.forEach((tr, i) => tr.children[0].innerHTML = i + 1)
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
    }
  });
};

const templatingStd = (arr) => {
  let result = "";
  arr.forEach((std, i) => {
    result += `      <tr id="${std.id}">
                        <td>${i + 1}</td>
                        <td class="text-capitalize">${std.fname}</td>
                        <td class="text-capitalize">${std.lname}</td>
                        <td>${std.email}</td>
                        <td>${std.contact}</td>
                        <td>
                            <button class="btn btn-sm btn-outline-primary" onclick="editOnclick(this)">Edit</button>
                        </td>
                        <td>
                            <button class="btn btn-sm btn-outline-danger" onclick="removeOnclick(this)">Remove</button>
                        </td>
                    </tr>`;
  });
  stdContainer.innerHTML = result;
};
templatingStd(stdArr);

const submitStdOnClick = (eve) => {
  eve.preventDefault();
  let newStd = {
    fname: fnameControl.value,
    lname: lnameControl.value,
    email: emailControl.value,
    contact: contactControl.value,
    id: generateUuid(),
  };
  stdForm.reset();
  stdArr.push(newStd);
  localStorage.setItem("stdArr", JSON.stringify(stdArr));
  let stdTr = document.createElement("tr");
  stdTr.id = newStd.id;
  stdTr.innerHTML = `   <td>${stdArr.length}</td>
                        <td class="text-capitalize">${newStd.fname}</td>
                        <td class="text-capitalize">${newStd.lname}</td>
                        <td>${newStd.email}</td>
                        <td>${newStd.contact}</td>
                        <td>
                            <button class="btn btn-sm btn-outline-primary" onclick="editOnclick(this)">Edit</button>
                        </td>
                        <td>
                            <button class="btn btn-sm btn-outline-danger" onclick="removeOnclick(this)">Remove</button>
                        </td>`;
  stdContainer.append(stdTr);

  sAlert(
    "success",
    `new Student, "${newStd.fname} ${newStd.lname}" is Added Successfully !!!`
  );
};

const updateStdOnClick = () => {
  let updateId = localStorage.getItem("editId");
  let updateObj = {
    fname: fnameControl.value,
    lname: lnameControl.value,
    email: emailControl.value,
    contact: contactControl.value,
    id: updateId,
  };
  stdForm.reset();
  let getIndex = stdArr.findIndex((std) => std.id === updateId);
  stdArr[getIndex] = updateObj;
  localStorage.setItem("stdArr", JSON.stringify(stdArr));
  let updateTr = document.getElementById(updateId);
  updateTr.children[1].innerHTML = updateObj.fname;
  updateTr.children[2].innerHTML = updateObj.lname;
  updateTr.children[3].innerHTML = updateObj.email;
  updateTr.children[4].innerHTML = updateObj.contact;
  submitBtn.classList.remove("d-none");
  updateBtn.classList.add("d-none");
  sAlert(
    "success",
    `Student, "${updateObj.fname} ${updateObj.lname}" is Updated Successfully !!!`
  );
};

stdForm.addEventListener("submit", submitStdOnClick);
updateBtn.addEventListener("click", updateStdOnClick);