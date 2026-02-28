export default async function handler(req, res) {
  try {
    const url = "https://auth.ssccglpinnacle.com/api/ebooksforactive?active=true";
    const r = await fetch(url, {
      headers: {
        "accept": "application/json",
        "user-agent": "Mozilla/5.0"
      }
    });

    const text = await r.text();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (!r.ok) {
      return res.status(r.status).send(text);
    }

    // ensure json
    return res.status(200).send(text);
  } catch (e) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.status(500).json({ error: String(e?.message || e) });
  }
}