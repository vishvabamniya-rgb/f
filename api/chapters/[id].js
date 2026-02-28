export default async function handler(req, res) {
  // CORS (safe)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  try {
    const { id } = req.query; // ✅ BOOK_ID
    if (!id) {
      return res.status(400).json({ error: "Missing book id" });
    }

    const url = `https://auth.ssccglpinnacle.com/api/chapters-ebook/${encodeURIComponent(id)}`;
    const r = await fetch(url, {
      headers: {
        "accept": "application/json",
        "user-agent": "Mozilla/5.0"
      }
    });

    const text = await r.text();
    return res.status(r.status).send(text);
  } catch (e) {
    return res.status(500).json({ error: String(e?.message || e) });
  }
}
