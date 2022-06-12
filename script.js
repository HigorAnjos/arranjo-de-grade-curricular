var form = document.querySelector("form");
var palavra = [];
var alf = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
var alf_I = -1;

form.addEventListener("submit", objProf);

function objProf (e)
{
    try
    {
        e.preventDefault();
        const formData = new FormData(e.target);

        if (!formData.get("nomemateria") || !formData.get("professor") || !parseInt(formData.get("creditos")))
        {
            throw "Formulario Nao preenchido completamente";
        }

        let newObj = {
            nome: getNome(),
            materia: formData.get("nomemateria"), 
            prof: formData.get("professor"), 
            cred: parseInt(formData.get("creditos")),
            semanaHora: smna(formData), 
        };  

        palavra.push(newObj);
        form.reset();
        newCard(newObj);
        // salvando a casa insercao
        localStorage.setItem('palavra', JSON.stringify(palavra))
    }catch (e)
    {
        console.log(e);
    }
    
}

function newCard (obj)
{
    const cardContainer = document.getElementById('cardscontainer');

    const card = document.createElement('div');
    const cardBody = document.createElement('div');
    const title = document.createElement('h5');
    const subTitle = document.createElement('h6');
    const p = document.createElement('p');
    const btnRemov = document.createElement('button');

  
    card.classList.value = 'card margin-card';
    card.style = 'width: 18rem';
    cardBody.classList.value = 'card-body';
    title.classList.value = 'card-title';
    subTitle.classList.value = 'card-subtitle mb-2 text-muted'; 
    p.classList.value = 'card-text';
    btnRemov.type = "button";
    btnRemov.name = obj.nome;
    btnRemov.classList = "btn btn-outline-danger btn-sm";
    btnRemov.id = 'remov';
    
    title.innerHTML = obj.prof;
    subTitle.innerHTML = obj.materia;
    p.innerHTML = newCard_str_smna(obj);
    btnRemov.innerHTML = 'remover';

    cardBody.appendChild(title);
    cardBody.appendChild(subTitle);
    cardBody.appendChild(p);
    cardBody.appendChild(btnRemov);
    card.appendChild(cardBody);

    cardContainer.appendChild(card);

    btnRemov.addEventListener('click', removerCard);
}
function newCard_str_smna(card)
{
    let str = '';
    for(key in card.semanaHora)
    {
        if (card.semanaHora[key] === 1)
        {
            str += `${key}: 07:15 - 08:45 <br>`;
        }
        if (card.semanaHora[key] === 17)
        {
            str += `${key}: 09:00 - 10:30 <br>`;
        }
        if (card.semanaHora[key] === 73)
        {
            str += `${key}: 10:45 - 12:15 <br>`;
        }
    }
    return str;
}
function smna (formData)
{
    const horario = parseInt(formData.get("horario"));
    const semana = {segunda: formData.get("seg"), terca: formData.get("ter"), quarta: formData.get("qua"), quinta: formData.get("qui"), sexta: formData.get("sex")}

    for(key in semana)
    {
        if(semana[key])
        {
            semana[key] = horario;
        }else
        {
            semana[key] = 0;
        }
    }
    return semana;
}

function getNome()
{
    alf_I++;
    if (alf_I>25)
    {
        alert('Acabaram as senhas')
    }
    // inserir indice
    localStorage.setItem('indice', JSON.stringify(alf_I))
    return alf[alf_I];
}

/**Buscar Arranjo */

const arranjosClick =  document.getElementById('btnarranjo');

arranjosClick.addEventListener('click', arranjo);

