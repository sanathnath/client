import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoggin: boolean = true;

  constructor(private router: Router) {
  }

  selectForm(event: boolean){
    this.isLoggin = event;
  }

  onFormClick(event: MouseEvent){
    event.stopPropagation()
  }

  onParentClick(event: MouseEvent) {
    this.router.navigate(['/']);
  }
}
