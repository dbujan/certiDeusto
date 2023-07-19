import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CompetenciaService {

  constructor(private http: HttpClient) { }

  API_URI = 'http://localhost:3000';

  getCompetencias(id:any): Observable<any>{
    return this.http.get(`${this.API_URI}/asignatura_competencia/${id}`);
  }

  getCompetencia(id:any): Observable<any>{
    return this.http.get(`${this.API_URI}/competencia/${id}`);
  }
  createCompetencia(competencia: any): Observable<any>{
    return this.http.post(`${this.API_URI}/competencia`, competencia);
  }
  getCompetenciaEsco(esco_url:any): Observable<any>{
    return this.http.get(`${this.API_URI}/competencia_esco/${esco_url}`);
  }
  createAsignaturaCompetencia(asignatura_competencia: any): Observable<any>{
    return this.http.post(`${this.API_URI}/asignatura_competencia`, asignatura_competencia);
  }
  deleteCompetencia(id: any): Observable<any>{
    return this.http.delete(`${this.API_URI}/competencia/${id}`);
  }

  getAllCompetencias(): Observable<any>{
    return this.http.get(`${this.API_URI}/competencia`);
  }

  deleteCompetenciaAsignatura(idasignatura: any, idcompetencia: any ): Observable<any>{
    return this.http.delete(`${this.API_URI}/asignatura_competencia/${idasignatura}/${idcompetencia}`);
  }
  updateCompetencia(id: any, competencia: any): Observable<any>{
    return this.http.put(`${this.API_URI}/competencia/${id}`, competencia);
  }
}
