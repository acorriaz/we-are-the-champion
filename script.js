import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSetting = {
  databaseURL: "https://realtime-database-8e9e1-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSetting)
const database = getDatabase(app)
const endorsementInDB = ref(database, "endorsement")

const ulEl = document.querySelector(".endorsement-container")
const formEl = document.querySelector('.message-form')

formEl.addEventListener('submit', (e) => {
  e.preventDefault()
  const formData = new FormData(formEl)
  const data = {
    from: formData.get('from'),
    message: formData.get('message'),
    to: formData.get('to')
  }
  push(endorsementInDB, data)
  formEl.reset();
})

onValue(endorsementInDB, function (snapshot) {

  clearUlEl()

  if (snapshot.exists()) {

    let itemArray = Object.entries(snapshot.val())
    let itemArrayNewestFirst = itemArray.reverse()

    for (let i = 0; i < itemArray.length; i++) {
      let currentItem = itemArrayNewestFirst[i][1]
      let fromText = currentItem.from
      let toText = currentItem.to
      let messageText = currentItem.message
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
  h3El.textContent = `To ${toWho}`
  pEl.textContent = message
  h4El.textContent = `From ${fromWho}`
  liEl.appendChild(h3El)
  liEl.appendChild(pEl)
  liEl.appendChild(h4El)
  ulEl.appendChild(liEl)
}

function clearUlEl() {
  ulEl.innerHTML = ""
}
