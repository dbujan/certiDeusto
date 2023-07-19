import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { AlumnoService } from 'src/app/services/alumno.service';
import{ CompetenciaService } from 'src/app/services/competencia.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import * as moment from 'moment';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {

  courseId: any;
  name: any;
  description: any;
  ects: any;
  num_places: any;
  start_date: any;
  end_date: any;
  semester: any;
  faculty: any;
  graded: any;
  idsalumnos: any = [];
  rows: any = [];
  rowsComp: any = [];
  idcompetencias: any = [];
  courseTeacher: any;
  courseTeacherId: any;
  isTeacher: boolean = false;
  isGraded: boolean = false;
  studentGrade: any;
  currentStudentId: any;
  currentStudentGrade: any;
  passed: boolean = false;
  gradeV: boolean = false;

  currentUser: any;
  userRole="nada";
  

  constructor(private activatedRoute: ActivatedRoute, private cdr: ChangeDetectorRef, private asignaturaService: AsignaturaService, private alumnoService: AlumnoService, private competenciaService: CompetenciaService, private router: Router, private profesorService: ProfesorService) { }

  ngOnInit(): void {
    this.cdr.detectChanges();
    this.activatedRoute.params.subscribe(params => {
      this.courseId = params['asignatura'];
      console.log(this.courseId);
    });
    this.getCurrentUser();
    setTimeout(() => {
      this.setUserRole();
      console.log(this.userRole + "user role");
      setTimeout(() => {
        this.setIsGraded();
        console.log(this.isGraded + "is graded");
      }, 200);
    }, 300);
    this.getCurrentCourse();
    
    this.getStudentsList();
    this.getCompetences();
    this.getTeacherCourse();
    
  }
  getCurrentUser(){
    this.asignaturaService.getUserInfo().subscribe(
      res => {
        this.currentUser = JSON.parse(JSON.stringify(res));
        console.log(this.currentUser.email + "current user");
        console.log(this.currentUser.id + "current user id");
      },
      err => console.error(err)
    );
  }
  setIsGraded(){
    if(this.graded == 0 || this.graded == null){
      this.isGraded = false;
    }else{
      this.isGraded = true;
      if(this.userRole == "teacher"){
        console.log("alo");
        //alert('The grades of '+this.name+ ' have alredy been signed');
      }
    }
  }
  setUserRole(){
    console.log(this.currentUser.email);
    if(this.currentUser.email.endsWith('opendeusto.es') && this.currentUser.email != "secretaria@deusto.es"){
      this.userRole = "student"; 
      this.currentStudentId = this.currentUser.id;
      this.getGradeStudent();
    }else if(this.currentUser.email.endsWith('deusto.es') && this.currentUser.email != "secretaria@deusto.es"){
      this.userRole = "teacher";
    }else if(this.currentUser.email == "secretaria@deusto.es"){
      this.userRole = "secretary";
    }
  }

  getCurrentCourse(){
    this.asignaturaService.getAsignatura(this.courseId).subscribe(
      res => {
        this.name = res.name;
        this.description = res.description;
        this.ects = res.ects;
        this.num_places = res.num_places;
        this.start_date = (moment(res.start_date)).format('yyyy-MM-DD');
        this.end_date = (moment(res.end_date)).format('yyyy-MM-DD');
        this.semester = res.semester;
        this.graded = res.graded;
        this.asignaturaService.getFacultadAsignatura(res.id_facultad).subscribe(
          res2 => {
            this.faculty = res2.name;
          }
        );
  
        console.log(this.name + " " + this.description + " " + this.ects + " " + this.num_places + " " + this.start_date + " " + this.end_date + " " + this.semester + " " + this.faculty);
      }
    );

  }
  getGradeStudent(){
    this.asignaturaService.getGrade(this.courseId, this.currentStudentId).subscribe(
      res => {
        this.currentStudentGrade = res.grade;
        console.log(this.currentStudentGrade +"gradeeeeee studentttt");
        if(this.currentStudentGrade < 5){
          this.passed = false;
        }else{
          this.passed = true;
        }
      }
      
    );
    
  }

  getStudentsList(){
    this.asignaturaService.getListaAlumnosAsignatura(this.courseId).subscribe(
      res => {
        console.log(res);
        this.idsalumnos= res;
        for(let i = 0; i < this.idsalumnos.length; i++){
          this.asignaturaService.getGrade(this.courseId, this.idsalumnos[i].id_alumno).subscribe(
            res3 => {
              this.alumnoService.getAlumno(this.idsalumnos[i].id_alumno).subscribe(
                res2 => {
                  console.log(res2);
                  
                  this.rows.push({id: res2.id, name: res2.name, dni: res2.dni, full_name: res2.name + " " + res2.surname1 + " " + res2.surname2, grade: res3.grade});
              
                }
              );
            }
          );
          
        }
      }
    );
  }
  gradeStudent(rowId: any, grade:any){
    if(grade <= 10 && grade >= 0){
      console.log(grade);
      this.alumnoService.gradeStudent(this.courseId, rowId,  grade).subscribe(
        res => {
          console.log(res);
        });
        console.log(this.rows[0].grade + "filoootes");
    }else{
      console.log("no esta entre 0 y 10");
      this.gradeV=true;
      alert("The grade must be between 0 and 10");
    }
    
  }

  getCompetences(){
    this.competenciaService.getCompetencias(this.courseId).subscribe( res => {
      this.idcompetencias = res;
      for(let i =0; i<this.idcompetencias.length; i++){
        let objectcompetencia = JSON.stringify(this.idcompetencias[i])
        console.log(JSON.parse(objectcompetencia).id_competencia+"competencia");
        this.competenciaService.getCompetencia(JSON.parse(objectcompetencia).id_competencia).subscribe(
          res => {
            let jsonRes = JSON.parse(JSON.stringify(res));
            this.rowsComp.push(jsonRes);
            console.log(jsonRes + "jsonRes")
          }
        );
      }
      setTimeout(() => {
        console.log(JSON.stringify(this.rowsComp) + "rows");
        this.cdr.detectChanges();
      },500);
      this.cdr.detectChanges();
    });
  }
  competenceDetail(id:any){
    console.log(id);
    if(this.userRole == "secretary"){
      this.router.navigate(['/secretary/courses/course-detail/competence-detail/'+id])
      .then(() => {
        window.location.reload();
      }
      );
    }
    else if(this.userRole == "student"){
      this.router.navigate(['/students/courses/course-detail/competence-detail/'+id])
      .then(() => {
        window.location.reload();
      }
      );
    }else if(this.userRole == "teacher"){
      this.router.navigate(['/teachers/courses/course-detail/competence-detail/'+id])
      .then(() => {
        window.location.reload();
      }
      );
    }
    
  }
  unenrollStudent(id:any){
    this.asignaturaService.unenrollStudent(this.courseId, id).subscribe(
      res => {
        console.log(res);
        alert("Student unenrolled successfully");
        window.location.reload();
      }
    );
  }
  unassignCompetence(idcompetencia: any){
    this.competenciaService.deleteCompetenciaAsignatura(this.courseId,idcompetencia).subscribe(
      res => {
        console.log(res);
        this.rowsComp = [];
        this.getCompetences();
      }
    );
  }

  getTeacherCourse(){
    this.courseTeacher = "No teacher assigned";
    this.asignaturaService.getProfesorAsignaturaList().subscribe(
      res => {
        for(let i = 0; i < res.length; i++){
          if(res[i].id_asignatura == this.courseId){
            this.isTeacher = true;
            this.courseTeacherId = res[i].id_profesor;
            this.profesorService.getProfesor(res[i].id_profesor).subscribe(
              res2 => {
                this.courseTeacher = res2.name + " " + res2.surname1 + " " + res2.surname2;
              }
            );
          }
        }
      }
    );

  }

  unassignTeacher(){
    this.asignaturaService.unenrollTeacher(this.courseTeacherId, this.courseId).subscribe(
      res => {
        console.log(res);
        alert("Teacher unassigned successfully");
        window.location.reload();
      }
    );
  }
  signGrades(){
    for(let i = 0; i < this.rows.length; i++){
      if(this.rows[i].grade==null){
        alert("You must grade all the students");
        return;
      }
    }
    this.asignaturaService.updateAsignaturaToGraded(this.courseId).subscribe(
      res => {
        console.log(res);
      }
    );
    this.isGraded = true;
    this.rows = [];
    this.getStudentsList();
    this.cdr.detectChanges();
    window.location.reload();
  }

  viewStudent(id:any){
    if(this.userRole == "secretary"){
      this.router.navigate(['/secretary/students/student-detail/'+id])
      .then(() => {
        window.location.reload();
      });
    }else if(this.userRole == "teacher"){
      this.router.navigate(['/teachers/students/student-detail/'+id])
      .then(() => {
        window.location.reload();
      });
    }
  }

  enrolTeacher(){
    this.router.navigate(['secretary/courses/view-course/enroll-teacher/'+this.courseId])
    .then(() => {
      window.location.reload();
    }
    );
  }
  goBack(){
    history.back();
    setTimeout(() => {
      window.location.reload();
    }, 10);
  }

  enrolNewStudent(){
    this.router.navigate(['secretary/courses/view-course/enroll-student/'+this.courseId])
    .then(() => {
      window.location.reload();
    }
    );
  }
  addCompetence(){
    this.router.navigate(['secretary/competencesAdd/'+this.courseId])
    .then(() => {
      window.location.reload();
    }
    );
  }


}
