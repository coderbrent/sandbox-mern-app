import React, { useEffect } from 'react';
import MaterialTable from 'material-table'

const MaterialTripDisplay = () => {
  return (
    <MaterialTable
      columns={[
        { title: 'Date', field: 'date', },
        { title: 'Time', field: 'time' },
        { title: 'Address', field: 'address'},
        { title: 'Assigned Driver', field: 'assigned_driver' },
        { title: 'Type', field: 'trip_type' },
      ]}
      title="Trip Table"
      data={query => 
        new Promise((resolve, reject) => {
          let url = `/trips/get-trips?`
          url += 'per_page=' + query.pageSize
          url += '&page=' + (query.page + 1)
          fetch(url)
            .then(response => response.json())
            .then(result => {
              try {
              resolve({
                data: result.data,
                // page: result.page - 1,
                // totalCount: result.total,
              })
            } catch(error) { console.log(error )}
            })
        })
      }
    />
  )

}

export default MaterialTripDisplay;