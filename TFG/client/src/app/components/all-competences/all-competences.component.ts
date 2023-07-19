import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CompetenciaService } from 'src/app/services/competencia.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-all-competences',
  templateUrl: './all-competences.component.html',
  styleUrls: ['./all-competences.component.scss']
})
export class AllCompetencesComponent implements OnInit {

  constructor(private competenciaService: CompetenciaService, private cdr: ChangeDetectorRef, private activatedRoute: ActivatedRoute, private router: Router) { }

  rows: any = [];
  rowsAsignatura: any = [];
  rowsSinAsignatura: any = [];
  rowsloaded: boolean = false;
  courseId: any;
  isCourse: boolean = false;
  idcompetencias:any = [];
  search: any;

  ngOnInit(): void {
    this.cdr.detectChanges();
    this.activatedRoute.params.subscribe(params => {
      this.courseId = params['asignatura'];
      console.log(this.courseId);
      if(this.courseId != undefined){
        console.log("course id not null");
        this.isCourse = true;
        this.getSomeCompetencias();
        this.cdr.detectChanges();
      }else{
        this.getCompetencias();
        this.cdr.detectChanges();
      }
    });
    
  }
  searchCompetence(){

  }

  getCompetencias(){
    this.competenciaService.getAllCompetencias().subscribe(
      res => {
        this.rows = res;
        
        setTimeout(() => {
          console.log(JSON.stringify(this.rows) + "rows");
          this.rowsloaded = true;
          this.cdr.detectChanges();
        },500);
      }
    );
  }

  getSomeCompetencias(){
    this.competenciaService.getAllCompetencias().subscribe(
      res => {
        this.competenciaService.getCompetencias(this.courseId).subscribe( 
          res2 => {
            this.rows = [];
            for(let i =0; i<res.length; i++){
              let noesta = true;
              for(let j =0; j<res2.length; j++){
                if(res[i].id == res2[j].id_competencia){
                  noesta = false;
                }
              }
              if(noesta == true){
                this.rows.push(res[i]);
              }
            }
          }
        );
      }

    );
  }

  deleteCompetence(id: any){
    this.competenciaService.deleteCompetencia(id).subscribe(
      res => {
        console.log(res);
        this.rows = [];
        this.getCompetencias();
      }
    );
  }

  addCompetence(id:any){
    let asignatura_competencia = {id_asignatura: this.courseId, id_competencia:id};
    this.competenciaService.createAsignaturaCompetencia(asignatura_competencia).subscribe(
      res => {
        console.log(res);
      }
    );
    setTimeout(() => {
      this.rows = [];
      this.getSomeCompetencias();
      this.cdr.detectChanges();
    }, 500);
  }

  getCompetenciasAsignatura(){
    this.competenciaService.getCompetencias(this.courseId).subscribe( res => {
      this.idcompetencias = res;
      for(let i =0; i<this.idcompetencias.length; i++){
        let objectcompetencia = JSON.stringify(this.idcompetencias[i])
        console.log(JSON.parse(objectcompetencia).id_competencia+"competencia");
        this.competenciaService.getCompetencia(JSON.parse(objectcompetencia).id_competencia).subscribe(
          res => {
            let jsonRes = JSON.parse(JSON.stringify(res));
            this.rowsAsignatura.push(jsonRes);
            console.log(jsonRes + "jsonRes")
          }
        );
      }
      
    });
  }
  
  quitarCompetencias(){
    this.getCompetenciasAsignatura();
    for(let i =0; i<this.rows.length; i++){
      for(let j =0; j<this.rowsAsignatura.length; j++){
        if(this.rows[i].id == this.rowsAsignatura[j].id){
          this.rows.splice(i,1);
        }
      }
    }
    console.log(this.rows + "rows");
    
    console.log("quitando");
  }
  competenceDetail(id: any){
    this.router.navigate(['/secretary/courses/course-detail/competence-detail/'+id])
    .then(() => {
      window.location.reload();
    }
    );
  }
  editCompetence(id: any){
    this.router.navigate(['/secretary/competences/edit-competence/'+id])
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
