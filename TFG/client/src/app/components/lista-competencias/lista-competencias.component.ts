import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { CompetenciaService } from 'src/app/services/competencia.service';


@Component({
  selector: 'app-lista-competencias',
  templateUrl: './lista-competencias.component.html',
  styleUrls: ['./lista-competencias.component.scss']
})
export class ListaCompetenciasComponent implements OnInit {
  rows : any = [];
  courseId: any;
  course: any;
  rowsLoaded: boolean = false;
  idcompetencias = [];
  currentUserEmail: any;
  currentUser: any;
  columns = [
    { prop: 'id', name: 'ID' },
    { prop: 'name', name: 'Name' },
    { prop: 'description', name: 'Description' },
    { prop: 'esco_url', name: 'Esco URL' }
  ];

  userRole= "nada";

  constructor(private activatedRoute: ActivatedRoute, private cdr : ChangeDetectorRef, private asignaturaService: AsignaturaService, private competenciaService: CompetenciaService) { }

  ngOnInit(): void {
    this.cdr.detectChanges();
    this.activatedRoute.params.subscribe(params => {
      this.courseId = params['asignatura'];
      console.log(this.courseId);
    });
    this.getCurrentCourse();
    this.getCompetenciasList();
    this.getCurrentUser();
    setTimeout(() => {
      this.setUserRole();
      console.log(this.userRole + "user role");
    }, 100);
  }

 

  getCurrentCourse(){
    this.asignaturaService.getAsignatura(this.courseId).subscribe(
      res => {
        this.course = res;
        console.log(this.course);
      }
    );
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
  getCurrentUser(){
    this.asignaturaService.getUserInfo().subscribe(
      res => {
        this.currentUser = JSON.parse(JSON.stringify(res));
        console.log(this.currentUser.email + "current user");
      },
    );
  }
  setUserRole(){
    console.log(this.currentUser.email);
    if(this.currentUser.email.endsWith('opendeusto.es') && this.currentUser.email != "secretaria@deusto.es"){
      this.userRole = "student"; 
    }else if(this.currentUser.email.endsWith('deusto.es') && this.currentUser.email != "secretaria@deusto.es"){
      this.userRole = "teacher";
    }else if(this.currentUser.email == "secretaria@deusto.es"){
      this.userRole = "secretary";
    }
  }
  unassignCompetence(idcompetencia: any){
    this.competenciaService.deleteCompetenciaAsignatura(this.courseId,idcompetencia).subscribe(
      res => {
        console.log(res);
        this.rows = [];
        this.getCompetenciasList();
      }
    );
  }
}
