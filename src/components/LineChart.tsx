import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
interface Iprops{
    
}
export const LineChart=(props:Iprops)=>{
    const [dailyData,setDailyData]=useState<Array<any>>([])
    useEffect(()=>{
        let url="https://covid19.mathdro.id/api/daily"
        axios.get(url).then(response=>{
            console.log(response.data)
            setDailyData(response.data)
        }).catch(err=>{
            console.log(err)
        })
    },[])
    const lineOptions = {
        responsive: true,
        scales: {
          xAxes: [{
            gridLines: {
              display: false,
            },
          }],
          yAxes: [{
            // stacked: true,
            gridLines: {
              display: false,
            },
            ticks: {
              beginAtZero: true,
              // Return an empty string to draw the tick line but hide the tick label
              // Return `null` or `undefined` to hide the tick line entirely
              userCallback(value:any) {
                // Convert the number to a string and splite the string every 3 charaters from the end
                value = value.toString();
                value = value.split(/(?=(?:...)*$)/);
      
                // Convert the array to a string and format the output
                value = value.join('.');
                return `${value}`;
              },
            },
          }],
        },
        legend: {
          display: false,
        },
        tooltips: {
          enabled: true,
        },
      };
      
    const data={
        labels:dailyData.map(({reportDate})=>reportDate),
        datasets:[{
            data:dailyData.map(({confirmed})=>confirmed.total),
            label:"confirmed",
            borderColor:"red",
            fill:true,
        },{
            data:dailyData.map(({deaths})=>deaths.total),
            label:"deaths",
            fill:true,
            borderColor:"green"
        }]
    }
    return(
        
    <div>  
    <Line data={data} options={lineOptions} height={300} />
    </div>  
        
    )
}