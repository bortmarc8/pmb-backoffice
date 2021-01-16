import React from 'react';
import { Chart } from 'primereact/chart';
import '../css/DSSView.css';
import { Component } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

class DSSView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataApuestas: [],
            dataEventos: [],
            dataArray: [],
            dateArray: []
        }
    }

    componentDidMount() {
        this.getData();
    }

    countArray = (array_elements) => {
        array_elements.sort();
    
        let current = null;
        let cnt = 0;
        let localDateArray = [];
        let localDataArray = [];
        for (let i = 0; i < array_elements.length; i++) {
            if (array_elements[i] != current) {
                if (cnt > 0) {
                    localDateArray.push(current);
                    localDataArray.push(cnt)
                }
                current = array_elements[i];
                cnt = 1;
            } else {
                cnt++;
            }
        }
        this.setState({dataArray: localDataArray, dateArray: localDateArray});
    
    }

    getData = () => {
        this.getApuestasData();
        this.getEventosData();
    }

    getApuestasData = () => {
        axios
        .get('https://localhost:44342/api/Apuestas/')
        .then(res => {
            let dataArray = [];

            res.data.forEach(element => {
                dataArray.push(element.Fecha.substring(0,10));
            });

            let dateArray = this.countArray(dataArray);

            const data = {
                labels: this.state.dateArray,
                datasets: [
                    {
                        label: 'Apuestas',
                        data: this.state.dataArray
                    }
                ]
            }

            this.setState({dataApuestas: data});
        });
    }

    getEventosData = () => {
        axios
        .get('https://localhost:44342/api/Eventos/')
        .then(res => {
            let dataArray = [];

            res.data.forEach(element => {
                dataArray.push(element.Fecha.substring(0,10));
            });

            this.countArray(dataArray);

            const data = {
                labels: this.state.dateArray,
                datasets: [
                    {
                        label: 'Eventos',
                        data: this.state.dataArray
                    },
                ]
            }

            this.setState({dataEventos: data});
        });
    }
  
    render() {
        return ( 
            <div>
                <div className="col-md-4">
                    <Line height={400} options={{maintainAspectRatio: false}} data={this.state.dataApuestas}/>
                </div>
                <br></br>
                <br></br>
                <div className="col-md-4">
                    <Line height={400} options={{maintainAspectRatio: false}} data={this.state.dataEventos}/>
                </div>
            </div>
        );
    }


}

export default DSSView;