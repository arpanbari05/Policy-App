import React from "react";
import { useTheme } from "../../../customHooks";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useCreateEnquiryMutation } from "../../../api/api";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Title } from "../components/FormComponents";
import enIDLocale from "date-fns/locale/en-IN";
import { useHistory } from "react-router-dom";
import { Button } from "../../../components";
import "styled-components/macro";

function PortabilityForm() {
  const [value, setValue] = React.useState(null);

  const [error, setError] = React.useState(null);

  // const { updateEnquiry, isLoading, error: reqError } = useUpdateEnquiry();

  const [createEnquiry, { isLoading, error: reqError }] =
    useCreateEnquiryMutation();

  const { colors } = useTheme();

  const history = useHistory();

  const theme = createTheme({
    palette: {
      primary: {
        main: colors.primary_color,
      },
      secondary: {
        main: colors.secondary_color,
      },
    },
    typography: {
      fontFamily: "Inter-regular",
    },
  });

  const minDate = new Date(Date.now());
  minDate.setDate(minDate.getDate() - 6); // - 6 days
  const maxDate = new Date(Date.now());
  maxDate.setDate(maxDate.getDate() + 60); // + 60 days

  const handleSubmit = async () => {
    let expiry_date = new Date(value).toLocaleDateString();
    expiry_date = expiry_date.split("/").reverse().join("-");

    const res = await createEnquiry({
      expiry_date,
      type: "port",
      section: "health",
    });
    if (!res.error) history.push("/input/basic-details");
  };

  const goBack = () => {
    history.goBack();
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="p-3">
        <Title className="mb-4">Do you wish to port existing policy?</Title>
        <PortDatePicker value={value} setValue={setValue} setError={setError} />
        {/* <LocalizationProvider locale={enIDLocale} dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Choose date"
            mask="__/__/____"
            value={value}
            ampm={false}
            maxDate={
              new Date(
                `${maxDate.getFullYear()}-${
                  maxDate.getMonth() + 1
                }-${maxDate.getDate()}`,
              )
            }
            minDate={
              new Date(
                `${minDate.getFullYear()}-${
                  minDate.getMonth() + 1
                }-${minDate.getDate()}`,
              )
            }
            onChange={newValue => {
              setValue(newValue);
            }}
            renderInput={params => {
              setError(params.error);
              return (
                <TextField
                  autoComplete="off"
                  color="primary"
                  fullWidth
                  helperText={params.error && "Please provide a valid date"}
                  {...params}
                />
              );
            }}
          />
        </LocalizationProvider> */}
        <div className="mt-4">
          <div
            className="d-flex justify-content-between align-items-center"
            css={`
              padding: 0 28px;

              @media (max-width: 768px) {
                padding: 0 14px;
              }
            `}
          >
            <button
              onClick={goBack}
              css={`
                color: #000;
                height: 58px;
                width: 172px;
                background: unset;
                padding: 10px 11px;
                color: rgb(37, 56, 88);
                font-weight: 900;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 20px;
                font-weight: 600;
                gap: 3px;

                @media (max-width: 480px) {
                  background: rgb(239, 243, 245);
                  color: rgb(70, 86, 113);
                  font-size: 13px;
                  height: 40px;
                  max-width: 120px;
                  width: 100%;
                  padding: 0;
                }
              `}
            >
              <span>Back</span>
            </button>
            <Button
              loaderPrimaryColor
              disabled={error || !value}
              onClick={handleSubmit}
              arrow
              loader={isLoading && !reqError}
              css={`
                height: 58px;
                width: 100%;
                max-width: 172px;
                font-size: 20px;
                font-weight: 400;

                @media (max-width: 480px) {
                  font-size: 13px;
                  height: 40px;
                  width: 100%;
                  max-width: 120px;
                  padding: 5px 11px;
                  font-weight: normal;
                }
              `}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default PortabilityForm;

export function PortDatePicker({
  value,
  setValue = () => {},
  setError = () => {},
}) {
  const minDate = new Date(Date.now());
  minDate.setDate(minDate.getDate() - 6); // - 6 days
  const maxDate = new Date(Date.now());
  maxDate.setDate(maxDate.getDate() + 60); // + 60 days

  return (
    <LocalizationProvider locale={enIDLocale} dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Choose date"
        mask="__/__/____"
        value={value}
        ampm={false}
        maxDate={
          new Date(
            `${maxDate.getFullYear()}-${
              maxDate.getMonth() + 1
            }-${maxDate.getDate()}`,
          )
        }
        minDate={
          new Date(
            `${minDate.getFullYear()}-${
              minDate.getMonth() + 1
            }-${minDate.getDate()}`,
          )
        }
        onChange={newValue => {
          setValue(newValue);
        }}
        renderInput={params => {
          setError(params.error);
          return (
            <TextField
              autoComplete="off"
              color="primary"
              fullWidth
              helperText={params.error && "Please provide a valid date"}
              {...params}
            />
          );
        }}
      />
    </LocalizationProvider>
  );
}
