// submit.js (최종 안정본)

function submitQuestion() {
  const textarea = document.getElementById("question");
  const text = textarea.value.trim();

  if (!text) {
    alert("질문을 입력해주세요.");
    return;
  }

  const pending =
    JSON.parse(localStorage.getItem("pendingQuestions") || "[]");

  if (pending.length > 0) {
    alert("이미 질문을 제출했습니다.");
    return;
  }

  pending.push({
    id: Date.now(),
    text: text,
    approved: false
  });

  localStorage.setItem("pendingQuestions", JSON.stringify(pending));

  textarea.value = "";
  textarea.disabled = true;

  alert("질문이 제출되었습니다!");
}
