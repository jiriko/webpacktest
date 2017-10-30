class EnrollmentService {
    constructor($http, swal) {
        'ngInject'
        this.$http = $http
        this.swal = swal
    }

    store(student_id, subject_id) {
        return this.$http.post('/api/enrollments', {
            student_id,
            subject_id
        }).then((response) => {
            return response.data
        }).catch(function() {
            this.swal.error("Sorry.", "Can't add subject.")
        })
    }

    delete(id) {
        return this.$http.delete('/api/enrollments/' + id).then((response) => {
            return response.data
        }).catch(function() {
            this.swal.error("Sorry.", "Can't delete subject.")
        })
    }

}

export default EnrollmentService