async function searchOnline(query) {
  const proxy = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_redirect=1`;
  try {
    const res = await fetch(proxy);
    const data = await res.json();
    if (data.AbstractText) {
      return `Aku menemukan ini: ${data.AbstractText}`;
    } else {
      return "Aku tidak menemukan informasi langsung, tapi kamu bisa coba cari lebih detail.";
    }
  } catch (e) {
    return "Maaf, aku gagal mengakses internet 😢";
  }
}
