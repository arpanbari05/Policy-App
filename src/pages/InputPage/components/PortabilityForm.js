import React from "react";
import Card from "../../../components/Card";
import { useTheme } from "../../../customHooks";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import enIDLocale from "date-fns/locale/en-IN";

function PortabilityForm() {
  const [value, setValue] = React.useState(null);

  const { colors } = useTheme();

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
  console.log(new Date(value).toLocaleDateString());
  return (
    <ThemeProvider theme={theme}>
      <Card>
        <LocalizationProvider locale={enIDLocale} dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Choose date"
            mask="__/__/____"
            value={value}
            ampm={false}
            onChange={newValue => {
              setValue(newValue);
            }}
            renderInput={params => (
              <TextField
                autoComplete="off"
                color="primary"
                fullWidth
                {...params}
              />
            )}
          />
        </LocalizationProvider>
      </Card>
    </ThemeProvider>
  );
}

export default PortabilityForm;
