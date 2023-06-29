import { Component, OnInit } from '@angular/core';
import { AsignaturaService } from '../../services/asignatura.service';
import { AuthService } from '../../services/auth.service';
import { AlumnoService } from 'src/app/services/alumno.service';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-academic-record-alumno',
  templateUrl: './academic-record-alumno.component.html',
  styleUrls: ['./academic-record-alumno.component.scss']
})
export class AcademicRecordAlumnoComponent implements OnInit {

  rows : any = [];
  studentId: any;
  isSecretary: boolean = false;
  rowsLoaded: boolean = false;
  idsasignaturas = [];
  currentUserEmail: any;
  currentUser: any;
  student: any;
  averageGrade: any;
  totalECTS: any;
  fullNameStudent: any;
  pdfTable: any = [];
  columns = [
    { prop: 'name', name: 'Name' },
    { prop: 'ects', name: 'ECTS' },
    { prop: 'year', name: 'Year' },
    { prop: 'grade', name: 'Grade' }
  ];

  constructor(private asignaturaService: AsignaturaService, private authService: AuthService, private cdr: ChangeDetectorRef, private alumnoService: AlumnoService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    

    this.cdr.detectChanges();
    this.activatedRoute.params.subscribe(params => {
      this.studentId = params['student'];
      console.log(this.studentId);
      if(this.studentId != undefined){
        console.log("student id not null");
        this.isSecretary = true;
        this.cdr.detectChanges();
        this.getAcademicRecordSecretary();
        setTimeout(() => {
          this.getStudentSecretary();
          this.createPdfTable();
        }, 500);
      }else{
        this.getCurrentUsersRecord();
        setTimeout(() => {
          this.getStudent();
          this.createPdfTable();
        }, 500);
        this.cdr.detectChanges();
      }
    });
    
  }
  getAcademicRecordSecretary(){
    this.asignaturaService.getListaAsignaturasAlumno(this.studentId).subscribe(
      res => {
        this.idsasignaturas = res;
        for(let i=0; i<this.idsasignaturas.length; i++){
          let objectasignatura = JSON.stringify(this.idsasignaturas[i])
          console.log(JSON.parse(objectasignatura).id_asignatura+"asignatura");
          if(JSON.parse(objectasignatura).grade != null){
            this.asignaturaService.getAsignatura(JSON.parse(objectasignatura).id_asignatura).subscribe(
              res => {
                let jsonRes = JSON.parse(JSON.stringify(res));
                
                let fecha: Date = new Date(jsonRes.start_date);
                console.log(fecha.getFullYear()+"start date");
                let jsonObject = {name: jsonRes.name, ects: jsonRes.ects, year: fecha.getFullYear(), semester: jsonRes.semester, grade: JSON.parse(objectasignatura).grade}
                if(jsonRes.graded == true){
                  this.rows.push(jsonObject);
                }
                
                console.log(jsonRes);
              },
              err => console.error(err)
            );
          }
        }
        setTimeout(() => {
          console.log(JSON.stringify(this.rows) + "rows");
          this.rowsLoaded = true;
          this.cdr.detectChanges();
          this.getAverageGrade();
          this.getTotalECTS();
        },500);
        this.cdr.detectChanges();
      }
    );
  }

  getCurrentUsersRecord(){
    this.asignaturaService.getUserInfo().subscribe(
      res => {
        this.currentUser = res;
        console.log(this.currentUser.email);
        this.asignaturaService.getListaAsignaturasAlumno(this.currentUser.id).subscribe(
          res => {
            this.idsasignaturas = res;
            for(let i=0; i<this.idsasignaturas.length; i++){
              let objectasignatura = JSON.stringify(this.idsasignaturas[i])
              console.log(JSON.parse(objectasignatura).id_asignatura+"asignatura");
              if(JSON.parse(objectasignatura).grade != null){
                this.asignaturaService.getAsignatura(JSON.parse(objectasignatura).id_asignatura).subscribe(
                  res => {
                    let jsonRes = JSON.parse(JSON.stringify(res));
                    
                    let fecha: Date = new Date(jsonRes.start_date);
                    console.log(fecha.getFullYear()+"start date");
                    let jsonObject = {name: jsonRes.name, ects: jsonRes.ects, year: fecha.getFullYear(), semester: jsonRes.semester, grade: JSON.parse(objectasignatura).grade}
                    if(jsonRes.graded == true){
                      this.rows.push(jsonObject);
                    }
                    console.log(jsonRes);
                  },
                  err => console.error(err)
                );
              }
            }
            setTimeout(() => {
              console.log(JSON.stringify(this.rows) + "rows");
              this.rowsLoaded = true;
              this.cdr.detectChanges();
              this.getAverageGrade();
              this.getTotalECTS();
            },500);
            this.cdr.detectChanges();
          }
        );
      }
    );
  }
  getAverageGrade(){
    let average = 0.0;
    for(let i=0; i<this.rows.length; i++){
      average += parseFloat(this.rows[i].grade);
      console.log(average + "average");
      console.log(this.rows[i].grade + "grade");
    }
    this.averageGrade = average/this.rows.length;
    this.averageGrade = this.averageGrade.toFixed(2);
    console.log(this.averageGrade);
  }
  getTotalECTS(){
    let total = 0;
    for(let i=0; i<this.rows.length; i++){
      if(this.rows[i].grade >= 5){
        total += this.rows[i].ects;
      }
      
    }
    this.totalECTS = total;
  }
  getStudent(){
    this.alumnoService.getAlumno(this.currentUser.id).subscribe(
      res => {
        this.student = res;
      }
    );
  }
  getStudentSecretary(){
    this.alumnoService.getAlumno(this.studentId).subscribe(
      res => {
        console.log(res);
        this.student = res;
        console.log(res.name +"alumnoooooo NAMEEEEEE");
        this.fullNameStudent = res.name + " " + res.surname1 + " " + res.surname2;
      }
    );
  }
  createPdfTable(){
    this.pdfTable.push([
      {text: 'Name', bold: true},
      {text: 'ECTS', bold: true},
      {text: 'Year', bold: true},
      {text: 'Semester', bold: true},
      {text: 'Grade', bold: true}
      ]);
    
    for(let i=0; i<this.rows.length; i++){

      this.pdfTable.push([
        {text: this.rows[i].name},
        {text: this.rows[i].ects},
        {text: this.rows[i].year},
        {text: this.rows[i].semester},
        {text: this.rows[i].grade}
      ]);
      

      

    }
  }

  downloadPDF(){
    const pdfDefinition : any = {
      _content: [
        {
          text: 'Academic Record',
          style: 'header',
          alignment: 'center'
        },
        '\n',
        '\n',
        {
          text: 'Student: ' + this.student.name + ' ' + this.student.surname1 + ' ' + this.student.surname2,
          style: 'subheader'
        },
        '\n',
        '\n',
        {
          text: 'Courses:', bold: true
        },
        {
          style: 'tableExample',
          table: {
            widths: [100, 100, 100, 100, 100],
            body: this.pdfTable
          }
        },
        '\n',
        '\n',
        {
          text: 'Average Grade: ' + this.averageGrade,
        },
        '\n',
        {
          text: 'Total ECTS: ' + this.totalECTS,
        }
        
      ],
      get content() {
        return this._content;
      },
      set content(value) {
        this._content = value;
      },
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'justify'
        },
        tableExample: {
          margin: [0, 5, 0, 15]
        },
      }
    };

    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.download(this.student.name + '_' + this.student.surname1 + '_' + this.student.surname2);
  }

  goBack(){
    history.back();
    setTimeout(() => {
      window.location.reload();
    }, 50);
  }

}
