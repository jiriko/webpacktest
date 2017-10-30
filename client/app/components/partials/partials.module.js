import angular from 'angular'
import { SortableHeaderModule } from './sortable-header.module'

export const PartialsModule = angular
    .module('PartialsModule', [ SortableHeaderModule ])
    .name