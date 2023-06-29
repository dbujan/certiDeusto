import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { AlumnoService } from 'src/app/services/alumno.service';
import { CompetenciaService } from 'src/app/services/competencia.service';

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.scss']
})
export class GradeComponent implements OnInit {

  courseId: any;
  course: any;
  studentId: any;
  student: any;
  grade: any;
  idcompetencias = [];
  rows : any = [];
  rowsLoaded: boolean = false;
  check: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private cdr : ChangeDetectorRef, private asignaturaService: AsignaturaService, private alumnoService:AlumnoService, private competenciaService: CompetenciaService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.courseId = params['asignatura'];
      console.log(this.courseId);
    });
    this.activatedRoute.params.subscribe(params => {
      this.studentId = params['alumno'];
      console.log(this.studentId);
    });
    this.getCurrentCourse();
    this.getCurrentStudent();
    this.getCompetenciasList();
  }

  getCurrentCourse(){
    this.asignaturaService.getAsignatura(this.courseId).subscribe(
      res => {
        this.course = res;
        console.log(this.course);
      }
    );
  }

  getCurrentStudent(){
    this.alumnoService.getAlumno(this.studentId).subscribe(
      res => {
        this.student = res;
        console.log(this.student);
      }
    );
  }


  //method that grades a student
  gradeStudent(){
    if(this.grade <= 10 && this.grade >= 0){
      console.log(this.grade);
      console.log(this.check);
      this.alumnoService.gradeStudent(this.courseId, this.studentId, this.grade).subscribe(
        res => {
          console.log(res);
        });
    }else{
      console.log("no esta entre 0 y 10");
    }
    
  }

  getCompetenciasList(){
    this.competenciaService.getCompetencias(this.courseId).subscribe( res => {
      this.idcompetencias = res;
      for(let i =0; i<this.idcompetencias.length; i++){
        let objectcompetencia = JSON.stringify(this.idcompetencias[i])
        console.log(JSON.parse(objectcompetencia).id_competencia+"competencia");
        this.competenciaService.getCompetencia(JSON.parse(objectcompetencia).id_competencia).subscribe(
          res => {
            let jsonRes = JSON.parse(JSON.stringify(res));
            this.rows.push(jsonRes);
            console.log(jsonRes + "jsonRes")
          }
        );
      }
      setTimeout(() => {
        console.log(JSON.stringify(this.rows) + "rows");
        this.rowsLoaded = true;
        this.cdr.detectChanges();
      },500);
      this.cdr.detectChanges();
    });
  }

}
