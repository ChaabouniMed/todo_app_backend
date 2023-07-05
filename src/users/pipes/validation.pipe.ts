import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class CustomValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log("my custom validation pipe", value);
    //logic code
    return "customTransform "+value;  // valeur transformé et récupérer par le controller
  }
}