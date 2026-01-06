/* RESET */
* {
  box-sizing: border-box;
}

body, html {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: 'Segoe UI', system-ui, sans-serif;
  color: #fff;
  background: #0b061a;
}

/* BACKGROUND */
.background {
  position: fixed;
  inset: 0;
  background: url('../img/background.jpg') no-repeat center center / cover;
  filter: brightness(0.35);
  z-index: -1;
}

/* APP LAYOUT */
#app {
  display: flex;
  height: 100vh;
}

/* SIDEBAR */
.sidebar {
  width: 240px;
  background: rgba(25, 10, 60, 0.85);
  backdrop-filter: blur(18px);
  box-shadow: 4px 0 30px rgba(140, 0, 255, 0.35);
  padding: 25px 20px;
  display: flex;
  flex-direction: column;
}

.logo {
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 40px;
  line-height: 1.1;
}

.logo span {
  font-size: 18px;
  color: #c084ff;
}

.sidebar nav a {
  display: block;
  padding: 12px 16px;
  margin-bottom: 10px;
  border-radius: 12px;
  color: #ddd;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.25s ease;
}

.sidebar nav a:hover {
  background: rgba(140, 0, 255, 0.25);
  color: #fff;
}

.sidebar nav a.active {
  background: linear-gradient(90deg, #8c00ff, #ff00ff);
  color: #fff;
  box-shadow: 0 0 20px rgba(140, 0, 255, 0.7);
}

/* MAIN AREA */
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* TOP BAR */
.topbar {
  height: 64px;
  background: rgba(40, 15, 90, 0.75);
  backdrop-filter: blur(16px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 25px;
  box-shadow: 0 4px 25px rgba(140, 0, 255, 0.25);
}

.account-info {
  font-size: 14px;
  color: #e6d6ff;
}

.account-info select {
  margin-left: 8px;
  padding: 6px 10px;
  border-radius: 8px;
  border: none;
  background: rgba(0, 0, 0, 0.35);
  color: #fff;
  outline: none;
}

.logout-btn {
  padding: 8px 18px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  background: linear-gradient(90deg, #ff0077, #ff00ff);
  color: #fff;
  box-shadow: 0 0 18px rgba(255, 0, 180, 0.6);
  transition: transform 0.2s ease;
}

.logout-btn:hover {
  transform: scale(1.05);
}

/* CONTENT */
.content {
  flex: 1;
  padding: 25px;
  overflow-y: auto;
}

/* STATS */
.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: rgba(30, 10, 70, 0.75);
  border-radius: 18px;
  padding: 20px;
  box-shadow: inset 0 0 15px rgba(255,255,255,0.04),
              0 0 25px rgba(140, 0, 255, 0.5);
}

.stat-card h4 {
  margin: 0 0 10px;
  font-size: 14px;
  color: #d6c2ff;
}

.stat-card span {
  font-size: 28px;
  font-weight: 700;
  color: #fff;
}

/* PANELS */
.panels {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.panel {
  background: rgba(20, 8, 50, 0.7);
  border-radius: 20px;
  padding: 20px;
  box-shadow: inset 0 0 12px rgba(255,255,255,0.04),
              0 0 25px rgba(140, 0, 255, 0.45);
}

.panel h3 {
  margin: 0 0 15px;
  font-size: 18px;
  color: #ffccff;
  border-bottom: 1px solid rgba(255,255,255,0.15);
  padding-bottom: 8px;
}

.panel div > div {
  padding: 6px 0;
  font-size: 14px;
  border-bottom: 1px dashed rgba(255,255,255,0.12);
    }
