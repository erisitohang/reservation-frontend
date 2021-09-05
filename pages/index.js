import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import CardContent from "@material-ui/core/CardContent";
import CentreList from "../components/CentreList";
import Container from "@material-ui/core/Container";
import Layout from "../components/layout";

function Home() {
  const useStyles = makeStyles({});
  const classes = useStyles();
  const curr = new Date();
  curr.setDate(curr.getDate() + 1);
  const currDate = curr.toISOString().substr(0, 10);
  const [date, setDate] = useState(currDate);
  const [slots, setSlots] = useState([]);
  const handleChangeDate = (event) => {
    setDate(event.target.value);
  };
  const { NEXT_PUBLIC_BASE_URL } = process.env;
  const url = `${NEXT_PUBLIC_BASE_URL}/api/slots`;
  useEffect(() => {
    fetch(`${url}?date=${date}`)
      .then((resp) => resp.json())
      .then((json) => {
        setSlots(json);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [url, date]);

  return (
    <Layout>
      <Container fixed maxWidth="sm">
        <CardContent>
          <Typography variant="h4">BOOK APPOINTMENTS</Typography>
          <form className={classes.container} noValidate>
            <TextField
              id="date"
              label="Date"
              type="date"
              defaultValue={date}
              className={classes.textField}
              onChange={(event) => handleChangeDate(event)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </form>
          <CentreList slots={slots} date={date} />
        </CardContent>
      </Container>
    </Layout>
  );
}

export default Home;
