let deferredPrompt;

window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferredPrompt = e;
  document.getElementById('installBtn').style.display = 'block';
});

document.getElementById('installBtn').onclick = () => {
  if(deferredPrompt){
    deferredPrompt.prompt();
    deferredPrompt = null;
  }
};

setTimeout(()=>{
  document.getElementById('splash').style.display='none';
  document.querySelector('.topbar').classList.remove('hidden');
  document.getElementById('main').classList.remove('hidden');
},2500);

function toggleMenu(){
  const m=document.getElementById('menu');
  m.style.left = m.style.left==='0px' ? '-240px' : '0px';
}

function showScreen(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.getElementById('menu').style.left='-240px';
}
