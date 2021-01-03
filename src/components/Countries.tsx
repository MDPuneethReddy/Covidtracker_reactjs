import { Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { InitialState } from '../store/reducer';
export const Countries=()=>{
    const { countries } = useSelector<InitialState, InitialState>(
        (state: InitialState) => state
      );
      const [data,setData]=useState<Array<any>>([])
      const columns = [
        {
          title: 'country',
          dataIndex: 'country',
          key: 'country',
        },
        {
          title: 'infected',
          dataIndex: 'infected',
          key: 'infected',
        },
      ];
      useEffect(() => {
        const url=`https://api.apify.com/v2/key-value-stores/tVaYRsPHLjNdNBu7S/records/LATEST?disableRedirect=true`
              axios.get( url).then(response=>{
                  
                  setData(response.data)
                   
              }).catch(error=>{
                console.log(error)
              })
            
        
        }, [])
     
     
    return(
        <div>
        <Table dataSource={data} columns={columns} />;
        </div>
    )
}