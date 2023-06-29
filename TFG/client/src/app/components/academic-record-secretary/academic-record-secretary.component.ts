import { Component, OnInit } from '@angular/core';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { AlumnoService } from 'src/app/services/alumno.service';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { get } from 'lodash';

@Component({
  selector: 'app-academic-record-secretary',
  templateUrl: './academic-record-secretary.component.html',
  styleUrls: ['./academic-record-secretary.component.scss']
})
export class AcademicRecordSecretaryComponent implements OnInit {
  rows: any = [];

  constructor(private asignaturaService: AsignaturaService, private alumnoService: AlumnoService, private cdr: ChangeDetectorRef, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getstudentList();
    
  }

  getstudentList() {
    this.alumnoService.getAllStudents().subscribe(
      res => {
        for(let i=0 ; i<res.length; i++){
          if(res[i].registered == 1){
            this.rows.push({id: res[i].id, name: res[i].name, dni: res[i].dni, email: res[i].email, full_name: res[i].name + " " + res[i].surname1 + " " + res[i].surname2})
          }
        }
        console.log(res);
      }
    );
  }
  viewAcademicRecord(id: any) {
    this.router.navigate(['secretary/academic-record/'+id])
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

