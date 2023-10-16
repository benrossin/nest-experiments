import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ValidationException } from '../exceptions/validation.exception';
import { ValidationError } from 'class-validator';

export interface ValidationObject {
  [key: string]: { value: string; constraints: string[] } | ValidationObject;
}

@Catch(ValidationException)
export class ValidationFilter implements ExceptionFilter {
  catch(exception: ValidationException, host: ArgumentsHost): any {
    const context = host.switchToHttp();
    const response = context.getResponse();

    return response.status(400).json({
      statusCode: 400,
      errors: this.formatErrorsToObject(exception.validationErrors),
    });
  }

  private formatErrorsToObject = (ve: ValidationError[]): ValidationObject => {
    return ve.reduce((p, c: ValidationError): ValidationObject => {
      if (!c.children || !c.children.length) {
        p[c.property] = {
          value: c.value,
          constraints: Object.keys(c.constraints).map((key) => {
            return c.constraints[key];
          }),
        };
      } else {
        p[c.property] = this.formatErrorsToObject(c.children);
      }
      return p;
    }, {} as ValidationObject);
  };
}
