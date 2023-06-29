import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { ProfesorService } from 'src/app/services/profesor.service';
import { AlumnoService } from 'src/app/services/alumno.service';
import * as moment from 'moment';

@Component({
  selector: 'app-teacher-detail',
  templateUrl: './teacher-detail.component.html',
  styleUrls: ['./teacher-detail.component.scss']
})
export class TeacherDetailComponent implements OnInit {

  teacherId: any;
  full_name: any;
  email: any;
  dni: any;
  born_date: any;
  address: any;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private cdr: ChangeDetectorRef, private profesorService: ProfesorService, private alumnoService: AlumnoService) { }

  ngOnInit(): void {
    this.cdr.detectChanges();
    this.activatedRoute.params.subscribe(params => {
      this.teacherId = params['teacher'];
      console.log(this.teacherId);
    });
    this.getTeacher();
  
  }

  getTeacher(){
    this.profesorService.getProfesor(this.teacherId).subscribe(
      res => {
        console.log(res);
        this.full_name = res.name + ' ' + res.surname1 + ' ' + res.surname2;
        this.email = res.email;
        this.dni = res.dni;
        this.born_date = (moment(res.born_date)).format('yyyy-MM-DD');
        this.address = res.address;
        this.alumnoService.getCountry(res.id_pais).subscribe(
          res => {
            this.address = this.address + ', ' + res[0].name_english;
          }
        );
      }
    );
  }

  goBack(){
    history.back();
    setTimeout(() => {
      window.location.reload();
    }, 50);
  }


}
