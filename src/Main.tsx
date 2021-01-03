import './App.css';
import React,{useEffect,useState} from "react"
import axios from "axios"
import { Row, Col, Card } from 'antd';
import { AllCountries } from './components/AllCountries';
import {  useDispatch } from 'react-redux';
import { updateCountries } from './store/dispatcher';
import 'antd/dist/antd.css';
import { LineChart } from './components/LineChart';
import { BarChart } from './components/BarChart';
import { Countries } from './components/Countries';
function Main() {
  const [confirmed,setConfirmed]=useState<any>("")
  const [recovered,setRecovered]=useState<any>("")
  const [deaths,setDeaths]=useState<any>("")
  const dispatch=useDispatch()
  useEffect(()=>{
    axios.get("https://covid19.mathdro.id/api").then(response=>{
      console.log(response)
      setConfirmed(response.data.confirmed.value)
        setRecovered(response.data.recovered.value)
        setDeaths(response.data.deaths.value)
      axios.get("https://covid19.mathdro.id/api/countries").then(response=>{
        let countries:Array<any>=[]
        response.data.countries.map((item:any)=>{
          countries.push(item.name)
        })
        dispatch(updateCountries(countries))
      })
      .catch(err=>{
          console.log(err)
        })
    })
    .catch(err=>{
      console.log(err)
    })
  },[])
  return (
    <div>
      <h1 style={{textAlign:"center"}}>CovidTracker</h1>
       <Row>
         <Col span={8}>
      
          <Card title="Confirmed" style={{textAlign:"center", backgroundColor: "green",borderStyle: "solid" }}>
          <p style={{textAlign:"center"}}>{confirmed}</p>
          </Card>
      </Col>
      <Col span={8}>
      <Card title="Recovered" style={{ textAlign:"center",backgroundColor: "yellow",borderStyle: "solid" }}>
        <p style={{textAlign:"center"}}>{recovered}</p>
       </Card>
       </Col>
       <Col span={8}>
       <Card title="Deaths" style={{textAlign:"center",backgroundColor: "red",borderStyle: "solid" }}>
         <p style={{textAlign:"center"}}>{deaths}</p>
       </Card>
    
     </Col>
     
      </Row>
      <Row>
    <Col span={15}>
    <LineChart />
    </Col>
    <Col span={9} >
    <BarChart confirmed={confirmed} recovered={recovered} deaths={deaths}/>
    </Col>
      </Row>
      <Row>
        <Col span={16}>
        <AllCountries />
        </Col>
        <Col span={8}>
        <Countries />
        </Col>
      </Row>
    </div>
  );
}

export default Main;
