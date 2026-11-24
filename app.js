'use strict';
const form=document.querySelector('#builder');
const output=document.querySelector('#output');
const copy=document.querySelector('#copy');
const status=document.querySelector('#status');
const error=document.querySelector('#error');
function clearResult(){
  output.value='';
  copy.disabled=true;
  status.textContent='';
  error.textContent='';
}
form.addEventListener('input',clearResult);
form.addEventListener('submit',event=>{
  event.preventDefault();
  clearResult();
  try {
    output.value=buildUtmLink(Object.fromEntries(new FormData(form)));
    copy.disabled=false;
    status.textContent='Ready to copy.';
  } catch(problem) {
    error.textContent=problem.message;
  }
});
copy.addEventListener('click',async()=>{
  const captured=output.value;
  if(!captured) return;
  try {
    await navigator.clipboard.writeText(captured);
    if(output.value===captured) status.textContent='Link copied.';
  } catch {
    if(output.value!==captured) return;
    output.focus();
    output.select();
    status.textContent='Link selected. Use your device’s Copy command.';
  }
});
