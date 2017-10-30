import template from './add-subject.html'

const AddSubjectComponent = {
    bindings: {
        modalInstance: '<',
        resolve: '<',
    },
    template,
    controller: class AddSubjectComponent {
        constructor($state, SubjectService) {
            'ngInject'
            this.subjectService = SubjectService
        }

        $onInit() {
            this.student = _.clone(this.resolve.student)
            this.instance = this.modalInstance
            this.noResults = true
            this.loadingSubjects = false
            this.subject = ''
        }

        getSubjects(subject) {
            this.loadingSubjects = true
            return this.subjectService.all(subject)
                .then(response => {
                    this.loadingSubjects = false
                    return response.data.filter(sub => this.student.subjects.findIndex(s => s.id == sub.id) == -1)
                })
        }

        addSubject(subject) {
           this.resolve.addSubject({
                $event: {
                    subject,
                    student: this.student
                }
            }).then(() => {
               this.subject = ''
           })
        }
    }
}

export default AddSubjectComponent