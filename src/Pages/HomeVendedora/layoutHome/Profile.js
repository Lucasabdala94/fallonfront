import useAuth from "../../../hooks/useAuth"

export default function Profile (){
    const {user}= useAuth()
    console.log(user);
    return(
        <div>
            <h2>Datos de usuario</h2>
            <form >
                <h3>Correo Electronico</h3>
                <label name="correo">{user?.email}</label>
                <input name="correo"></input>
                <button type="submit">Cambiar</button>
            </form>


        </div>
        
    )
}