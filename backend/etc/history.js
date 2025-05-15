//es5
// function upperCaseDecorator(fn) {
//   return function (string) {
//     //함수 바인딩
//     return fn.apply(this, [string.toUpperCase()]);
//   };
// }
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// function plainText(string) {
//   return string;
// }
// var upperCaseText = upperCaseDecorator(plainText);
// console.log(upperCaseText('hello')); // HELLO
//es6
//es7 ts
//Class Decorator
function Logger(constructor) {
    console.log('Class was created:', constructor.name);
}
function AddCreatedAt(constructor) {
    return /** @class */ (function (_super) {
        __extends(Person, _super);
        function Person() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.createdAt = new Date();
            return _this;
        }
        return Person;
    }(constructor));
}
function LoggerInstance(constructor) {
    return /** @class */ (function (_super) {
        __extends(Person, _super);
        function Person() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, args) || this;
            console.log("Instance was created: ".concat(_this.name));
            return _this;
        }
        return Person;
    }(constructor));
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
function LogMethod(target, propertyName, descriptor) {
    var originalMethod = descriptor.value;
    descriptor.value = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log("\uD83D\uDCCC ".concat(propertyName, " called with args:"), args);
        var result = originalMethod.apply(this, args);
        console.log("\u2705 ".concat(propertyName, " returned:"), result);
        return result;
    };
    return descriptor;
}
function LogAccessor(target, propertyName, descriptor) {
    var originalGetter = descriptor.get;
    descriptor.get = function () {
        var result = originalGetter === null || originalGetter === void 0 ? void 0 : originalGetter.apply(this);
        console.log("Getting it's price");
        return result;
    };
    return descriptor;
}
function LogProperty(target, propertyKey) {
    console.log("property ".concat(propertyKey, " was declared"));
}
var Calculator = /** @class */ (function () {
    function Calculator() {
        // private _price: number = 5000;
        this._price = 5000;
    }
    Calculator.prototype.add = function (a, b) {
        return a + b;
    };
    Calculator.prototype.multiply = function (a, b) {
        return a * b;
    };
    Object.defineProperty(Calculator.prototype, "price", {
        get: function () {
            return this._price;
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        LogProperty
    ], Calculator.prototype, "_price");
    __decorate([
        LogMethod
    ], Calculator.prototype, "add");
    __decorate([
        LogMethod
    ], Calculator.prototype, "multiply");
    __decorate([
        LogAccessor
    ], Calculator.prototype, "price");
    return Calculator;
}());
var calc = new Calculator();
console.log(calc._price);
// calc.add(2, 3);
// calc.multiply(4, 5);
