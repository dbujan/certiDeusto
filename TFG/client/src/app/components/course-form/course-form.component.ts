import { Component, OnInit } from '@angular/core';
import { AlumnoService } from 'src/app/services/alumno.service';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { ProfesorService } from 'src/app/services/profesor.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  name: any;
  description: any;
  ects: any;
  num_places: any;
  start_date: any;
  end_date: any;
  semester: any;
  faculty: any;
  faculty_id: any;
  mydate: any;
  options: any = [];
  courseV: boolean= false;
  descriptionV: boolean=false;
  ectsV:boolean =false;
  num_placesV:boolean = false;
  dateNow: any;
  dateStartV:boolean=false;
  dateEndV: boolean= false;


  constructor(private alumnoService: AlumnoService, private asignaturaService: AsignaturaService, private activatedRoute: ActivatedRoute, private cdr : ChangeDetectorRef, private profesorService: ProfesorService) { }

  ngOnInit(): void {
    this.getFacultades();
    this.dateNow = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  }

  validateForm(){
    this.mydate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    console.log(this.mydate + "fecha");
    if(this.ects < 0 || this.ects > 12){
      this.ectsV=true;
      alert("ECTS must be between 0 and 12");
    }else if(this.num_places <= 0){
      this.num_placesV=true;
      alert("Number of places must be greater than 0"); 
    }else if(this.start_date == undefined){
      this.dateStartV=true;
      alert("You must fill the start date field");
    }else if(this.end_date == undefined){
      this.dateEndV=true;
      alert("You must fill the End date field");
    }else if(this.start_date > this.end_date){
      this.dateEndV=true;
      this.dateStartV=true;
      alert("Start date must be earlier than end date");
    }else if(this.start_date < this.mydate){
      this.dateStartV=true;
      alert("Start date must be greater than today");
    }else if(this.end_date < this.mydate){
      this.dateEndV=true;
      alert("End date must be greater than today");
    }else if(this.name==""||this.name == undefined){
      this.courseV=true;
      alert("You must fill the name field")
    }else if(this.description==""||this.description==undefined){
      this.descriptionV=true;
      alert("You must fill the description field");
    }
    else{
      this.createCourse();
    }
  }

  createCourse(){
    console.log(this.faculty + "facultad");
    this.asignaturaService.getFacultadByNombre(this.faculty).subscribe(
      res => {
        console.log(JSON.stringify(res) + "id");
        this.faculty_id = JSON.parse(JSON.stringify(res)).id;
        console.log(this.start_date + "fecha");
        console.log(this.end_date + "fecha");
        let asignatura = {name: this.name, description: this.description, ects: this.ects, num_places: this.num_places, start_date: this.start_date, end_date: this.end_date, semester: this.semester, id_facultad: this.faculty_id};
        this.asignaturaService.createAsignatura(asignatura).subscribe(
          res => {
            console.log(res);
            alert("Course created successfully");
          }
        );
      }
    );
    setTimeout(() => {
      this.name = "";
      this.description = "";
      this.ects = "";
      this.num_places = "";
      this.start_date = "";
      this.end_date = "";
      this.semester = "";
      this.faculty = "";
      this.cdr.detectChanges();
    }, 500);
    this.cdr.detectChanges();
    }

    getFacultades(){
      this.asignaturaService.getAllfaculties().subscribe(
        res => {
          for(let i = 0; i < res.length; i++){
            this.options.push(res[i].name);
          }
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
