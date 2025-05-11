import 'reflect-metadata';
//es5
// function upperCaseDecorator(fn) {
//   return function (string) {
//     //함수 바인딩
//     return fn.apply(this, [string.toUpperCase()]);
//   };
// }

// function plainText(string) {
//   return string;
// }

// var upperCaseText = upperCaseDecorator(plainText);
// console.log(upperCaseText('hello')); // HELLO

//es6

//es7 ts
//Class Decorator
function Logger(constructor: Function) {
  console.log('Class was created:', constructor.name);
}

function AddCreatedAt<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class Person extends constructor {
    createdAt = new Date();
  };
}

function LoggerInstance<T extends { new (...args: any[]): { name: string } }>(
  constructor: T,
) {
  return class Person extends constructor {
    constructor(...args: any[]) {
      super(...args);
      console.log(`Instance was created: ${this.name}`);
    }
  };
}

// // 관찰
// @Logger
// // 수정
// @AddCreatedAt
// // 교체
// @LoggerInstance
// class Person {
//   name: string;

//   constructor(name: string) {
//     this.name = name;
//   }
// }

// const person1 = new Person('DongHoon');
// console.log((person1 as any).createdAt);
// const person2 = new Person('Danny');
// console.log((person2 as any).createdAt);

//method Decorator
function LogMethod(
  target: any,
  propertyName: string,
  descriptor: PropertyDescriptor,
) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`📌 ${propertyName} called with args:`, args);
    const result = originalMethod.apply(this, args);
    console.log(`✅ ${propertyName} returned:`, result);
    return result;
  };

  return descriptor;
}

function LogAccessor(
  target: any,
  propertyName: string,
  descriptor: PropertyDescriptor,
) {
  const originalGetter = descriptor.get;

  descriptor.get = function () {
    const result = originalGetter?.apply(this);
    console.log(`Getting it's price`);
    return result;
  };

  return descriptor;
}

function LogProperty(target: any, propertyKey: string) {
  console.log(`property ${propertyKey} was declared`);
}

function LogParam(target: any, propertyKey: string, parameterIndex: number) {
  console.log(`${propertyKey} method's parameter index: ${parameterIndex}`);
}

// class Calculator {
//   // private _price: number = 5000;
//   // @LogProperty
//   // _price: number = 5000;
//   add(@LogParam a: number, @LogParam b: number): number {
//     return a + b;
//   }
//   multiply(@LogParam a: number, @LogParam b: number): number {
//     return a * b;
//   }
//   // @LogAccessor
//   // get price() {
//   //   return this._price;
//   // }
// }

// const calc = new Calculator();
// console.log(calc._price);
// calc.add(2, 3);
// calc.multiply(4, 5);

// const formatMetadataKey = Symbol('format');
// function format(formatString: string) {
//   return Reflect.metadata(formatMetadataKey, formatString);
// }
// function getFormat(target: any, propertyKey: string) {
//   return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
// }

// class Greeter {
//   @format('Hello, %s')
//   greeting: string;
//   constructor(message: string) {
//     this.greeting = message;
//   }
//   greet() {
//     let formatString = getFormat(this, 'greeting');
//     console.log(formatString);
//     return formatString.replace('%s', this.greeting);
//   }
// }

// const greet = new Greeter('DongHoon');

// console.log(greet.greet());

const requiredMetadataKey = Symbol('required');

function required(
  target: Object,
  propertyKey: string | symbol,
  parameterIndex: number,
) {
  let existingRequiredParameters: number[] =
    Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];
  existingRequiredParameters.push(parameterIndex);
  Reflect.defineMetadata(
    requiredMetadataKey,
    existingRequiredParameters,
    target,
    propertyKey,
  );
}

function validate(
  target: any,
  propertyName: string,
  descriptor: TypedPropertyDescriptor<Function>,
) {
  let method = descriptor.value!;

  descriptor.value = function () {
    let requiredParameters: number[] = Reflect.getOwnMetadata(
      requiredMetadataKey,
      target,
      propertyName,
    );
    if (requiredParameters) {
      for (let parameterIndex of requiredParameters) {
        if (
          parameterIndex >= arguments.length ||
          arguments[parameterIndex] === undefined
        ) {
          throw new Error('Missing required argument.');
        }
      }
    }
    return method.apply(this, arguments);
  };
}

class BugReport {
  type = 'report';
  title: string;

  constructor(t: string) {
    this.title = t;
  }

  @validate
  print(@required verbose?: boolean) {
    if (verbose) {
      return `type: ${this.type}\ntitle: ${this.title}`;
    } else {
      return this.title;
    }
  }
}

const bug = new BugReport('This is Title');
console.log(bug.print());
console.log('===============');
console.log(bug.print(true));
console.log('===============');
console.log(bug.print(false));
