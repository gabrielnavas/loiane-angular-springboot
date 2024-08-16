import { Injectable } from '@angular/core';
import { FormArray, FormGroup, UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormUtilsService {
  getErrorMessage(formGroup: UntypedFormGroup, labelName: string, formName: string): string | undefined {
    const input = formGroup.get(formName) as UntypedFormControl;
    if (input === null) {
      return 'Campo inválido';
    }
    return this.getErrorMessageFromField(input, labelName)
  }

  getErrorMessageFromField(field: UntypedFormControl, labelName: string): string | undefined {
    if (field?.hasError('required')) {
      return `${labelName} é obrigatório`;
    }

    if (field?.hasError('minlength')) {
      const requiredLength = field.errors?.['minlength'].requiredLength;
      return `${labelName} deve ter no mínimo ${requiredLength} caracteres`;
    }

    if (field?.hasError('maxlength')) {
      const requiredLength = field.errors?.['maxlength'].requiredLength;
      return `${labelName} deve ter no máximo ${requiredLength} caracteres`;
    }

    return 'Campo inválido';
  }

  getErrorMessageArray(formGroup: UntypedFormGroup, formArrayName: string, labelName: string,
    fieldName: string, index: number) {
    const formArray = formGroup.get(formArrayName) as UntypedFormArray;
    const field = formArray.controls[index].get(fieldName) as UntypedFormControl;
    return this.getErrorMessageFromField(field, labelName)
  }

  isFormArrayRequired(formGroup: UntypedFormGroup, formArrayName: string) {
    const lessonsForms = formGroup.get(formArrayName) as UntypedFormArray;
    return lessonsForms.touched && lessonsForms.invalid && lessonsForms.hasError('required');
  }
}
