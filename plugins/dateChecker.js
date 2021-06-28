export function checkDate(currentDate, currentTime) {
  let isDisableBtn = false;

  function format(date) {
    let d = date.getDate();
    let m = date.getMonth() + 1;
    let y = date.getFullYear();
    return "" + y + "-" + (m <= 9 ? "0" + m : m) + "-" + (d <= 9 ? "0" + d : d);
  }

  let today = new Date();
  let dateString = format(today);

  if (new Date(currentDate) > new Date(dateString)) {
    isDisableBtn = false;
  } else if (currentDate == dateString) {
    if (parseInt(currentTime) > parseInt(new Date().getHours())) {
      isDisableBtn = false;
    } else {
      isDisableBtn = true;
    }
  } else {
    isDisableBtn = true;
  }

  return isDisableBtn;
}
