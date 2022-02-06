function set_Style(){
    width = window.innerWidth;
    height = window.innerHeight;
    console.log(width);
    if (width < 900){
        document.getElementsByClassName("title").style = "font-size: 20px";
    }
}

set_Style()