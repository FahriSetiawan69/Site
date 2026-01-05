export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/api/ping") {
      return new Response(JSON.stringify({ status: "ok" }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    if (url.pathname === "/api/update" && request.method === "POST") {
      const data = await request.json();

      // NANTI: simpan ke KV / memory
      console.log("Incoming data:", data);

      return new Response(JSON.stringify({ success: true }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    return new Response("Not Found", { status: 404 });
  }
};