function arranjo ()
{
    function distintos (A, B, C, D, E)
    {
        if(A !== B && A !== C && A !== D && A !== E && B !== C && B !== D  && B !== E && C !== D  && C !== E && D !== E )
        {
            return true
        }
        return false
    }

function validarHorario (A, B, C, D, E)
{
   
    let soma = 0
    let i = 0
    let sen = ["segunda", "terca", "quarta", "quinta", "sexta"]
    for(i=0; i<5; i++)
    {
        soma = A.semanaHora[sen[i]] + B.semanaHora[sen[i]] + C.semanaHora[sen[i]] + D.semanaHora[sen[i]] + E.semanaHora[sen[i]]

        if(soma === 1)
        { // Primerio horario
            continue;

        }else if (soma === 17)
        { // Segundo horario
            continue;

        }else if (soma === 73)
        { // Ultimo horario
            continue;

        }else if (soma === 18)
        { // Primeiro e Segundo horario
            continue;

        }else if (soma === 74)
        { // Primeiro e Ultimo horario
            continue;

        }else if(soma === 90)
        { // Dois Ultimos horarios
            continue;

        }else if (soma === 91)
        { // Todos os horarios
            continue;

        }else if (soma == 0)
        { // sem aula
            continue;
            
        }else 
        { // conflito
            i=96
        }

       
    }
    if(i===97)
    {
        return false
        
    }
    return true
    
    
}

let nomeMaterias = ""
let listaMaterias = []


for (let i=0; i<palavra.length; i++)
{
    for (let j=0; j<palavra.length; j++)
    {
        for (let k=0; k<palavra.length; k++)
        {
            for (let l=0; l<palavra.length; l++)
            {
                for (let m=0; m<palavra.length; m++)
                {
                    let creditos = palavra[i].cred+palavra[j].cred+palavra[k].cred+palavra[l].cred+palavra[m].cred 
                    if(creditos === 22 || creditos === 20 )
                    {
                        if(distintos(palavra[i].nome,palavra[j].nome,palavra[k].nome,palavra[l].nome,palavra[m].nome))
                        {   
                            if(validarHorario(palavra[i],palavra[j],palavra[k],palavra[l],palavra[m]))
                            {
                                nomeMaterias = palavra[i].nome+palavra[j].nome+palavra[k].nome+palavra[l].nome+palavra[m].nome
                                listaMaterias.push(nomeMaterias)
                                
                            }
                            

                        }
                        
                    }
            
                }   
        
            }   
    
        }   
    }   
}


 /// filtrar os anagramas
//console.log("filtrar os anagramas")

function anagrama(stringA, stringB)
{
    let tem = 0
    for(let i=0; i<stringA.length; i++)
    {
        for(let j=0; j<stringB.length; j++)
        {
            if(stringA[i] === stringB[j])
            {
                tem++
            }
        }
    }
    if(tem === 5)
    {// stringA e anagrama stringB
        return true
    }
    return false
}

let listaUnica = []
listaUnica.push(listaMaterias.shift())
while(listaMaterias.length)
{   
    let j=0
    let aux = listaMaterias.shift()

    for(j =0; j< listaUnica.length && !anagrama(listaUnica[j], aux); j++)
    {}

    if (j == listaUnica.length)
    {
        listaUnica.push(aux)
    }
}

const objTable = makeObjTable(listaUnica);

for (let i = 0; i< objTable.length; i++)
{
    newTable(objTable[i]);
}

}
function makeObjTable (listaUnica)
{
    let allOp = [];
    let op = [];

    for(let i=0; i< listaUnica.length; i++)
    {
        for(let k=0; k< listaUnica[i].length; k++)
        {
            for(let j=0; j< palavra.length; j++)
            {
                if(listaUnica[i][k] === palavra[j].nome)
                {
                    op.push(palavra[j])
                }
            }
        }
        
        allOp.push(op);
        op = [];
    }
    return allOp;
}
function newTable (obj)
{
    //LISTA DE MATERIAS

    const card = document.createElement('div');
    const ul = document.createElement('ul');

    const li0 = document.createElement('li');
    const li1 = document.createElement('li');
    const li2 = document.createElement('li');
    const li3 = document.createElement('li');
    const li4 = document.createElement('li');   

    /*Add class*/
    card.classList.add('card');
    card.style = "width: 18rem";
    ul.classList.value = 'list-group list-group-flush';


    li0.classList.add('list-group-item');
    li1.classList.add('list-group-item');
    li2.classList.add('list-group-item');
    li3.classList.add('list-group-item');
    li4.classList.add('list-group-item');

    /*Add info*/
    li0.innerHTML = `${obj[0].materia} <br> cred: ${obj[0].cred}`;
    li1.innerHTML = `${obj[1].materia} <br> cred: ${obj[1].cred}`;
    li2.innerHTML = `${obj[2].materia} <br> cred: ${obj[2].cred}`;
    li3.innerHTML = `${obj[3].materia} <br> cred: ${obj[3].cred}`;
    li4.innerHTML = `${obj[4].materia} <br> cred: ${obj[4].cred}`;


    /*Make Lista tateral a tabela */
    ul.appendChild(li0);
    ul.appendChild(li1);
    ul.appendChild(li2);
    ul.appendChild(li3);
    ul.appendChild(li4);

    card.appendChild(ul);

    /*TABELA Thead*/
    const table = document.createElement('table');

    const thead = document.createElement('thead');
    const trpai = document.createElement('tr');
    const horario = document.createElement('th');
    const seg = document.createElement('th');
    const ter = document.createElement('th');
    const qua = document.createElement('th');
    const qui = document.createElement('th');
    const sex = document.createElement('th');

    /*Add class*/
    table.classList.value = 'table table-borderless table-light';
    horario.scope = "col";
    seg.scope = "col";
    ter.scope = "col";
    qua.scope = "col";
    qui.scope = "col";
    sex.scope = "col";

    /* Labels */
    horario.innerHTML = "horarios";
    seg.innerHTML = "seg";
    ter.innerHTML = "ter";
    qua.innerHTML = "qua";
    qui.innerHTML = "qui";
    sex.innerHTML = "sex";

    /*Make Thead */
    trpai.appendChild(horario);
    trpai.appendChild(seg);
    trpai.appendChild(ter);
    trpai.appendChild(qua);
    trpai.appendChild(qui);
    trpai.appendChild(sex);

    thead.appendChild(trpai) // tabela lateral

    /* filtrar pelos horarios 1, 2, 3 */
    // ROW 1
    const row1 = obj.filter(({ semanaHora }) => {
        for (key in semanaHora)
        {
            if(semanaHora[key] == 1)
            {
                return true;
            }
        }
    });

    // ROW 2
    const row2 = obj.filter(({ semanaHora }) => {
        for (key in semanaHora)
        {
            if(semanaHora[key] == 17)
            {
                return true;
            }
        }
    });

    // ROW 3

    const row3 = obj.filter(({ semanaHora }) => {
        for (key in semanaHora)
        {
            if (semanaHora[key] == 73)
            {
                return true;
            }
        }
    });


    // ROW 1 - Primeiro horario
    const trrow1 = document.createElement('tr');
    const throw1 = document.createElement('th');
    let tdseg = document.createElement('td');
    let tdter = document.createElement('td');
    let tdqua = document.createElement('td');
    let tdqui = document.createElement('td');
    let tdsex = document.createElement('td');

    throw1.scope = "row";
    throw1.innerHTML = '1º';

    colorTable (tdseg, row1, obj, 'segunda', 1);
    colorTable (tdter, row1, obj, 'terca', 1);
    colorTable (tdqua, row1, obj, 'quarta', 1);
    colorTable (tdqui, row1, obj, 'quinta', 1);
    colorTable (tdsex, row1, obj, 'sexta', 1);

    ///Montando row 1 
    trrow1.appendChild(throw1);
    trrow1.appendChild(tdseg);
    trrow1.appendChild(tdter);
    trrow1.appendChild(tdqua);
    trrow1.appendChild(tdqui);
    trrow1.appendChild(tdsex);


    // ROW 2 - Segundo horario
    const trrow2 = document.createElement('tr');
    const throw2 = document.createElement('th');
    tdseg = document.createElement('td');
    tdter = document.createElement('td');
    tdqua = document.createElement('td');
    tdqui = document.createElement('td');
    tdsex = document.createElement('td');

    throw2.scope = "row";
    throw2.innerHTML = '2º';

    colorTable (tdseg, row2, obj, 'segunda', 17);
    colorTable (tdter, row2, obj, 'terca', 17);
    colorTable (tdqua, row2, obj, 'quarta', 17);
    colorTable (tdqui, row2, obj, 'quinta', 17);
    colorTable (tdsex, row2, obj, 'sexta', 17);

    ///Montando row 2
    trrow2.appendChild(throw2);
    trrow2.appendChild(tdseg);
    trrow2.appendChild(tdter);
    trrow2.appendChild(tdqua);
    trrow2.appendChild(tdqui);
    trrow2.appendChild(tdsex);

    // ROW 3 - Segundo horario
    const trrow3 = document.createElement('tr');
    const throw3 = document.createElement('th');
    tdseg = document.createElement('td');
    tdter = document.createElement('td');
    tdqua = document.createElement('td');
    tdqui = document.createElement('td');
    tdsex = document.createElement('td');

    throw3.scope = "row";
    throw3.innerHTML = '3º';

    colorTable (tdseg, row3, obj, 'segunda', 73);
    colorTable (tdter, row3, obj, 'terca', 73);
    colorTable (tdqua, row3, obj, 'quarta', 73);
    colorTable (tdqui, row3, obj, 'quinta', 73);
    colorTable (tdsex, row3, obj, 'sexta', 73);

    ///Montando row 3
    trrow3.appendChild(throw3);
    trrow3.appendChild(tdseg);
    trrow3.appendChild(tdter);
    trrow3.appendChild(tdqua);
    trrow3.appendChild(tdqui);
    trrow3.appendChild(tdsex);

    /** Ultima linha */

    const trl = document.createElement('tr');
    const thl = document.createElement('th');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');
    const td4 = document.createElement('td');
    const td5 = document.createElement('td');

    // Add conf
    thl.scope = "row";
    td3.innerHTML = `Total de creditos: <b>${totalCred(row1, row2, row3)}</b>`;
    
    // construindo utlima linha
    trl.appendChild(thl);
    trl.appendChild(td1);
    trl.appendChild(td2);
    trl.appendChild(td3);
    trl.appendChild(td4);
    trl.appendChild(td5);



    /*TABELA DE HORARIOS tbody */
    const opContainer = document.getElementById('opcoes-container');

    const tbody = document.createElement('tbody');
    tbody.appendChild(trrow1);
    tbody.appendChild(trrow2);
    tbody.appendChild(trrow3);
    tbody.appendChild(trl);

    const space =  document.createElement('div');
    space.classList.add('space');

    space.appendChild(card);
    table.appendChild(thead);
    table.appendChild(tbody);
    space.appendChild(table);

    opContainer.appendChild(space)

}

