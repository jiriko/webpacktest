import angular from 'angular'
import StudentCreateComponent from './student-create.component'

/* @ngInject */
export const StudentCreateModule = angular
    .module('StudentCreate', [])
    .component('studentCreate', StudentCreateComponent)
    .config(($stateProvider, $urlRouterProvider) => {
        'ngInject';
        $stateProvider
            .state('students-create', {
                url: '/students/new',
                component: 'studentCreate',
            })
    })
    .name