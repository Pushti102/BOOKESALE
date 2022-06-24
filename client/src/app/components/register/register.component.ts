import { Component, OnInit } from '@angular/core';
import { Form, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  registerForm!: FormGroup;


  constructor(
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.setRegisterForm();
  }
  setRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required],
      confirmpassword: [null, Validators.required]
    });
  }
  submit() {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.invalid) {
      return;
    }
  }
}