function totalCred (row1, row2, row3) {

    let arr1 = row1.map(({ cred }) => cred);

    let arr2 = row2.map(({ cred }) => cred);

    let arr3 = row3.map(({ cred }) => cred);

    let arr = [...arr1, ...arr2, ...arr3];

    return arr.reduce((acc, cv) => acc+cv, 0);  

}

function colorTable (element, row, obj, strSemana, valueSemana)
{
    let aux = row.filter((obj) => {
        let { semanaHora } = obj;
        for (key in semanaHora)
        {
            if (semanaHora[strSemana] == valueSemana)
            {
                return true;
            }
        }
    });

    if (aux.length) {
        element.innerHTML = aux[0].materia;
        element.style = 'background-color: #c3d6cc;';
    } else 
    {
        element.innerHTML = '';
        element.style = 'background-color: #d2edfc;';
    }

}


const btnstorage = document.getElementById('storage');
btnstorage.addEventListener('click', setStorage);

function setStorage ()
{
    localStorage.setItem('indice', JSON.stringify(alf_I))
    localStorage.setItem('palavra', JSON.stringify(palavra))
}

function getStorage ()
{
    let storage = localStorage.getItem('palavra');
    if(storage)
    {
        storage = JSON.parse(storage);
        return storage;
    }
    return [];
}
function initCards ()
{
    const cardContainer = document.getElementById('cardscontainer');
    for (obj of palavra)
    {
        newCard(obj);
    }
}

