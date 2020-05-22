import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  Avatar,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    backgroundColor: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  },
  img: {
    borderRadius: "50%",
  },
});

const User = ({ user: { _id, firstname, lastname, role, email } }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <img
          src="//www.gravatar.com/avatar/8732e79e1e19289908bc22bba1ae38a7?s=200&r=pg&..."
          alt=""
          className={classes.img}
        />{" "}
        <CardContent className={classes.action}>
          <Typography gutterBottom variant="h5" component="h2">
            {" "}
            {firstname} {lastname}{" "}
          </Typography>{" "}
          <Typography variant="body2" color="textSecondary" component="p">
            {" "}
            {email}{" "}
          </Typography>{" "}
          <Typography variant="body2" color="textSecondary" component="p">
            {" "}
            {role}{" "}
          </Typography>{" "}
        </CardContent>{" "}
      </CardActionArea>{" "}
      <CardActions>
        <Button size="small" color="primary">
          Share{" "}
        </Button>{" "}
        <Button size="small" color="primary">
          Learn More{" "}
        </Button>{" "}
      </CardActions>{" "}
    </Card>
  );
};
export default User;
