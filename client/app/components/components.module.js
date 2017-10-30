import angular from 'angular'
import { StudentIndexModule, StudentCreateModule } from './student'
import { SubjectIndexModule } from './subject'
import { PartialsModule } from './partials'

/* @ngInject */
export const ComponentsModule = angular
    .module('app.components', [
        PartialsModule,
        SubjectIndexModule,
        StudentIndexModule,
        StudentCreateModule
    ])
    .name