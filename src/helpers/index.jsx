Number.prototype.fprice = function() {
    return this.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " UZS";
}

String.prototype.formatDate = function(){
    const months = ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avgust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"];
    if(!this) return "";
    const date = this.split("T")[0].split("-");
    const monthIndex = parseInt(this.split("-")[1]) - 1;
    return {date: `${date[2]}-${months[monthIndex]} ${date[0]}`, time:  this.split("T")[1].slice(0, 5)}
}

export const saveToLocalStorage = (key, value) => {
    if(typeof value === "object" && value !== null){
        localStorage.setItem(key, JSON.stringify(value))
    }
    else{
        localStorage.setItem(key, value.toString())
    }
}
