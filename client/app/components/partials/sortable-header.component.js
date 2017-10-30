import template from './sortable-header.html'

const SortableHeaderComponent = {
    bindings: {
        name: '<',
        sortBy: '<',
        sortOrder: '<',
        onSortChange: '&'
    },
    template,
    transclude: true,
    controller: class SortableHeaderComponent {
        constructor() {
            'ngInject'
        }

        changeSort(sortBy) {
            this.onSortChange({
                $event: { sortBy }
            })
        }

        $onChanges(changes) {
            if (changes.name) {
                this.namee = this.name
            }


            if (changes.sortOrder) {
                this.sortOrder = this.sortOrder
            }

            if (changes.sortBy) {
                this.sortBy = this.sortBy
            }
        }
    }
}

export default SortableHeaderComponent