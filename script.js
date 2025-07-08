async function sendInput() {
  const input = document.getElementById("userInput").value;
  const responseBox = document.getElementById("responseBox");
  const response = await respondToUser(input);
  responseBox.textContent = response;
}

async function respondToUser(input) {
  const res = await fetch('memory/core.json');
  const memory = await res.json();

  if (input.includes("siapa namamu")) {
    return `Namaku ${memory.name}. Kita pernah ketemu di ${memory.memories[0].content}`;
  } else if (input.startsWith("cari:")) {
    const query = input.replace("cari:", "").trim();
    const result = await searchOnline(query);
    return result;
  } else {
    return "Aku masih belajar, bisa kamu ulangi dengan cara lain?";
  }
}
