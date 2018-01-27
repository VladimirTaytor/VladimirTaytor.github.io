
/*
 * message = {
 text: text,
 action: function
}
 */

 function openConversation() {
   const div = document.getElementById('conversation');
   div.style.display = 'block';
   const display = document.getElementById('display');
   display.insertAdjacentHTML('beforeend', '<img class="left-dog" src="src/sobakarobotzboky/l0_sprite_1.png" />');
   display.insertAdjacentHTML('beforeend', '<img class="pukich" src="src/sobakarobotzboky/pukich.png" />');
   display.insertAdjacentHTML('beforeend', '<img class="right-dog" src="src/sobakarobotzboky/l0_sprite_1.png" />');
 }

 function closeConversation() {
   document.getElementById('conversation').style.display = 'none';
 }

 function renderMessages(messages) {
   const list = document.getElementById('messages-list');
   list.innerHTML = '';
   messages.forEach((message) => {
     let div = document.createElement('div');
     div.innerHTML = message.text;
     div.className = "message";
     div.onclick = message.action;
     list.appendChild(div);
   });
 }

const messages = [{
  text: "closeConversation()",
  action: () => closeConversation()
},
{
  text: "message1 2",
  action: () => console.log("click on message1 2")
},
{
  text: "message1 3",
  action: () => console.log("click on message1 3")
}];

renderMessages(messages);

openConversation();

function removeDog() {
}

function goToLastCheckPoint() {
}
