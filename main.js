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
}

function random_Id(length){
    x = "";
    for (let i = 0; i<length; i++){
        x += Math.ceil(Math.random()*10);
    }
    return x;
}

function element_To_Conteiner(data){
    document.getElementById("conteiner").innerHTML += data
}

function clear_Conteiner(){
    document.getElementById("conteiner").innerHTML = "";
}

class Questions{
    static question_Data = {};

    static add_Title(index){
        return Html_Items.h_Tag("", this.question_Data[index], "title", 2);
    }

    static create_Div(datas){
        let div_Id = random_Id(10);
        let div = Html_Items.div(div_Id, datas, "grid_Div");
        element_To_Conteiner(div);
        return div_Id;
    }

    static radiobuttons(question_Data){
        this.question_Data = question_Data;
        let list = ["title", "question", "select"];
        let datas = "";
        let questions = "";
        let questions_Ids = [];
        for (let i = 0; i < list.length; i++){
            if (list[i] == "select"){
                let question_Name = random_Id(10)
                for (let k = 0; k < question_Data[list[i]].length; k++){
                    questions += Html_Items.radio_Button(random_Id(10),question_Data[list[i]][k], "question", question_Name, question_Data[list[i]][k]);
                }
            }
            else{
                datas += this.add_Title(list[i]);//Html_Items.h_Tag("", this.question_Data[list[i]], this.question_Data[list[i]], 2);
            }
        }
        datas+= questions;
        this.create_Div(datas);
    }

    static short_Answer(question_Data){
        this.question_Data = question_Data;
        let list = ["title", "question", "example"];
        let datas = "";
        for (let i = 0; i < list.length; i++){
            if (list[i] != "example"){
            datas += this.add_Title(list[i]);//Html_Items.h_Tag("", this.question_Data[list[i]], this.question_Data[list[i]], 2);
            }
            else{
                let input_Id = random_Id(11);
                console.log(input_Id);
                let e = Html_Items.inputs(input_Id, "", "short_Answer","", "text", this.question_Data[list[i]]);
                e += Html_Items.label("", this.question_Data[list[i]], "from_Label", input_Id);
                datas += Html_Items.div("", e, "from_Group");
            }
        }
        this.create_Div(datas);
    }
}

json = [{
    "type": "short_Answer",
    "title": "",
    "question": "Mi az email címed?",
    "example": "Email cím"
    },
    {
        "type": "short_Answer",
        "title": "",
        "question": "Mi a Discord neved?",
        "example": "Discord név"
        }];
for (let i = 0; i < json.length; i++){
    Questions.short_Answer(json[i]);   
}