async function addMemoryEntry(text) {
  const res = await fetch('memory/core.json');
  const memory = await res.json();
  memory.memories.push({
    type: "pengalaman",
    content: text,
    date: new Date().toISOString().split('T')[0]
  });
  localStorage.setItem("core_memory", JSON.stringify(memory));
  return "Memori baru ditambahkan.";
}

async function editMemoryEntry(index, newText) {
  const res = await fetch('memory/core.json');
  const memory = await res.json();
  if (index >= 0 && index < memory.memories.length) {
    memory.memories[index].content = newText;
    localStorage.setItem("core_memory", JSON.stringify(memory));
    return "Memori berhasil diubah.";
  } else {
    return "Index tidak valid.";
  }
}
