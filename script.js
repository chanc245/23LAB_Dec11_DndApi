document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("myForm").addEventListener("submit", submitForm);
});

async function submitForm() {
  document.getElementById("result").textContent = "Loading... Please Wait... :D";

  console.log('--submitForm() RUNNING')
  try {
    const nickName = document.getElementById("nickName").value;
    const Role = document.getElementById("Role").value;
    const genre = document.getElementById("genre").value;

    const dndApiUrl = 'https://dndgpt-webservice.onrender.com' + '/submit'
    // console.log(dndApiUrl)

    const response = await fetch(dndApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nickName, Role, genre }),
    });
    console.log('--response FETCHED')

    const resultContainer = document.getElementById('result')
    resultContainer.textContent = ''

    if (response.ok) {
      console.log('--response OK')
      const jsonData = await response.json();
      console.log(jsonData)

      const message = jsonData.gpt;
      characterString = message;

      document.getElementById("result").innerHTML = message;
      console.log('--html UPDATED')

      getVar(message);
    } else {
      resultContainer.textContent = "Error in submitting data. Please try again.."
    }
  } catch (error) {
    console.log(error.message);
    return '';
  }
}

let characterString = ''
let parts = characterString.split("<br>");
let nickname = ""
let role = ""
let genre = ""

let strength = ""
let dexterity = ""
let constitution = ""
let intelligence = ""
let wisdom = ""
let charisma = ""


function getVar(data) {
  let characterString = data
  let parts = characterString.split("<br>");

  function extractData(keyword) {
    let index = parts.findIndex(part => part.includes(keyword));
    if (index !== -1) {
      return parts[index].split(":")[1].trim(); // Split by ':' and trim spaces
    }
    return null;
  }

  nickname = extractData("Nickname");
  role = extractData("Role");
  genre = extractData("Genre");

  strength = extractData("Strength");
  dexterity = extractData("Dexterity");
  constitution = extractData("Constitution");
  intelligence = extractData("Intelligence");
  wisdom = extractData("Wisdom");
  charisma = extractData("Charisma");

  let backgroundIndex = parts.findIndex(part => part.includes("Background"));
  background = parts.slice(backgroundIndex + 1).join(" ").trim(); // Join the parts after "Background"

  console.log("Nickname:", nickname);
  console.log("Role:", role);
  console.log("Genre:", genre);
  console.log("Strength:", strength);
  console.log("Dexterity:", dexterity);
  console.log("Constitution:", constitution);
  console.log("Intelligence:", intelligence);
  console.log("Wisdom:", wisdom);
  console.log("Charisma:", charisma);
  console.log("Background:", background);
}

