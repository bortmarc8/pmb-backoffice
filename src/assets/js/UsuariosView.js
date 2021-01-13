import '../css/UsuariosView.css';
import { Component } from 'react';
import { DataTable, Column } from 'primereact/datatable';
import { Button } from 'primereact/button';

class UsuariosView extends Component {
    render() {
        const users = [
            {
                "UsuarioId":"Usuario1",
                "Nombre":"Mark",
                "Apellidos":"Bort Tomás",
                "Edad":19,
            },
            {
                "UsuarioId":"Usuario2",
                "Nombre":"Pumpushita",
                "Apellidos":"Asensi Muñoz",
                "Edad":20
            },
            {
                "UsuarioId":"Usuario3",
                "Nombre":"Joel",
                "Apellidos":"Bort Tomás",
                "Edad":2
            },
            {
                "UsuarioId":"Usuario4",
                "Nombre":"Ruth",
                "Apellidos":"Bort Lopez-Montenegro",
                "Edad":8
            }
        ];

        const deleteUserBtn = (rowData) => {
            return <button onClick={handleClick}>{rowData.inventoryStatus}</button>
        }

        const handleClick = (e) => {
            //e.preventDefault();
            console.log("Usuario ID = " + JSON.stringify(e));
          }


        return ( 
            <div>
                <DataTable value={users}>
                    <Column field="UsuarioId" header="UsuarioId"></Column>
                    <Column field="Nombre" header="Nombre"></Column>
                    <Column field="Apellidos" header="Apellidos"></Column>
                    <Column field="Edad" header="Edad"></Column>
                    <Column header="Borrar" body={
                        deleteUserBtn
                    }></Column>
                </DataTable>
            </div>
        );
    }
}

export default UsuariosView;
