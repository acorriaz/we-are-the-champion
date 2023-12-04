import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSetting = {
  databaseURL: "https://realtime-database-8e9e1-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSetting)
const database = getDatabase(app)
const endorsementInDB = ref(database, "endorsement")


const inputMessageEl = document.querySelector(".input-message")
const inputFromEl = document.querySelector(".input-from")
const inputToEl  = document.querySelector(".input-to")
const submitBtn = document.querySelector(".submit-btn")
const ulEl = document.querySelector(".endorsement-container")

submitBtn.addEventListener("click", () => getInputFromUser())

function getInputFromUser() {
  let userInput = {from: inputFromEl.value, to: inputToEl.value, message: inputMessageEl.value}
  push(endorsementInDB, userInput)
}

onValue(endorsementInDB, function(snapshot){
  if (snapshot.exists()) {

    let itemArray = Object.entries(snapshot.val())

    for (let i = 0; i < itemArray.length; i++) {
      let currentItem = itemArray[i]
      let fromText = currentItem[0][1]
      let toText = currentItem[1][1]
      let messageText = currentItem[2][1]
      appendElement(fromText, toText, messageText)
    }
  } else {
    ulEl.textContent = "no item yet"
  }
})

function appendElement(fromWho, toWho, message) {
  let liEl = document.createElement("li")
  let h3El = document.createElement("h3")
  let h4El = document.createElement("h4")
  let pEl = document.createElement("p")
  h3El.textContent = toWho
  pEl.textContent = message
  h4El.textContent = fromWho
  liEl.appendChild(h3El)
  liEl.appendChild(pEl)
  liEl.appendChild(h4El)
  ulEl.appendChild(liEl)
}
