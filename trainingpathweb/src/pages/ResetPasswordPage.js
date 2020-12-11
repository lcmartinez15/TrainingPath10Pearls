import React, { Fragment } from "react";
import ResetPassword from "../components/auth/ResetPassword";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Typography, Link, Avatar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    width: "100vw",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage:
      "linear-gradient(25deg,#3A454A80  100%, #607D8B80 0% ), url(back.jpg)",
    backgroundRepeat: "no-repeat",
  },
  content: {
    flexDirection: "row",
    display: "flex",
    flexWrap: "wrap",
    boxSizing: "border-box",
    boxShadow: "0 1rem 2rem rgba(0, 0, 0, 0.9)",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "80vh",
    width: "40vw",
    border: "7px",
  },
  paperBanner: {
    height: "80vh",
    width: "40vw",
    border: "7px",
    background: "linear-gradient(25deg, #607D8B 0%, #3A454A  100%)", //"url(logobanner.png)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    textAlign: "center",
  },
  avatar: {
    //width: "60%",
    // backgroundColor: theme.palette.icon,
    borderRadius: "50%",
    marginTop: "1rem",
    backgroundImage:
      "linear-gradient(25deg,#3A454A80  100%, #607D8B80 0% ), url(paper.jpg)",
    height: "30vh",
    width: "30vw",
    border: "7px",

    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    textAlign: "center",
  },
  form: {
    width: "50%", // Fix IE 11 issue.
    margin: theme.spacing(3, 3, 3, 3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  title: {
    position: "absolute",
    top: "50%",
    left: "30%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
  },
  name: {
    position: "absolute",
    top: "20%",
    left: "20%",
    textAlign: "center",
  },
  url: {
    position: "absolute",
    top: "82%",
    left: "13%",
    textAlign: "center",
  },
}));

const ResetPasswordPage = ({ setAlert, resetPassword, isAuthenticated, match }) => {
    console.log("reset password page");
    console.log(match.params.id);
  console.log(match.params.token);
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Grid className={classes.content}>
        <Grid key={1} item>
          <Paper className={classes.paperBanner}>
            {/* <Grid className={classes.title}>
              <div className={classes.avatar} />
            </Grid> */}
            <Grid className={classes.name}>
              <Typography variant="subtitle1">10Pearls</Typography>
            </Grid>

            <Grid className={classes.url}>
              <Typography variant="h5">
                <Link href="https://10pearls.com/">https://10pearls.com/</Link>
              </Typography>
            </Grid>
          </Paper>
        </Grid>
        <Grid key={2} item>
          <ResetPassword user={match.params.id} token={match.params.token} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ResetPasswordPage;
