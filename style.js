function set_Style(){
    width = window.innerWidth;
    height = window.innerHeight;
    console.log(width);
    if (width < 700){
        gird_Div = document.querySelector(".grid_Div");
        gird_Div.style.width = `${width/2}px`;
        console.log(gird_Div.style.width);
        document.querySelector(".title").style = "font-size: 20px";
    }
}

set_Style()