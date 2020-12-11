import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { Grid, Button, Box } from "@material-ui/core";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  
  TextField,
} from "@material-ui/core";

//Components
import User from "../components/users/UserView";
import Filter from "../components/users/filter";
import Spinner from "../components/layout/Spinner";
//actions
import { getUsers } from "../redux/actions/users";
//styles
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  content: {
    marginTop: theme.spacing(2),
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  spacer: {
    flexGrow: 1,
  },
  row: {
    height: "42px",
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2)
  },
  addButton: {
    marginRight: theme.spacing(5),
  },
}));

const Users = ({ getUsers, user: { users, loading }, history }) => {
  const classes = useStyles();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const onClick = (e) => {
    history.push("/registerUser");
  };

  if (loading) {
    return <Spinner></Spinner>;
  }

  return (
    <div className={classes.root}>
      <Card className={classes.root}>
       
        <CardHeader title="Users" />
        <Divider />
        <CardContent>
          {/* <Filter /> */}
          <Box display="flex" flexDirection="row-reverse" p={1} m={1} bgcolor="background.paper">
          <Button
              className={classes.addButton}
              color="primary"
              variant="contained"
              onClick={(e) => onClick(e)}>
              Add User
            </Button>
          </Box>
          
          <Grid container spacing={2}>
        {users.map((value) => (
          <Grid key={value._id} item>
            <User user={value} />
          </Grid>
        ))}
      </Grid>
        </CardContent>  
      
   
      </Card>
    </div>
  
  );
};
Users.propTypes = {
  getUsers: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { getUsers })(Users);
