import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Category from "../components/category/Category";
import { Grid } from "@material-ui/core";

import { getCategories } from "../redux/actions/category";

const CategoryPage = ({
  getCategories,
  category: { categories, loading, history },
}) => {
  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return (
    <Fragment>
      <h1> Category Page </h1> <Link to="/addCategory"> New Category </Link>{" "}
      <Grid container spacing={2}>
        {" "}
        {!categories ? (
          <div> .. </div>
        ) : (
          categories.map((category) => (
            <Grid key={category._id} item>
              <Category key={category._id} category={category} />{" "}
            </Grid>
          ))
        )}{" "}
      </Grid>{" "}
    </Fragment>
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
