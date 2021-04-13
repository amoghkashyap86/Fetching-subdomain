// import logo from './logo.svg';
import './App.css';
import React ,{useState,Suspense} from 'react'
import {fetchData} from './Api'
// import React,{useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
var resource
const columns = [
  { id: 'subdomain', label: 'sub-domain', minWidth: 170 },
  { id: 'ip', label: 'ip-address', minWidth: 100 },
  {
    id: 'statuscode',
    label: 'status code',
    minWidth: 170,
    align: 'right'
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'updatedon',
    label: 'last updated on',
    minWidth: 170,
    align: 'right'
    // format: (value) => value.toLocaleString('en-US'),
  }
  
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}
const useStyles = makeStyles({
  root: {
    display:'flex',
    justifyContent:'centre',
    alignItems:'centre',
    flexDirection:'column',

    width: '100%',
    height:'100%'
  },
  container: {
    maxHeight:'100%'
  },
});

 function StickyHeadTable() {
  const classes = useStyles();
  const [rowdata,setrow]=React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
        
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  var res=resource.user.read()
  if(res.data===undefined){
    return <h2>enter valid domain name</h2>
  }

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container} >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow className="header" >
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth,color:'green',backgroundColor:'black' }}
                  
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
           
                {
                  
                res.data.slice(page*rowsPerPage,page*rowsPerPage+rowsPerPage).map((row)=>{
                        console.log(row)
                    return (
                              
  
                        <TableRow>
                            {
                                columns.map((col)=>{
                                    let value=""
                                    

                                         value=row[col['id']];
                                       
                                  
                                    //  value=row[col.id]
                                    // {col.id=='source'||'name'?value=row['source'][col.id]:value=row[col.id]}
                                    return(
                                        <TableCell key={col['id']} align={col.align}>
                                                    {value}                                    
                                        </TableCell>
                                    )

                                })
                            }

                        </TableRow>
                    )
                })
            }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10,15,20,25,50]}
        component="div"
        count={resource.user.read().data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}


// const ProfileDetails=()=>{
//   const user =resource.user.read()
//   console.log(user)
//   return(
//     <div>
//       {JSON.stringify(user.data[1])}
//     </div>
//   )
// }
// const Pdetail=()=>{
//   const user=resource.user.read()
//    return(
//      <div>
//         {user.name}
//         {user.phone}
  
//      </div>
//    )
//   }
function App() {
  const [dname,setdname]=useState("")
  const [istrue,settrue]=useState(false)
  const [data,setdata]=useState([])
  
  const handleData=()=>{
      if(dname===""){
        alert("enter a valid domain name")
      }else{

        resource=fetchData(dname)
        // console.log(resource.user.read())

        settrue(true)
        
      

        
        
      }


  }
  const getdomainName=(e)=>{
    setdname(e.target.value)
    settrue(false)

  }
  return (
    <div className="App">
  
    <label style={{"width":"50%"}} className="heading">
        ENTER DOMAIN NAME
    </label>

    <input type="text" className="inputtext"  onChange={getdomainName} style={{"width":"50%","marginTop":"15px"}}>
    </input>
    
    <button onClick={(e)=>handleData()} className="btn" style={{"width":"15%","marginTop":"15px"}}>click</button>
      {
        istrue==true?
      <Suspense fallback={<div className="blink">
           <h1>loading...</h1>
      </div>}>
             {/* <StickyHeadTable dat={resource.user.read()}/> */}
             {/* <ProfileDetails/> */}
             
             <StickyHeadTable className="table1" />
      </Suspense>:null
      }

      
    
</div>
  );
}


export default App;
