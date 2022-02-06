function set_Style(){
    width = window.innerWidth;
    height = window.innerHeight;
    console.log(width);
    if (width < 900){
        document.getElementsByClassName("title").style = "font-size: smaller";
    }
}

set_Style()