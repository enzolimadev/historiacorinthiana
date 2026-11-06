// Usuário padrão (sempre existe, para testes)
const ADMIN_PADRAO = { nome: 'Administrador', login: 'admin', senha: 'corinthians1910' };

function lerUsuarios() {
  try {
    return JSON.parse(localStorage.getItem('usuarios')) || [];
  } catch (e) {
    return [];
  }
}

function todosUsuarios() {
  return [ADMIN_PADRAO, ...lerUsuarios()];
}

// ---------- CADASTRO ----------
const formCadastro = document.getElementById('form-cadastro');
if (formCadastro) {
  const msg = document.getElementById('msg');

  formCadastro.addEventListener('submit', (e) => {
    e.preventDefault();
    msg.className = 'erro';
    const nome = document.getElementById('nome').value.trim();
    const login = document.getElementById('login').value.trim();
    const senha = document.getElementById('senha').value;
    const confirma = document.getElementById('confirma').value;

    if (!nome || !login || !senha || !confirma) {
      msg.textContent = 'Preencha todos os campos.';
    } else if (login.length < 3) {
      msg.textContent = 'O login precisa ter pelo menos 3 caracteres.';
    } else if (senha.length < 6) {
      msg.textContent = 'A senha precisa ter pelo menos 6 caracteres.';
    } else if (senha !== confirma) {
      msg.textContent = 'As senhas não conferem.';
    } else if (todosUsuarios().some(u => u.login.toLowerCase() === login.toLowerCase())) {
      msg.textContent = 'Esse login já está em uso. Escolha outro.';
    } else {
      const usuarios = lerUsuarios();
      usuarios.push({ nome, login, senha });
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      msg.className = 'sucesso';
      msg.textContent = 'Cadastro realizado! Redirecionando para o login...';
      formCadastro.reset();
      setTimeout(() => (window.location.href = 'login.html'), 1500);
    }
  });
}

// ---------- LOGIN ----------
const form = document.getElementById('form-login');
if (form) {
  const erro = document.getElementById('erro');
  if (sessionStorage.getItem('logado') === 'sim') window.location.href = 'admin.html';

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const login = document.getElementById('login').value.trim();
    const senha = document.getElementById('senha').value;

    if (login === '' || senha === '') {
      erro.textContent = 'Preencha o login e a senha.';
      return;
    }
    const usuario = todosUsuarios().find(u => u.login.toLowerCase() === login.toLowerCase() && u.senha === senha);
    if (usuario) {
      sessionStorage.setItem('logado', 'sim');
      sessionStorage.setItem('usuario', usuario.nome);
      window.location.href = 'admin.html';
    } else {
      erro.textContent = 'Login ou senha incorretos. Tente novamente.';
      document.getElementById('senha').value = '';
      document.getElementById('senha').focus();
    }
  });
}

// ---------- ÁREA ADMINISTRATIVA ----------
const boasVindas = document.getElementById('boas-vindas');
if (boasVindas) {
  if (sessionStorage.getItem('logado') !== 'sim') {
    window.location.replace('login.html');
  } else {
    document.getElementById('nome-usuario').textContent = sessionStorage.getItem('usuario');
    document.getElementById('sair').addEventListener('click', () => {
      sessionStorage.clear();
      window.location.href = 'login.html';
    });
  }
}