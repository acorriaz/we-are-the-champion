const inputMessageEl = document.querySelector(".input-message")
const inputFromEl = document.querySelector(".input-from")
const inputToEl  = document.querySelector(".input-to")
const submitBtn = document.querySelector(".submit-btn")
const ulEl = document.querySelector(".endorsement-container")

submitBtn.addEventListener("click", () => getInputFromUser())

function getInputFromUser() {
  let userInput = {from: inputFromEl.value, to: inputToEl.value, message: inputMessageEl.value}
  appendEndorsement(userInput)
}

function appendEndorsement(message) {
  let arrayUserInput = Object.entries(message)
  let fromText = arrayUserInput[0][1]
  let toText = arrayUserInput[1][1]
  let messageText = arrayUserInput[2][1]
  createElement(fromText, toText, messageText)
}

function createElement(from, to, message) {
  let liEl = document.createElement("li")
  let h3El = document.createElement("h3")
  let h4El = document.createElement("h4")
  let pEl = document.createElement("p")
  h3El.textContent = to
  pEl.textContent = message
  h4El.textContent = from
  liEl.appendChild(h3El)
  liEl.appendChild(pEl)
  liEl.appendChild(h4El)
  ulEl.appendChild(liEl)
}
