class Title {
    constructor () {
        this.title = document.querySelector('#game-name')
        this.add_link()
    }

    add_link = () => {
        this.title.addEventListener('click', () => {
            const home_link = '/tic-tac-toe/'
            location.href = home_link
        })
    }
}