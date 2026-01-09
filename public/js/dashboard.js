/* ===============================
   RESET & BASE
================================ */
* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  background: #0b0614;
  font-family: Inter, system-ui, sans-serif;
}

/* ===============================
   APP LAYOUT
================================ */
#app {
  min-height: 100vh;
  display: flex;
  background: linear-gradient(135deg, #120522, #1b0833);
}

/* ===============================
   SIDEBAR
================================ */
.sidebar {
  width: 220px;
  padding: 16px;
  background: linear-gradient(180deg, #2a0d4a, #160728);
  color: #fff;
}

.sidebar h2 {
  margin: 0 0 12px;
  font-size: 18px;
}

#logoutBtn {
  padding: 8px 12px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}

/* ===============================
   MAIN CONTENT
================================ */
.main {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  background: radial-gradient(circle at top, #2b0f4a, #0b0614);
}

/* ===============================
   CARD GRID
================================ */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
  width: 100%;
}

/* ===============================
   ACCOUNT CARD
================================ */
.account-card {
  background: rgba(20, 8, 40, 0.85);
  border-radius: 14px;
  padding: 14px;
  color: #fff;
  cursor: pointer;
  box-shadow: 0 0 18px rgba(140, 80, 255, 0.25);
}

.account-card h3 {
  margin: 0 0 8px;
  font-size: 16px;
}

.account-card p {
  margin: 4px 0;
  font-size: 14px;
}

/* ===============================
   STATUS BADGE
================================ */
.status {
  margin-top: 8px;
  padding: 6px;
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
}

.status.fishing {
  background: #1f8f4a;
  color: #b6ffda;
}

.status.idle {
  background: #8f1f1f;
  color: #ffb6b6;
}

/* ===============================
   PROGRESS BAR
================================ */
.progress-bar {
  margin-top: 8px;
  height: 8px;
  border-radius: 6px;
  background: rgba(255,255,255,0.2);
  overflow: hidden;
}

.progress {
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, #7f3cff, #b36bff);
  transition: width 0.3s;
}

/* ===============================
   DETAIL PANEL
================================ */
.detail-panel {
  margin-top: 20px;
  padding: 16px;
  border-radius: 14px;
  background: rgba(25, 10, 50, 0.9);
  color: #fff;
}

.hidden {
  display: none;
}

/* ===============================
   MOBILE FIX
================================ */
@media (max-width: 768px) {
  #app {
    flex-direction: row;
  }

  .sidebar {
    width: 160px;
  }

  .card-grid {
    grid-template-columns: 1fr;
  }
}
