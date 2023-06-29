import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AlumnoService } from 'src/app/services/alumno.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public userType: any;
  name: any;
  first_surname: any;
  second_surname: any;
  id: any;
  born_date: any;
  email: any;
  password: any;
  repeat_password: any;
  address: any;
  nextDiv1: boolean = false;
  nextDiv2: boolean = false;
  country: any;
  countryID: any;
  optionsCountries: any = [];
  genders:any = [];
  gender: any;
  genderId: any;

  constructor(private AuthService: AuthService, private AlumnoService: AlumnoService, private router: Router, private ProfesorService: ProfesorService, private asignaturaService: AsignaturaService) { }

  ngOnInit(): void {
    this.getGenders();

  }

  getGenders(){
    this.AlumnoService.getAllGenders().subscribe(
      res => {
        for(let i = 0; i < res.length; i++){
          this.genders.push(res[i].name_english);
        }
      }
    );

  }

  register(){
    if(this.userType == "student"){
      if(this.password == this.repeat_password){
        this.AlumnoService.getAllCountries().subscribe(
          res => {
            for(let i = 0; i < res.length; i++){
              if(this.country.toLowerCase() == res[i].name_english.toLowerCase()){
                this.countryID = res[i].id;
                console.log(this.countryID);
              }
              
            }
            if(this.countryID == undefined || this.countryID == null){
              alert("Country not found");
            }else{
              this.AlumnoService.getGenderByName(this.gender).subscribe(
                res => {
                  console.log(res.id +"idddddddd");
                  this.genderId = res.id;
                  console.log(this.gender)
                  const student = {name: this.name, surname1: this.first_surname, surname2: this.second_surname,email: this.email, password: this.password, dni: this.id, born_date: this.born_date,  address: this.address, registered: 0, id_pais: this.countryID, id_genero: this.genderId}
                  this.AlumnoService.registerStudent(student).subscribe(
                    res => {
                      console.log(res);
                    }
                  );
                  alert("You will receive an email when your account is accepted")
                  this.router.navigate(['/']);
                }
              );
              
            }
          }
        );
        
      }
      
    }else if(this.userType == "teacher"){
      if(this.password == this.repeat_password){
        this.AlumnoService.getAllCountries().subscribe(
          res => {
            for(let i = 0; i < res.length; i++){
              if(this.country.toLowerCase() == res[i].name_english.toLowerCase()){
                this.countryID = res[i].id;
                console.log(this.countryID);
              }
              
            }
            if(this.countryID == undefined || this.countryID == null){
              alert("Country not found");
            }else{
              this.AlumnoService.getGenderByName(this.gender).subscribe(
                res => {
                  console.log(res.id +"idddddddd");
                  this.genderId = res.id;
                  console.log(this.gender)
                  const teacher = {name: this.name, surname1: this.first_surname, surname2: this.second_surname,email: this.email, password: this.password, dni: this.id, address: this.address, registered: 0, id_pais: this.countryID, id_genero: this.genderId}
                  this.ProfesorService.registerTeacher(teacher).subscribe(
                    res => {
                      console.log(res);
                    }
                  );
                  this.router.navigate(['/']);
                }

              );
             
            }
          }
        );
        

      }
      
    }


  }

}
