let approved = [];
let index = 0;

async function load() {
  const res = await fetch("data/questions.json");
  const data = await res.json();
  approved = data.questions.filter(q => q.approved);
  render();
}

function render() {
  document.getElementById("q").innerText =
    approved.length ? approved[index].text : "승인된 질문 없음";
}

function prev() {
  if (index > 0) index--;
  render();
}

function next() {
  if (index < approved.length - 1) index++;
  render();
}

function speak() {
  if (!approved.length) return;
  const msg = new SpeechSynthesisUtterance(approved[index].text);
  msg.lang = "ko-KR";
  speechSynthesis.speak(msg);
}

load();
