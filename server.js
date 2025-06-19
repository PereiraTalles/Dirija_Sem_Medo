const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Adicionando o CORS

const { Client } = require('pg');
const app = express();
const port = 3000;

// Middleware para permitir CORS
app.use(cors());  // Permitindo o CORS

// Middleware para processar dados do corpo da requisição
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Conectar ao banco de dados PostgreSQL
const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: '0312', // Substitua com a senha correta
  database: 'dirija_sem_medo'
});

client.connect()
  .then(() => console.log('Conectado ao banco de dados PostgreSQL!'))
  .catch(err => console.error('Erro ao conectar ao banco de dados:', err));

// Endpoint para o registro de usuário
app.post('/register', (req, res) => {
  const { email, senha, nome, telefone, telefoneAlternativo, endereco, complemento, cidade, estado, cep } = req.body;

  console.log('Dados recebidos:', req.body);  // Logando os dados recebidos para depuração

  // Verificação básica para garantir que os campos obrigatórios foram enviados
  if (!email || !senha || !nome || !telefone || !endereco || !cidade || !estado || !cep) {
    return res.status(400).send({ message: 'Preencha todos os campos obrigatórios.' });
  }

  // Query SQL para inserir os dados na tabela usuarios
  const query = `
    INSERT INTO usuarios (email, senha, nome, telefone, telefoneAlternativo, endereco, complemento, cidade, estado, cep)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
  `;

  const values = [email, senha, nome, telefone, telefoneAlternativo || null, endereco, complemento || null, cidade, estado, cep];

  // Executando a query no banco de dados
  client.query(query, values, (err, result) => {
    if (err) {
      console.error('Erro ao registrar usuário:', err);  // Logando o erro
      return res.status(500).send({ message: 'Erro ao registrar usuário. Tente novamente.' });
    }

    console.log('Usuário registrado com sucesso!');
    return res.status(200).send({ message: 'Cadastro realizado com sucesso!' });
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
