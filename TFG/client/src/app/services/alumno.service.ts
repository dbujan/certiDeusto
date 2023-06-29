import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  constructor(private http: HttpClient) { }

  API_URI = 'http://localhost:3000';

  getAlumnos(id:any): Observable<any>{
    return this.http.get(`${this.API_URI}/alumnos_asignatura/${id}`);
  }

  getAlumno(id:any): Observable<any>{
    return this.http.get(`${this.API_URI}/alumno/${id}`);
  }

  gradeStudent(idAsignatura:any, idalumno: any, grade:any): Observable<any>{
    return this.http.put(`${this.API_URI}/alumno_asignatura/${idAsignatura}/${idalumno}`, {grade});
  }

  registerStudent(student: any): Observable<any>{
    return this.http.post(`${this.API_URI}/alumno`, student);
  }

  getAllStudents(): Observable<any>{
    return this.http.get(`${this.API_URI}/alumno`);
  }

  aceptarAlumno(idalumno: any): Observable<any>{
    return this.http.put(`${this.API_URI}/alumno/registered/${idalumno}`, {registered: 1});
  }

  rejectAlumno(idalumno: any): Observable<any>{
    return this.http.delete(`${this.API_URI}/alumno/${idalumno}`);
  }

  sendEmail(mail: any): Observable<any>{
    return this.http.post(`${this.API_URI}/mail`, mail);
  }
  sendRejectionEmail(mail: any): Observable<any>{
    return this.http.post(`${this.API_URI}/mailrejection`, mail);

  }
  deleteAlumno(id: any): Observable<any>{
    return this.http.delete(`${this.API_URI}/alumno/${id}`);
  }
  getAllCountries(): Observable<any>{
    return this.http.get(`${this.API_URI}/country`);
  }
  getCountry(id: any): Observable<any>{
    return this.http.get(`${this.API_URI}/country/${id}`);
  }
  getAllGenders(): Observable<any>{
    return this.http.get(`${this.API_URI}/gender`);
  }
  getGender(id: any): Observable<any>{
    return this.http.get(`${this.API_URI}/gender/${id}`);
  }
  getGenderByName(name: any): Observable<any>{
    return this.http.get(`${this.API_URI}/genderName/${name}`);
  }

}
