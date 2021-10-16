import { DateRangePicker } from "react-dates";
import type { Moment } from "moment";
import { useState } from "react";
import type { FocusedInputShape } from "react-dates";
import moment from "moment";

export interface StartDateAndEndDate {
  startDate: Moment | null;
  endDate: Moment | null;
}
interface DatePickerProps {
  startDate: Moment | null;
  endDate: Moment | null;
  startDateId: string;
  endDateId: string;
  onDatesChange: ({ startDate, endDate }: StartDateAndEndDate) => void;
}
export const DatePicker = ({
  startDate,
  endDate,
  startDateId,
  endDateId,
  onDatesChange,
}: DatePickerProps) => {
  const [focused, setFocused] = useState<FocusedInputShape | null>(null);

  return (
    <DateRangePicker
      startDate={startDate}
      displayFormat="dddd, MMM D"
      isDayBlocked={(day) => day.isAfter(moment())}
      startDateId={startDateId}
      isOutsideRange={() => false}
      endDate={endDate}
      endDateId={endDateId}
      onDatesChange={onDatesChange}
      focusedInput={focused}
      onFocusChange={setFocused}
    />
  );
};
