import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  private fb = inject(FormBuilder)

  login = new FormControl('Aziz', Validators.required);
  pwd = new FormControl('',Validators.required);

  save() {
  console.log(this.pwd.value);
  }

  loginForm = new FormGroup({
    name: new FormControl('Aziz', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    adresse: new FormControl('', [Validators.required, Validators.minLength(5)]),
    telephone: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{8}$/)])
  });

  inscritForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    adresse: ['', [Validators.required, Validators.minLength(5)]],
    telephone: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]]
  })

  getName(){
    return this.loginForm.get('name');
  }
}


