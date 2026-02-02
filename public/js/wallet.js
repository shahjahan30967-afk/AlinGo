const token = localStorage.getItem("token");
if(!token){ alert("Please login"); window.location.href="/index.html"; }

async function addFunds(){
  const amount = document.getElementById("amount").value;
  const res = await fetch("/api/wallet/add", {
    method:"POST",
    headers:{ "Content-Type":"application/json", "Authorization": `Bearer ${token}` },
    body: JSON.stringify({ amount })
  });
  const data = await res.json();
  if(data.success){ alert("Funds added"); showTx(); }
  else alert("Error adding funds");
}

async function showTx(){
  const res = await fetch("/api/wallet/list", {
    method:"GET",
    headers:{ "Authorization": `Bearer ${token}` }
  });
  const txs = await res.json();
  const list = document.getElementById("txList");
  list.innerHTML = "";
  txs.forEach(t => {
    const li = document.createElement("li");
    li.textContent = `${t.type}: ${t.amount} - ${t.status}`;
    list.appendChild(li);
  });
}

showTx();
