class Html_Items{
    static div(id, datas, class_Name){
        return `<div id = "${id}" class = "${class_Name}">${datas}</div>`;
    }
    static h_Tag(id, data, class_Name,number_Of_H){
        return `<h${number_Of_H} id = "${id}" class = "${class_Name}">${data}</h${number_Of_H}>`;
    }
    static inputs(id, value, class_Name,name,type_Of_Input, placeholder){
        return `<input type = "${type_Of_Input}" id = "${id}" class = "${class_Name}" value = "${value}" name = "${name}" placeholder = "${placeholder}"/>`;
    }
    static label(id, value, class_Name, for_This){
        return `<label id = "${id}" class = "${class_Name}" for = "${for_This}">${value}</label>`;
    }
    static radio_Button(id, data, class_Name, name, value){
        return this.div("", this.label("", data, "radiobutton_Question")+this.inputs(id, value, "radiobutton", name, "radio"), class_Name);
    }
    static p_Tag(id, data, class_Name){
        return `<p id = "${id}" class = "${class_Name}">${data}</p>`;
    }
}