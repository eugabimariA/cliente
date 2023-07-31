'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active')
}


const getLocalStorage = () => JSON.parse(localStorage.getItem('db_games')) ?? []
const setLocalStorage = (dbgames) => localStorage.setItem("db_games", JSON.stringify(dbgames))

// CRUD - create read update delete
const deletegames = (index) => {
    const dbgames = readgames()
    dbClient.splice(index, 1)
    setLocalStorage(dbgames)
}

const updategames = (index, games) => {
    const dbgames = readgames()
    dbgames[index] = games
    setLocalStorage(dbgames)
}

const readgames = () => getLocalStorage()

const creategames = (games) => {
    const dbgames = getLocalStorage()
    dbgames.push (games)
    setLocalStorage(dbgames)
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

//Interação com o layout

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
    document.getElementById('nome').dataset.index = 'new'
}

const savegames = () => {
    debugger
    if (isValidFields()) {
        const games = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            celular: document.getElementById('celular').value,
            cidade: document.getElementById('cidade').value
        }
        const index = document.getElementById('nome').dataset.index
        if (index == 'new') {
            creategames(games)
            updateTable()
            closeModal()
        } else {
            updategames(index, games)
            updateTable()
            closeModal()
        }
    }
}

const createRow = (games, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td>${games.nome}</td>
        <td>${games.email}</td>
        <td>${games.celular}</td>
        <td>${games.cidade}</td>
        <td>
            <button type="button" class="button green" id="edit-${index}">Editar</button>
            <button type="button" class="button red" id="delete-${index}" >Excluir</button>
        </td>
    `
    document.querySelector('#tablegames>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tablegames>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const dbgames = readgames()
    clearTable()
    dbgames.forEach(createRow)
}

const fillFields = (client) => {
    document.getElementById('nome').value = games.nome
    document.getElementById('email').value = games.email
    document.getElementById('celular').value = games.celular
    document.getElementById('cidade').value = games.cidade
    document.getElementById('nome').dataset.index = games.index
}

const editgames = (index) => {
    const games = readgames()[index]
    games.index = index
    fillFields(games)
    openModal()
}

const editDelete = (event) => {
    if (event.target.type == 'button') {

        const [action, index] = event.target.id.split('-')

        if (action == 'edit') {
            editgames(index)
        } else {
            const games = readgames()[index]
            const response = confirm(`Deseja realmente excluir o jogo ${games.nome}`)
            if (response) {
                deletegames(index)
                updateTable()
            }
        }
    }
}

updateTable()

// Eventos
document.getElementById('cadastrarjogo')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('salvar')
    .addEventListener('click', saveClient)

document.querySelector('#tablegames>tbody')
    .addEventListener('click', editDelete)

document.getElementById('cancelar')
    .addEventListener('click', closeModal)