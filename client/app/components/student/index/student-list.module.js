import angular from 'angular'
import StudentListComponent from './student-list.component'
import { AddSubject } from "./add-subject.module"

/* @ngInject */
const StudentListModule = angular
    .module('StudentListModule',[AddSubject])
    .component('studentList', StudentListComponent)
    .name

export default StudentListModule