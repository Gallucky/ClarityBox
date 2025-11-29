const formatDateTimeLocale = (dateISO: string) => {
    const date = new Date(dateISO);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();

    const formattedDateTime = `${formattedDate} ${formattedTime}`;

    return formattedDateTime;
};

export default formatDateTimeLocale;
