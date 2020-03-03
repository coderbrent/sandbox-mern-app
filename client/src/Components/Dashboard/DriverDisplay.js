import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table'
import { Avatar } from '@material-ui/core'

const DriverDisplay = () => {
  const [driverList, setDriverList] = useState([])

    useEffect(() => {
      const fetchAllDrivers = async () => {
        await fetch(`/drivers/all-drivers`)
          .then(response => response.json())
          .then(result => {
            return setDriverList(result)
          })
      }
      fetchAllDrivers()
    }, [])

  return (
    <div style={{ maxWidth: `100%`}}>
      <MaterialTable
        columns={[
          { title: '', field: 'avatar', 
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
        data={driverList.map((driver, i) => {
          return {
            key: driver.driver_id,
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
        title="Driver Display"
      />
    </div>
  )
}

export default DriverDisplay;