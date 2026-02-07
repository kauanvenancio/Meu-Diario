/* ======================
   LOGIN
====================== */

const senhaCorreta = "9879560";

function fazerLogin() {
  const senha = document.getElementById("senhaInput").value;

  if (senha === senhaCorreta) {
    document.getElementById("loginTela").style.display = "none";
    document.getElementById("blogTela").style.display = "block";
    mostrarPoesias();
  } else {
    document.getElementById("erroLogin").innerText = "Senha incorreta 😢";
  }
}

/* ======================
   MENU SEÇÕES
====================== */

function mostrarSecao(secao) {
  document.getElementById("secaoPoesias").style.display =
    secao === "poesias" ? "block" : "none";

  document.getElementById("secaoDiario").style.display =
    secao === "diario" ? "block" : "none";

  if (secao === "poesias") mostrarPoesias();
  if (secao === "diario") mostrarDiario();
}

/* ======================
   POESIAS
====================== */

let poesias = JSON.parse(localStorage.getItem("poesias")) || [];

function abrirModalPoesia() {
  document.getElementById("modalPoesia").style.display = "flex";
}

function fecharModalPoesia() {
  document.getElementById("modalPoesia").style.display = "none";
}

function salvarPoesia() {
  const titulo = document.getElementById("tituloPoesia").value.trim();
  const texto = document.getElementById("textoPoesia").value.trim();

  if (!titulo || !texto) {
    alert("Preencha tudo 🌸");
    return;
  }

  const data = new Date().toLocaleDateString("pt-BR");

  poesias.unshift({ titulo, texto, data });

  localStorage.setItem("poesias", JSON.stringify(poesias));

  document.getElementById("tituloPoesia").value = "";
  document.getElementById("textoPoesia").value = "";

  fecharModalPoesia();
  mostrarPoesias();
}

function mostrarPoesias() {
  const div = document.getElementById("posts");
  div.innerHTML = "";

  if (poesias.length === 0) {
    div.innerHTML = "<p>Nenhuma poesia ainda 🌙</p>";
    return;
  }

  poesias.forEach((p, index) => {
    div.innerHTML += `
      <div class="postCard">
        <button class="deleteBtn" onclick="excluirPoesia(${index})">🗑️</button>
        <h3>${p.titulo}</h3>
        <small>📅 ${p.data}</small>
        <p>${p.texto}</p>
      </div>
    `;
  });
}

function excluirPoesia(index) {
  if (confirm("Excluir poesia?")) {
    poesias.splice(index, 1);
    localStorage.setItem("poesias", JSON.stringify(poesias));
    mostrarPoesias();
  }
}

/* ======================
   DIÁRIO
====================== */

let diario = JSON.parse(localStorage.getItem("diario")) || [];

function abrirModalDiario() {
  document.getElementById("modalDiario").style.display = "flex";
}

function fecharModalDiario() {
  document.getElementById("modalDiario").style.display = "none";
}

function salvarDiario() {
  const texto = document.getElementById("textoDiario").value.trim();

  if (!texto) {
    alert("Escreva algo 💗");
    return;
  }

  const data = new Date().toLocaleDateString("pt-BR");

  diario.unshift({ texto, data });

  localStorage.setItem("diario", JSON.stringify(diario));

  document.getElementById("textoDiario").value = "";

  fecharModalDiario();
  mostrarDiario();
}

function mostrarDiario() {
  const div = document.getElementById("diarioPosts");
  div.innerHTML = "";

  if (diario.length === 0) {
    div.innerHTML = "<p>Nenhuma página do diário ainda 🌙</p>";
    return;
  }

  diario.forEach((d, index) => {
    div.innerHTML += `
      <div class="postCard">
        <button class="deleteBtn" onclick="excluirDiario(${index})">🗑️</button>
        <small>📅 ${d.data}</small>
        <p>${d.texto}</p>
      </div>
    `;
  });
}

function excluirDiario(index) {
  if (confirm("Excluir página do diário?")) {
    diario.splice(index, 1);
    localStorage.setItem("diario", JSON.stringify(diario));
    mostrarDiario();
  }
}

/* ======================
   BACKUP EXPORTAR
====================== */

function exportarBackup() {
  if (poesias.length === 0) {
    alert("Você ainda não tem poesias para exportar 🌙");
    return;
  }

  const arquivo = {
    dataBackup: new Date().toLocaleString("pt-BR"),
    poesias: poesias
  };

  const blob = new Blob([JSON.stringify(arquivo, null, 2)], {
    type: "application/json"
  });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "backup-poesias.json";

  link.click();
}

