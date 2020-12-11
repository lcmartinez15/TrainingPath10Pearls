import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Visibility from "@material-ui/icons/Visibility";
import Delete from "@material-ui/icons/Delete";
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
  Box, 
  IconButton
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 200,
    height:250,
    backgroundColor: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  },
  content:{
    height:170,
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
  <CardContent className={classes.content}>
      <Box display="flex" justifyContent="center" m={1} p={1} bgcolor="background.paper">
      <Avatar className={classes.avatar} src={avatar} />
        </Box>       
      
          <Typography gutterBottom variant="h5" component="h2">           
            {firstname} {lastname}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">           
            {role}
          </Typography>
        </CardContent>{" "}
  
      <CardActions>
        <IconButton aria-label="view User data" onClick={(e) => viewUser(e)}>
          <Visibility/>
        </IconButton>
        <IconButton aria-label="delete user" onClick={(e) => viewUser(e)}>
          <Delete/>
        </IconButton>
       
      </CardActions>{" "}
    </Card>
  );
};
export default withRouter(UserView);
