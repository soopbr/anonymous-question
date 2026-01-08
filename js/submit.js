// submit.js (최종본)

function submitQuestion() {
  const textarea = document.getElementById("question");
  const text = textarea.value.trim();

  if (!text) {
    alert("질문을 입력해주세요.");
    return;
  }

  // 이미 제출했는지 체크 (기기 기준)
  if (localStorage.getItem("submitted") === "true") {
    alert("이미 질문을 제출했습니다.");
    return;
  }

  // 대기 질문 목록 불러오기
  const pending =
    JSON.parse(localStorage.getItem("pendingQuestions") || "[]");

  pending.push({
    id: Date.now(),
    text: text,
    approved: false
  });

  localStorage.setItem("pendingQuestions", JSON.stringify(pending));
  localStorage.setItem("submitted", "true");

  textarea.value = "";
  textarea.disabled = true;

  alert("질문이 제출되었습니다!\n관리자 승인 후 공개됩니다.");
}
