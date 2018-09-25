import {Component, OnInit} from '@angular/core';
import {ApiService} from '../Services/api.service';
import {CustomerService} from '../Services/customer.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private api: ApiService, private customer: CustomerService, private router: Router) { }

  user: any
  usuario: "";
  contraseña: "";

  ngOnInit() {
  }
  tryLogin() {
    this.api.login(
      this.usuario,
      this.contraseña
    )
      .subscribe(
        r => {
          if (r.token) {
            this.customer.setToken(r.token);
          }
        },
        r => {
          alert(r.error.error);
        });
  }
}