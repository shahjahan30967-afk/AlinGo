const services = [
    { name: 'TAXI', icon: '🚕' },
    { name: 'FOOD', icon: '🍱' },
    { name: 'GROCERY', icon: '🛒' },
    { name: 'TICKETS', icon: '🎟️' },
    { name: 'SHOP', icon: '🛍️' },
    { name: 'TRAVEL', icon: '✈️' }
];

function drawNodes() {
    const container = document.getElementById('nodes-container');
    if(!container) return;
    
    const radius = 160; // ڈسک کا آدھا سائز
    const total = services.length;

    services.forEach((s, i) => {
        const angle = (i * (360 / total)) * (Math.PI / 180);
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        const el = document.createElement('div');
        el.className = 'node';
        el.innerHTML = `<span>${s.icon}</span><span>${s.name}</span>`;
        
        // یہ لائن بٹنز کو ڈسک کے کنارے پر سیٹ کرے گی
        el.style.left = `calc(50% + ${x}px - 30px)`;
        el.style.top = `calc(50% + ${y}px - 30px)`;
        
        el.onclick = () => alert(s.name + " Service Coming Soon!");
        container.appendChild(el);
    });
}

// پیج لوڈ ہونے پر بٹنز بنائیں
window.onload = drawNodes;
