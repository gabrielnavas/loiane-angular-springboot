import { Injectable } from '@angular/core';
import { FormArray, FormGroup, UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormUtilsService {
  getErrorMessage(formGroup: UntypedFormGroup, formName: string): string | undefined {
    const input = formGroup.get(formName) as UntypedFormControl;
    if (input === null) {
      return 'Campo inválido';
    }
    return this.getErrorMessageFromField(input)
  }

  getErrorMessageFromField(field: UntypedFormControl): string | undefined {
    if (field?.hasError('required')) {
      return `Campo é obrigatório`;
    }

    if (field?.hasError('minlength')) {
      const requiredLength = field.errors?.['minlength'].requiredLength;
      return `Campo deve ter no mínimo ${requiredLength} caracteres`;
    }

    if (field?.hasError('maxlength')) {
      const requiredLength = field.errors?.['maxlength'].requiredLength;
      return `Campo deve ter no máximo ${requiredLength} caracteres`;
    }

    return 'Campo inválido';
  }

  getErrorMessageArray(formGroup: UntypedFormGroup, formArrayName: string, fieldName: string, index: number) {
    const formArray = formGroup.get(formArrayName) as UntypedFormArray;
    const field = formArray.controls[index].get(fieldName) as UntypedFormControl;
    return this.getErrorMessageFromField(field)
  }

  isFormArrayRequired(formGroup: UntypedFormGroup, formArrayName: string) {
    const lessonsForms = formGroup.get(formArrayName) as UntypedFormArray;
    return lessonsForms.touched && lessonsForms.invalid && lessonsForms.hasError('required');
  }

  validateAllFormFields(formGroup: UntypedFormGroup | UntypedFormArray) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);

      if (control instanceof UntypedFormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof UntypedFormGroup || control instanceof UntypedFormArray) {
        control.markAsTouched({ onlySelf: true });
        this.validateAllFormFields(control);
      }
    })
  }
}
