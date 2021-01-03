import React, { useEffect, useState } from 'react'
import { InitialState } from '../store/reducer';
import {useDispatch, useSelector} from "react-redux"
import { Select } from 'antd';
import { updateCountry } from '../store/dispatcher';
import { HorizontalBar } from 'react-chartjs-2';
import axios from 'axios';
export const AllCountries=()=>{
    const dispatch = useDispatch()
    const [confirmed,setConfirmed]=useState<any>("")
  const [recovered,setRecovered]=useState<any>("")
  const [deaths,setDeaths]=useState<any>("")
    const { countries,country } = useSelector<InitialState, InitialState>(
        (state: InitialState) => state
      );
      const { Option } = Select;

const onChange=(value:any)=> {
  dispatch(updateCountry(value))
}
const onSearch=(val:any)=> {
  console.log('search:', val);
}
useEffect(() => {
const url=`https://covid19.mathdro.id/api/countries/${country}`
  axios.get(url).then(response=>{
      console.log(response.data)
      setConfirmed(response.data.confirmed.value)
        setRecovered(response.data.recovered.value)
        setDeaths(response.data.deaths.value)
  }).catch(err=>{
      console.log(err)
  })
}, [country])
// console.log(dataperCountry.confimed.value)
const data={
  labels:["confimed","recovered","deaths"],
  datasets: [
      {
        label: 'people',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data:[confirmed,recovered,deaths]
      }
    ]
}

const options={
  
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
        <>
        <h1 style={{textAlign:"center"}}>countries</h1> 
        <div style={{textAlign:"center"}}>
        <Select
    showSearch
    
    placeholder="India"
    optionFilterProp="children"
    onChange={onChange}
    onSearch={onSearch}
    filterOption={(input, option:any) =>
      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
    style={{width:"50%"}}
  >
      {countries.map((item:any)=>{
          return(
              <Option value={item}>{item}</Option>
      )
      })}
  </Select>
  </div>
  <HorizontalBar data={data}/>
        </>
    )
}