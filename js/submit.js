function submitQuestion() {
  const questions = JSON.parse(localStorage.getItem("questions") || "[]");

  // 🔥 이 브라우저에서 작성한 질문이 이미 있는지 검사
  const myQuestionExists = questions.some(q => q.fromMe === true);

  if (myQuestionExists) {
    alert("이미 질문을 제출했습니다.");
    return;
  }

  const text = document.getElementById("question").value.trim();
  if (!text) {
    alert("질문을 입력해주세요.");
    return;
  }

  questions.push({
    id: Date.now(),
    text,
    approved: false,
    fromMe: true   // ⭐ 이 브라우저에서 작성 표시
  });

  localStorage.setItem("questions", JSON.stringify(questions));

  alert("질문이 제출되었습니다!");
  document.getElementById("question").disabled = true;
}
