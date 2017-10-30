import template from './student-list.html'
import addSubjectForm from './add-subject.html'

const StudentListComponent = {
    bindings: {
        students: '<',
        onUpdateStudent: '&',
        onRemoveSubject: '&',
        onAddSubject: '&',
        onRemoveStudent: '&',
        sortOrder: '<',
        sortBy: '<',
        onSortChange: '&',
    },
    template,
    controller: class StudentListComponent {
        constructor(swal, $uibModal, $q, $http) {
            'ngInject'
            this.swal = swal
            this.modal = $uibModal
            this.$q = $q
            this.$http = $http
        }

        $onChanges(changes) {
            if (changes.students) {
                this.students = _.clone(this.students)
            }

            if (changes.sortOrder) {
                this.sortOrder = this.sortOrder
            }

            if (changes.sortBy) {
                this.sortBy = this.sortBy
            }
        }

        changeSort({sortBy}) {
            this.onSortChange({
                $event: { sortBy }
            })
        }

        openSubjectForm(student) {
            let _this = this
            this.modal.open({
                component: "addSubject",
                resolve: {
                    student() {
                        return student
                    },
                    addSubject() {
                        return _this.onAddSubject
                    }
                 }
            })
        }

        removeStudent(student) {
            this.swal({
                    title: "Are you sure?",
                    text: "The devil's future is in your hands!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, let him suffer!",
                }).then(() => {
                    this.onRemoveStudent({
                        $event: { student }
                    })
                })
        }

        checkEmail(email, student) {
            let q = this.$q.defer()

            this.$http.get('/api/validation?type=email,unique&field=email&t=2&id=' + student.id + '&q=' + email )
                .then(() => {
                    q.resolve()
                })
                .catch((e) => {
                    q.reject("Email must be valid and unique.")
                })

            return q.promise
        }

        updateStudent(value, field, student) {
            student[field] = value

            this.onUpdateStudent({
                $event: { student }
            })
        }

        removeSubject(subject, student) {
            this.swal({
                    title: "Are you sure?",
                    text: "This will unenroll this subject.",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, I'm sure!",
                }).then(() => {
                    this.onRemoveSubject({
                        $event: { subject, student }
                    })
                })
                .catch(() => {});

        }
    }
}

export default StudentListComponent