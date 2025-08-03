export const timeAgo = (timestamp) => {
	const now = Date.now();
	const secondsAgo = Math.floor((now - timestamp) / 1000);

	if (secondsAgo < 60) {
		return `${secondsAgo}s ago`;
	} else if (secondsAgo < 3600) {
		const minutesAgo = Math.floor(secondsAgo / 60);
		return `${minutesAgo}m ago`;
	} else if (secondsAgo < 86400) {
		const hoursAgo = Math.floor(secondsAgo / 3600);
		return `${hoursAgo}h ago`;
	} else if (secondsAgo < 604800) {
		const daysAgo = Math.floor(secondsAgo / 86400);
		return `${daysAgo}d ago`;
	} else {
		const weeksAgo = Math.floor(secondsAgo / 604800); // 7 days in seconds
		return `${weeksAgo}w ago`;
	}
};

export const formatDistanceToNow = (date) => {
  const now = new Date();
  const diffInMs = now - new Date(date);
  
  const minute = 60 * 1000;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  const year = day * 365;

  if (diffInMs < minute) {
    return "just now";
  } else if (diffInMs < hour) {
    const minutes = Math.floor(diffInMs / minute);
    return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  } else if (diffInMs < day) {
    const hours = Math.floor(diffInMs / hour);
    return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  } else if (diffInMs < week) {
    const days = Math.floor(diffInMs / day);
    return `${days} day${days === 1 ? '' : 's'} ago`;
  } else if (diffInMs < month) {
    const weeks = Math.floor(diffInMs / week);
    return `${weeks} week${weeks === 1 ? '' : 's'} ago`;
  } else if (diffInMs < year) {
    const months = Math.floor(diffInMs / month);
    return `${months} month${months === 1 ? '' : 's'} ago`;
  } else {
    const years = Math.floor(diffInMs / year);
    return `${years} year${years === 1 ? '' : 's'} ago`;
  }
};
