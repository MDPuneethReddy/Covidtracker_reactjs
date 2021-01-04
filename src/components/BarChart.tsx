import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { useSelector } from 'react-redux';
import { InitialState } from '../store/reducer';
interface Iprops{
    confirmed:any,
    recovered:any,
    deaths:any
}
export const BarChart=(props:Iprops)=>{
    const { country } = useSelector<InitialState, InitialState>(
        (state: InitialState) => state
      );
      console.log(country)
      const [dataperCountry,setdataperCountry]=useState<any>("")
    useEffect(() => {
        const url=country===""?"https://covid19.mathdro.id/api/":`https://covid19.mathdro.id/api/countries/${country}`
        axios.get(url).then(response=>{
            console.log(response.data)
            setdataperCountry(response.data)
        }).catch(err=>{
            console.log(err)
        })
    }, [])
    // console.log(dataperCountry.confimed.value)
    const data={
        labels:["confimed","recovered","deaths"],
        datasets: [
            {
              label: 'people',
              backgroundColor: 'rgba(75,192,192,1)',
              borderColor: 'rgba(0,0,0,1)',
              borderWidth: 2,
                // data:[]
              data:[props.confirmed,props.recovered,props.deaths]
            }
          ]
    }
    
    const options={
        responsive: true,
            title:{
              display:true,
              text:'Covid19 cases',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          
    }
    return(
        <div>
        {dataperCountry!=="" &&
        <Bar  data={data} options={options} height={300}/>
    }
    </div>
      
    )
}