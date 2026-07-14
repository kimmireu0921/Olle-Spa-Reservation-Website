const SLOT_STEP_MINUTES = 30;

function timeToMinutes(time) {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

function minutesToTime(minutes) {
  const h = Math.floor(minutes / 60).toString().padStart(2, '0');
  const m = (minutes % 60).toString().padStart(2, '0');
  return `${h}:${m}`;
}

function generateCandidateSlots(businessHours, durationMinutes) {
  if (!businessHours || !businessHours.open_time || !businessHours.close_time) {
    return [];
  }
  const open = timeToMinutes(businessHours.open_time);
  const close = timeToMinutes(businessHours.close_time);
  const candidates = [];
  for (let start = open; start + durationMinutes <= close; start += SLOT_STEP_MINUTES) {
    candidates.push(minutesToTime(start));
  }
  return candidates;
}

function rangesOverlap(aStart, aEnd, bStart, bEnd) {
  return aStart < bEnd && bStart < aEnd;
}

function filterAvailable(candidateStartTimes, durationMinutes, busyRanges) {
  return candidateStartTimes.filter((start) => {
    const startMin = timeToMinutes(start);
    const endMin = startMin + durationMinutes;
    return !busyRanges.some((range) => {
      const busyStart = timeToMinutes(range.start_time);
      const busyEnd = timeToMinutes(range.end_time);
      return rangesOverlap(startMin, endMin, busyStart, busyEnd);
    });
  });
}

module.exports = { generateCandidateSlots, filterAvailable, timeToMinutes, minutesToTime };
