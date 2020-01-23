import React, { useState } from 'react'
import useGetData from '../../Hooks/useGetData'
import Card from '@material-ui/core/Card/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'

const Reservation = () => {
  const url = 'https://jsonplaceholder.typicode.com/users'
  const { userData, isLoading, error } = useGetData(url);
  const [errorMessage, setErrorMessage] = useState({ message: ''})

  return (
    <>
    <Banner />
    <Container>
      <GridList>
        { !isLoading ? userData.map((person, i) => ( 
          <GridListTile key={i}>
            <Card style={{ backgroundColor: '#888', margin: '1em', color: 'whitesmoke' }}>
              {error && setErrorMessage({ message: error }) ? <p>{errorMessage.message}</p> : null }
              <CardContent>
                <Typography>
                  <div style={{ fontWeight: 'bolder', fontSize: '24px'}}>{person.name}</div>
                </Typography>
                <Typography>
                  Email: {person.email}
                </Typography>
                <Typography>
                  Phone: {person.phone}
                </Typography>
              </CardContent>
            </Card>
          </GridListTile>
        )) : 'users loading...' }
      </GridList>
    </Container>
    </>
  )

}

export default Reservation;