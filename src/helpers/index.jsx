Number.prototype.fprice = function() {
    return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " UZS";
}

export const saveToLocalStorage = (key, value) => {
    if(typeof value === "object" && value !== null){
        localStorage.setItem(key, JSON.stringify(value))
    }
    else{
        localStorage.setItem(key, value.toString())
    }
}