async function respondToUser(input) {
  const res = await fetch('memory/core.json');
  const memory = await res.json();

  if (input.includes("siapa namamu")) {
    return `Namaku ${memory.name}. Kita pernah ketemu di ${memory.memories[0].content}`;
  } else if (input.includes("apa kamu ingat")) {
    return `Aku ingat: ${memory.memories.map((m, i) => i + '. ' + m.content).join("\n")}`;
  } else if (input.startsWith("cari:")) {
    const query = input.replace("cari:", "").trim();
    return await searchOnline(query);
  } else if (input.startsWith("ingatkan:")) {
    const newMem = input.replace("ingatkan:", "").trim();
    await addMemoryEntry(newMem);
    return `Oke, aku akan mengingat: "${newMem}"`;
  } else {
    return "Aku masih belajar dari pengalaman. Coba ajarkan aku sesuatu ❤️";
  }
}

async function searchOnline(query) {
  const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_redirect=1`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.AbstractText) {
      return `Aku menemukan ini: ${data.AbstractText}`;
    } else {
      return "Aku tidak menemukan informasi spesifik. Coba ganti pertanyaan ya.";
    }
  } catch (e) {
    return "Ups, aku gagal mengakses internet 😢";
  }
}
