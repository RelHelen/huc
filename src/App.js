 import React,{useEffect,useState} from 'react';
 import axios from 'axios';
 import './App.css';

 const User =({id,name,email})=>{   
  return(  
    <div>
      <p><strong> name: </strong>{name}</p>
      <p> <strong>email:</strong> {email}</p>
    </div>
    
  )
 }

const SelectCompany=({company})=>{

return(   
  <option value={company} key={company} >{company}</option>  
)
 }


 const Company=({companys,action,dispalay})=>{   
       return(
          <div> 
           <h3>Выбери компанию</h3>     
            <select name="company" onChange={(e)=>{action(e.target.value);}}>
             
            {          
              companys?.map(company => <SelectCompany key ={company} company={company}/>  )           
           }               
            </select>
            <button onClick={()=>{dispalay()}}>Показать все</button> 
           </div>
       )
    }
 
 
 function App() {
 const [data,setData] = React.useState([]);
 const [search,setSearch] = React.useState([...data]);
 const [companys,setCompanys] = React.useState([]);
 const [load, setLoad] =React.useState(false);
 const sortName =(data)=>{
    setData([...data].sort((a,b)=>a.name.localeCompare(b.name)));
    
 }
  
 const findCompany=(name)=>{  
   return(
    setSearch(data.filter(user=>user.company.name==name))
   ) 
 }
 const dispalay=()=>{  
  return(
   setSearch(data)
  ) 
}

  useEffect(
    ()=>{
      setLoad(true);  
     axios
     .get('https://jsonplaceholder.typicode.com/users')
     .then(response=>{ 
       return response.data})
     .then((data)=>{ 
      setSearch(data);
      setCompanys(data.map(user => user.company.name));     
      sortName(data);     
      setLoad(false)     
    })     
     .catch(err=>console.log(err));      
    },[]
    
  )
  

  return (
    <div className="App">
      {load && <p>Идет загрузка....</p>}
      {
        companys &&
       <Company companys={companys} action={(name)=>{findCompany(name)}} dispalay={dispalay}/>
     }
      <div  className="user"> 
        {
          search?.map(user => <User key ={user.id} {...user}/>            
         )
        }
      </div>
    </div>
  );
}

export default App;
