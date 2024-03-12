export const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
  
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
  
    const day = date.getUTCDate();
    const monthIndex = date.getUTCMonth();
    const year = date.getUTCFullYear();
  
    const formattedDate = `${day} ${months[monthIndex]}, ${year}`;
    return formattedDate;
  };