class SubjectService {
    constructor($http, swal) {
        'ngInject'
        this.$http = $http
        this.swal = swal
    }

    all(name = '') {
        return this.$http.get('/api/subjects?name=' + name).then((response) => {
            return response.data
        })
        .catch(() => {})
    }

    update(subject) {
        return this.$http.put('/api/subjects/' + subject.id, subject)
            .then(function(response) {
                return response.data
            })
            .catch(function() {
                this.swal.error("Sorry.", "Can't update subject.")
            })
    }

    delete(subject) {
        return this.$http.delete('/api/subjects/' + subject.id)
            .then(function(response) {
                return response.data
            })
            .catch(function() {
                this.swal.error("Sorry.", "Can't delete subject.")
            })
    }
}

export default SubjectService