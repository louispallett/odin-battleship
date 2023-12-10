import { ships } from "./Ship";
export { place, indexes };


// Based on number of Ships
const maxClicks = ships.length;
const indexes = [];

const place = (gridItem) => {
    const index = parseInt(gridItem.dataset.index);

    // Check if array is full
    if(indexes.length < maxClicks) {
        if(!indexes.includes(index)) {

            indexes.push(index);
            console.log("Index added: " + index);

            if(indexes.length == maxClicks) {
                console.log("Array: " + indexes);
                document.querySelectorAll(".grid-item").forEach(item => {
                    item.onclick = null;
                });
            }
        } else {
            console.log("Already in array");
        }
    }
}