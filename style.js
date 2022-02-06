function set_Style(){
    width = window.innerWidth;
    height = window.innerHeight;
    if (width < 700){
        document.getElementsByClassName(".grid_Div").style.width = `${width/2}px`;
        document.getElementsByClassName(".title").style = "font-size: 20px";
    }
}

set_Style()