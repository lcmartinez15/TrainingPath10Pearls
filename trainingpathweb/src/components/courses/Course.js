import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    width: 200,
    height:250,
    backgroundColor: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  },
  content:{
    height:170,
  },
});

const Course = ({ auth, course: { _id, title, link, time, img }, showActions }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
     
        <CardContent className={classes.content}>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={img}
          title="Contemplative Reptile"
        />
          <Typography gutterBottom variant="h5" component="h3">
            {" "}
            {title}{" "}
          </Typography>{" "}
        </CardContent>{" "}
      
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

Course.defaultProps = {
  showActions: true,
};

Course.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {})(Course);
