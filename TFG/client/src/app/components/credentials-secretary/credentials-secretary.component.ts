import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { CompetenciaService } from 'src/app/services/competencia.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { AlumnoService } from 'src/app/services/alumno.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';





@Component({
  selector: 'app-credentials-secretary',
  templateUrl: './credentials-secretary.component.html',
  styleUrls: ['./credentials-secretary.component.scss']
})
export class CredentialsSecretaryComponent implements OnInit {

  constructor(private alumnoService: AlumnoService, private asignaturaService: AsignaturaService, private activatedRoute: ActivatedRoute, private cdr : ChangeDetectorRef, private profesorService: ProfesorService, private competenciaService: CompetenciaService,private http: HttpClient) { }
  
  asignaturasTerminadas: any = [];
  rowsLoaded: boolean = false;
  rowsLoaded2: boolean = false;
  idSelectedCourse: any;
  selectedCourse: any;
  fullNameAlumno: any;
  selectedCourseTeacher: any;
  selectedCourseCompetences: any = [];
  listaAlumnos: any = [];
  key: any;
  columns = [
    { prop: 'id', name: 'ID' },
    { prop: 'name', name: 'Name' },
    { prop: 'description', name: 'Description' },
    { prop: 'ects', name: 'ECTS' },
    { prop: 'num_places', name: 'Num places' },
    { prop: 'teacher', name: 'Teacher' }
  ];
  ngOnInit(): void {
    this.getAsignaturasTerminadas();
  }

  
  getAsignaturasTerminadas(){
    this.asignaturaService.getAsignaturasGraded().subscribe(
      res => {
        console.log(res);
        for(let i=0; i<res.length; i++){
          console.log(res[i].id + "id de la asignatura");
          if(res[i].issued != 1){
            this.asignaturaService.getProfesor(res[i].id).subscribe(
              res2 => {
                console.log(res2[0].id_profesor + "id del profesor");
                for(let j=0; j<res2.length; j++){
                  this.profesorService.getProfesor(res2[j].id_profesor).subscribe(
                    res3 => {
                      let profesorName = res3.name;
                      console.log(profesorName);
                      this.asignaturasTerminadas.push({id: res[i].id, name: res[i].name, description: res[i].description, ects: res[i].ects, num_places: res[i].num_places, profesor: profesorName})
                    }
                  );
                }
                setTimeout(() => {
                  console.log(this.asignaturasTerminadas + "lista de asignaturas terminadas");
                  this.rowsLoaded = true;
                }, 500);
              }
            );
          }
         
        }
        
      },
      
    );
  }

 

