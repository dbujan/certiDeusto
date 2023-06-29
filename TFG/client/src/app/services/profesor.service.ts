import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {

  constructor(private http: HttpClient) { }

  API_URI = 'http://localhost:3000';

  registerTeacher(teacher: any): Observable<any>{
    return this.http.post(`${this.API_URI}/profesor`, teacher);
  }
  getAllTeachers(): Observable<any>{
    return this.http.get(`${this.API_URI}/profesor`);
  }
  aceptarTeacher(idprofesor: any): Observable<any>{
    return this.http.put(`${this.API_URI}/profesor/registered/${idprofesor}`, {registered: 1});
  }
  rejectTeacher(idprofesor: any): Observable<any>{
    return this.http.delete(`${this.API_URI}/profesor/${idprofesor}`);
  }
  getProfesor(idprofesor: any): Observable<any>{
    return this.http.get(`${this.API_URI}/profesor/${idprofesor}`);
  }

  enrollTeacher(idprofesor: any, idasignatura: any): Observable<any>{
    let body = { id_profesor: idprofesor, id_asignatura: idasignatura };
    return this.http.post(`${this.API_URI}/profesor_asignatura`, body);
  }
  deleteTeacher(id: any): Observable<any>{
    return this.http.delete(`${this.API_URI}/profesor/${id}`);
  }
}
