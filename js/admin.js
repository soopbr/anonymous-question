const list = document.getElementById("list");
let questions = JSON.parse(localStorage.getItem("questions") || "[]");

function render() {
  list.innerHTML = "";

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

  localStorage.setItem("questions", JSON.stringify(questions));
}

function approve(i) {
  questions[i].approved = true;
  render();
}

function removeQ(i) {
  if (confirm("삭제할까요?")) {
    questions.splice(i, 1);
    render();
  }
}

render();
