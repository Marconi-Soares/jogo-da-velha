class Game {
    constructor(){
        this.players = ['X', 'O']
        this.currentPlayer = this.players[0]
        this.places = document.querySelectorAll('.place')
        this.new_game()
        this.placesRemaining = 9
    }
    
    make_res_div = (winner) => {
        // Criando o paragrafo com o resultado
        let win_p = document.createElement('p')
        win_p.innerText = `${winner} venceu!`
        if (winner === undefined) {
            win_p.innerText = 'Ninguém Venceu!'
        } 
                
        // Criando a div que exibe o resultado e adicionando
        // a função de removê-la
        const win_div = document.createElement('div')
        win_div.className = 'res-div'
        win_div.addEventListener('click', () => {
            this.restart_game()
            win_div.remove()
        })

        win_div.appendChild(win_p)
        document.body.appendChild(win_div)
    }

    make_play = (id) => {
        // Envia a jogada para o websocket
        const json_id = JSON.stringify({'place_id':id})
        ws.send(json_id)
    }

    play = (e) => {
        // Se o lugar estiver livre, faz uma jogada
        // e verifica se há um ganhador
        const place = e.currentTarget
        if (place.innerText == false) {
            this.make_play(place.id)
            place.innerText = this.currentPlayer
            const winner = this.checkWinner()
            winner && this.win_game(winner)
            this.next_turn()
        }
    }

    next_turn = () => {
        // passa a vez para o proximo jogador
        this.placesRemaining--
        this.setCurrentPlayer()
        if (this.placesRemaining == 0){
            this.end_game()
        }    
    }

    win_game = (winner) => {
        //Cria uma div com o resultado do jogo
        this.make_res_div(winner)
        this.restart_game()
    }

    // Termina o jogo em empate
    end_game = () => {this.make_res_div()}

    restart_game = () => {
        this.places.forEach((place) => place.innerText = null)
        this.currentPlayer = this.players[0]
        this.placesRemaining = 9
    }

    new_game() {
        this.places.forEach((place) => {
            place.addEventListener('click', this.play)
        })
    }

    setCurrentPlayer(){
        // Alterna entre os jogadores
        this.currentPlayer == this.players[0] 
        ? this.currentPlayer = this.players[1]
        : this.currentPlayer = this.players[0]
        return this.currentPlayer
    }

    checkWinner = () => {
        const winningPositions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
    
        for (let i = 0; i < winningPositions.length; i++) {
            const [a, b, c] = winningPositions[i];
            if (this.places[a].innerText &&
                this.places[a].innerText === this.places[b].innerText &&
                this.places[a].innerText === this.places[c].innerText) {
                return this.currentPlayer;
            }
        }   
        return null;
    }
}
