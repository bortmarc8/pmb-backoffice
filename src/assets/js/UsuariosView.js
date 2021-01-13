import '../css/UsuariosView.css';
import { Component } from 'react';
import { DataTable, Column } from 'primereact/datatable';
import { Button } from 'primereact/button';
import axios from 'axios';

class UsuariosView extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }
    
    render() {

            
        
        

        // const deleteUserBtn = (rowData) => {
        //     return <button onClick={handleClick}>{rowData.inventoryStatus}</button>
        // }

        // const handleClick = (e) => {
        //     //e.preventDefault();
        //     console.log("Usuario ID = " + JSON.stringify(e));
        // }

        // this.state.users.map(user => console.log(user.UsuarioId));

        return ( 
            <div>
                <DataTable value={this.state.users}>
                    <Column field="UsuarioId" header="UsuarioId"></Column>
                    <Column field="Nombre" header="Nombre"></Column>
                    <Column field="Apellidos" header="Apellidos"></Column>
                    <Column field="Edad" header="Edad"></Column>
                </DataTable>
                <Button onClick={this.array}>kk</Button>
            </div>
        );
    }

    array = () => {
        axios
        .get('https://localhost:44342/api/Usuarios/')
        .then(function(res) {
            //console.log(res.data);
            this.setState({users: res.data}, () => console.log(this.state.users));
        });
    }
}
export default UsuariosView;