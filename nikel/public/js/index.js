const myModal = new bootstrap.Modal("#register-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkLogged();

//LOGAR NO SISTEMA

document.getElementById("login-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("email-input").value;
  const password = document.getElementById("password-input").value;
  const checkSession = document.getElementById("session-check").checked;

  const account = getAccount(email);

  if(!account) {
      alert("Opps! verifique o usuario e a senha.");
      return;
  }

  if (account) {
    if(account.password !== password) {
      alert("Opps! verifique o usuario e a senha.");
      return;
    }

    saveSession(email, checkSession);

    window.location.href = "home.html";

  }


  
});

//CRIAR CONTA
document.getElementById("create-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("email-create-input").value;
  const password = document.getElementById("password-create-input").value;
  const confirmpassword = document.getElementById("password-confirm-input").value;

  if(email.length <5) {
    alert("Preencha o campo com um e-mail válido.");
    return;
  }

  if(password.length <8) {
    alert("A senha precisa ter no minimo 8 caractérs."); 
    return;
  }

  if (password !== confirmpassword) {
    alert("As senhas não coincidem.");
    return;
  } 

  saveAccount({
    login: email,
    password: password,
    transactions: []
  })

  myModal.hide();
  let logged = sessionStorage.getItem("logged");
  const session = localStorage.getItem("session");

  alert("Conta criada com sucesso.");
});

function checkLogged() {
  if(session) {
    sessionStorage.setItem("logged", session);
    logged = session;
  }

  if(logged) {
    saveSession(logged, session);

    window.location.href = "home.html";
  }
}

function saveAccount(data) {
  localStorage.setItem(data.login, JSON.stringify(data));
}

function saveSession(data, saveSession) {
  if(saveSession) {
    localStorage.setItem("session", data);
  }
  sessionStorage.setItem("logged", data);
}

function getAccount(key) {
  const account = localStorage.getItem(key);

  if(account) {
    return JSON.parse(account);
  }

  return "";
}