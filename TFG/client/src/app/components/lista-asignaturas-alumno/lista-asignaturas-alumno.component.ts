import { Component, OnInit } from '@angular/core';
import { AsignaturaService } from '../../services/asignatura.service';
import { AuthService } from '../../services/auth.service';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lista-asignaturas-alumno',
  templateUrl: './lista-asignaturas-alumno.component.html',
  styleUrls: ['./lista-asignaturas-alumno.component.scss']
})
export class ListaAsignaturasAlumnoComponent implements OnInit {

  rows : any = [];
  rowsLoaded: boolean = false;
  idsasignaturas = [];
  currentUserEmail: any;
  currentUser: any;
  columns = [
    { prop: 'id', name: 'ID' },
    { prop: 'name', name: 'Name' },
    { prop: 'description', name: 'Description' },
    { prop: 'ects', name: 'ECTS' },
    { prop: 'start_date', name: 'Start date' },
    { prop: 'end_date', name: 'End date' },
    { prop: 'semester', name: 'Semester' },
    { prop: 'faculty', name: 'Faculty' },
    { prop: 'competences', name: 'Competences' }
  ];

  constructor( private AsignaturaService: AsignaturaService, private AuthService: AuthService,  private cdr: ChangeDetectorRef, private router: Router) { }

  ngOnInit(): void {
    
    this.getCurrentUsersCourses();

    
  }

  

  getCurrentUsersCourses(){
    this.AsignaturaService.getUserInfo().subscribe(
      res => {
        this.currentUser = res;
        console.log(this.currentUser);
        this.AsignaturaService.getListaAsignaturasAlumno(this.currentUser.id).subscribe(
          res => {
            this.idsasignaturas = res;
            console.log(this.idsasignaturas);
            for(let i=0; i<this.idsasignaturas.length; i++){
              let objectasignatura = JSON.stringify(this.idsasignaturas[i])
              console.log(JSON.parse(objectasignatura).id_asignatura+"asignatura");
              this.AsignaturaService.getAsignatura(JSON.parse(objectasignatura).id_asignatura).subscribe(
                res2 => {
                  let jsonRes2 = JSON.parse(JSON.stringify(res2));
                  console.log(jsonRes2.id + "res2");
                    this.AsignaturaService.getFacultadAsignatura(jsonRes2.id_facultad).subscribe(
                      res1 => {
                        let jsonRes = JSON.parse(JSON.stringify(res1));
                        console.log(jsonRes.name + "jsonRes");
                        let fila = {id: jsonRes2.id, name: jsonRes2.name, description: jsonRes2.description, ects: jsonRes2.ects, start_date: jsonRes2.start_date, end_date: jsonRes2.end_date, semester: jsonRes2.semester, faculty: jsonRes.name};
                        this.rows.push(fila);
                      }
                    );
                  /*let jsonRes = JSON.parse(JSON.stringify(res));
                  this.rows.push(jsonRes);
                  console.log(jsonRes);*/
                },
                err => console.error(err)
              );
              if(i==this.idsasignaturas.length-1){
                
              }
            }
            setTimeout(() => {
              console.log(JSON.stringify(this.rows) + "rows");
              this.rowsLoaded = true;
              this.cdr.detectChanges();
            },500);
            this.cdr.detectChanges();
            
          });
      } );
      
  }
  courseDetail(id: any){
    this.router.navigate(['/students/courses/course-detail/'+id])
    .then(() => {
      window.location.reload();
    }
    );
  }
    

}
