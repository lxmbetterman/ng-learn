import { ValidatorFn, AbstractControl } from '@angular/forms';

export function validateRex(type: string, validateRex1: RegExp): ValidatorFn {

    return (control: AbstractControl): { [key: string]: any } | null => {
        // 获取当前控件的内容
        const str = control.value;
        // 设置我们自定义的严重类型
        const res = {};
        res[type] = { str };
        // 如果验证通过则返回 null 否则返回一个对象（包含我们自定义的属性）
        return validateRex1.test(str) ? null : res;
    };
}
// export function forbiddenNameValidator(type: string, nameRe: RegExp): ValidatorFn {
//     return (control: AbstractControl): { [key: string]: any } | null => {
//         const forbidden = nameRe.test(control.value);
//         return forbidden ? { 'forbiddenName': { value: control.value } } : null;
//     };
// }
// export function forbiddenNameValidator(type: string, nameRe: RegExp): ValidatorFn {
//     return (control: AbstractControl): { [key: string]: any } | null => {
//         const forbidden = nameRe.test(control.value);
//         return forbidden ? { forbiddenName: { value: control.value } } : null;
//     };
// }
