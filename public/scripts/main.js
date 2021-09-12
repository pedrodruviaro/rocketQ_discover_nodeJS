import Modal from "./modal.js";
const modal = Modal();


// items da modal
const modalTitle = document.querySelector(".modal h2")
const modalDescription = document.querySelector(".modal p")
const modalButton = document.querySelector(".modal button")


//Botoes com classe check (um por question box)
const checkButtons = document.querySelectorAll(".actions a.check");
//Eventos
checkButtons.forEach((button) => {
    button.addEventListener("click", handleClick);
});


//botoes com classe delete 
const deleteButtons = document.querySelectorAll(".actions a.delete")

deleteButtons.forEach(button => {
    button.addEventListener("click", (event) => handleClick(event, false))
})


// HANDLE CLICK
function handleClick(event, check = true){

    // envio do form (morando a url)
    const roomId = document.querySelector("#room-id").dataset.id
    const slug = check ? "check" : "delete"
    const questionId = event.target.dataset.id

    const form = document.querySelector(".modal form")
    form.setAttribute('action', `/question/${roomId}/${questionId}/${slug}`)


    // prevenindo .../room/#
    event.preventDefault()

    modalTitle.textContent = check ? "Marcar como lida" : "Excluir essa pergunta"
    modalDescription.textContent = check ? "Deseja marcar essa pergunta como lida?" : "Tem certeza que deseja excluir esta pergunta?"
    modalButton.textContent = check ? "Sim, marcar como lida" : "Sim, excluir"

    check ? modalButton.classList.remove('red') : modalButton.classList.add('red')

    //abrir modal
    modal.open()

}