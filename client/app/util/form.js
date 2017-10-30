import Errors from './errors'
class Form {
    /**
     * Create a new Form instance.
     *
     * @param {object} data
     */
    constructor(data, $http) {
        this.originalData = data
        this.submitting = false
        this.$http = $http

        for (let field in data) {
            this[field] = data[field]
        }

        this.errors = new Errors()
        this.resetFields = false
    }


    watch(scope) {
        for (let field in scope.form.originalData) {
            scope.$watch(`form.${field}`, (value) => {
                if(value) {
                    scope.form.errors.clear(field)
                }
            },true)
        }
    }

    /**
     * Fetch all relevant data for the form.
     */
    data() {
        let data = {}

        for (let property in this.originalData) {
            data[property] = this[property]
        }

        return data
    }


    /**
     * Reset the form fields.
     */
    reset() {
        if(this.resetFields) {
            for (let field in this.originalData) {
                this[field] = this.originalData[field]
            }
        }

        this.errors.clear()
        this.submitting = false
    }


    /**
     * Send a POST request to the given URL.
     * .
     * @param {string} url
     * @param {boolean} reset
     */
    post(url,resetFields = true) {
        return this.submit('post', url ,resetFields)
    }


    /**
     * Send a PUT request to the given URL.
     * .
     * @param {string} url
     */
    put(url) {
        return this.submit('put', url)
    }


    /**
     * Send a PATCH request to the given URL.
     * .
     * @param {string} url
     */
    patch(url) {
        return this.submit('patch', url, false)
    }


    /**
     * Send a DELETE request to the given URL.
     * .
     * @param {string} url
     */
    delete(url) {
        return this.submit('DELETE', url)
    }


    /**
     * Submit the form.
     *
     * @param {string} requestType
     * @param {string} url
     * @param {boolean} resetFields
     */
    submit(requestType, url, resetFields = true) {
        this.submitting = true
        this.resetFields = resetFields
        return new Promise((resolve, reject) => {
           this.$http[requestType](url, this.data())
                .then(response => {
                    this.onSuccess(response.data)

                    resolve(response.data)
                })
                .catch(error => {
                    this.onFail(error.data.errors)

                    reject(error.data.errors)
                })
        })
    }


    /**
     * Handle a successful form submission.
     *
     * @param {object} data
     */
    onSuccess(data) {
        this.submitting = false
        this.reset()
    }


    /**
     * Handle a failed form submission.
     *
     * @param {object} errors
     */
    onFail(errors) {
        this.submitting = false

        this.errors.record(errors)
    }
}

export default Form