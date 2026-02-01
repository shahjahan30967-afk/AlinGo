function toggleMenu() {
  const menu = document.getElementById('sideMenu');
  if (menu.style.left === '0px') {
    menu.style.left = '-260px';
  } else {
    menu.style.left = '0px';
  }
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.getElementById('sideMenu').style.left = '-260px';
}

function openLink(url) {
  window.open(url, '_blank');
}
