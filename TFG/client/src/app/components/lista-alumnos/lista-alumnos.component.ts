import { Component, OnInit } from '@angular/core';
import { AlumnoService } from 'src/app/services/alumno.service';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.scss']
})
export class ListaAlumnosComponent implements OnInit {

  rows : any = [];
  courseId: any;
  course: any;
  rowsLoaded: boolean = false;
  notgraded:boolean = false;
  idalumnos = [];
  currentUserEmail: any;
  gradeJson:any;
  currentUser: any;
  grade: any;
  columns = [
    { prop: 'id', name: 'ID' },
    { prop: 'name', name: 'Name' },
    { prop: 'surname1', name: 'Surname 1' },
    { prop: 'surname2', name: 'Surname 2' },
    { prop: 'email', name: 'Email' },
    { prop: 'dni', name: 'DNI' },
    { prop: 'born_date', name: 'Born date' },
    { prop: 'gender', name: 'Gender' },
    { prop: 'grade', name: 'Grade' }
  ];

  constructor(private alumnoService: AlumnoService, private asignaturaService: AsignaturaService, private activatedRoute: ActivatedRoute, private cdr : ChangeDetectorRef) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.courseId = params['asignatura'];
      console.log(this.courseId);
    });
    this.getCurrentCourse();
    setTimeout(() => {
      if(this.course.graded == 0 || this.course.graded == null){
        this.notgraded = true;
      }else{
        this.notgraded = false;
        alert('The studets of '+this.course.name+ ' have alredy been graded');
      }
      this.getStudentsList();
    }, 200);
    
  }

  getCurrentCourse(){
    this.asignaturaService.getAsignatura(this.courseId).subscribe(
      res => {
        this.course = res;
        
        console.log(this.course);
      }
    );
  }
  getStudentsList(){
    this.alumnoService.getAlumnos(this.courseId).subscribe(
      res => {
        this.idalumnos = res;
        for(let i =0; i<this.idalumnos.length; i++){
          let objectalumno = JSON.stringify(this.idalumnos[i])
          console.log(JSON.parse(objectalumno).id_alumno+"alumno");
          this.asignaturaService.getGrade(this.courseId, JSON.parse(objectalumno).id_alumno).subscribe(
            res => {
              this.gradeJson = JSON.parse(JSON.stringify(res));
              console.log(this.gradeJson.grade + "grade");
            }
          );
          this.alumnoService.getAlumno(JSON.parse(objectalumno).id_alumno).subscribe(
            res => {
              let jsonRes = JSON.parse(JSON.stringify(res));

              this.rows.push({id: jsonRes.id, name: jsonRes.name, surname1: jsonRes.surname1, surname2: jsonRes.surname2, email:jsonRes.email, dni:jsonRes.dni, born_date: jsonRes.born_date, id_genero: jsonRes.id_genero, grade: this.gradeJson.grade });
              console.log(jsonRes + "jsonres");
            });
        }
        setTimeout(() => {
          console.log(JSON.stringify(this.rows) + "rows");
          this.rowsLoaded = true;
          this.cdr.detectChanges();
        },500);
        this.cdr.detectChanges();
      });
  }
  gradeStudent(rowId: any, grade:any){
    if(grade <= 10 && grade >= 0){
      console.log(grade);
      this.alumnoService.gradeStudent(this.course.id, rowId,  grade).subscribe(
        res => {
          console.log(res);
        });
    }else{
      console.log("no esta entre 0 y 10");
    }
    
  }

  signGrades(){
    this.asignaturaService.updateAsignaturaToGraded(this.courseId).subscribe(
      res => {
        console.log(res);
      }
    );
    this.notgraded = false;
    this.rows = [];
    this.getStudentsList();
    this.cdr.detectChanges();
  }

}
