//importando o pacote express
const { request } = require ('express');
const express = require ('express');
const { uuid } = require ('uuidv4');
const cors = require ('cors');
const mongoose = require('mongoose');
const AlunoRepositorio = require ('./models/Aluno');

const app = express();
app.use(express.json());
app.use(cors());
const repositories = [];

mongoose.connect('mongodb+srv://gabriel9013:henrique1417@cluster0.dngd0.mongodb.net/alunoPaciente?retryWrites=true&w=majority',  {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// 1 paramentro o nome da rota 
// 2 parametro ação que vou fazer 'função'
//java script arrow function
app.get('/', async (request, response)=>{
  const retornoAluno = await AlunoRepositorio.find();
  return response.json( retornoAluno );
});


app.post('/', async (request, response) => {
    const {name , email, cpf, peso, altura } = request.body;
    const retornoAluno = await AlunoRepositorio.create({
      id: uuid(), name, email, cpf, peso, altura
    });
    return response.json({ retornoAluno });
  });

    app.put('/:id', (request, response) => {
    const { id } = request.params;
    const { name, email, cpf, peso, altura } = request.body;
    
    const studentResearch = repositories.findIndex ( studentIndex => studentIndex.id == id );
    if (studentResearch < 0 ){
       return response.status(404).json({"error":"Student not found"});
    }
     const newStudent = {id, name, email, cpf, peso, altura};
     repositories[studentResearch] = newStudent;
     return response.json(newStudent);
    });
    
    app.delete('/:id', (request, response) => {
      const { id } = request.params;
      const studentResearch = repositories.findIndex(studentIndex => studentIndex.id == id );
    if (studentResearch < 0 ){
       return response.status(404).json({ "error": `Student ${id} not found` });
    }
      repositories.splice(studentResearch,1);
      return response.json({"Message" : `Student ${id} removed`});
    
    });

    
    module.exports = app.listen(process.env.PORT || 3333, () => {
        console.log("Server running");
    });

