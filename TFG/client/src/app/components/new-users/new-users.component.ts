import { Component, OnInit } from '@angular/core';
import { AlumnoService } from 'src/app/services/alumno.service';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { ProfesorService } from 'src/app/services/profesor.service';

@Component({
  selector: 'app-new-users',
  templateUrl: './new-users.component.html',
  styleUrls: ['./new-users.component.scss']
})
export class NewUsersComponent implements OnInit {

  rows : any = [];
  rowst: any = [];
  rowstloaded: boolean = false;
  courseId: any;
  course: any;
  rowsLoaded: boolean = false;
  currentUserEmail: any;
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
    { prop: 'acept', name: 'Acept' },
    { prop: 'reject', name: 'Reject' }
  ];

  constructor(private alumnoService: AlumnoService, private asignaturaService: AsignaturaService, private activatedRoute: ActivatedRoute, private cdr : ChangeDetectorRef, private profesorService: ProfesorService, private router: Router) { }

  ngOnInit(): void {
    this.getStudentsList();
    this.getTeachersList();
  }

  getStudentsList(){
    this.alumnoService.getAllStudents().subscribe(
      res => {
        for(let i =0; i<res.length; i++){
          console.log(res[i]);
          if(res[i].registered == 0){
            this.rows.push({id: res[i].id, full_name: res[i].name + " "+ res[i].surname1+ " " + res[i].surname2, email: res[i].email, dni: res[i].dni});
          }
        }
        setTimeout(() => {
          console.log(JSON.stringify(this.rows) + "rows");
          this.rowsLoaded = true;
          this.cdr.detectChanges();
        }, 500);
      }
      
    );
  }
  getTeachersList(){
    this.profesorService.getAllTeachers().subscribe(
      res => {
        for(let i =0; i<res.length; i++){
          console.log(res[i]);
          if(res[i].registered == 0){
            this.rowst.push({id: res[i].id, full_name: res[i].name + " "+ res[i].surname1+ " " + res[i].surname2, email: res[i].email, dni: res[i].dni});
          }
        }
        setTimeout(() => {
          console.log(JSON.stringify(this.rowst) + "rows");
          this.rowstloaded = true;
          this.cdr.detectChanges();
        }
        , 500);
      }
    );
  }
  aceptarAlumno(id:any, mail1:any){
    console.log(mail1 + "mail1");
    const mail ={ email:mail1};
    this.alumnoService.aceptarAlumno(id).subscribe(
      res => {
        console.log(res);
        this.rows = [];
        this.getStudentsList();
      }
    );
    console.log(mail);
    this.alumnoService.sendEmail(mail).subscribe(
      res => {
        console.log(res);
      }
    );
  }
  rejectAlumno(id:any, mail1: any){
    const mail ={ email:mail1};
    this.alumnoService.deleteAlumno(id).subscribe(
      res => {
        console.log(res);
        window.location.reload();
      }
    );
    /*this.alumnoService.rejectAlumno(id).subscribe(
      res => {
        console.log(res);
        this.rows = [];
        this.getStudentsList();
      }
    );*/
    this.alumnoService.sendRejectionEmail(mail).subscribe(
      res => {
        console.log(res);
      }
    );
  }
  aceptarProfesor(id:any, mail1:any){
    const mail ={ email:mail1};
    this.profesorService.aceptarTeacher(id).subscribe(
      res => {
        console.log(res);
        this.rowst = [];
        this.getTeachersList();
      }
    );
    this.alumnoService.sendEmail(mail).subscribe(
      res => {
        console.log(res);
      }
    );
  }
  rejectProfesor(id:any, mail1:any){
    const mail ={ email:mail1};
    this.profesorService.rejectTeacher(id).subscribe(
      res => {
        console.log(res);
        this.rowst = [];
        this.getTeachersList();
      }
    );
    this.alumnoService.sendRejectionEmail(mail).subscribe(
      res => {
        console.log(res);
      }
    );
  }
  viewStudent(id:any){
    this.router.navigate(['/secretary/students/student-detail/'+id])
      .then(() => {
        window.location.reload();
      }
    );

  }


  viewTeacher(id:any){
    this.router.navigate(['/secretary/teachers/teacher-detail/'+id])
      .then(() => {
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
