// 사용자 고유 ID
function getUserId() {
  let id = localStorage.getItem("userId");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("userId", id);
  }
  return id;
}

async function submitQuestion() {
  const text = document.getElementById("question").value.trim();
  if (!text) {
    alert("질문을 입력하세요");
    return;
  }

  const userId = getUserId();

  // GitHub에 있는 질문 읽기
  const res = await fetch(
    "https://raw.githubusercontent.com/soopbr/anonymous-question/main/data/questions.json"
  );
  const data = await res.json();

  // 같은 기기 중복 제출 방지
  const already = data.questions.some(q => q.authorId === userId);
  if (already) {
    alert("이미 질문을 제출했습니다.");
    return;
  }

  data.questions.push({
    id: Date.now(),
    text,
    approved: false,
    authorId: userId
  });

  alert("질문이 제출되었습니다!\n관리자 승인 대기 중입니다.");
  document.getElementById("question").disabled = true;
}
