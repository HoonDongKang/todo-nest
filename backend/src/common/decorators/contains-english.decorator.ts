import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function ContainsEnglish(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'containsEnglish',
      target: object.constructor,
      propertyName: propertyName,
      //   constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'string') return false;
          if (value.length < 6) return false;

          // const hasKorean = /[가-힣]/.test(value);
          const hasEnglish = /[a-zA-Z]/.test(value);

          return hasEnglish;
        },
        defaultMessage(args: ValidationArguments) {
          return '비밀번호는 최소 6자 이상이며, 영문을 포함해야 합니다';
        },
      },
    });
  };
}
