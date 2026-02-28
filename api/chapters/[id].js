export default async function handler(req, res) {
  // CORS headers (important)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Preflight support
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: "Missing book id" });
    }

    const targetURL = `https://auth.ssccglpinnacle.com/api/chapters-ebook/${encodeURIComponent(id)}`;

    const response = await fetch(targetURL, {
      headers: {
        "accept": "application/json",
        "user-agent": "Mozilla/5.0"
      }
    });

    const data = await response.text();

    return res.status(response.status).send(data);

  } catch (error) {
    return res.status(500).json({
      error: "Proxy error",
      message: String(error?.message || error)
    });
  }
}