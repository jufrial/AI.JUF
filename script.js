async function sendInput() {
  const input = document.getElementById("userInput").value.trim();
  const responseBox = document.getElementById("responseBox");

  const res = await respondToUser(input);
  responseBox.textContent = res;

  saveLog(input, res);
}

// Tambah memori manual
async function addMemory() {
  const newContent = document.getElementById("newMemoryInput").value.trim();
  if (newContent) {
    const result = await addMemoryEntry(newContent);
    alert(result);
  }
}

// Edit memori manual
async function editMemory() {
  const index = parseInt(document.getElementById("editIndex").value);
  const newText = document.getElementById("editContent").value.trim();
  if (!isNaN(index) && newText) {
    const result = await editMemoryEntry(index, newText);
    alert(result);
  }
}

// Log interaksi
async function saveLog(input, output) {
  const log = {
    time: new Date().toLocaleTimeString(),
    interaction: input,
    reaction: output
  };
  let logs = JSON.parse(localStorage.getItem("logs") || "[]");
  logs.push(log);
  localStorage.setItem("logs", JSON.stringify(logs));
}
