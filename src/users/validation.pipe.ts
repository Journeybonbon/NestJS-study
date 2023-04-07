import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

// 실습으로 만들었지만 @nestjs/common에서 제공하는 Validation을 사용할 것
@Injectable()
export class ValidationPipe implements PipeTransform<any> {
	async transform(value: any, {metatype}: ArgumentMetadata) {
		if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const object = plainToClass(metatype, value);
        const errors = await validate(object);
        if (errors.length > 0){
            throw new BadRequestException('Validation failed');
        }
        return value;
	}

    private toValidate(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
}