(function(){
var f=document.getElementById('contactForm'),st=document.getElementById('cf-status'),th=document.getElementById('cf-thanks'),btn=document.getElementById('cf-btn');
if(!f)return;
f.addEventListener('submit',function(e){
  e.preventDefault();
  if(f.elements['botcheck'].checked){f.hidden=true;th.hidden=false;return;}
  st.hidden=true;btn.disabled=true;var old=btn.textContent;btn.textContent='Lähetetään…';
  fetch(f.action,{method:'POST',headers:{'Accept':'application/json'},body:new FormData(f)})
    .then(function(r){return r.json().then(function(j){return{ok:r.ok,j:j};});})
    .then(function(x){
      if(x.ok&&x.j&&x.j.success){f.reset();f.hidden=true;th.hidden=false;th.scrollIntoView({behavior:'smooth',block:'center'});}
      else{throw new Error('fail');}
    })
    .catch(function(){
      st.textContent='Viestin lähetys epäonnistui. Yritä uudelleen tai lähetä viesti osoitteeseen syntynytsijoittamaan@proton.me.';
      st.hidden=false;
    })
    .then(function(){btn.disabled=false;btn.textContent=old;});
});
})();
