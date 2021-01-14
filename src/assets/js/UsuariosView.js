import '../css/UsuariosView.css';
import { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import axios from 'axios';

class UsuariosView extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            userAlterPwd: ""
        }
    }
  
    render() {
        
        const queryGetDatos = () => {
            axios
            .get('https://localhost:44342/api/Usuarios/')
            .then(res => {
                //console.log(res.data);
                this.setState({users: res.data}, () => console.log(res.data));
            });
        }

        const queryPostDatos = () => {
            axios
            .post('https:sample-endpoint.com/user', {
                Name: 'Fred',
                Age: '23'
            })
            .then(function (response) {
                console.log(response);
            });
        }

        const queryModPwd = (user, lastpwd, newpwd, repeatedNewPwd) => {
            if (lastpwd !== newpwd && newpwd === repeatedNewPwd) {
                axios
                .post('https://localhost:44342/api/Account/ChangePassword?UsuarioId='+user, {
                    "OldPassword": lastpwd,
                    "NewPassword": newpwd,
                    "ConfirmPassword": repeatedNewPwd
                  })
                .then(function (response) {
                    console.log("Se ha modificado la contraseña de " + user + " que era " + lastpwd + " a " + newpwd);
                });
            } else {
                console.log("NO SE HA MODIFICADO la contraseña de " + user + " que era " + lastpwd + " a " + newpwd);
            }
        }

        const queryDeleteDatos = (id) => {
            axios
            .delete('https://localhost:44342/api/Usuarios/?id=' + id)
            .then(response => {
                queryGetDatos();
            });
        }

        const UserBtns = (rowData) => {
            return (<div>
                        <button className="btn-delete-user" onClick={()=>handleDeleteClick(rowData)}>X</button>
                        <div style={{height: '5px'}}></div>
                        <button className="btn-modify-pwd" onClick={()=>handlePwdChangeClick(rowData)}>P</button>
                    </div>);
        }

        const handleDeleteClick = (rowData) => {
            if (window.confirm("¿Realmente quieres eliminar el usuario: " + rowData.UsuarioId + "? \n Se borrará de forma permanente")) {
                console.log("Eliminado usuario: " + rowData.UsuarioId); 
                queryDeleteDatos(rowData.UsuarioId)
            } 
        }
        
        const handlePwdChangeClick = (rowData) => {
            console.log(rowData);
            console.log("Quiere cambiar su pwd");
            if (document.getElementsByClassName("changePwdDialog")[0].style.display == "flex") {
                document.getElementsByClassName("changePwdDialog")[0].style.display = "none";
                document.getElementsByClassName("pwd_input")[0].value = "";
                document.getElementsByClassName("pwd_input")[1].value = "";
                document.getElementsByClassName("pwd_input")[2].value = "";
                this.setState({userAlterPwd: undefined})

            } else {
                document.getElementsByClassName("changePwdDialog")[0].style.display = "flex";
                this.setState({userAlterPwd: rowData.UsuarioId})
            }
        }

        queryGetDatos();

        return ( 
            <div>
                <div className="table-wrapper">
                    <div className="fl-table">
                        <DataTable class="fl-table" value={this.state.users}>
                            <Column sortable={true} field="UsuarioId" header="ID Usuario" filter filterPlaceholder="UserID"></Column>
                            <Column sortable={true} field="Nombre" header="Nombre" filter filterPlaceholder="Nombre"></Column>
                            <Column sortable={true} field="Apellidos" header="Apellidos" filter filterPlaceholder="Apellidos"></Column>
                            <Column sortable={true} field="Edad" header="Edad" filter filterType="Numeric" filterPlaceholder="Edad"></Column>
                            <Column header="Acciones" body={UserBtns}></Column>
                        </DataTable>
                    </div>
                </div> 
                <div className="changePwdDialog">
                    <h1>Modificar contraseña</h1>
                    <br>
                    </br>
                    <input id="lastPwd" className="pwd_input" type="password" placeholder="Contraseña antigua"></input>
                    <input id="newPwd" className="pwd_input" type="password" placeholder="Nueva contraseña"></input>
                    <input id="repeatNewPwd" className="pwd_input" type="password" placeholder="Repetir nueva contraseña"></input>
                    <br></br>
                    <div style={{display: 'flex'}}>
                        <button onClick={()=>queryModPwd(this.state.userAlterPwd,
                                                        document.getElementById("lastPwd").value, 
                                                        document.getElementById("newPwd").value, 
                                                        document.getElementById("repeatNewPwd").value)}>Aceptar</button>
                        <div style={{width: "25px"}}></div>
                        <button onClick={()=>handlePwdChangeClick(0)}>Cancelar</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default UsuariosView;