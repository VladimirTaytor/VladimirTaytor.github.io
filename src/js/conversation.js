class Conversation {

  constructor() {
      MusicInterface.play(MUSIC_NAMES.INMATE);
  }

  removeDog() {}

  goToLastCheckPoint() {
    console.log('go back');
  }

  openConversation() {
    const div = document.getElementById('conversation');
    div.style.display = 'block';
    const display = document.getElementById('display');
    display.insertAdjacentHTML('beforeend', '<img class="left-dog" src="src/img/location_1/conversation/dog.gif" />');
    display.insertAdjacentHTML('beforeend', '<img class="pukich" src="src/img/location_1/conversation/pukich.png" />');
    display.insertAdjacentHTML('beforeend', '<img class="right-dog" src="src/img/location_1/conversation/dog.gif" />');
  }

  closeConversation() {
    document.getElementById('conversation').style.display = 'none';
  }

  renderMessages(messages) {
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

  renderDogMessage(message) {
    document.getElementById('dog-message').innerHTML = message;
  }
  /* Conversation 1 */
  startConversation1() {
    const phrases = Plot["1"]["1"];
    const messages = [{
        text: phrases["pukich"]["im_pukich"],
        action: goToStep1.bind(this)
      },
      {
        text: phrases["pukich"]["im_pizza_man"],
        action: goToStep2.bind(this)
      },
      {
        text: phrases["pukich"]["im_dog"],
        action: goToStep3.bind(this)
      },
    ];

    this.renderMessages(messages);
    this.renderDogMessage(phrases["dog"]["who_are_you"]);
    this.openConversation()

    function goToStep1() {
      let messages = [{
        text: phrases["pukich"]["dead"],
        action: this.goToLastCheckPoint
      }, ];
      this.renderDogMessage(phrases["dog"]["enemy_detected"]);
      this.renderMessages(messages);
    }

    function goToStep2() {
      let messages;
      if (items['pizza']) {
        messages = [{
          text: phrases["pukich"]["have_pizza"],
          action: goToStep21.bind(this)
        }];
      } else {
        messages = [{
          text: phrases["pukich"]["dont_have_pizza"],
          action: goToStep22.bind(this)
        }];
      }

      this.renderMessages(messages);
      this.renderDogMessage(phrases["dog"]["hungry"]);

      function goToStep21() {
        let messages = [{
          text: phrases["pukich"]["pizza_success"],
          action: console.log("destroy dog")
        }, ];
        this.renderDogMessage(phrases["dog"]["pizza"]);
        this.renderMessages(messages);
      }

      function goToStep22() {
        let messages = [{
          text: phrases["pukich"]["dead"],
          action: this.goToLastCheckPoint
        }, ];
        this.renderDogMessage(phrases["dog"]["no_pizza"]);
        this.renderMessages(messages);
      }
    }

    function goToStep3() {
      let messages = [{
        text: phrases["pukich"]["bark"],
        action: goToStep31.bind(this)
      }, ];
      this.renderDogMessage(phrases["dog"]["not_dog"]);
      this.renderMessages(messages);

      function goToStep31() {
        let messages = [{
          text: phrases["pukich"]["dead"],
          action: this.goToLastCheckPoint
        }, ];
        this.renderDogMessage(phrases["dog"]["enemy_detected"]);
        this.renderMessages(messages);
      }
    }
  }

  startConversation2() {
    const phrases = Plot["1"]["2"];
    const messages = [{
        text: phrases["pukich"]["6"],
        action: goToStep1.bind(this)
      },
      {
          text: phrases["pukich"]["5"],
          action: goToStep2.bind(this)
        },
        {
            text: phrases["pukich"]["8"],
            action: goToStep3.bind(this)
          }
    ];

    this.renderMessages(messages);
    this.renderDogMessage(phrases["dog"]["math_question"]);
    this.openConversation();

    function goToStep1() {
      let messages = [{
        text: phrases["pukich"]["dog_wrong"],
        action: goToStep11.bind(this)
      }];
      this.renderDogMessage(phrases["dog"]["wrong_answer"]);
      this.renderMessages(messages);
    }

    function goToStep11() {
      let messages = [{
        text: phrases["pukich"]["wrong"],
        action: this.goToLastCheckPoint
      }];
      this.renderDogMessage(phrases["dog"]["no"]);
      this.renderMessages(messages);
    }

    function goToStep2() {
      let messages = [{
        text: phrases["pukich"]["wrong"],
        action: this.goToLastCheckPoint
      }];
      this.renderDogMessage(phrases["dog"]["wrong_answer"]);
      this.renderMessages(messages);
    }

    function goToStep3() {
      let messages = [{
        text: phrases["pukich"]["right"],
        action: console.log("destroy dog")
      }];
      this.renderDogMessage(phrases["dog"]["right_answer"]);
      this.renderMessages(messages);
    }
  }
}
