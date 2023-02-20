class Form {
    constructor() {
        this.form = document.querySelector('#main-form')
        this.form.addEventListener('submit', this.handleSubmit)
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const room_name = e.target.room_code.value.toLowerCase()

        if (this.room_name_is_valid(room_name)) {
            return window.location.href += room_name
        }
        e.target.room_code.value = ''
        this.form.classList.toggle('invalid')
    }
    
    room_name_is_valid = (room_name) => {
        return /^[0-9A-Za-z\-]+$/.test(room_name);
    }
}