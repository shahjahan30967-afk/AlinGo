const services = [
    { id: 'taxi', name: 'TAXI', icon: '🚕' },
    { id: 'food', name: 'FOOD', icon: '🍱' },
    { id: 'grocery', name: 'GROCERY', icon: '🛒' },
    { id: 'tickets', name: 'TICKETS', icon: '🎟️' },
    { id: 'shopping', name: 'SHOP', icon: '🛍️' },
    { id: 'travel', name: 'TRAVEL', icon: '✈️' }
];

window.renderButtons = function() {
    const wrapper = document.getElementById('button-wrapper');
    if (!wrapper) return;
    wrapper.innerHTML = '';

    const radius = 160; // یہ بٹنز کو ڈسک کے کنارے پر رکھے گا
    const centerX = 0; 
    const centerY = 0;

    services.forEach((s, i) => {
        const angle = (i * (360 / services.length)) * (Math.PI / 180);
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        const btn = document.createElement('div');
        btn.className = 'service-btn';
        btn.innerHTML = `<span>${s.icon}</span><span>${s.name}</span>`;
        
        // Positioning from center of disk
        btn.style.left = `calc(50% + ${x}px - 32px)`;
        btn.style.top = `calc(50% + ${y}px - 32px)`;
        
        btn.onclick = () => alert(`Opening ${s.name} Service...`);
        wrapper.appendChild(btn);
    });
};
