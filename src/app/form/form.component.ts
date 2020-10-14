import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { validateRex, forbiddenNameValidator } from './validate-register';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  favoriteColorControl = new FormControl('');
  formErrors = { // 错误的表单信息
    firstName: '',
    lastName: ''
  };
  // 为每一项表单验证添加说明文字

  validationMessage = {

    firstName: {
      minlength: '用户名长度最少为3个字符',
      maxlength: '用户名长度最多为10个字符',
      required: '请填写用户名',
      notdown: '用户名不能以下划线开头',
      only: '用户名只能包含数字、字母、下划线'
    },
    lastName: {
      required: '请填写用lastName'
    }
  };
  // profileForm = new FormGroup({
  //   firstName: new FormControl(''),
  //   lastName: new FormControl(''),
  //   address: new FormGroup({
  //     street: new FormControl(''),
  //     city: new FormControl(''),
  //     state: new FormControl(''),
  //     zip: new FormControl('')
  //   })
  // });
  profileForm = this.fb.group({
    firstName: ['', [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(3),
        validateRex('notdown', /^(?!_)/),
        validateRex('only', /^[1-9a-zA-Z_]+$/),
      ]
    ],
    lastName: ['', Validators.required],
    address: this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      zip: ['1']
    })
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // this.favoriteColorControl.setValue('12344');
    // this.updateProfile();
    this.profileForm.valueChanges.subscribe(data => {
      console.log(data, '????');
      this.onValueChanged(data);
      console.log(this.formErrors, '@@@');
    });
  }
  updateProfile(): void {
    this.profileForm.patchValue({
      firstName: '',
      address: {
        street: '123 Drew Street'
      }
    });
  }
  onSubmit(): void {
    // TODO: Use EventEmitter with form value
    console.log(this.profileForm);
    console.log(this.profileForm.get('firstName'));
    console.warn(this.profileForm.value);
  }
  // 每次数据发生改变时触发此方法

  onValueChanged(data?: any): void {
    // 如果表单不存在则返回
    if (!this.profileForm) { return; }

    // 获取当前的表单
    const form = this.profileForm;
    // 遍历错误消息对象

    for (const field of Object.keys(this.formErrors)) {
      // 清空当前的错误消息
      this.formErrors[field] = '';
      // 获取当前表单的控件
      const control = form.get(field);
      // 当前表单存在此空间控件 && 此控件没有被修改 && 此控件验证不通过
      if (control && control.dirty && !control.valid) {
        // 获取验证不通过的控件名，为了获取更详细的不通过信息
        const messages = this.validationMessage[field];
        // 遍历当前控件的错误对象，获取到验证不通过的属性
        for (const key of Object.keys(control.errors)) {
          // 把所有验证不通过项的说明文字拼接成错误消息
          this.formErrors[field] += messages[key] + '\n';
        }
      }
    }

  }


}
