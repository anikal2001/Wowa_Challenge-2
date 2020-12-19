import {
  createStyles,
  FormControl,
  Input,
  InputAdornment,
  InputBase,
  FormControlLabel,
  Card,
  Switch,
  Theme,
  withStyles,
  Grid,
  Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import calculateLandTax from "../utils/calculateLandTax";
import equityIncentiveCalculator from "../utils/equityIncentiveCalculator";
import React from "react";
import "tailwindcss/tailwind.css";

const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "label + &": {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.background.paper,
      border: "1px solid #ced4da",
      fontSize: 16,
      padding: "10px 26px 10px 12px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      "&:focus": {
        borderRadius: 4,
        borderColor: "#80bdff",
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
      },
    },
  })
)(InputBase);

const Index: React.FunctionComponent = () => {
  const [HomePrice, setHomePrice] = React.useState("500000");
  const [Error, setError] = React.useState(false);
  const [DownPayment, setDownPayment] = React.useState("10");
  const [PropertyType, setPropertyType] = React.useState(false);
  const [DownPaymentValue, setDownPaymentValue] = React.useState("50000");
  const [annualIncomeHousehold, setAnnualIncomeAmount] = React.useState(
    "120000"
  );
  //Calculate Mortgage Amount
  const MortgageAmount =
    parseInt(HomePrice) - (parseInt(DownPayment) / 100) * parseInt(HomePrice);
  // Calculate Equity Incentive
  let EquityIncentive = equityIncentiveCalculator(
    MortgageAmount,
    HomePrice,
    DownPayment,
    annualIncomeHousehold,
    PropertyType
  );
  //Function to Conditionally Display warning banner
  function WarningBanner(props) {
    if (props && typeof EquityIncentive === "string") {
      return <Alert severity="error"> {EquityIncentive}</Alert>;
    }
    return null;
  }
  const handleError = () => {
    setError(true);
  };

  // On change handlers for form components
  const handleHomePriceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const re = /^[0-9\b]+$/;

    // if value is not blank, then test the regex

    if (event.target.value === "" || re.test(event.target.value)) {
      setHomePrice(event.target.value);
    }
  };
  const handleDownPaymentChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const re = /^[0-9\b]+$/;

    // if value is not blank, then test the regex

    if (event.target.value === "" || re.test(event.target.value)) {
      setDownPayment(event.target.value);
      const dpValue =
        parseInt(HomePrice) * (parseInt(event.target.value) / 100);
      if (isNaN(dpValue)) {
        setDownPaymentValue(0);
      } else if (dpValue > 100) {
        setDownPaymentValue(HomePrice);
      } else {
        setDownPaymentValue(dpValue);
      }
    }
  };

  const handleDownPaymentValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const re = /^[0-9\b]+$/;

    // if value is not blank, then test the regex

    if (event.target.value === "" || re.test(event.target.value)) {
      setDownPaymentValue(event.target.value);
      const dpPercent =
        (parseInt(event.target.value) / parseInt(HomePrice)) * 100;
      if (isNaN(dpPercent)) {
        setDownPayment(0);
      } else if (dpPercent > 100) {
        setDownPayment(100);
      } else {
        setDownPayment(dpPercent);
      }
    }
  };
  const handleAnnualIncomeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const re = /^[0-9\b]+$/;

    // if value is not blank, then test the regex

    if (event.target.value === "" || re.test(event.target.value)) {
      setAnnualIncomeAmount(event.target.value);
    }
  };
  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPropertyType(event.target.checked);
  };
  return (
    <div>
      <div className="container my-10 mx-auto flex flex-column justify-center flex-no-wrap rounded-md bg-white">
        <div className="flex flex-row flex-no-wrap">
          <Card className="flex w-200 flex-column ">
            <form
              className="container my-10 mx-20"
              noValidate
              autoComplete="off"
            >
              <div className="flex flex-col mt-4">
                <FormControl>
                  <div className="text-xl text-blue-800">Home Price</div>
                  <Input
                    id="standard-adornment-amount"
                    value={HomePrice}
                    inputProps={{ maxLength: 13 }}
                    onChange={handleHomePriceChange}
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                  />
                </FormControl>
              </div>
              <div className="flex flex-col mt-4">
                <FormControl fullWidth>
                  <div className="text-xl text-blue-800">
                    Annual Household Income
                  </div>
                  <Input
                    id="standard-adornment-amount"
                    value={annualIncomeHousehold}
                    inputProps={{ maxLength: 13 }}
                    onChange={handleAnnualIncomeChange}
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                  />
                </FormControl>
              </div>
              <div className="flex flex-row mt-4">
                <FormControl className="w-1/2">
                  <div className="text-xl text-blue-800">Downpayment</div>
                  <Input
                    id="standard-adornment-amount"
                    value={DownPayment}
                    inputProps={{ maxLength: 3 }}
                    onChange={handleDownPaymentChange}
                    endAdornment={
                      <InputAdornment
                        style={{ color: "orange" }}
                        position="start"
                      >
                        %
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <div className="flex flex-col pb-1 px-2 justify-end"> = </div>
                <FormControl className="w-1/2">
                  <div className="text-xl text-blue-800">Downpayment</div>
                  <Input
                    id="standard-adornment-amount"
                    value={DownPaymentValue}
                    inputProps={{ maxLength: 13 }}
                    onChange={handleDownPaymentValueChange}
                    endAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                  />
                </FormControl>
              </div>
              <Typography component="div">
                <Grid
                  component="label"
                  container
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item>Existing/Resale</Grid>
                  <Grid item>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={PropertyType}
                          onChange={handleTypeChange}
                          name="checkedB"
                          color="primary"
                        />
                      }
                    />
                  </Grid>
                  <Grid item>New Construction</Grid>
                </Grid>
              </Typography>
            </form>
            <div className=" rounded-lg bg-gray-100 my-10 container mx-5 column">
              <div className="flex flex-col justify-center mx-10 my-10 ">
                <h1 className=" text-gray-600 flex flex-row justify-center text-xl font-semibold">
                  You could qualify for...
                </h1>
                <div className="border-b-2 border-grey mx-3 mt-2" />
                <div className="my-5 flex flex-row justify-center">
                  {" "}
                  Land Transfer Tax Rebate
                </div>
                <div className="text-4xl font-medium mb-5 flex flex-row justify-center">
                  ${calculateLandTax(HomePrice)}
                </div>
                <div className=" flex flex-row justify-center">
                  {" "}
                  Shared-Equity Incentive
                </div>
                <div
                  className={`${
                    typeof EquityIncentive === "string" ? "text-red-600" : ""
                  } text-3xl my-5 flex flex-row justify-center`}
                >
                  {typeof EquityIncentive !== "string"
                    ? "$" + EquityIncentive
                    : handleError && "Ineligible"}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <WarningBanner warn={Error}></WarningBanner>
    </div>
  );
};
export default Index;
