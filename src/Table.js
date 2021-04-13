import React,{useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
const columns = [
  { id: 'sub-domain', label: 'sub-domain', minWidth: 170 },
  { id: 'ip-address', label: 'ip-address', minWidth: 100 },
  {
    id: 'status code',
    label: 'status code',
    minWidth: 170,
    align: 'right'
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'last updated on',
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

    width: '100%'
  },
  container: {
    maxHeight:'40%'
  },
});

export default function StickyHeadTable(props) {
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
                  style={{ minWidth: column.minWidth,color:'gold',backgroundColor:'black' }}
                  
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })} */}
            {
                props.dat.data.slice(page*rowsPerPage,page*rowsPerPage+rowsPerPage).map((row)=>{
                    return (
                        <TableRow>
                            {
                                columns.map((col)=>{
                                    let value=""
                                    if(col['id']==='sub-domain')
                                       {

                                         value=row[col['id']];
                                       }
                                  
                                    //  value=row[col.id]
                                    // {col.id=='source'||'name'?value=row['source'][col.id]:value=row[col.id]}
                                    return(
                                        <TableCell key={col.id} align={col.align}>
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
        count={rowdata.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
