import { Token } from '@angular/compiler';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: any;
  password = null;
  usuario = {};
  usuariojson: any;
  user = {};
  currentUser: any;
  isVerifiedToken: boolean = false;

  constructor(private AuthService: AuthService,
    private cdr: ChangeDetectorRef, private router: Router, private UserService: UserService) { 
      
    }

  ngOnInit(): void {
  }

  submit () {
    console.log('submit');
    console.log(this.email);
    console.log(this.password);
    
    if(this.email!= "secretaria@deusto.es" && this.email.endsWith('opendeusto.es')){
      this.AuthService.loginAlumno(this.email).subscribe(data=>{
        console.log(this.email);
        this.cdr.detectChanges();
        console.log(data.registered + "data registered");
        if(data.registered==1){
          if(data.password==this.password){
            console.log("login correcto");
            this.usuario = {id: data.id, email: data.email, password: data.password};
            //this.usuariojson = JSON.stringify(this.usuario);
            console.log(this.usuario + "usuariooooooo");
            //creamos el token
            this.AuthService.generateToken(this.usuario).subscribe(token=>{
              this.user = {token: token, id_role: 1};
              //creamos el usuario
              this.UserService.createUser(this.user).subscribe(data=>{
                console.log(data+"data");
                setTimeout(() => {
                  this.AuthService.getcurrentUser(token).subscribe(data=>{
                    this.currentUser = data;
                    console.log(this.currentUser.id + "current user");
                    this.AuthService.setCurrentUser(this.currentUser);
                    /*this.AuthService.verifyToken(this.currentUser.token).subscribe(data=>{
                      console.log(data.email + "data email");
                      if(data!==undefined){
                        this.isVerifiedToken = true;
                      }else{
                        this.isVerifiedToken = false;
                      }
                      this.AuthService.isVerified(this.isVerifiedToken);
                      
                      
                    });*/
                    this.router.navigate(['/students']);
                    
                  });
                },1000);
              });
              console.log(token + "tokenaso");
            });
          }else{
            console.log("login incorrecto");
            alert("username or password are incorrect");
          }
        }else{
          alert("You have not been accepted yet");
          window.location.reload();
        }
      },
      err=> alert("username or password are incorrect"));
    }else if(this.email != "secretaria@deusto.es" && this.email.endsWith('deusto.es')){
      this.AuthService.loginProfesor(this.email).subscribe(data=>{
        this.cdr.detectChanges();
        if(data.registered==1){
          if(data.password==this.password){
            console.log("login correcto");
            this.usuario = {id: data.id, email: data.email, password: data.password};
            //creamos el token
            this.AuthService.generateToken(this.usuario).subscribe(token=>{
              this.user = {token: token, id_role: 2};
              //creamos el usuario
              this.UserService.createUser(this.user).subscribe(data=>{
                console.log(data);
                setTimeout(() => {
                  this.AuthService.getcurrentUser(token).subscribe(data=>{
                    this.currentUser = data;
                    console.log(this.currentUser.id + "current user");
                    this.AuthService.setCurrentUser(this.currentUser);
                    /*this.AuthService.verifyToken(this.currentUser.token).subscribe(data=>{
                      console.log(data.email + "data email");
                      if(data!==undefined){
                        this.isVerifiedToken = true;
                      }else{
                        this.isVerifiedToken = false;
                      }
                      this.AuthService.isVerified(this.isVerifiedToken);
                      
                      
                    });*/
                    this.router.navigate(['/teachers']);
                    
                  });
                },1000);
              });
              console.log(token);
            });
          }else{
            console.log("login incorrecto");
          }
        }else{
          alert("You have not been accepted yet");
          window.location.reload();
        }
      },
      err=> alert("username or password are incorrect"));
    }else if(this.email == "secretaria@deusto.es"){
      this.AuthService.loginSecretaria(this.email).subscribe(data=>{
        this.cdr.detectChanges();
        if(data.password==this.password){
          console.log("login correcto");
          this.usuario = {id: data.id, email: data.email, password: data.password};
          //creamos el token
          this.AuthService.generateToken(this.usuario).subscribe(token=>{
            this.user = {token: token, id_role: 3};
            //creamos el usuario
            this.UserService.createUser(this.user).subscribe(data=>{
              console.log(data);
              setTimeout(() => {
                this.AuthService.getcurrentUser(token).subscribe(data=>{
                  this.currentUser = data;
                  console.log(this.currentUser.id + "current user");
                  this.AuthService.setCurrentUser(this.currentUser);
                  /*this.AuthService.verifyToken(this.currentUser.token).subscribe(data=>{
                    console.log(data.email + "data email");
                    if(data!==undefined){
                      this.isVerifiedToken = true;
                    }else{
                      this.isVerifiedToken = false;
                    }
                    this.AuthService.isVerified(this.isVerifiedToken);
                    
                    
                  });*/
                  this.router.navigate(['/secretary']);
                  
                });
              },1000);
            });
            console.log(token);
          });
        }else{
          console.log("login incorrecto");
          alert("incorrect password");
        }
      });
    }

  }

}
