import { Component, OnInit } from '@angular/core';
import { AlumnoService } from 'src/app/services/alumno.service';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { ProfesorService } from 'src/app/services/profesor.service';

@Component({
  selector: 'app-secretary-courses',
  templateUrl: './secretary-courses.component.html',
  styleUrls: ['./secretary-courses.component.scss']
})
export class SecretaryCoursesComponent implements OnInit {
  rows : any = [];
  rowsLoaded: boolean = false;
  idsasignaturas = [];
  originalRows: any = [];
  currentUserEmail: any;
  search: any;
  currentUser: any;
  columns = [
    { prop: 'id', name: 'ID' },
    { prop: 'name', name: 'Name' },
    { prop: 'description', name: 'Description' },
    { prop: 'ects', name: 'ECTS' },
    { prop: 'start_date', name: 'Start date' },
    { prop: 'end_date', name: 'End date' },
    { prop: 'num_places', name: 'Num places' },
    { prop: 'semester', name: 'Semester' },
    { prop: 'faculty', name: 'Faculty' },
    { prop: 'competences', name: 'Competences' },
    { prop: 'delete', name: 'Delete' }
  ];

  constructor(private alumnoService: AlumnoService, private asignaturaService: AsignaturaService, private activatedRoute: ActivatedRoute, private cdr : ChangeDetectorRef, private profesorService: ProfesorService, private router : Router) { }

  ngOnInit(): void {
    this.getCourses();
    this.rows = this.originalRows;
  }

  getCourses(){
    this.asignaturaService.getListaAsignaturas().subscribe(
      res => {
        for(let i=0; i<res.length; i++){
          this.asignaturaService.getFacultadAsignatura(res[i].id_facultad).subscribe(
            res1 => {
              let jsonRes = JSON.parse(JSON.stringify(res1));
              console.log(jsonRes.name + "jsonRes");
              let fila = {id: res[i].id, name: res[i].name, description: res[i].description, ects: res[i].ects,num_places: res[i].num_places, start_date: res[i].start_date, end_date: res[i].end_date, semester: res[i].semester, faculty: jsonRes.name};
              this.originalRows.push(fila);
            }
          );
        }
        setTimeout(() => {
          console.log(this.rows + "rowsaaaaaa");
          this.rowsLoaded = true;
        }, 500);
        
      },
    );
  }

  deleteCourse(id: any){
    this.asignaturaService.deleteAsignatura(id).subscribe(
      res => {
        console.log(res);
        this.rows = [];
        this.getCourses();
      },
      
    )
    window.location.reload();
  }
  editCourse(id: any){
    console.log("esto es una prueba" + id);
    this.router.navigate(['/secretary/courses/view-course/'+id])
    .then(() => {
      window.location.reload();
    }
    );
  }
  courseDetail(id: any){
    this.router.navigate(['/secretary/courses/course-detail/'+id])
    .then(() => {
      window.location.reload();
    }
    );
  }
  searchCourse(){
    this.cdr.detectChanges();
    console.log(this.search);
    let arrayBusc = [];
    for(let i = 0; i < this.originalRows.length; i++){
      console.log(this.originalRows[i].name + " " + this.search);
      if(this.originalRows[i].name.toLowerCase().includes(this.search.toLowerCase())||this.originalRows[i].description.toLowerCase().includes(this.search.toLowerCase())){
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
