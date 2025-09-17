import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const customStyles = {
  calendarContainer: {
    fontFamily: "Segoe UI, sans-serif",
    borderRadius: "8px",
    border: "1px solid #7A1528",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    background: "#fff"
  },
  daySelected: {
    background: "#7A1528",
    color: "#fff"
  },
  timeList: {
    background: "#fff"
  },
  timeListItem: {
    background: "#7A1528",
    color: "#fff"
  }
};

function CustomDatePicker({ selected, onChange, ...props }) {
  return (
    <DatePicker
      selected={selected}
      onChange={onChange}
      showTimeSelect
      dateFormat="Pp"
      popperClassName="custom-datepicker-popper"
      {...props}
    />
  );
}

export default CustomDatePicker;

// Add custom CSS to override react-datepicker styles
const style = document.createElement('style');
style.innerHTML = `
.custom-datepicker-popper .react-datepicker__day--selected,
.custom-datepicker-popper .react-datepicker__day--keyboard-selected {
  background-color: #7A1528 !important;
  color: #fff !important;
}
.custom-datepicker-popper .react-datepicker__time-list-item--selected {
  background-color: #7A1528 !important;
  color: #fff !important;
}
.custom-datepicker-popper .react-datepicker__header {
  background-color: #f7f7f7 !important;
  border-bottom: 1px solid #7A1528 !important;
}
`;
document.head.appendChild(style);
