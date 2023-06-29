import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable} from "rxjs";

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {

  constructor(private http: HttpClient, private AuthService:AuthService) { }

  API_URI = 'http://localhost:3000';

  userToken: any ;

 public Currentuser = this.AuthService.currentUser;

  getAsignatura(id:any): Observable<any>{
    return this.http.get(`${this.API_URI}/asignatura/${id}`);
  }
  printCurrentUser(){
    console.log(this.Currentuser);
  }

  getUserInfo(): Observable<any>{
    this.userToken = localStorage.getItem('token');
    console.log(this.userToken+"token From Local Storage");
    var header = {
      headers: new HttpHeaders()
      .set('Authorization',  `Bearer ${this.userToken}`)
    }
    return this.http.post(`${this.API_URI}/verifyToken`,this.userToken, header);
  }

  getListaAsignaturasAlumno(id: any): Observable<any>{
    return this.http.get(`${this.API_URI}/alumno_asignatura/${id}`);
  }
  getListaAsignaturasProfesor(id: any): Observable<any>{
    return this.http.get(`${this.API_URI}/profesor_asignatura/${id}`);
  }
  getListaAsignaturas(): Observable<any>{
    return this.http.get(`${this.API_URI}/asignatura`);
  }
  getFacultadAsignatura(id: any): Observable<any>{
    return this.http.get(`${this.API_URI}/facultad/${id}`);
  }
  deleteAsignatura(id: any): Observable<any>{
    return this.http.delete(`${this.API_URI}/asignatura/${id}`);
  }
  createAsignatura(asignatura: any): Observable<any>{
    return this.http.post(`${this.API_URI}/asignatura`, asignatura);
  }
  getFacultadByNombre(nombre: any): Observable<any>{
    return this.http.get(`${this.API_URI}/facultad_id/${nombre}`);
  }
  updateAsignaturaToGraded(courseId: any): Observable<any>{
    let graded = {};
    return this.http.put(`${this.API_URI}/asignatura/graded/${courseId}`, graded);
  }
  getAsignaturasGraded(): Observable<any>{
    return this.http.get(`${this.API_URI}/asignatura_terminadas`);
  }
  getProfesor(id: any): Observable<any>{
    return this.http.get(`${this.API_URI}/asignatura_profesor/${id}`);
  }
  getListaAlumnosAsignatura(id: any): Observable<any>{
    return this.http.get(`${this.API_URI}/alumnos_asignatura/${id}`);
  }

  xmlsign(xml:any): Observable<any>{
    return this.http.post(`${this.API_URI}/xml`, xml);
  }

  pruebapy(xml:any): Observable<any>{
    return this.http.post(`${this.API_URI}/pruebapy`,xml);
  }

  sendXml(xml:any): Observable<any>{
    return this.http.post(`${this.API_URI}/sendxml`,xml);
  }

  updateAsignatura(id: any, updatedAsignatura: any): Observable<any>{
    return this.http.put(`${this.API_URI}/asignatura/${id}`, updatedAsignatura);
  }

  unenrollStudent(idasignatura: any, idalumno: any): Observable<any>{ 
    return this.http.delete(`${this.API_URI}/alumno_asignatura/${idasignatura}/${idalumno}`);
  }

  unenrollTeacher( idprofesor: any, idasignatura: any): Observable<any>{
    return this.http.delete(`${this.API_URI}/profesor_asignatura/${idprofesor}/${idasignatura}`);
  }

  enrollStudent(idasignatura: any, idalumno: any): Observable<any>{
    let body = {id_alumno: idalumno,  id_asignatura: idasignatura, grade: null };
    return this.http.post(`${this.API_URI}/alumno_asignatura/${idasignatura}/${idalumno}`, body);
  }

  getGrade(idasignatura: any, idalumno: any): Observable<any>{
    return this.http.get(`${this.API_URI}/alumno_asignatura/${idasignatura}/${idalumno}`);
  }
  getProfesorAsignaturaList(): Observable<any>{
    return this.http.get(`${this.API_URI}/profesor_asignatura`);
  }
  getAllfaculties(): Observable<any>{
    return this.http.get(`${this.API_URI}/facultad`);
  }

  loginTrustOS(): Observable<any>{
    return this.http.get(`${this.API_URI}/loginTrustOs`);
  }
  insertCredential(jwt:any, hash:any, id_alumno: any, id_asignatura: any, name: any ):Observable<any>{
    let body ={jwt: jwt, hash: hash, id_alumno: id_alumno, id_asignatura: id_asignatura, name: name};
    return this.http.post(`${this.API_URI}/insertTrustOs`, body);
  }
  getCredential(jwt:any, assetId:any):Observable<any>{
    let body ={jwt: jwt, assetId: assetId};
    return this.http.post(`${this.API_URI}/getAsset`, body);
  }

  getCredentialsAlumno(id: any):Observable<any>{
    return this.http.get(`${this.API_URI}/credentials/${id}`);
  }

  updateIssued(id:any):Observable<any>{
    let issued = {};
    return this.http.put(`${this.API_URI}/asignatura/issued/${id}`, issued);
  }

 
}
