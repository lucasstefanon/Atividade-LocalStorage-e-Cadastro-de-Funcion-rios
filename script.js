const STORAGE_KEY = 'funcionarios';

function carregarFuncionarios() {
  const dados = localStorage.getItem(STORAGE_KEY);
  return dados ? JSON.parse(dados) : [];
}

function salvarFuncionarios(funcionarios) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(funcionarios));
}

function gerarId(funcionarios) {
  if (funcionarios.length === 0) return 1;
  return Math.max(...funcionarios.map(f => f.id)) + 1;
}

function criarCard(funcionario) {
  const card = document.createElement('div');
  card.classList.add('card');

  const nome = document.createElement('p');
  nome.classList.add('card-nome');
  nome.textContent = funcionario.nome;

  const email = document.createElement('p');
  email.classList.add('card-info');
  email.innerHTML = `<span>E-mail:</span> ${funcionario.email}`;

  const departamento = document.createElement('p');
  departamento.classList.add('card-info');
  departamento.innerHTML = `<span>Departamento:</span> ${funcionario.departamento}`;

  const cargo = document.createElement('span');
  cargo.classList.add('card-cargo');
  cargo.textContent = funcionario.cargo;

  card.appendChild(nome);
  card.appendChild(email);
  card.appendChild(departamento);
  card.appendChild(cargo);

  return card;
}

function atualizarContador(funcionarios) {
  const contador = document.getElementById('contador');
  contador.textContent = `Total: ${funcionarios.length}`;
}

function renderizarLista(funcionarios) {
  const container = document.getElementById('lista-funcionarios');
  container.innerHTML = '';

  funcionarios.forEach(funcionario => {
    const card = criarCard(funcionario);
    container.appendChild(card);
  });

  atualizarContador(funcionarios);
}

function cadastrarFuncionario(event) {
  event.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const cargo = document.getElementById('cargo').value.trim();
  const departamento = document.getElementById('departamento').value.trim();
  const senha = document.getElementById('senha').value;

  const funcionarios = carregarFuncionarios();

  const novoFuncionario = {
    id: gerarId(funcionarios),
    nome,
    email,
    cargo,
    departamento,
    senha,
  };

  funcionarios.push(novoFuncionario);
  salvarFuncionarios(funcionarios);
  renderizarLista(funcionarios);

  event.target.reset();
}

function inicializar() {
  const funcionarios = carregarFuncionarios();

  if (funcionarios.length === 0) {
    const funcionariosPadrao = [
      { id: 1, nome: 'Ana Souza', email: 'ana@email.com', cargo: 'Analista', departamento: 'Financeiro', senha: '123456' },
      { id: 2, nome: 'Bruno Lima', email: 'bruno@email.com', cargo: 'Desenvolvedor', departamento: 'TI', senha: '123456' },
      { id: 3, nome: 'Carla Mendes', email: 'carla@email.com', cargo: 'Gerente', departamento: 'RH', senha: '123456' },
      { id: 4, nome: 'Diego Ferreira', email: 'diego@email.com', cargo: 'Designer', departamento: 'Marketing', senha: '123456' },
      { id: 5, nome: 'Elisa Costa', email: 'elisa@email.com', cargo: 'Coordenadora', departamento: 'Operações', senha: '123456' },
    ];
    salvarFuncionarios(funcionariosPadrao);
    renderizarLista(funcionariosPadrao);
  } else {
    renderizarLista(funcionarios);
  }

  const form = document.getElementById('form-cadastro');
  form.addEventListener('submit', cadastrarFuncionario);
}

inicializar();
