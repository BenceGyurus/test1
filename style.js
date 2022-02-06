function set_Style(){
    width = window.innerWidth;
    height = window.innerHeight;
    console.log(width);
    if (width < 900){
        document.getElementById("title_Style").style.fontSize = "smaller";
    }
}

set_Style()