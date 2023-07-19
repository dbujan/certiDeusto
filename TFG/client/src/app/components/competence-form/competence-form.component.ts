import { Component, OnInit } from '@angular/core';
import { AlumnoService } from 'src/app/services/alumno.service';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { CompetenciaService } from 'src/app/services/competencia.service';

import { formatDate } from '@angular/common';

@Component({
  selector: 'app-competence-form',
  templateUrl: './competence-form.component.html',
  styleUrls: ['./competence-form.component.scss']
})
export class CompetenceFormComponent implements OnInit {

  name: any;
  description: any;
  esco_url: any;
  courseId: any;
  competenciaId: any;
  isCourse: boolean = false;
  ErrorEsco_url: boolean=false;
  errorName:boolean=false;
  errorDescription:boolean=false;

  constructor(private alumnoService: AlumnoService, private asignaturaService: AsignaturaService, private activatedRoute: ActivatedRoute, private cdr : ChangeDetectorRef, private competenciaService: CompetenciaService, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.courseId = params['asignatura'];
      console.log(this.courseId);
    });
    if(this.courseId != undefined){
      this.isCourse = true;
    }
  }

  validateForm(){
    if(this.name==undefined||this.name==null){
      alert("Fill out the name field please")
      this.errorName=true;
    }else if(this.description==undefined||this.description==null){
      this.errorDescription=true;
      alert("Fill out the description field please ")
    }else if(this.esco_url==undefined||this.esco_url==null){
      this.ErrorEsco_url=true;
      alert("Fill out the ESCO url field")
    }else if(this.esco_url.includes("http://data.europa.eu/esco/skill/")!=true){
      alert("incorrect ESCO url")
      this.ErrorEsco_url=true  
    }else{
      this.createCompetence();
    setTimeout(() => {
      this.name = "";  
      this.description = "";
      this.esco_url = "";
      alert("competence successfully created");
    }, 100);
    }
    

  }
  createCompetence(){
    console.log(this.name + "nombre");
    console.log(this.description + "descripcion");
    console.log(this.esco_url + "esco");
    let competencia = {name: this.name, description: this.description, esco_url: this.esco_url}
    this.competenciaService.createCompetencia(competencia).subscribe(
      res => {
        console.log(res.id + "id competencia");
      }
    );
  }
  validateForm2(){
    this.createCompetence();

    

    setTimeout(() => {
      let escosinhttp = this.esco_url.replace("http://data.europa.eu/esco/skill/", "");
      console.log(escosinhttp);
      this.competenciaService.getCompetenciaEsco(escosinhttp).subscribe(
        res => {
          console.log(res.id);
          this.competenciaId = res.id;
          let asignatura_competencia = {id_asignatura: this.courseId, id_competencia: this.competenciaId}
          this.competenciaService.createAsignaturaCompetencia(asignatura_competencia).subscribe(
            res => {
              console.log(res);
            }
          );
        }
      );
      setTimeout(() => {
        this.name = "";  
        this.description = "";
        this.esco_url = "";
        alert("competence successfully created and Assigned to the course");
        this.router.navigate(['secretary/competences', this.courseId]);
      }, 100);
      
    }, 1000);
  }
  goBack(){
    history.back();
    setTimeout(() => {
      window.location.reload();
    }, 50);
  }

}
