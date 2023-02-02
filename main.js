const form=document.getElementById("book-form")
const table=document.querySelector("#book-list")
console.log(table)

form.addEventListener("submit",function(e){
    e.preventDefault()
    const title=document.getElementById("title").value
    const author=document.getElementById("author").value
    const isbn=document.getElementById("isbn").value
    const link=document.getElementById("link").value
    checkEmpty()
    addInTable(title,author,isbn,link)
    clearALlFields()
    const Book={title,author,isbn,link}
    addInBrowser(Book)
    
    
})


window.addEventListener("DOMContentLoaded",function(event){
    let Book=JSON.parse(this.localStorage.getItem("Books"))
    Book.forEach(Book => addInTable(Book.title,Book.author,Book.isbn,Book.link))
})

table.addEventListener("click",function(event){
     if(event.target.classList.contains("delete")){
        table.removeChild(event.target.parentElement.parentElement)

        let Book=JSON.parse(localStorage.getItem("Books"))
        console.log(Book)
        const isbn=event.target.parentElement.previousElementSibling.textContent
        let newbook=Book.filter(Book =>Book.isbn!==isbn)
        localStorage.setItem("Books",JSON.stringify(newbook))
     }
})

function checkEmpty(){           
    if(document.getElementById("title").value==''){
        document.getElementById("title").focus()
        alert("All field must be required")
    }
    if(document.getElementById("author").value==''){
        document.getElementById("author").focus()
        alert("All field must be required")
    }
    if(document.getElementById("isbn").value==''){
        document.getElementById("isbn").focus()
        alert("All field must be required")
    }
}

function clearALlFields(){
    console.log("hh")
    document.getElementById("title").value=''
    document.getElementById("author").value=''
    document.getElementById("isbn").value=''
    document.getElementById("link").value=''

}

function addInTable(title,author,isbn,link){

    const tr=document.createElement("tr")
    tr.innerHTML=` <td>${title}</td>
    <td>${author}</td>
    <td><a href="${link}">${title}</a></td>
    <td>${isbn}</td>
    <td><button type="button" class="btn btn-danger float-right delete">X</button></td>
    `
    
    table.appendChild(tr)

}

function addInBrowser(Book){
    let newbook

    if(localStorage.getItem("Books")===null){
    
        newbook=[]
    }
    else{
        newbook=JSON.parse(localStorage.getItem("Books"))
    }

    newbook.push(Book)
    localStorage.setItem("Books",JSON.stringify(newbook))

    
}
