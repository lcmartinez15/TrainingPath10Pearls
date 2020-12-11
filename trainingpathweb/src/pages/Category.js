import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/styles";
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
import Category from "../components/category/Category";
import Filter from "../components/users/filter";
import Spinner from "../components/layout/Spinner";
//actions
import { getCategories } from "../redux/actions/category";

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

const CategoryPage = ({
  getCategories,
  category: { categories, loading },
  history,
}) => {
  const classes = useStyles();

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const onClick = (e) => {
    history.push("/addCategory");
  };

  if (loading) {
    return <Spinner></Spinner>;
  }

  return (
<div className={classes.root}>
      <Card className={classes.root}>
       
        <CardHeader title="Category Page" />
        <Divider />
        <CardContent>
 {/* <Filter /> */}
 <Box display="flex" flexDirection="row-reverse" p={1} m={1} bgcolor="background.paper">
 <Button
          className={classes.addButton}
          color="primary"
          variant="contained"
          onClick={(e) => onClick(e)}
        >
          Add Category
        </Button>
          </Box>
          <Grid container spacing={2}>
        {!categories ? (
          <div> .. </div>
        ) : (
          categories.map((category) => (
            <Grid key={category._id} item>
              <Category key={category._id} category={category} />
            </Grid>
          ))
        )}
      </Grid>
        </CardContent>
        </Card>
        </div>

     
   
  );
};

CategoryPage.propTypes = {
  getCategories: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  category: state.category,
});

export default connect(mapStateToProps, { getCategories })(CategoryPage);
