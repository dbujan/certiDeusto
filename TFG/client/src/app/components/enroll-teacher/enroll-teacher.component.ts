import { Component, OnInit } from '@angular/core';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { AlumnoService } from 'src/app/services/alumno.service';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfesorService } from 'src/app/services/profesor.service';

@Component({
  selector: 'app-enroll-teacher',
  templateUrl: './enroll-teacher.component.html',
  styleUrls: ['./enroll-teacher.component.scss']
})
export class EnrollTeacherComponent implements OnInit {

  constructor(private asignaturaService: AsignaturaService, private alumnoService: AlumnoService, private cdr: ChangeDetectorRef, private activatedRoute: ActivatedRoute, private profesorService: ProfesorService, private router: Router) { }

  courseId: any;
  rows: any = [];
  search: any;
  originalRows: any = [];
  

  ngOnInit(): void {
    this.cdr.detectChanges();
    this.activatedRoute.params.subscribe(params => {
      this.courseId = params['asignatura'];
      console.log(this.courseId);
    });
    this.getTeachersList();
    console.log(this.originalRows);
    this.rows = this.originalRows;
    this.cdr.detectChanges();
    
    
  }

  getTeachersList() {
    this.profesorService.getAllTeachers().subscribe(
      res => {
        console.log(res);
        for(let i=0 ; i<res.length; i++){
          if(res[i].registered == 1){
            this.originalRows.push({id: res[i].id, name: res[i].name, surname1: res[i].surname1,surname2: res[i].surname2, email: res[i].email, dni: res[i].dni, gender: res[i].id_genero, full_name: res[i].name + " " + res[i].surname1 + " " + res[i].surname2 })
          }
          
        }
        
      }
    );
  }
  enrollTeacher(id: any) {
    this.profesorService.enrollTeacher(id, this.courseId).subscribe(
      res => {
        console.log(res);
      }
    );
    this.router.navigate(['secretary/courses/course-detail/'+this.courseId])
    .then(() => {
      window.location.reload();
    }
    );
    
  }

  searchTeacher(){
    this.cdr.detectChanges();
    console.log(this.search);
    let arrayBusc = [];
    for(let i = 0; i < this.originalRows.length; i++){
      console.log(this.originalRows[i].name + " " + this.search);
      if(this.originalRows[i].name.toLowerCase().includes(this.search.toLowerCase())||this.originalRows[i].surname1.toLowerCase().includes(this.search.toLowerCase())||this.originalRows[i].surname2.toLowerCase().includes(this.search.toLowerCase())||this.originalRows[i].dni.toLowerCase().includes(this.search.toLowerCase())||this.originalRows[i].email.toLowerCase().includes(this.search.toLowerCase())){
        arrayBusc.push(this.originalRows[i]);
      }
      if(i == this.originalRows.length-1){
        this.rows = arrayBusc;
      }
    }
    this.cdr.detectChanges();
  }

  goBack(){
    history.back();
    setTimeout(() => {
      window.location.reload();
    }, 50);
  }

}
