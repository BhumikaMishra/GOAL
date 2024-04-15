function validateForm() {
    let x = document.forms["myform"]["uname"].value;
    let y=document.forms["myform"]["emailid"].value
    if (x == "") {
      alert("Username must be filled out");
      return false;
    }
    else if(y==""){
      alert("Email ID must be filled out");
      return false;
    }
  }