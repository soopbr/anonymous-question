const list = document.getElementById("list");

const OWNER = "soopbr";
const REPO = "anonymous-question";
const FILE_PATH = "data/questions.json";
const BRANCH = "main";

let questions = [];
let sha = "";

// 🔽 질문 불러오기
async function loadQuestions() {
  const token = document.getElementById("token").value;
  if (!token) {
    alert("토큰을 입력하세요");
    return;
  }

  const res = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`,
    {
      headers: { Authorization: `token ${token}` }
    }
  );

  if (!res.ok) {
    alert("토큰 오류 또는 권한 없음");
    return;
  }

  const file = await res.json();
  const content = JSON.parse(atob(file.content));

  questions = content.questions;
  sha = file.sha;

  render();
}

// 🔽 화면 출력
function render() {
  list.innerHTML = "";

  questions.forEach((q, i) => {
    const div = document.createElement("div");
    div.className = "admin-item";
    div.innerHTML = `
      <span>${q.text}</span>
      <button onclick="approve(${i})">${q.approved ? "✔ 승인됨" : "승인"}</button>
      <button onclick="removeQ(${i})">삭제</button>
    `;
    list.appendChild(div);
  });
}

// 🔽 GitHub 저장
async function saveQuestions() {
  const token = document.getElementById("token").value;

  const body = {
    message: "update questions",
    content: btoa(JSON.stringify({ questions }, null, 2)),
    sha,
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

  const result = await res.json();
  sha = result.content.sha;
}

// 🔽 승인 / 삭제
async function approve(i) {
  questions[i].approved = true;
  render();
  await saveQuestions();
}

async function removeQ(i) {
  if (confirm("삭제할까요?")) {
    questions.splice(i, 1);
    render();
    await saveQuestions();
  }
}

// 🔽 드래그 순서 변경
new Sortable(list, {
  animation: 150,
  onEnd: async evt => {
    const item = questions.splice(evt.oldIndex, 1)[0];
    questions.splice(evt.newIndex, 0, item);
    render();
    await saveQuestions();
  }
});
