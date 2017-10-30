import './app.scss'
require('./bootstrap')

require('angular-xeditable')
import angular from 'angular'
import uiRouter from 'angular-ui-router'
import { AppComponent } from './app.component'
import { ComponentsModule } from './components'
import AngularLoadingBar from 'angular-loading-bar'
import {ngSweetAlert2} from 'angular-h-sweetalert'
import uiBootstrap from 'angular-ui-bootstrap'

/* @ngInject */
export const AppModule = angular
    .module('app',[
        uiBootstrap,
        uiRouter,
        AngularLoadingBar,
        ngSweetAlert2,
        "xeditable",
        ComponentsModule,
    ])
	.constant('BASE_URL', 'http://angularjs.dev')
    .component('app', AppComponent)
    .config(cfpLoadingBarProvider => {
        cfpLoadingBarProvider.includeSpinner = false
    })
	.config($httpProvider => {
		$httpProvider.interceptors.push((BASE_URL) => {
			return {
				request(config){
					if(config.url.indexOf('/api') == 0) {
						config.url = BASE_URL + config.url
					}

					return config
				}
			}
		})
	})
    .run(editableOptions => {
        editableOptions.theme = 'bs3'
    })
    .name
