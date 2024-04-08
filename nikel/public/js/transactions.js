const myModal = new bootstrap.Modal("#transaction-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");
let data =  {
  transactions: []
};

document.getElementById("button-logout").addEventListener("click", logout);

//ADICIONAR LANÇAMENTO

document.getElementById("transaction-form").addEventListener("submit", function(e){
  e.preventDefault();

  const value = parseFloat(document.getElementById("value-input").value);
  const description = document.getElementById("description-input").value;
  const date = document.getElementById("date-input").value
  const type = document.querySelector('input[name="type-input"]:checked').value;

  verifyBalance(value, data.transactions);

  data.transactions.unshift({
    value: value, type: type, description: description, date: date
  });

  saveData(data); 
  e.target.reset();
  myModal.hide();

  getTransactions();
  alert("Lançamento adicionado com sucesso.")

})

checkLogged()

function checkLogged() {
  if(session) {
    sessionStorage.setItem("logged", session);
    logged = session;
  }

  if(!logged) {
    window.location.href = "index.html";
    return;
  }

  const dataUser = localStorage.getItem(logged);
  if(dataUser) {
    data = JSON.parse(dataUser);
  }

  getTransactions();

}

function verifyBalance(value, transactions) {
  let sumOut = 0;
  let sumIn = 0;

  const cashIn = transactions.filter((item) => item.type === "1");
  for(let i = 0; i < cashIn.length; i++) {
    sumIn += cashIn[i].value;
  }

  const cashOut = transactions.filter((item) => item.type === "2");
  for(let i = 0; i < cashOut.length; i++) {
    sumOut += cashOut[i].value;
  }

  const balance = sumIn - sumOut;

  if (balance < value) {
    return confirm("Atenção. Seu saldo após cadastrar essa despesa será negativo, deseja continuar?");
  }
  
  return true;
}

function logout() {
  sessionStorage.removeItem("logged");
  localStorage.removeItem("session");

  window.location.href = "index.html";
}

function getTransactions() {
  const transactions = data.transactions;
  let transactionsHtml = ``;

  if(transactions.length) {
    transactions.forEach((item) =>{
      let type = "Entrada";

      if(item.type === "2") {
        type = "Saída";
      }

      transactionsHtml += `
      <tr>
                      <th scope="row">${item.date}</th>
                      <td>${item.value.toFixed(2)}</td>
                      <td>${type}</td>
                      <td>${item.description}</td>
                    </tr>
      `
    })
  }

  document.getElementById("transactions-list").innerHTML = transactionsHtml;
}

function saveData(data) {
  localStorage.setItem(data.login, JSON.stringify(data));
}