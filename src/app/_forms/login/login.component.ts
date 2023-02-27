import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Output() toggleForm = new EventEmitter();
  registerForm: FormGroup = new FormGroup({});
  validationError: string[] | undefined;

  constructor(private fb: FormBuilder, private accountService: AccountService,
    private router : Router) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['',[Validators.required]],
    });
  }

  login(){
    this.accountService.login(this.registerForm.value).subscribe({
      next: () =>{
        this.router.navigateByUrl('/')
      },
      error: err => console.log(err)
      
    })
  }

  switchToLogin(){
    this.toggleForm.emit(false);
  }
}
