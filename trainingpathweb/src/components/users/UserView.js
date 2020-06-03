import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { withRouter } from "react-router-dom";
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

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    backgroundColor: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  },
  img: {
    borderRadius: "50%",
  },
  avatar: {
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0,
    marginRight: theme.spacing(1),
  },
}));

const UserView = ({
  user: { _id, firstname, lastname, role, email, avatar },
  history,
}) => {
  const classes = useStyles();

  const viewUser = async (e) => {
    e.preventDefault();
    console.log("click", _id);
    //getCategory(_id);
    history.push("/viewUser/" + _id);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Avatar className={classes.avatar} src={avatar} />
        <CardContent className={classes.action}>
          <Typography gutterBottom variant="h5" component="h2">
            {" "}
            {firstname} {lastname}{" "}
          </Typography>{" "}
        </CardContent>{" "}
      </CardActionArea>{" "}
      <CardActions>
        <Button size="small" color="primary" onClick={(e) => viewUser(e)}>
          View{" "}
        </Button>{" "}
        <Button size="small" color="primary">
          Delete
        </Button>{" "}
      </CardActions>{" "}
    </Card>
  );
};
export default withRouter(UserView);
