const form=document.getElementById("book-form")
const table=document.querySelector("#book-list")
console.log(table)

form.addEventListener("submit",function(e){
    e.preventDefault()
    const title=document.getElementById("title").value
    const author=document.getElementById("author").value
    const isbn=document.getElementById("isbn").value
    const link=document.getElementById("link").value
    const container=document.querySelector(".container")
    
    checkEmpty(title,author,isbn,link)
    addInTable(title,author,isbn,link)

    let div =document.createElement("div")
    div.className="alert alert-success text-center mt-25"
    div.appendChild(document.createTextNode("Data saved"))
    let tabb=document.querySelector(".table")
    container.insertBefore(div,tabb)
    setTimeout(()=>{
        document.querySelector(".alert").remove()
    },3000)

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

function checkEmpty(title,author,isbn,link){
    if(title=='' || author=='' || isbn=='' || link=='')
    {
        let div =document.createElement("div")
        div.className="alert alert-danger text-center"
        div.appendChild(document.createTextNode("All field must be filled"))
        let container=document.querySelector(".container")
        container.insertBefore(div,form)
        setTimeout(()=>{
            document.querySelector(".alert").remove()
        },3000)
        
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
