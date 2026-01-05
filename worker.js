// ===============================
// DUMMY DATA 16 AKUN
// ===============================
let clients = {};

for (let i = 1; i <= 16; i++) {
  clients["account_" + i] = {
    username: "Account_" + i,
    fish: Math.floor(Math.random() * 300),
    money: Math.floor(Math.random() * 50000),
    status: "Fishing",
    time: Date.now()
  };
}

// ===============================
// HTML DASHBOARD
// ===============================
const html = () => `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Fish It - Multi Account Monitor</title>
<style>
body {
  margin: 0;
  padding: 20px;
  font-family: Arial, sans-serif;
  background: #020617;
  color: #e5e7eb;
}
h1 {
  color: #38bdf8;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;
}
.card {
  background: #020617;
  border: 1px solid #1e293b;
  border-radius: 10px;
  padding: 12px;
  box-shadow: 0 0 10px rgba(0,0,0,.3);
}
.status {
  color: #22c55e;
  font-weight: bold;
}
small {
  color: #94a3b8;
}
</style>
</head>
<body>

<h1>🎣 Fish It – 16 Account Monitor</h1>
<p>Realtime dashboard (dummy data)</p>

<div class="grid" id="grid"></div>

<script>
async function load() {
  const res = await fetch('/data');
  const data = await res.json();
  const grid = document.getElementById('grid');
  grid.innerHTML = '';

  Object.values(data).forEach(acc => {
    grid.innerHTML += \`
      <div class="card">
        <b>\${acc.username}</b><br><br>
        🐟 Fish: <b>\${acc.fish}</b><br>
        💰 Money: <b>\${acc.money}</b><br>
        📡 Status: <span class="status">\${acc.status}</span><br><br>
        <small>Updated: \${new Date(acc.time).toLocaleTimeString()}</small>
      </div>
    \`;
  });
}

// refresh tiap 2 detik
setInterval(load, 2000);
load();
</script>

</body>
</html>
`;

// ===============================
// CLOUDFLARE WORKER
// ===============================
export default {
  async fetch(req) {
    const url = new URL(req.url);

    // Dashboard
    if (req.method === "GET" && url.pathname === "/") {
      return new Response(html(), {
        headers: { "Content-Type": "text/html" }
      });
    }

    // JSON data
    if (req.method === "GET" && url.pathname === "/data") {
      return new Response(JSON.stringify(clients), {
        headers: { "Content-Type": "application/json" }
      });
    }

    // Endpoint update (nanti dipakai Lua)
    if (req.method === "POST" && url.pathname === "/update") {
      const body = await req.json();

      clients[body.username] = {
        username: body.username,
        fish: body.fish,
        money: body.money,
        status: body.status,
        time: Date.now()
      };

      return new Response("OK");
    }

    return new Response("Not Found", { status: 404 });
  }
};