const list = document.getElementById("list");
let questions = JSON.parse(localStorage.getItem("questions") || "[]");

function render() {
  list.innerHTML = "";

  questions.forEach((q, index) => {
    const div = document.createElement("div");
    div.className = "admin-item";
    div.dataset.index = index;

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

/* 🔥 드래그 정렬 */
new Sortable(list, {
  animation: 150,
  onEnd: function (evt) {
    const movedItem = questions.splice(evt.oldIndex, 1)[0];
    questions.splice(evt.newIndex, 0, movedItem);
    localStorage.setItem("questions", JSON.stringify(questions));
    render();
  }
});
