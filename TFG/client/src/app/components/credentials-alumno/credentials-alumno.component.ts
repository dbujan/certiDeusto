import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { CompetenciaService } from 'src/app/services/competencia.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { AlumnoService } from 'src/app/services/alumno.service';
import { ProfesorService } from 'src/app/services/profesor.service';

@Component({
  selector: 'app-credentials-alumno',
  templateUrl: './credentials-alumno.component.html',
  styleUrls: ['./credentials-alumno.component.scss']
})
export class CredentialsAlumnoComponent implements OnInit {

  credential: any;
  currentUser:any;
  idsAsignaturas: any = [];
  rows : any = [];


  constructor(private asignaturaService: AsignaturaService) { }

  ngOnInit(): void {
    //this.getCredential()
    this.getCurrentUser();
    setTimeout(() => {
      this.getCredentialsid(); 
    }, 100);
    
  }

  getCurrentUser(){
    this.asignaturaService.getUserInfo().subscribe(
      res => {
        this.currentUser = res;
        console.log(this.currentUser.id+ "iddd");
      }
    );
  }

  getCredentialsid(){
    this.asignaturaService.getCredentialsAlumno(this.currentUser.id).subscribe(
      res =>{
        this.idsAsignaturas = res;
        console.log(res + "lista credenciales");
        for(let i=0; i<this.idsAsignaturas.length; i++){
          this.asignaturaService.getAsignatura(this.idsAsignaturas[i].id_asignatura).subscribe(
            res2 =>{
              this.rows.push({name: res2.name, credential: this.idsAsignaturas[i].asset_id});
            }
          )

        }
      }
    )
  }

  getCredential(asset_id:any){
    const assetId = asset_id;
    this.asignaturaService.loginTrustOS().subscribe(
      data =>{
        this.asignaturaService.getCredential(data.output, assetId).subscribe(
          res =>{
            console.log(res.output.data.badge.content[0].file_hash + "contenido");
            this.credential= res.output.data.badge.content[0].file_hash;
            const crypto = require('crypto-js');
            var bytes  = crypto.AES.decrypt(this.credential, 'secret key 123');
            var originalText = bytes.toString(crypto.enc.Utf8);
            console.log(originalText);
            let blob = new Blob([originalText], {type: "text/xml"});
            saveAs(blob, 'DigitalCredential'+'.xml');
          });
      }
    );
  }

}
