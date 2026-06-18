//This code in bootstrap for form Validation!
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})();
//-------------SingUp and login----------
const btn = document.getElementById("toggleBtn")
if(btn){
  btn.addEventListener("click", function() {
  const input = document.getElementById("password");
  const icon  = document.getElementById("eyeIcon");

  if (input.type === "password") {
    input.type = "text";
    icon.className = "fa fa-eye-slash";
  } else {
    input.type = "password";
    icon.className = "fa fa-eye";
  }
});
}

//---For TexPrice Show-----------
let texBtn = document.getElementById("switchCheckReverse");
if(texBtn){
  texBtn.addEventListener('click',()=>{
    console.log("btn click")
    let texInfo = document.getElementsByClassName("tex-info");
    console.log(texInfo);
    for(info of texInfo){
      if(info.style.display != "inline"){
        info.style.display  = "inline"
      }else{
        info.style.display  = "none"
      }
    }
})
}
//---------laptop---------
let ForLaptopBtn = document.getElementById("checkNativeSwitch");
if(ForLaptopBtn){
  ForLaptopBtn.addEventListener('click',()=>{
    console.log("btn click")
    let texInfo = document.getElementsByClassName("tex-info");
    console.log(texInfo);
    for(info of texInfo){
      if(info.style.display != "inline"){
        info.style.display  = "inline"
      }else{
        info.style.display  = "none"
      }
    }
})
}