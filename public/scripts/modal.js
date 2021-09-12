export default function Modal(){

    const wrapper = document.querySelector(".modal-wrapper")

    //fechando a modal
    const cancelButton = document.querySelector(".button.cancel")
    cancelButton.addEventListener("click", close)

    // functions
    function open(){
        //open modal (add class active)
        wrapper.classList.add("active")
    }

    function close(){
        //close modal (remove class active)
        wrapper.classList.remove("active")
    }

    return {
        open,
        close
    }
}
