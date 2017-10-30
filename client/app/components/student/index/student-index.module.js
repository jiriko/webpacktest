import angular from 'angular'
import StudentIndexComponent from './student-index.component'
import StudentListModule from './student-list.module'
import StudentService from '../student.service'
import EnrollmentService from '../enrollment.service'

/* @ngInject */
export const StudentIndexModule = angular
    .module('StudentIndex', [StudentListModule])
    .component('studentIndex', StudentIndexComponent)
    .service('StudentService', StudentService)
    .service('EnrollmentService', EnrollmentService)
    .config(($stateProvider, $urlRouterProvider) => {
        'ngInject';
        $stateProvider
            .state('students-index', {
                url: '/students',
                component: 'studentIndex',
                reloadOnSearch: false
            })
    })
    .name