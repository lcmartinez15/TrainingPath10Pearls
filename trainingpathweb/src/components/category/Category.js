import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getCategory, deleteCategory } from "../../redux/actions/category";

import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@material-ui/core";
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    backgroundColor: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  },
});

const Category = ({
  auth,
  category: { _id, name, type },
  history,
  deleteCategory,
}) => {
  const classes = useStyles();

  const editCategory = async (e) => {
    e.preventDefault();
    console.log("click");
    //getCategory(_id);
    history.push("/editCategory/" + _id);
  };
  const removeCategory = async (e) => {
    e.preventDefault();
    console.log("click");
    deleteCategory(_id);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent className={classes.action}>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          {type}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={(e) => editCategory(e)}>
          Edit
        </Button>
        <Button size="small" color="primary" onClick={(e) => removeCategory(e)}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

Category.defaultProps = {
  showActions: true,
};

Category.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default withRouter(
  connect(mapStateToProps, { getCategory, deleteCategory })(Category)
);
