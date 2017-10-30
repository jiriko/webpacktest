import angular from 'angular'
import sortableHeader from './sortable-header.component'

/* @ngInject */
export const SortableHeaderModule = angular
    .module('SortableHeaderModule', [])
    .component('sortableHeader', sortableHeader)
    .name