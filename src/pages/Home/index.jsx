import { useEffect, useState, useRef } from 'react'
import './style.css'
import Trash from '../../assets/icon_trash.svg'
import api from '../../services/api'

// React Hooks: useEffect, useState, useRef

function Home() {
  const [users, setUsers] = useState([]); // users são os nossos dados e o setUsers é responsável por colocar os dados

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()


  async function getUsers(){
    const usersFromApi = await api.get('/usuarios')

    setUsers(usersFromApi.data);
  }

  async function createUsers(){
    await api.post('/usuarios', {
      name: inputName.current.value,
      age: Number(inputAge.current.value),
      email: inputEmail.current.value
    })

    getUsers(); // atualizar automaticamente a listagem na página
  }

  async function deleteUsers(id){
    await api.delete(`/usuarios/${id}`);

    getUsers(); // atualizar automaticamente a listagem na página
  }

  
  useEffect(() => { // aqui é pra quando o site sempre for atualizado, ele rodar a função que mostra todos os usuários cadastrados no BD
    getUsers();
  }, []) 


// Código HTML
  return (
    
    <div className='container'>
      <form>
        <h1>Cadastro de Usuários</h1>
        <input placeholder='Nome' name='nome' type='text' ref={inputName}/>
        <input placeholder='Idade' name='idade' type='number' ref={inputAge}/>
        <input placeholder='E-mail' name='email' type='email' ref={inputEmail}/>
        <button type='button' onClick={createUsers}>Cadastrar</button>
      </form>

      { users.map( user  => (
        <div key={user.id} className='card'>
          <div>
            <p>Nome: <span>{user.name}</span></p>
            <p>Idade: <span>{user.age}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>
            <button onClick={() => deleteUsers(user.id)}> 
              <img src={Trash}/>
            </button>
        </div>

      ))}

    </div>
  )

}

export default Home
