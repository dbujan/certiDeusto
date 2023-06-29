import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { AlumnoService } from 'src/app/services/alumno.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import * as moment from 'moment';

@Component({
  selector: 'app-view-course-secretary',
  templateUrl: './view-course-secretary.component.html',
  styleUrls: ['./view-course-secretary.component.scss']
})
export class ViewCourseSecretaryComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private cdr : ChangeDetectorRef, private asignaturaService: AsignaturaService, private alumnoService: AlumnoService, private profesorService: ProfesorService, private router: Router) { }
  courseId: any;
  name: any;
  description: any;
  ects: any;
  num_places: any;
  start_date: any;
  end_date: any;
  semester: any;
  faculty: any;
  anyChange: boolean = false;
  enroledStudents: boolean = false;
  enroledTeacher: boolean = false;
  addTeacher: boolean = false;
  btnAddTeacher: boolean = false;
  teacher: any; 
  teacherId: any;
  mydate: any;
  faculty_id: any;
  rows: any = [];
  idsalumnos: any = [];
  options: any = [];
  columns = [
    { prop: 'id', name: 'ID' },
    { prop: 'name', name: 'Name' },
    { prop: 'surname1', name: 'Surname 1' },
    { prop: 'surname2', name: 'Surname 2' },
    { prop: 'email', name: 'Email' },
    { prop: 'dni', name: 'DNI' },
    { prop: 'born_date', name: 'Born date' },
    { prop: 'gender', name: 'Gender' },
    { prop: 'unenroll', name: 'Unenroll' }
  ];


  ngOnInit(): void {
    this.cdr.detectChanges();
    this.activatedRoute.params.subscribe(params => {
      this.courseId = params['asignatura'];
      console.log(this.courseId);
    });
    this.getFacultades();
    this.getCurrentCourse();
    this.getStudentsList();
    this.getCurrentTeacher();
    
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
        
        this.asignaturaService.getFacultadAsignatura(res.id_facultad).subscribe(
          res => {
            this.faculty = res.name;
          }
        );
        console.log(this.name + " " + this.description + " " + this.ects + " " + this.num_places + " " + this.start_date + " " + this.end_date + " " + this.semester + " " + this.faculty);
      }
    );
    console.log(this.faculty + "facultad");

  }
  getFacultades(){
    this.asignaturaService.getAllfaculties().subscribe(
      res => {
        for(let i = 0; i < res.length; i++){
          this.options.push(res[i].name);
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
          this.alumnoService.getAlumno(this.idsalumnos[i].id_alumno).subscribe(
            res => {
              console.log(res);
              this.rows.push(res);
            }
          );
        }
      }
    );
  }
  


  validateForm(){
    if(this.name == undefined || this.description == undefined || this.ects == undefined || this.num_places == undefined || this.start_date == undefined || this.end_date == undefined || this.semester == undefined || this.faculty == undefined){
      alert("Please fill all the fields");
    }else if(this.name == "" || this.description == "" || this.ects == "" || this.num_places == "" || this.start_date == "" || this.end_date == "" || this.semester == "" || this.faculty == ""){
      alert("Please fill all the fields");
      
    }else if(this.ects < 0 || this.ects > 12){
      alert("ECTS must be between 0 and 12");
    }else if(this.num_places < 0){
      alert("Number of places must be greater than 0"); 
    }else if(this.start_date > this.end_date){
      alert("Start date must be lower than end date");
    }else{
      this.updateCourse();
    }
  }

  updateCourse(){
    console.log(this.name + " " + this.description + " " + this.ects + " " + this.num_places + " " + this.start_date + " " + this.end_date + " " + this.semester + " " + this.faculty);
    this.asignaturaService.getFacultadByNombre(this.faculty).subscribe(
      res => {
        console.log(JSON.stringify(res) + "id");
        this.faculty_id = JSON.parse(JSON.stringify(res)).id;
        console.log(this.start_date + "fecha");
        console.log(this.end_date + "fecha");
        let asignatura = {name: this.name, description: this.description, ects: this.ects, num_places: this.num_places, start_date: this.start_date, end_date: this.end_date, semester: this.semester, id_facultad: this.faculty_id};
        this.asignaturaService.updateAsignatura(this.courseId, asignatura).subscribe(
          res => {
            console.log(res);
            alert("Course updated successfully");
          }
        );
      }
    );
    
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

  getCurrentTeacher(){
    this.asignaturaService.getProfesor(this.courseId).subscribe(
      res => {
        if(res[0] == null || res[0] == undefined){
          this.teacher = "No teacher assigned*";
          this.addTeacher = true;
        }else{
          console.log(res[0].id_profesor + "profesor");
          this.profesorService.getProfesor(res[0].id_profesor).subscribe(
          res2 => {
            this.teacher = res2.name + " " + res2.surname1 + " " + res2.surname2;
            this.teacherId = res2.id;
            this.btnAddTeacher = true;
            console.log(this.teacher);
          }
        );
        }

      }
    );

  }

  enrollTeacher(){
    this.enroledStudents = false;
    this.enroledTeacher = true;
  }
  enrollStudents(){
    this.enroledStudents = true;
    this.enroledTeacher = false;
  }
  enrollStudent(){
    this.router.navigate(['/secretary/courses/view-course/enroll-student/'+ this.courseId]);
  }

  unenrollTeacher(){
    this.asignaturaService.unenrollTeacher(this.teacherId, this.courseId).subscribe(
      res => {
        console.log(res);
        alert("Teacher unenrolled successfully");
        window.location.reload();
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
