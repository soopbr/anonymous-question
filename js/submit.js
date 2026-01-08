function submitQuestion() {
  if (localStorage.getItem("submitted")) {
    alert("이미 질문을 제출했습니다.");
    return;
  }

  const text = document.getElementById("question").value.trim();
  if (!text) {
    alert("질문을 입력해주세요.");
    return;
  }

  const questions = JSON.parse(localStorage.getItem("questions") || "[]");

  questions.push({
    id: Date.now(),
    text: text,
    approved: false
  });

  localStorage.setItem("questions", JSON.stringify(questions));
  localStorage.setItem("submitted", "true");

  alert("질문이 제출되었습니다!");
  document.getElementById("question").disabled = true;
}
