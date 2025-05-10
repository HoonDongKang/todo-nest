//es5
function upperCaseDecorator(fn) {
  return function (string) {
    //함수 바인딩
    return fn.apply(this, [string.toUpperCase()]);
  };
}

function plainText(string) {
  return string;
}

var upperCaseText = upperCaseDecorator(plainText);
console.log(upperCaseText('hello')); // HELLO

//es6

//es7