  viewCourse(id: any){
    this.listaAlumnos = [];
    this.idSelectedCourse = id;
    console.log(this.idSelectedCourse);
    this.asignaturaService.getAsignatura(this.idSelectedCourse).subscribe(
      res => {
        this.selectedCourse = res;
        console.log(this.selectedCourse.name + "asignatura para generar xml");
        this.asignaturaService.getProfesor(this.idSelectedCourse).subscribe(
          res2 => {
            for(let i=0; i<res2.length; i++){
              this.profesorService.getProfesor(res2[i].id_profesor).subscribe(
                res3 => {
                  this.selectedCourseTeacher = res3;
                  console.log(this.selectedCourseTeacher.name + "profesor de la asignatura");
                }
              );
            }
          }
        );
      }
    );
    this.competenciaService.getCompetencias(this.idSelectedCourse).subscribe(
      res4 => {
        for(let i=0; i<res4.length; i++){
          this.competenciaService.getCompetencia(res4[i].id_competencia).subscribe(
            res5 => {
              console.log(res5.name + "competencia de la asignatura");
              this.selectedCourseCompetences.push({name: res5.name, description: res5.description, esco_url: res5.esco_url});
              
            }
          );
        }
       
      }
    );

    
    this.asignaturaService.getListaAlumnosAsignatura(id).subscribe(
      res => {
        console.log(res[0].id_alumno +"lista alumnos de res");
        for(let i=0; i<res.length; i++){
          this.alumnoService.getAlumno(res[i].id_alumno).subscribe(
            res2 => {
              console.log(JSON.stringify(res2) + "resssss22222");
              //this.listaAlumnos.push(JSON.stringify(res2));
              this.listaAlumnos.push({id: res2.id, name: res2.name, surname1: res2.surname1,surname2: res2.surname2, email: res2.email, dni: res2.dni, born_date: res2.born_date, gender: res2.id_genero, full_name: res2.name + " " + res2.surname1 + " " + res2.surname2 });
              this.cdr.detectChanges();
            }
          );
        }
        setTimeout(() => {
          console.log(this.listaAlumnos+"lista definitiva alumnos");
          this.rowsLoaded2 = true;
          this.cdr.detectChanges();
        }, 500);
      }
    );
  }
  generateXML() {

    alert("Are you sure you want to issue the credentials for all the students of " +this.selectedCourse.name +"?");
   
    for(let i=0; i<this.listaAlumnos.length; i++){
     let XMLWriter = require('xml-writer');
     let xw = new XMLWriter;

    let fechaAhora = moment(new Date().toISOString()).format("YYYY-MM-DDTHH:mm:ss+02:00")
    //Generate XML
    let fechaDiezAnios = moment(new Date().toISOString()).add(10, 'y').format("YYYY-MM-DDTHH:mm:ss+02:00");
    let FullName = this.listaAlumnos[i].name +" "+ this.listaAlumnos[i].surname1 +" "+ this.listaAlumnos[i].surname2;
    let fullNameTeacher = this.selectedCourseTeacher.name +" "+ this.selectedCourseTeacher.surname1 +" "+ this.selectedCourseTeacher.surname2;
    console.log(FullName);
    console.log("XML generado");
    console.log(fechaAhora.toLocaleString());
    console.log(fechaDiezAnios);
    console.log(this.listaAlumnos.length);
    console.log(this.listaAlumnos[i].born_date);
    
    xw.startDocument('1.0', 'UTF-8', false);
    xw.startElement('DigitalCredential');
      xw.startElement('CredentialData');
        xw.startElement('ValidFrom').text(fechaAhora.toLocaleString()).endElement();
        xw.startElement('ValidUntil').text(fechaDiezAnios.toLocaleString()).endElement();
        xw.startElement('Issuer');
          xw.startElement('Name').writeAttribute('content-type', 'text/plain').writeAttribute('lang', 'en').text('Universidad de Deusto').endElement();
          xw.startElement('URL').text('https://www.deusto.es/').endElement();
          xw.startElement('Email').writeAttribute('content-type', 'text/plain').writeAttribute('lang', 'en').text('deusto@deusto.es').endElement();
          xw.startElement('City').writeAttribute('content-type', 'text/plain').writeAttribute('lang', 'en').text('Bilbao').endElement();
          xw.startElement('Country').writeAttribute('content-type', 'text/plain').writeAttribute('lang', 'en').text('Spain').endElement();
        xw.endElement();
      xw.endElement();
      xw.startElement('CredentialSubject');
        xw.startElement('FullName').writeAttribute('content-type', 'text/plain').writeAttribute('lang', 'en').text(FullName).endElement();
        xw.startElement('Email').writeAttribute('content-type', 'text/plain').writeAttribute('lang', 'en').text(this.listaAlumnos[i].email).endElement();
        xw.startElement('DNI').writeAttribute('content-type', 'text/plain').writeAttribute('lang', 'en').text(this.listaAlumnos[i].dni).endElement();
        xw.startElement('BornDate').text(this.listaAlumnos[i].born_date.toLocaleString()).endElement();
      xw.endElement();
      xw.startElement('CredentialCourse');
        xw.startElement('CourseName').writeAttribute('content-type', 'text/plain').writeAttribute('lang', 'en').text(this.selectedCourse.name).endElement();
        xw.startElement('CourseDescription').writeAttribute('content-type', 'text/plain').writeAttribute('lang', 'en').text(this.selectedCourse.description).endElement();
        xw.startElement('CourseECTS').text(this.selectedCourse.ects).endElement();
        xw.startElement('CourseStartDate').text(this.selectedCourse.start_date.toLocaleString()).endElement();
        xw.startElement('CourseEndDate').text(this.selectedCourse.end_date.toLocaleString()).endElement();
        xw.startElement('CourseTeacher');
          xw.startElement('TeacherFullName').writeAttribute('content-type', 'text/plain').writeAttribute('lang', 'en').text(fullNameTeacher).endElement();
          xw.startElement('TeacherEmail').writeAttribute('content-type', 'text/plain').writeAttribute('lang', 'en').text(this.selectedCourseTeacher.email).endElement();
        xw.endElement();
        xw.startElement('CourseCompetences');
          for(let i=0; i<this.selectedCourseCompetences.length; i++){
            xw.startElement('Competence');
              xw.startElement('CompetenceName').writeAttribute('content-type', 'text/plain').writeAttribute('lang', 'en').text(this.selectedCourseCompetences[i].name).endElement();
              xw.startElement('CompetenceDescription').writeAttribute('content-type', 'text/plain').writeAttribute('lang', 'en').text(this.selectedCourseCompetences[i].description).endElement();
              xw.startElement('CompetenceESCOURL').text(this.selectedCourseCompetences[i].esco_url).endElement();
            xw.endElement();
          }
        xw.endElement();
      xw.endElement();
    xw.endElement();
    xw.endDocument();

    //let blob = new Blob([xw.toString()], {type: "text/xml"});

    //saveAs(blob, 'DigitalCredential'+'_'+FullName+'_'+this.selectedCourse.name+'.xml');

   this.http.get('assets/key/deusto.key', {responseType: 'text'}).subscribe(data => {
      console.log(data + "data");
      this.key= data;
    });

   
    let jsonXml= {
      "xml": xw.toString()
    }
    let jsonXmlString= JSON.stringify(jsonXml);
    console.log(jsonXmlString + "xml generado");
    const namecred = FullName +" "+ this.selectedCourse.name;
    this.pruebaFirma(jsonXml, this.listaAlumnos[i].id, namecred);

    //set as issued
    this.selectedCourse.issued = 1;
    this.asignaturaService.updateIssued(this.idSelectedCourse).subscribe(
      res =>{
        console.log(res);
      }
    )

    /*const NodeRSA = require('node-rsa');
    const SignedXml = require('xml-crypto-browser').SignedXml;

    const xmlDom = new DOMParser().parseFromString(xw.toString(), 'text/xml');
    const privateKey = new NodeRSA(this.key);

    const sig = new SignedXml();
    sig.addReference('/*');
    sig.signingKey = this.key;
    sig.computeSignature(xmlDom);

    const signedXml = sig.getSignedXml();
    console.log(signedXml + "xml firmado");*/
  
    
    }

    
   
  }
  pruebaBtn(xml:any){
    this.asignaturaService.pruebapy(xml).subscribe(
      data => {
        console.log(data);
      }
    );

  }
  pruebaTrustOS(hash: any, id_alumno: any, name:any){
    this.asignaturaService.loginTrustOS().subscribe(
      data =>{
        console.log(data.output + " JSONWEBTOKENNN-TRUSTOS")
        this.asignaturaService.insertCredential(data.output, hash,id_alumno ,this.selectedCourse.id, name).subscribe(
          res =>{
            //console.log(res.output.certID + "respuestaaaa");
          }
        );

      }
    );
  }

  pruebaFirma(xml:any, id_alumno:any, name: any){

    this.asignaturaService.xmlsign(xml).subscribe(
      data => {
        console.log(data.xml + "xml recibido");
        let blob = new Blob([data.xml.toString()], {type: "text/xml"});
        //saveAs(blob, 'DigitalCredential'+'_'+'_'+this.selectedCourse.name+'.xml');
        const crypto = require('crypto-js');
        var ciphertext = crypto.AES.encrypt(data.xml.toString(), 'secret key 123').toString();
        console.log(ciphertext + "cifrado");
        this.pruebaTrustOS(ciphertext,id_alumno, name);
      }
    );
    /*setTimeout(() => {
      window.location.reload();
    }, 1000);*/
  }

  goBack(){
    history.back();
    setTimeout(() => {
      window.location.reload();
    }, 50);
  }


  

}
