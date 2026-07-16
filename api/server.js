import express from 'express'
import cors from 'cors'
import pkg from '@prisma/client'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'

const { PrismaClient } = pkg

const adapter = new PrismaMariaDb({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '12345',
    database: 'api_clientes',
    connectionLimit: 5,
})

const prisma = new PrismaClient({ adapter })

const app = express() 
app.use(express.json())
app.use(cors())

/* 
    rotas -> HTTP Métodos
    get: listar (caso eu queira uma rota que preciso LISTAR)
    POST: criar
    put: editar vários (informações de usuários, por ex)
    patch: editar um
    delete: deletar

    ---------------------------------------------------------
    Passo a passo
    1- Tipo de Rota / Método HTTP
    2- Endereço

*/

/* rota: aqui é pra criar um usuário (por isso o método POST*/
app.post('/usuarios', async (req, res) => {
    //users.push(req.body); /* aqui vai adicionar no array users os dados do usuários adicionados no body */

    await prisma.user.create({
        data: {
            name: req.body.name,
            age: req.body.age,
            email: req.body.email
        }
    })

    res.status(201).json(req.body);
})

/* rota: aqui é pra listar os usuários (por isso o método GET) */
app.get('/usuarios', async (req, res) => {/* request = requisião (mensagem enviada para o servidor) / response = resposta (mensagem de resposta para o usuário) */ 
    
    let users = []
    
    if (req.query){
        users = await prisma.user.findMany({
            where: {
                name: req.query.name
            }
        })
    } else {
        users = await prisma.user.findMany();
    }


    res.status(200).json(users);
})

app.put('/usuarios/:id', async (req, res) => {

    await prisma.user.update({
        where: {
            id: Number(req.params.id)
        },
        data: {
            name: req.body.name,
            age: req.body.age,
            email: req.body.email
        }
    })

    res.status(201).json(req.body);
})

app.delete('/usuarios/:id', async (req, res) => {

    await prisma.user.delete({
        where: {
            id: Number(req.params.id)
        }
    })

    res.status(201).json( { message: 'Usuário deletado com sucesso!' });

})

/* porta para o que servidor rode e além disso, colocar o nome da rota, nesse exemplo aqui é '/usuarios */
app.listen(3000)
/* para que o servidor rode, digitar no terminal: npm nome_do_arquivo */ 

/* HTTP STATUS
    2xx = sucesso
    4xx -> erro cliente (erro do front-end)
    5xx -> erro servidor (o servidor tá com algum problema)
*/


/*  Criar nossa API de usuários
    
    - Criar um usuário
    - Listar todos os usuários
    - Editar um usuários
    - Deletar um usuários
*/