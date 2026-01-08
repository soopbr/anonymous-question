const questions = JSON.parse(localStorage.getItem("questions") || "[]")
  .filter(q => q.approved);

let index = 0;
const box = document.getElementById("questionText");

function render() {
  if (questions.length === 0) {
    box.innerText = "승인된 질문이 없습니다.";
    return;
  }
  box.innerText = questions[index].text;
}

function prev() {
  if (index > 0) index--;
  render();
}

function next() {
  if (index < questions.length - 1) index++;
  render();
}

function speak() {
  if (!questions.length) return;
  const msg = new SpeechSynthesisUtterance(questions[index].text);
  msg.lang = "ko-KR";
  speechSynthesis.speak(msg);
}

render();
