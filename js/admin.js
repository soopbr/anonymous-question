// admin.js (최종본)

const list = document.getElementById("list");

const OWNER = "soopbr";
const REPO = "anonymous-question";
const FILE_PATH = "data/questions.json";
const BRANCH = "main";

let questions = [];
let sha = "";

/* =========================
   질문 불러오기
========================= */
async function loadQuestions() {
  const token = document.getElementById("token").value;
  if (!token) {
    alert("GitHub 토큰을 입력하세요");
    return;
  }

  // 1️⃣ GitHub에서 questions.json 읽기
  const res = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`,
    {
      headers: {
        Authorization: `token ${token}`
      }
    }
  );

  if (!res.ok) {
    alert("GitHub에서 질문을 불러오지 못했습니다.");
    return;
  }

  const file = await res.json();
  const content = JSON.parse(atob(file.content));

  questions = content.questions;
  sha = file.sha;

  // 2️⃣ localStorage에 있는 대기 질문 합치기
  const pending =
    JSON.parse(localStorage.getItem("pendingQuestions") || "[]");

  if (pending.length > 0) {
    questions = [...pending, ...questions];
    localStorage.removeItem("pendingQuestions");
  }

  render();
}

/* =========================
   화면 렌더링
========================= */
function render() {
  list.innerHTML = "";

  if (questions.length === 0) {
    list.innerHTML = "<p>질문이 없습니다.</p>";
    return;
  }

  questions.forEach((q, index) => {
    const div = document.createElement("div");
    div.className = "admin-item";
    div.innerHTML = `
      <span>${q.text}</span>
      <div>
        <button onclick="approve(${index})">
          ${q.approved ? "✔ 승인됨" : "승인"}
        </button>
        <button onclick="removeQ(${index})">삭제</button>
      </div>
    `;
    list.appendChild(div);
  });
}

/* =========================
   GitHub에 저장
========================= */
async function saveQuestions() {
  const token = document.getElementById("token").value;

  const body = {
    message: "update questions",
    content: btoa(
      JSON.stringify({ questions }, null, 2)
    ),
    sha: sha,
    branch: BRANCH
  };

  const res = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`,
    {
      method: "PUT",
      headers: {
        Authorization: `token ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }
  );

  if (!res.ok) {
    alert("GitHub 저장 실패");
    return;
  }

  const result = await res.json();
  sha = result.content.sha;
}

/* =========================
   승인 / 삭제
========================= */
async function approve(index) {
  questions[index].approved = true;
  render();
  await saveQuestions();
}

async function removeQ(index) {
  if (!confirm("이 질문을 삭제할까요?")) return;
  questions.splice(index, 1);
  render();
  await saveQuestions();
}

/* =========================
   드래그 순서 변경
========================= */
new Sortable(list, {
  animation: 150,
  onEnd: async function (evt) {
    const item = questions.splice(evt.oldIndex, 1)[0];
    questions.splice(evt.newIndex, 0, item);
    render();
    await saveQuestions();
  }
});
