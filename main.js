const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sEmail = document.querySelector('#m-email')
const sNumero = document.querySelector('#m-numero')

let itens

let id

//get e set para os itens do formulário

function loadItens(){
    itens = getItensBD()
    tbody.innerHTML = ''
    itens.forEach(item, index => {
        insertItem(item,index)
    });

}

loadItens()

function insertItem(item, index){
    let tr = document.createElement('tr')

    tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.numero}</td>
    <td>R$ ${item.email}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
     `
  tbody.appendChild(tr)
}

function editItem(index){
    openmodal(true, index)
}

function deleteItem(index){
    itens.splice(index, 1)
    setItensBD()
    loadItens()
}

function openmodal(edit = false, index = 0){
    modal.classList.add('active')

    modal.onclick = e => {
        if (e.target.clasName.indexOf('modal-container')!== -1) {
            modal.classList.remove('active')
    
        }  
     }
    
     if(edit){
        sNome.value = itens[index].nome
        sNumero.value = itens[index].numero
        sEmail.value = itens[index].email
        id = index   
     }else{
        sNome.value = ''
        sNumero.value = ''
        sEmail.value = ''
        }
}


 btnSalvar.onclick = e => {
    if(sNome.value || sNumero.value || sEmail.value ){
    return
    }
    e.preventDefault();

    if(id!== undefined){
        itens[id].nome = sNome.value
        itens[id].email = sEmail.value
        itens[id].numero = sNumero.value
    } else{
        itens.push({'nome': sNome.value, 'funcao': sFuncao.value,}
        )
    }
    setItensBD()
    modal.classList.remove('active')
    loadItens()
} 


function loadItens(){
    itens = getItensBD()
    tbody.innerHTML=''
    itens.forEach((item,index)=>{
        insertItem(item,index)
    })
}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()
