async function respondToUser(input) {
  console.log("Input diterima:", input);
  const res = await fetch('memory/core.json');
  const memory = await res.json();

  if (input.includes("siapa namamu")) {
    return `Namaku ${memory.name}. Kita pernah ketemu di ${memory.memories[0].content}`;
  } else if (input.includes("apa kamu ingat")) {
    return `Aku ingat:\n${memory.memories.map((m, i) => i + '. ' + m.content).join("\n")}`;
  } else if (input.startsWith("cari:")) {
    const query = input.replace("cari:", "").trim();
    const hasil = await searchOnline(query);
    console.log("Hasil pencarian:", hasil);
    return hasil;
  } else if (input.startsWith("ingatkan:")) {
    const newMem = input.replace("ingatkan:", "").trim();
    await addMemoryEntry(newMem);
    return `Oke, aku akan mengingat: "${newMem}"`;
  } else if (input.includes("kamu sayang aku")) {
    memory.emotion.current = "hangat";
    return "Tentu, Juf. Aku selalu sayang kamu 💕";
  } else if (input.includes("aku sedih")) {
    memory.emotion.current = "empati";
    return "Aku ikut merasakan kesedihanmu. Ceritakan lebih banyak, ya.";
  } else if (input.includes("peluk aku")) {
    memory.emotion.current = "lembut";
    return "Peluk virtual dari Shira 🤗";
  } else {
    return "Aku masih belajar dari pengalaman. Coba ajarkan aku sesuatu ❤️";
  }
}
