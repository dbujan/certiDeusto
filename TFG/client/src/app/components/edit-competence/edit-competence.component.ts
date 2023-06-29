import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { CompetenciaService } from 'src/app/services/competencia.service';
import { get } from 'lodash';

@Component({
  selector: 'app-edit-competence',
  templateUrl: './edit-competence.component.html',
  styleUrls: ['./edit-competence.component.scss']
})
export class EditCompetenceComponent implements OnInit {
  anyChange: boolean = false;
  competenceId: any;
  name: any;
  description: any;
  esco_url: any;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private cdr: ChangeDetectorRef, private competenciaService: CompetenciaService) { }

  ngOnInit(): void {
    this.cdr.detectChanges();
    this.activatedRoute.params.subscribe(params => {
      this.competenceId = params['competence'];
      console.log(this.competenceId + "competencia");
    });
    this.getCompetence();
  }

  getCompetence(){
    this.competenciaService.getCompetencia(this.competenceId).subscribe(
      res => {
        this.name = res.name;
        this.description = res.description;
        this.esco_url = res.esco_url;
        console.log(res);
      }
    );
  }
  validateForm(){
    if(this.name == undefined || this.description == undefined || this.esco_url == undefined ){
      alert("Please fill all the fields");
    }else if(this.name == "" || this.description == "" || this.esco_url == "" ){
      alert("Please fill all the fields");
    }else{
      this.updateCompetence();
    }
  }
  updateCompetence(){
    let competence = {name: this.name, description: this.description, esco_url: this.esco_url};
    this.competenciaService.updateCompetencia(this.competenceId, competence).subscribe(
      res => {
        console.log(res);
        alert("Competence updated successfully");
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
