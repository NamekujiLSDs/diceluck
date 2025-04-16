let handsInfo

const getHandsInfo = () => {
    fetch("../json/handsinfo.json").then(res => res.json())
        .then(json => {
            console.log(json); // 読み込んだJSONを使用
            handsInfo = json
        });
};


const handInfoDisplay = (e, id) => {
    let list = handsInfo[id];
    let overlay = document.getElementById("handInfoOverlay")
    let dom = genInfoOverlayDom(list)
    overlay.style.left = Math.floor(e.clientX + 50) + "px";
    overlay.style.top = Math.floor(e.clientY - 100) + "px";
    overlay.innerHTML = dom
}

const genInfoOverlayDom = (val) => {
    let dom = `<div id="handInfoOverlayHolder">
            <div id="infoDiceHolder">
                <div class="dice">${val[0]}</div>
                <div class="dice">${val[1]}</div>
                <div class="dice">${val[2]}</div>
                <div class="dice">${val[3]}</div>
                <div class="dice">${val[4]}</div>
            </div>
            <div id="infoDescription">${val[5]}
            </div>
        </div>`
    return dom
};


const handInfoLeft = () => {
    let overlay = document.getElementById("handInfoOverlay")
    document.getElementById("handInfoOverlay").innerHTML = "";
    overlay.style = ""
};
document.addEventListener("DOMContentLoaded", () => {
    getHandsInfo()
})