function setData ()
{
palavra.push({nome:"A", materia:"INTERFACE HOMEM-MÁQUINA" , prof:"Prof desconhecido",cred: 4, semanaHora: {segunda: 0, terca: 17, quarta: 0, quinta: 0, sexta: 17}});
palavra.push({nome:"B", materia:"FILOSOFIA, TECNOLOGIA E ÉTICA", prof:"Prof desconhecido" ,cred: 4, semanaHora: {segunda: 17, terca: 0, quarta: 0, quinta: 17, sexta: 0}});
palavra.push({nome:"C", materia:"LINGUAGENS FORMAIS E AUTÔMATOS", prof:"Prof desconhecido" ,cred: 6, semanaHora: {segunda: 17, terca: 0, quarta: 17, quinta: 17, sexta: 0}});
palavra.push({nome:"D", materia:"CIRCUITOS ELÉTRICOS I", cred: 6, prof:"Prof desconhecido" , semanaHora: {segunda: 0, terca: 1, quarta: 1, quinta: 0, sexta: 1}});
palavra.push({nome:"E", materia:"TEOLOGIA, CIÊNCIAS EXATAS E TECNOLÓGICAS", cred: 4, prof:"Prof desconhecido" , semanaHora: {segunda: 0, terca: 73, quarta: 0, quinta: 0, sexta: 73}});
palavra.push({nome:"K", materia:"EQUAÇÕES DIFERENCIAIS" ,cred: 4, prof:"Prof desconhecido", semanaHora: {segunda: 0, terca: 17, quarta: 0, quinta: 0, sexta: 17}});
palavra.push({nome:"L", materia:"GERÊNCIA DE PROJETOS DE SISTEMAS", prof:"Prof desconhecido", cred: 4, semanaHora: {segunda: 0, terca: 17, quarta: 0, quinta: 0, sexta: 1}});
palavra.push({nome:"M", materia:"VALIDAÇÃO E TESTES DE SISTEMAS", prof:"Prof desconhecido", cred: 6, semanaHora: {segunda: 17, terca: 0, quarta: 17, quinta: 17, sexta: 0}});
palavra.push({nome:"N", materia:"COMPUTAÇÃO GRÁFICA", prof:"Prof desconhecido", cred: 4, semanaHora: {segunda: 0, terca: 17, quarta: 0, quinta: 0, sexta: 17}});
palavra.push({nome:"O", materia:"INTELIGÊNCIA ARTIFICIAL", prof:"Prof desconhecido", cred: 4, semanaHora: {segunda: 1, terca: 0, quarta: 0, quinta: 1, sexta: 0}});
palavra.push({nome:"P", materia:"SISTEMAS DISTRIBUÍDOS", prof:"Prof desconhecido"  ,cred: 4, semanaHora: {segunda: 0, terca: 1, quarta: 0, quinta: 0, sexta: 1}});
palavra.push({nome:"Q", materia:"PROCESSAMENTO DIGITAL DE IMAGENS", prof:"Prof desconhecido", cred: 4, semanaHora: {segunda: 0, terca: 73, quarta: 0, quinta: 0, sexta: 73}});
palavra.push({nome:"R", materia:"METODOLOGIA DA PESQUISA NA COMPUTAÇÃO", prof:"Prof desconhecido", cred: 4, semanaHora: {segunda: 73, terca: 0, quarta: 0, quinta: 73, sexta: 0}});

}

window.onload = function ()
{
    palavra = getStorage();
    alf_I = localStorage.getItem('indice') || -1;
    //setData();
    initCards();
    removerClick();
};
function removerClick ()
{
    /** Deletar card */
    const btnRemov = document.querySelectorAll('#remov');
    btnRemov.forEach((e) => e.addEventListener('click', removerCard));
}
function removerCard (e)
{
    /// remover da tela

    /// remover do local storage

    const card = e.target.name; 
    
    let i = 0;
    for (i=0; i<palavra.length && palavra[i].nome !== card; i++)
    {}
    palavra.splice(i, 1);

    console.log('Removido: ',palavra[i]);

    alf_I = 0;
    for (alf_I=0; alf_I<palavra.length; alf_I++)
    {
        palavra[alf_I].nome = alf[alf_I];
    }
    alf_I--;

    const cardContainer = document.getElementById('cardscontainer');
    cardContainer.innerText = '';
    initCards();
    removerClick();
    setStorage();


}

