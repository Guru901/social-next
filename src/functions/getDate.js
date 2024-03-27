const getDateDifference = (dateString) => {
  if (!dateString) {
    return;
  }
  const postDate = new Date(dateString);
  const currentDate = new Date();

  // Calculate the difference in milliseconds
  const timeDifference = currentDate - postDate;

  // Convert milliseconds to seconds, then to minutes, then to hours, then to days
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days >= 7) {
    return postDate.toLocaleDateString();
  } else if (days >= 1) {
    // If more than a day, return the number of days ago
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours >= 1) {
    // If more than an hour, return the number of hours ago the post was posted
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes >= 1) {
    // If more than a minute, return the number of minutes ago
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return "Just Now";
  }
};

export { getDateDifference };
