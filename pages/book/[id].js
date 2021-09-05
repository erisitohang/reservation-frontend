import React, { useState, useEffect } from "react";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Layout from "../../components/layout";
import { useRouter } from "next/router";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: theme.spacing(3),
    minWidth: 120,
    clear: "both",
  },
}));

function Book() {
  const classes = useStyles();
  const router = useRouter();
  const [hour, setHour] = useState(0);
  const { id, date } = router.query;
  const [nric, setNric] = useState("");
  const [slots, setSlots] = useState([]);
  const [openAlert, setOpenAlert] = useState({});
  const { NEXT_PUBLIC_BASE_URL } = process.env;
  const handleChangeHour = (event) => {
    setHour(event.target.value);
  };
  const handleAlertClose = (event) => {
    setOpenAlert({});
  };
  const url = `${NEXT_PUBLIC_BASE_URL}/api/slots`;
  const handleSubmit = (event) => {
    event.preventDefault();
    const post = { method: "POST",  
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({
        nric,
        date,
        hour,
        centreId: id
    }) };
    fetch(`${url}`, post)
      .then((resp) => {
        if(resp.ok) {
          setOpenAlert({
              message: 'Your book has been successfully submitted',
              type: 'success'
          });
          setHour(0)
          setNric('')
          return response.json()
        }
        setOpenAlert({
            message: 'Error',
            type: 'error'
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetch(`${url}/${id}?date=${date}`)
      .then((resp) => resp.json())
      .then((json) => {
        setSlots(json);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [url]);
  return (
    <Layout>
     <Snackbar open={!!openAlert?.type} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity={openAlert?.type}>
           {openAlert?.message}
        </Alert>
      </Snackbar>
      <Container fixed maxWidth="sm">
        <CardContent>
          <Typography variant="h4">BOOK APPOINTMENTS</Typography>
          <Typography variant="body2">Date: {date}</Typography>
          <form onSubmit={handleSubmit}>
            <FormControl className={classes.formControl}>
              <FormLabel component="legend">Hour</FormLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={hour}
                onChange={handleChangeHour}
                label="Hour"
                native
                required
              >
                <option aria-label="None" value="" />
                {slots.map((slot) => (
                  <option
                    key={slot.hour}
                    value={slot.hour}
                    disabled={slot.total <= slot.reserved}
                  >
                    {slot.hour}
                  </option>
                ))}
              </Select>
              <FormControl className={classes.formControl}>
                <TextField
                  id="standard-basic"
                  label="NRIC"
                  value={nric}
                  onInput={(e) => setNric(e.target.value)}
                  required
                />
              </FormControl>
              <FormControl className={classes.formControl}>
                <Button variant="contained" color="primary" type="submit">
                  Book
                </Button>
              </FormControl>
            </FormControl>
          </form>
        </CardContent>
      </Container>
    </Layout>
  );
}

export default Book;
