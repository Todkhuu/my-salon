export const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 9; hour < 17; hour++) {
    const hourFormatted = hour % 12 === 0 ? 12 : hour % 12;
    const period = hour < 12 ? "AM" : "PM";
    slots.push(`${hourFormatted}:00 ${period}`);
    slots.push(`${hourFormatted}:30 ${period}`);
  }
  return slots;
};
