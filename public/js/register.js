
function toggleAccordion(index) {
  const content = document.querySelectorAll('.accordion-content')[index - 1];
  content.style.display = content.style.display === 'none' ? 'block' : 'none';
}
function togglefaq(index){
  const content = document.querySelectorAll('.faq-content')[index - 1];
  content.style.display = content.style.display === 'none' ? 'block' : 'none';
}
async function reg() {
  const FullName = document.getElementById("FullName").value;
  const Email = document.getElementById("Email").value;
  const Phone = document.getElementById("Phone").value;

  if (FullName.length == 0) {
    document.getElementById("namelbl").innerHTML = "*שם לא יכול להיות ריק";
    return;
  } else document.getElementById("namelbl").innerHTML = "";

  if (Email.length == 0 || !Email.includes("@")) {
    document.getElementById("emaillbl").innerHTML =
      "*כתובת המייל ריקה או אינה תקינה";
    return;
  } else document.getElementById("emaillbl").innerHTML = "";

  if (Phone.length < 10) {
    document.getElementById("phonelbl").innerHTML =
      "*טלפון חייב להכיל 10 ספרות";
    return;
  } else document.getElementById("phonelbl").innerHTML = "";

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("name", FullName);
  urlencoded.append("email", Email);
  urlencoded.append("phone", Phone);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  await fetch("/user/Reg", requestOptions).then((data) => {
    console.log(data);
  });
}
