const publicPages = ["index.html", "login.html", "welcome.html"];
const currentPage =
  window.location.pathname.split("/").pop() || "index.html";

if (
  !localStorage.getItem("loggedIn") &&
  !publicPages.includes(currentPage)
) {
  window.location.replace("login.html");
}

function applyTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light");
  } else {
    document.body.classList.remove("light");
  }
}

function toggleTheme() {
  const isLight = document.body.classList.toggle("light");
  localStorage.setItem("theme", isLight ? "light" : "dark");
}

document.addEventListener("DOMContentLoaded", () => {
  applyTheme();

  const themeToggleBtn = document.querySelector(".toggle-theme");
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", toggleTheme);
  }

  renderTasks();
  updateStats();

  if ("Notification" in window && Notification.permission === "default") {
    Notification.requestPermission();
  }
});


function logout() {
  localStorage.removeItem("loggedIn");
  window.location.replace("login.html");
}

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask(textFromTemplate = null) {
  const input = document.getElementById("taskInput");
  const reminderInput = document.getElementById("reminderInput");
  const repeatInput = document.getElementById("repeatInput");

  const text = textFromTemplate || input?.value?.trim();
  if (!text) return;

  const reminder = reminderInput?.value
    ? new Date(reminderInput.value).getTime()
    : null;

  tasks.push({
    text,
    completed: false,
    reminder,
    recurring: repeatInput?.value || "none"
  });

  if (input) input.value = "";
  if (reminderInput) reminderInput.value = "";
  if (repeatInput) repeatInput.value = "none";

  saveTasks();
  renderTasks();
  updateStats();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
  updateStats();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
  updateStats();
}

function filterTasks(type) {
  currentFilter = type;
  renderTasks();
}

function renderTasks() {
  const list = document.getElementById("taskList");
  if (!list) return;

  list.innerHTML = "";

  let filtered = tasks;
  if (currentFilter === "active") {
    filtered = tasks.filter(t => !t.completed);
  }
  if (currentFilter === "completed") {
    filtered = tasks.filter(t => t.completed);
  }

  if (filtered.length === 0) {
    const empty = document.createElement("li");
    empty.className = "empty-state";
    empty.innerHTML = `
      <div class="empty-icon">📦</div>
      <p>No tasks yet</p>
    `;
    list.appendChild(empty);
    return;
  }

  filtered.forEach((task, i) => {
    const li = document.createElement("li");
    li.className = "task-item";

    li.innerHTML = `
      <label>
        <input type="checkbox" ${task.completed ? "checked" : ""}
               onclick="toggleTask(${i})">
        <span class="${task.completed ? "done" : ""}">
          ${task.text}
        </span>
      </label>

      <small style="color:#94a3b8;">
        ${task.recurring !== "none" ? `⏰ ${task.recurring}` : ""}
      </small>

      <button onclick="deleteTask(${i})">✕</button>
    `;

    list.appendChild(li);
  });
}

function updateStats() {
  const t = document.getElementById("totalTasks");
  const c = document.getElementById("completedTasks");
  const a = document.getElementById("activeTasks");

  if (!t || !c || !a) return;

  const completed = tasks.filter(t => t.completed).length;

  t.textContent = tasks.length;
  c.textContent = completed;
  a.textContent = tasks.length - completed;
}

function clearTasks() {
  if (!confirm("Delete all tasks?")) return;
  tasks = [];
  saveTasks();
  renderTasks();
  updateStats();
}

document.addEventListener("DOMContentLoaded", () => {
  applyTheme();
  renderTasks();
  updateStats();

  if ("Notification" in window && Notification.permission === "default") {
    Notification.requestPermission();
  }
});

setInterval(() => {
  if (!tasks.length) return;

  const now = Date.now();

  tasks.forEach(task => {
    if (task.reminder && !task.completed && task.reminder <= now) {
      if (Notification.permission === "granted") {
        new Notification("SUMN Reminder", { body: task.text });
      }

      if (task.recurring === "daily") {
        task.reminder += 86400000;
      } else if (task.recurring === "weekly") {
        task.reminder += 604800000;
      } else {
        task.reminder = null;
      }

      saveTasks();
    }
  });
}, 10000);

const themeToggleBtn = document.querySelector('.toggle-theme');

if (themeToggleBtn) {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light');
    }

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light');

        if (document.body.classList.contains('light')) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }
    });
}
