


const cl=console.log;

const StdFormControl=document.getElementById('StdForm');
const stdContainer=document.getElementById('stdContainer');
const fnameControl=document.getElementById('fname');
const lnameControl=document.getElementById('lname');
const emailControl=document.getElementById('email');
const contactControl=document.getElementById('contact');

const snackbar = (msg, icon) => {
  Swal.fire({
    title: msg,
    icon: icon,
    timer: 2500
  })    
}



const generateUuid = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      (character) => {
        const random = (Math.random() * 16) | 0; // Random number between 0 and 15
        const value = character === "x" ? random : (random & 0x3) | 0x8; // Adjust 'y' characters
        return value.toString(16); // Convert to hexadecimal
      }
    );
  };



   let stdArr = JSON.parse(localStorage.getItem(stdArr))|| []

   const onStdEdit=(ele) =>{
    cl(ele);
   }
   const templtingofStd = (arr) => {
    let result='';
    arr.forEach((std, i)=>{
        result += `
                 <tr id="${std.stdId}">
                    <td>${i+1}</td>
                    <td>${std.fname}</td>
                    <td>${std.lname}</td>
                    <td>${std.email}</td>
                    <td>${std.contact}</td>
                    <td>
                      <button class="btn btn-sm btn-outline-info" onclick="onStdEdit(this)">Edit</button>
                    </td>
                    <td>
                      <button class="btn btn-sm btn-outline-info" onclick="onStdRemove(this)">Remove</button>
                    </td>
                  </tr>
        `
    });
    stdContainer.innerHTML = result;
   }
   templtingofStd(stdArr);
  const onStdAdd = (eve) => {
    eve.preventDefault();
    //create new std objs
    let stdObj = {
       fname : fnameControl.value,
       lname : lnameControl.value,
       email : emailControl.value,
       contact : contactControl.value,
       stuId : generateUuid()
    }
    cl(stdObj);

    StdForm.reset();

    //add is array
      stdArr.push(stdObj);
    //update in DB
      localStorage.setItem("stdArr", JSON.stringify(stdArr));
    //show in UI

    //templtingOfStd(stdArr)

    //we have to create tr and append in tbody

     let tr=document.getElement('tr');
     tr.id = stdObj.stdId;
     tr.innerHTML = 
                  `
                   
                      <td>${stdArr.length}</td>
                      <td>${stdObj.fname}</td>
                      <td>${stdObj.lname}</td>
                      <td>${stdObj.email}</td>
                      <td>${stdObj.contact}</td>
                      <td>
                        <button class="btn btn-sm btn-outline-info" onclick="onStdEdit(this)">Edit</button>
                      </td>
                      <td>
                        <button class="btn btn-sm btn-outline-info" onclick="onStdRemove(this)">Remove</button>
                      </td>
                  
                 `;

stdContainer.append(tr)
     
snackbar(`New Student ${stdObj.fname} ${stdObj.lname} is added sucessfully !!!`,'success')         

}

StdForm.addEventListener("submit",onStdAdd)
