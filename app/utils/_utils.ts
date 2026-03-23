const parseHyphenatedDate = (dateStr: string) => {
    const [year, month, date] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, date);
};

export { parseHyphenatedDate as parseDate };
