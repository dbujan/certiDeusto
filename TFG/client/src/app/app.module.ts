import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ListaAlumnosComponent } from './components/lista-alumnos/lista-alumnos.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AuthComponent } from './components/auth/auth.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { BaseComponent } from './components/base/base.component';
import { ListaAsignaturasAlumnoComponent } from './components/lista-asignaturas-alumno/lista-asignaturas-alumno.component';
import { AcademicRecordAlumnoComponent } from './components/academic-record-alumno/academic-record-alumno.component';
import { ListaAsignaturasProfesorComponent } from './components/lista-asignaturas-profesor/lista-asignaturas-profesor.component';
import { ListaCompetenciasComponent } from './components/lista-competencias/lista-competencias.component';
import { GradeComponent } from './components/grade/grade.component';
import { NewUsersComponent } from './components/new-users/new-users.component';
import { SecretaryCoursesComponent } from './components/secretary-courses/secretary-courses.component';
import { CourseFormComponent } from './components/course-form/course-form.component';
import { CompetenceFormComponent } from './components/competence-form/competence-form.component';
import { CredentialsAlumnoComponent } from './components/credentials-alumno/credentials-alumno.component';
import { CredentialsSecretaryComponent } from './components/credentials-secretary/credentials-secretary.component';
import { ViewCourseSecretaryComponent } from './components/view-course-secretary/view-course-secretary.component';
import { EnrollStudentComponent } from './components/enroll-student/enroll-student.component';
import { EnrollTeacherComponent } from './components/enroll-teacher/enroll-teacher.component';
import { AllCompetencesComponent } from './components/all-competences/all-competences.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { CompetenceDetailComponent } from './components/competence-detail/competence-detail.component';
import { EditCompetenceComponent } from './components/edit-competence/edit-competence.component';
import { AcademicRecordSecretaryComponent } from './components/academic-record-secretary/academic-record-secretary.component';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';
import { TeacherDetailComponent } from './components/teacher-detail/teacher-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ListaAlumnosComponent,
    BaseComponent,
    ListaAsignaturasAlumnoComponent,
    AcademicRecordAlumnoComponent,
    ListaAsignaturasProfesorComponent,
    ListaCompetenciasComponent,
    GradeComponent,
    NewUsersComponent,
    SecretaryCoursesComponent,
    CourseFormComponent,
    CompetenceFormComponent,
    CredentialsAlumnoComponent,
    CredentialsSecretaryComponent,
    ViewCourseSecretaryComponent,
    EnrollStudentComponent,
    EnrollTeacherComponent,
    AllCompetencesComponent,
    CourseDetailComponent,
    CompetenceDetailComponent,
    EditCompetenceComponent,
    AcademicRecordSecretaryComponent,
    StudentDetailComponent,
    TeacherDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
