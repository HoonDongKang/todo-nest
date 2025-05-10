class TextComponent {
  getString() {
    throw new Error('getString() must be implemented');
  }
}

class PlainText extends TextComponent {
  constructor(string) {
    super();
    this.string = string;
  }

  getString() {
    return this.string;
  }
}

class TextDecorator extends TextComponent {
  constructor(component) {
    super();
    this.component = component;
  }

  getString() {
    return this.component.getString();
  }
}

class UpperCaseDecorator extends TextDecorator {
  getString() {
    return this.component.getString().toUpperCase();
  }
}

class EmojiDecorator extends TextDecorator {
  getString() {
    return `😃 ${this.component.getString()} 😃`;
  }
}

class ExclamationDecorator extends TextDecorator {
  getString() {
    return this.component.getString() + '!';
  }
}

const text = new PlainText('hello');
const upperText = new UpperCaseDecorator(text);
const emojiUpperText = new EmojiDecorator(upperText);
const excitedEmojiUpperText = new ExclamationDecorator(emojiUpperText);

console.log(excitedEmojiUpperText.getString()); // 😃 HELLO 😃!
