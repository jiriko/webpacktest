import template from './subject-index.html'

const SubjectIndexComponent = {
    template,
    controller: class SubjectIndexComponent {
        constructor($state, swal, SubjectService, $q, $http ) {
            'ngInject'
            this.swal = swal
            this.subjectService = SubjectService
            this.$q = $q
            this.$http = $http
        }

        $onInit() {
            this.query = ''
            this.currentPage = 1

            this.subjectService.all(this.query)
                .then((response) => {
                    this.refreshData(response)
                    window.scrollTo(200, 0);
                })

            this.fetchSubjects = _.debounce(() => {
                this.subjectService.all(this.query)
                    .then((response) => {
                        this.refreshData(response)
                        window.scrollTo(200, 0);
                    })
            },300)
        }

        updateSubject(value, field, subject) {
            subject[field] = value
            this.subjects.splice(this.subjects.indexOf(subject),1,subject)
            this.swal('Success!', subject.name + ' has been updated.')
            this.subjectService.update(subject)
        }

        checkName(name, subject) {
            let q = this.$q.defer()

            this.$http.get('/api/validation?type=required,unique&field=name&t=3&id=' + subject.id + '&q=' + name )
                .then(() => {
                    q.resolve()
                })
                .catch((e) => {
                    q.reject("Name is required and must be valid and unique.")
                })

            return q.promise
        }

        removeSubject(subject) {
            this.swal({
                title: "Are you sure?",
                text: "This will remove subjects from students too!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, I'm sure!",
            }).then(() => {
                this.subjects.splice(this.subjects.indexOf(subject),1)
                this.swal('Success!', 'Subject has been removed.')
                this.subjectService.delete(subject)
            })
        }

        searchSubjects() {
            this.currentPage = 1
            this.fetchSubjects()
        }

        refreshData(response) {
            console.log(response)
            this.subjects = _.clone(response.data)
            this.links = _.clone(response.links)
            this.meta = _.clone(response.meta)
            this.currentPage = this.meta.current_page
            this.totalItems = this.meta.total
            this.perPage = this.meta.per_page
        }
    }
}

export default SubjectIndexComponent