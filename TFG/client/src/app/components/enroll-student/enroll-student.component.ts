import { Component, OnInit, ViewChild } from '@angular/core';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { AlumnoService } from 'src/app/services/alumno.service';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-enroll-student',
  templateUrl: './enroll-student.component.html',
  styleUrls: ['./enroll-student.component.scss']
})
export class EnrollStudentComponent implements OnInit {

  constructor(private asignaturaService: AsignaturaService, private alumnoService: AlumnoService, private cdr: ChangeDetectorRef, private activatedRoute: ActivatedRoute) { }

  courseId: any;

  rows: any = [];
  originalRows: any = [];
  search: any;

  ngOnInit(): void {
    this.cdr.detectChanges();
    this.activatedRoute.params.subscribe(params => {
      this.courseId = params['asignatura'];
      console.log(this.courseId);
    });
    this.getStudentsList();
    this.rows = this.originalRows;
  }
  enrollStudent(id: any) {
    this.asignaturaService.enrollStudent(this.courseId, id).subscribe((data: any) => {
      console.log(data);
    });
    window.location.reload();
  }

  getStudentsList() {
    this.alumnoService.getAllStudents().subscribe(
      res => {
        this.asignaturaService.getListaAlumnosAsignatura(this.courseId).subscribe(
          res2 => {
            
            for (let i = 0; i < res.length; i++) {
              let noesta = true;
              for(let j = 0; j < res2.length; j++){
                if(res[i].id == res2[j].id_alumno){
                   noesta= false;
                  
                }

              }
              if(noesta== true && res[i].registered == 1){
                //this.originalRows.push(res[i]);
                this.originalRows.push({id: res[i].id, name: res[i].name, surname1: res[i].surname1,surname2: res[i].surname2, email: res[i].email, dni: res[i].dni, born_date: res[i].born_date, gender: res[i].id_genero, full_name: res[i].name + " " + res[i].surname1 + " " + res[i].surname2 })
              }
            }
          }
        );
       
      }

    );
  }

  searchStudent() {
    //this.getStudentsList();
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
