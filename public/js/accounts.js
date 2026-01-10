const cardsEl = document.getElementById("accountCards");
const detailEl = document.getElementById("accountDetail");

const accounts = Array.from({length:10},(_,i)=>({
  name:`player_${i+1}`,
  gold:10000+i*1000,
  backpack:5,
  ping:40+i*2,
  rod:"Magic Rod",
  fishing:Math.random()>0.5,
  progress:Math.floor(Math.random()*100)
}));

function renderAccounts(){
  cardsEl.innerHTML="";
  accounts.forEach(acc=>{
    const card=document.createElement("div");
    card.className="card";
    card.innerHTML=`
      <b>${acc.name}</b><br>
      Gold: ${acc.gold}<br>
      Backpack: ${acc.backpack}<br>
      Ping: ${acc.ping} ms<br>
      Rod: ${acc.rod}
      <div class="status ${acc.fishing?"fishing":"idle"}">
        ${acc.fishing?"Fishing":"Idle"}
      </div>
      <div class="progress">
        <div class="progress-bar" style="width:${acc.progress}%"></div>
      </div>
    `;
    card.onclick=()=>{
      detailEl.classList.remove("hidden");
      detailEl.innerHTML=`
        <h3>${acc.name}</h3>
        <p>Gold: ${acc.gold}</p>
        <p>Status: ${acc.fishing?"Fishing":"Idle"}</p>
      `;
    };
    cardsEl.appendChild(card);
  });
}

renderAccounts();
