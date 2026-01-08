// 🔑 기기 고유 ID 생성
function getUserId() {
  let id = localStorage.getItem("userId");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("userId", id);
  }
  return id;
}

function submitQuestion() {
  const userId = getUserId();
  const questions = JSON.parse(localStorage.getItem("questions") || "[]");

  // ✅ 이 기기에서 이미 질문했는지 확인
  const alreadySubmitted = questions.some(q => q.authorId === userId);

  if (alreadySubmitted) {
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
    authorId: userId   // ⭐ 핵심
  });

  localStorage.setItem("questions", JSON.stringify(questions));

  alert("질문이 제출되었습니다!");
  document.getElementById("question").disabled = true;
}
