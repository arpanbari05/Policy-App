import * as React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Stack from "@mui/material/Stack";

export default function ResponsiveDatePickers({ dateValue, setDateValue }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <DatePicker
          label="Expiry Date"
          openTo="year"
          disablePast
          minDate={new Date()}
          views={["year", "month", "day"]}
          value={dateValue}
          onChange={newValue => {
            setDateValue(newValue);
          }}
          renderInput={params => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
}
