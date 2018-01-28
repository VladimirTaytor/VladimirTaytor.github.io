class Conversation {

  destroyDog(id) {
    game_dont_touch.destroyDog(id);
    this.closeConversation();
    MusicInterface.play(MUSIC_NAMES.IN_GAME);
  }

  goToLastCheckPoint() {
    game_dont_touch.backToStart();
    MusicInterface.play(MUSIC_NAMES.IN_GAME);
    document.getElementById('conversation').style.display = 'none';
  }

  openConversation() {
    const div = document.getElementById('conversation');
    div.style.display = 'block';
    const display = document.getElementById('display');
    Array.from(display.querySelectorAll('img'))
        .forEach(img => img.remove());
    MusicInterface.play(MUSIC_NAMES.INMATE);
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
  startConversation1(dog_id) {
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
          action: () => this.destroyDog(dog_id)
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

  startConversation2(dog_id) {
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
        text: phrases["pukich"]["wrong5"],
        action: this.goToLastCheckPoint
      }];
      this.renderDogMessage(phrases["dog"]["wrong_answer"]);
      this.renderMessages(messages);
    }

    function goToStep3() {
      let messages = [{
        text: phrases["pukich"]["right"],
        action: () => this.destroyDog(dog_id)
      }];
      this.renderDogMessage(phrases["dog"]["right_answer"]);
      this.renderMessages(messages);
    }
  }

  startConversation3(dog_id) {
    const phrases = Plot["1"]["3"];
    const messages = [{
        text: phrases["pukich"]["yes"],
        action: goToStep1.bind(this)
      },
      {
        text: phrases["pukich"]["no"],
        action: goToStep2.bind(this)
      }
    ];

    this.renderMessages(messages);
    this.renderDogMessage(phrases["dog"]["snake"]);
    this.openConversation();

    function goToStep1() {
      let messages = [{
        text: phrases["pukich"]["snake"],
        action: () => this.destroyDog(dog_id)
      }];
      this.renderDogMessage(phrases["dog"]["dead"]);
      this.renderMessages(messages);

      document.getElementsByClassName('right-dog')[0].src = 'src/img/location_1/conversation/shocked_dog.png'
    }

    function goToStep2() {
      let messages = [{
        text: phrases["pukich"]["no_snake"],
        action: () => this.destroyDog(dog_id)
      }];
      this.renderDogMessage(phrases["dog"]["no_snake"]);
      this.renderMessages(messages);
    }
  }
}
