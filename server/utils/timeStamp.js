const getCurrentTimeStampFormatted = () => {
    const nowISO = new Date().toISOString();
    const nowISODate = nowISO.slice(0, 10);
    const nowISODateArray = nowISODate.split("-");
    const year = nowISODateArray[0];
    const month = nowISODateArray[1];
    const day = nowISODateArray[2];
    const formattedDate = `${day}-${month}-${year}`;
    const nowTime = new Date().toLocaleTimeString();
    const date = `[${formattedDate} | ${nowTime}]`;

    return date;
};

module.exports = getCurrentTimeStampFormatted;
