import { Component, OnInit } from '@angular/core';
import { Form, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isServerError: boolean = false;
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.setLoginForm();
  }
  setLoginForm() {
    this.loginForm = this.formBuilder.group({
      emailaddress: [null, Validators.required],
      password: [null, Validators.required]
    });

  }
}
