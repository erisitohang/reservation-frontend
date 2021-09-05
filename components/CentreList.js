import React  from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Router from 'next/router'

function CentreList({ slots, date }) {
    const useStyles = makeStyles({});
    const classes = useStyles();
    const handleClick = (centreId) => {
      Router.push(`/book/${centreId}?date=${date}`)
    };
    return (
        <List>
        {slots.map((slot) => (
          <div key={slot.id}>
              <ListItem  button key={slot.id}  onClick={() => handleClick(slot.id)}>
                <ListItemText
                  primary={slot.name}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        Address:
                      </Typography>
                      {slot.address}
                      <Typography
                        component="div"
                        variant="body2"
                      />
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        Available:
                      </Typography>
                      {slot.slots - slot.reserved}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider />
          </div>
        ))}
      </List>
    
    )
}

export default CentreList;
