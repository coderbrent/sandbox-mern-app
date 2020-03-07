import React, { useEffect, useState, forwardRef } from 'react';
import MaterialTable from 'material-table'
import { Avatar } from '@material-ui/core'
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const DriverDisplay = () => {
  const [driverList, setDriverList] = useState([])

  const deleteById = id => {
    fetch(`/drivers/delete-driver/${id}`, { method: `DELETE` })
  }

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

    useEffect(() => {
      const fetchAllDrivers = async () => {
        await fetch(`/drivers/all-drivers`)
          .then(response => response.json())
          .then(result => {
            setDriverList(result)
          })
      }
      fetchAllDrivers()
    }, [])

  return (
    <div style={{ maxWidth: `100%`}}>
      <MaterialTable
        icons={tableIcons}
        columns={[
          { title: 'Avatar', field: 'avatar', 
            render: rowData => (
              <Avatar src={`${rowData.avatar}`} />
            )
          },
          { title: 'First Name', field: 'firstname' },
          { title: 'Last Name', field: 'lastname' },
          { title: 'E-Mail', field: 'email' },
          { title: 'Phone', field: 'phone' },
          { title: 'Street', field: 'street' },
          { title: 'State', field: 'state' },
          { title: 'Zipcode', field: 'zipcode' },
        ]}
        data={driverList.map((driver, index) => {
          return {
            index: index,
            key: driver._id,
            avatar: driver.avatar,
            firstname: driver.first_name, 
            lastname: driver.last_name, 
            email: driver.email,
            phone: driver.phone,
            street: driver.street,
            state: driver.state,
            zipcode: driver.zipcode,
          }
        })}
        title="Active"
        editable={{
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                let data = driverList;
                const index = data.indexOf(oldData.key);
                data.splice(index, 1);
                setDriverList(data)
              })
              resolve()
            }, 1000)
        }}
      />
    </div>
    
  )
}

export default DriverDisplay;