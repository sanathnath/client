import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() toggleForm = new EventEmitter();
  registerForm: FormGroup = new FormGroup({});
  validationError: string[] | undefined;

  constructor(private fb: FormBuilder,
     private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['',[Validators.required, this.matchValues('password')]],
    });

    this.registerForm.controls['password'].valueChanges.subscribe({
      next: ()=> this.registerForm.controls['confirmPassword'].updateValueAndValidity(),
    });
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value
        ? null
        : { notMatching: true };
    };
  }

  register(){
    console.log(this.registerForm.value);
    
    this.accountService.register(this.registerForm.value).subscribe({
      next: _ =>{
        this.router.navigateByUrl('/');
      },
      error: err => console.log(err)
      
    })
  }

  switchToLogin(){
    this.toggleForm.emit(true);
  }
}
