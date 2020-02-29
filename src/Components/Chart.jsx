import React, { Component } from 'react'
import {Bar, Line, Radar} from 'react-chartjs-2'
export class Chart extends Component {
    
    state = {
        chartData: {
            labels: ['Deposit', 'Withdrawal', 'Transfer', 'Food', 'Gas'],
            datasets:[
                {
                    label:'Expense for Feb, 2020',

                    data:[
                        20000,
                        5000,
                        6000,
                        2000,
                        1000
                    ],
                    backgroundColor: [
                        'rgba(255,99,132,0.6)',
                        'rgba(54,162,200,0.6)',
                        'rgba(75,192,190,0.6)',
                        'rgba(200,99,132,0.6)',
                        'rgba(255,99,132,0.6)',
                    ]
                }
            ]
        }
    }

    render() {
        return (
            <div className = 'chart'>
                <h2>Chart Component</h2>
                <Line
                    data={this.state.chartData}
                    options = {{
                        title:{
                            display:true,
                            text: 'Expense Summary',
                            position:'right'
                        },
                        layout:{
                            padding:{
                                left: 70,
                                right: 70
                            }
                        }
                    }}
                />
                <Bar id ='bar'
                     data={this.state.chartData}
                     options = {{}}                   
                />
            </div>
        )
    }
}

export default Chart
