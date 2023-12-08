document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("myForm").addEventListener("submit", submitForm);
});

async function submitForm() {
  // updateImg()
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
    // resultContainer.textContent = ''

    if (response.ok) {
      console.log('--response OK')
      const jsonData = await response.json();
      console.log(jsonData)

      const message = jsonData.gpt;
      characterString = message;

      // document.getElementById("result").innerHTML = message;
      getVar(message); //isolating every variable
      updateData();
      updateImg();
      document.getElementById("result").textContent = "Enjoy your DnD Chracter Card :)";

      console.log('--html UPDATED')

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

// let characterString = 'Justin';
// let parts = characterString.split("<br>");
// let nickname = "The Thinker";
// let role = "Artificer";
// let genre = ""

// let strength = "10";
// let dexterity = "14";
// let constitution = "12";
// let intelligence = "16";
// let wisdom = "10";
// let charisma = "12";
// let background = "Justin, also known as \"The Enigma\", is a master of mystery and intrigue. Hailing from a small town, Justin's natural curiosity and intelligence led him to study the art of artifice, creating intricate and enigmatic mechanical devices. His talents and reputation as a master of the arcane arts have made him a sought-after figure in the world of mystery and intrigue.Justin's enigmatic nature and aloof demeanor have made him a mysterious and enigmatic figure in the world of artifice. His talents are unparalleled, and his knowledge of ancient artifacts and forgotten lore make him a valuable asset to those seeking his aid. Justin's true motives and loyalties, however, are often shrouded in mystery, leading many to wonder if he can be trusted.Though his motivations may seem unclear, Justin's skill in his craft is unmatched. His ability to create and manipulate arcane devices makes him a valuable ally in the world of mystery and danger. With his enigmatic nature and knack for unraveling the unknown, Justin is a force to be reckoned with in the shadows of mystery.";

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

  // nickname = extractData("Nickname");
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

function updateData() {
  document.getElementById('name').innerText = document.getElementById("nickName").value;
  // document.getElementById('title').innerText = nickname;
  document.getElementById('role').innerText = document.getElementById("Role").value;
  document.getElementById('strength').innerText = `Strength:${strength}`;
  document.getElementById('dexterity').innerText = `Dexterity:${dexterity}`;
  document.getElementById('constitution').innerText = `Constitution:${constitution}`;
  document.getElementById('intelligence').innerText = `Intelligence:${intelligence}`;
  document.getElementById('wisdom').innerText = `Wisdom: ${wisdom}`;
  document.getElementById('charisma').innerText = `Charisma:${charisma}`;
  document.getElementById('background').innerText = `Background Stody:\n${background}`;
}

function updateImg() {
  const Role = document.getElementById("Role").value;
  const genre = document.getElementById("genre").value;

  console.log(Role)
  console.log(genre)

  roleImgLink = `/23LAB_Dec11_DndApi/dnd_img/dnd_${Role}_01.png`
  genreImgLink = `/23LAB_Dec11_DndApi/dnd_img/dnd_bg_${genre}_01.png`

  console.log(roleImgLink)
  console.log(genreImgLink)


  document.getElementById('bg-img').src = genreImgLink
  document.getElementById('character-img').src = roleImgLink
}

