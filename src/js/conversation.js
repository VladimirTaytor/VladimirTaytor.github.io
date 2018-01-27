
 function openConversation() {
   const div = document.getElementById('conversation');
   div.style.display = 'block';
   const display = document.getElementById('display');
   display.insertAdjacentHTML('beforeend', '<img class="left-dog" src="src/img/location_1/conversation/dog.png" />');
   display.insertAdjacentHTML('beforeend', '<img class="pukich" src="src/img/location_1/conversation/pukich.png" />');
   display.insertAdjacentHTML('beforeend', '<img class="right-dog" src="src/img/location_1/conversation/dog.png" />');
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

 function renderDogMessage(message) {
   document.getElementById('dog-message').innerHTML = message;
 }

function removeDog() {
}

function goToLastCheckPoint() {
  console.log('go back');
}

/* Conversation 1 */
function startConversation1() {
  const phrases = Plot["1"];
  const messages = [
    {text: phrases["pukich"]["im_pukich"], action: goToStep1},
    {text: phrases["pukich"]["im_pizza_man"], action: goToStep2},
    {text: phrases["pukich"]["im_dog"], action: goToStep3},
  ];

  renderMessages(messages);
  renderDogMessage(phrases["dog"]["who_are_you"]);
  openConversation()

  function goToStep1() {
    let messages = [
      {text: phrases["pukich"]["dead"], action: goToLastCheckPoint},
    ];
    renderDogMessage(phrases["dog"]["enemy_detected"]);
    renderMessages(messages);
  }

  function goToStep2() {
    let messages;
    if(items['pizza']) {
      messages = [
        {text: phrases["pukich"]["have_pizza"], action: goToStep21}
      ];
    } else {
      messages = [
        {text: phrases["pukich"]["dont_have_pizza"], action: goToStep22}
      ];
    }

    renderMessages(messages);
    renderDogMessage(phrases["dog"]["hungry"]);

    function goToStep21() {
      let messages = [
        {text: phrases["pukich"]["pizza_success"], action: console.log("destroy dog")},
      ];
      renderDogMessage(phrases["dog"]["pizza"]);
      renderMessages(messages);
    }

    function goToStep22() {
      let messages = [
        {text: phrases["pukich"]["dead"], action: goToLastCheckPoint},
      ];
      renderDogMessage(phrases["dog"]["no_pizza"]);
      renderMessages(messages);
    }
  }

  function goToStep3() {
    let messages = [
      {text: phrases["pukich"]["bark"], action: goToStep31},
    ];
    renderDogMessage(phrases["dog"]["not_dog"]);
    renderMessages(messages);

    function goToStep31() {
      let messages = [
        {text: phrases["pukich"]["dead"], action: goToLastCheckPoint},
      ];
      renderDogMessage(phrases["dog"]["enemy_detected"]);
      renderMessages(messages);
    }
  }
}

startConversation1()
