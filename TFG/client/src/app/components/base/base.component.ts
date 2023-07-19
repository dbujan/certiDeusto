import { Component, OnInit } from '@angular/core';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  constructor( private AsignaturaService: AsignaturaService, private AuthService: AuthService) { }

  currentUser: any;

  userRole="nada";
  isMenuHidden: boolean = false;

  ngOnInit(): void {
    this.getCurrentUser();
    setTimeout(() => {
      this.setUserRole();
      console.log(this.userRole + "user role");
    }, 100);
    
  }

  getCurrentUser(){
    this.AsignaturaService.getUserInfo().subscribe(
      res => {
        this.currentUser = JSON.parse(JSON.stringify(res));
        console.log(this.currentUser.email + "current user");
      },
      err => console.error(err)
    );
  }
  setUserRole(){
    console.log(this.currentUser.email);
    if(this.currentUser.email.endsWith('opendeusto.es') && this.currentUser.email != "secretaria@deusto.es"){
      this.userRole = "student"; 
    }else if(this.currentUser.email.endsWith('deusto.es') && this.currentUser.email != "secretaria@deusto.es"){
      this.userRole = "teacher";
    }else if(this.currentUser.email == "secretaria@deusto.es"){
      this.userRole = "secretary";
    }
  }
  toggleMenu() {
    this.isMenuHidden = !this.isMenuHidden;
  }

}
