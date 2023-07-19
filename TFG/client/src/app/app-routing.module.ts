import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_helpers/auth.guard';

import { StudentGuard } from './guards/student.guard';
import { TeacherGuard } from './guards/teacher.guard';
import { SecretaryGuard } from './guards/secretary.guard';

import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ListaAlumnosComponent } from './components/lista-alumnos/lista-alumnos.component';
import { AuthComponent } from './components/auth/auth.component';
import { BaseComponent } from './components/base/base.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ListaAsignaturasAlumnoComponent } from './components/lista-asignaturas-alumno/lista-asignaturas-alumno.component';
import { ListaAsignaturasProfesorComponent } from './components/lista-asignaturas-profesor/lista-asignaturas-profesor.component';
import { ListaCompetenciasComponent } from './components/lista-competencias/lista-competencias.component';
import { GradeComponent } from './components/grade/grade.component';
import { AcademicRecordAlumnoComponent } from './components/academic-record-alumno/academic-record-alumno.component';
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

const routes: Routes = [
  //{path: 'auth', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule)},

    {
    path: '',
    component: AuthComponent,
    children: [
        {
          path: '',
          redirectTo: 'login',
          pathMatch: 'full'
        },
        {
          path: 'login',
          component: LoginComponent,
          data: {returnUrl: window.location.pathname}
        },
        {
            path: 'signup',
            component: RegisterComponent
        }

    ]
  },
  {
    path: 'students',
    component: BaseComponent,
    canActivate: [StudentGuard],
    children: [
      {
        path: 'mis-asignaturas',
        component: ListaAsignaturasAlumnoComponent,
        canActivate: [StudentGuard]
      },
      {
        path: 'competences/:asignatura',
        component: ListaCompetenciasComponent,
        canActivate: [StudentGuard]
      },
      {
        path: 'academic-record',
        component: AcademicRecordAlumnoComponent,
        canActivate: [StudentGuard]
      },
      {
        path: 'credentials',
        component: CredentialsAlumnoComponent,
        canActivate: [StudentGuard]
      },
      {
        path: 'courses/course-detail/competence-detail/:competence',
        component: CompetenceDetailComponent,
        canActivate: [StudentGuard]
      },
      {
        path: 'courses/course-detail/:asignatura',
        component: CourseDetailComponent,
        canActivate: [StudentGuard]
      }

    ]
  },
  {
    path: 'secretary',
    component: BaseComponent,
    canActivate: [SecretaryGuard],
    children: [
      {
        path: 'new-users',
        component: NewUsersComponent,
        canActivate: [SecretaryGuard]
      },
      {
        path: 'courses',
        component: SecretaryCoursesComponent,
        canActivate: [SecretaryGuard]
      },
      {
        path: 'competences',
        component: AllCompetencesComponent,
        canActivate: [SecretaryGuard]
      },
      {
        path: 'academic-records',
        component: AcademicRecordSecretaryComponent,
        canActivate: [SecretaryGuard]
      },
      {
        path: 'academic-record/:student',
        component: AcademicRecordAlumnoComponent,
        canActivate: [SecretaryGuard]
      },
      {
        path: 'competencesAdd/:asignatura',
        component: AllCompetencesComponent,
        canActivate: [SecretaryGuard]
      },
      {
        path: 'competences/:asignatura',
        component: ListaCompetenciasComponent,
        canActivate: [SecretaryGuard]
      },
      {
        path: 'competences/edit-competence/:competence',
        component: EditCompetenceComponent,
        canActivate: [SecretaryGuard]
      },
      {
        path: 'course-form',
        component: CourseFormComponent,
        canActivate: [SecretaryGuard]
      },
      {
        path: 'credentials',
        component: CredentialsSecretaryComponent,
        canActivate: [SecretaryGuard]
      },
      {
        path: 'courses/view-course/:asignatura',
        component: ViewCourseSecretaryComponent,
        canActivate: [SecretaryGuard]
      },
      {
        path: 'courses/course-detail/:asignatura',
        component: CourseDetailComponent,
        canActivate: [SecretaryGuard]
      },
      {
        path: 'courses/course-detail/competence-detail/:competence',
        component: CompetenceDetailComponent,
        canActivate: [SecretaryGuard]
      },
      {
        path: 'courses/view-course/enroll-student/:asignatura',
        component: EnrollStudentComponent,
        canActivate: [SecretaryGuard]
      },
      {
        path: 'courses/view-course/enroll-teacher/:asignatura',
        component: EnrollTeacherComponent,
        canActivate: [SecretaryGuard]
      },
      {
        path: 'students/student-detail/:student',
        component: StudentDetailComponent,
        canActivate: [SecretaryGuard]
      },
      {
        path: 'teachers/teacher-detail/:teacher',
        component: TeacherDetailComponent,
        canActivate: [SecretaryGuard]
      },
      {
        path: 'competence-form',
        component: CompetenceFormComponent,
        canActivate: [SecretaryGuard]
      },
      {
        path: 'competence-form/:asignatura',
        component: CompetenceFormComponent,
        canActivate: [SecretaryGuard]
      }
    ]
  },
  
  {
    path: 'teachers',
    component: BaseComponent,
    canActivate: [TeacherGuard],
    children: [
      {
        path: 'mis-asignaturas',
        component: ListaAsignaturasProfesorComponent,
        canActivate: [TeacherGuard],
      },
      {
        path: 'mis-asignaturas/course-detail/:asignatura',
        component: CourseDetailComponent,
        canActivate: [TeacherGuard],
      },
      {
        path: 'my-students/:asignatura',
        component: ListaAlumnosComponent,
        canActivate: [TeacherGuard]
      },
      {
        path: 'competences/:asignatura',
        component: ListaCompetenciasComponent,
        canActivate: [TeacherGuard]
      },
      {
        path: 'courses/course-detail/competence-detail/:competence',
        component: CompetenceDetailComponent,
        canActivate: [TeacherGuard]
      },
      {
        path: 'grade/:asignatura/:alumno',
        component: GradeComponent,
        canActivate: [TeacherGuard]
      },
      {
        path: 'students/student-detail/:student',
        component: StudentDetailComponent,
        canActivate: [TeacherGuard]
      }
    ]
  },
  
  
];

@NgModule({
  declarations: [AuthComponent, LoginComponent, RegisterComponent],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    FormsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
