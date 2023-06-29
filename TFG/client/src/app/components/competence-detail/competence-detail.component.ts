import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { CompetenciaService } from 'src/app/services/competencia.service';

@Component({
  selector: 'app-competence-detail',
  templateUrl: './competence-detail.component.html',
  styleUrls: ['./competence-detail.component.scss']
})
export class CompetenceDetailComponent implements OnInit {
  competenceId: any;
  competence: any;
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
        this.competence = res.name;
        this.description = res.description;
        this.esco_url = res.esco_url;
        console.log(res);
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
