export const FormatDate = (date) => {

    const hours = new Date(date).getHours();
    const minutes = new Date(date).getMinutes();
    const getday=new Date(date).getDate();
    const month=new Date(date).getMonth();
    const year = new Date(date).getUTCFullYear();
    return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes} | ${getday}/${month}/${year}`;
}