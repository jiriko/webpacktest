import template from './student-create.html'
import Form from "../../../util/form"

const StudentCreateComponent = {
    template,
    controller: class StudentCreateComponent {
        constructor($state, swal, StudentService, EnrollmentService, $http, $scope) {
            'ngInject'
            this.swal = swal
            this.studentService = StudentService
            this.enrollmentService = EnrollmentService
            this.$http = $http
            this.$scope = $scope
            this.$state = $state
        }

        $onInit() {
            this.$scope.form = new Form({
                name: '',
                email: ''
            }, this.$http)

            this.$scope.form.watch(this.$scope)
        }

        submitStudent() {
            this.$scope.form.post('/api/students')
                .then(student => {
                    this.$state.go('students-index')
                    this.swal('Success!', student.name + ' has been added!')
                })
        }
    }
}

export default StudentCreateComponent