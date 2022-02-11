var answers = [];

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
function element_To_Header(datas){
    document.getElementById("header").innerHTML = datas;
}
class Questions{
    static add_To_Answers(type, id){
        window.answers.push({
            question : this.question_Data.question,
            answer: "",
            type_Of_Question: type,
            id: id
        })
    }
    static question_Data = {};

    static add_Title(index){
        return Html_Items.h_Tag("title_Style", this.question_Data[index], "title", 2);
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
                let question_Name = random_Id(10);
                this.add_To_Answers("radiobutton", question_Name);
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
        let list = ["title", "question", "placeholder"];
        let datas = "";
        for (let i = 0; i < list.length; i++){
            if (list[i] != "placeholder"){
            datas += this.add_Title(list[i]);//Html_Items.h_Tag("", this.question_Data[list[i]], this.question_Data[list[i]], 2);
            }
            else{
                let input_Id = random_Id(11);
                this.add_To_Answers("short_Answer", input_Id);
                let e = Html_Items.inputs(input_Id, "", "short_Answer","", "text", this.question_Data[list[i]]);
                e += Html_Items.label("", this.question_Data[list[i]], "from_Label", input_Id);
                datas += Html_Items.div("", e, "from_Group");
            }
        }
        this.create_Div(datas);
    }
}

class details{
    static datas = {}
    static description(){
        return Html_Items.p_Tag("", this.datas.description)
    }
    static main_Title(){
        return Html_Items.h_Tag("", this.datas.title, "main_Title", 1);
    }
    static add_Datas_Div(datas){
        this.datas = datas
        let html_Datas = this.main_Title() + this.description();
        element_To_Header(html_Datas);
    }

}

function main(all_Datas){
    all_Datas = JSON.parse(all_Datas);
    console.log(all_Datas);
    if (all_Datas.questions){
        //type_Of_Questions = [["short_Answer", Questions.short_Answer], ["radiobutton", Questions.radiobuttons]];
        for (let i = 0; i < all_Datas.questions.length; i++){
            console.log(all_Datas.questions[i]);
            if (all_Datas.questions[i].type == "short_Answer"){
                Questions.short_Answer(all_Datas.questions[i]);
            }
            else if (all_Datas.questions[i].type == "radiobutton"){
                Questions.radiobuttons(all_Datas.questions[i]);
            }
        }
    }
    if (all_Datas.details){
        details.add_Datas_Div(all_Datas.details);
    }
}

class get_Datas{
    static answers = {};
    static radio_Button(answers){
        this.answers = answers;
        let name = this.answers.id;
        element = document.getElementsByName(name);
        let number_Of_Answer = -1;
        for (let i = 0; i < element.length; i++){
            if (element[i].checked){
                number_Of_Answer = element[i].value;
            }
        }
        this.answers.answer = number_Of_Answer;
        return this.answers;
    }
    static short_Answers(answers){
        this.answers = answers;
        console.log(this.answers.id);
        let value = document.getElementById(this.answers.id).value;
        if (value.length > 2){
            this.answers.answer = value;
            return this.answers;
        }else{
            return false;
        }
    }
}

function query_Datas(){
    req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            main(this.responseText);
        }
    }    
    req.open("GET", "questions.json");
    req.send();
}

function element_To_Errors(errors){
    document.getElementById("errors").innerHTML = ""
    if (errors.length){
        document.getElementById("errors").innerHTML = errors[0]    
    }    
} 

function send(){
    let errors = [];
    if (window.answers){
        for (let i = 0; i < window.answers.length; i++){
            let a;
            if (window.answers[i].type_Of_Question == "radiobutton"){
                a = get_Datas.radio_Button(window.answers[i]);
            }
            else if (window.answers[i].type_Of_Question == "short_Answer"){
                a = get_Datas.short_Answers(window.answers[i]);
            }
            console.log(a);
            if (a){
                window.answers[i] = a;
            }
            else{
                errors.push("Az összes mező kitöltése kötelező");
            }
        }
        element_To_Errors(errors);
        if (!errors.length){
            send_To_Server(JSON.stringify(window.answers));
            //say_Thanks();
            //element_The_Result();
        }
    }
}

function say_Thanks(){
    let item = Html_Items.h_Tag("","Köszönjük, hogy kitöltötted!", "thanks", 1);
    item += Html_Items.h_Tag("", "Már nincs több dolgod :)", "thanks",2);
    clear_Conteiner();
    element_To_Conteiner(Html_Items.div("", item, "thanks_Div"));
}

function element_To_The_Body(data){
    document.body.innerHTML = data;
}

function send_To_Server(data){
    req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if (this.status == 200 && this.readyState == 4){
            element_To_The_Body(this.responseText);       
        }
    }
    req.open("GET", "sent.html"); //btw ide POST kell
    req.send(data);
}


function element_The_Result(){
    document.getElementById("result").innerHTML = JSON.stringify(window.answers);
    document.getElementById("result").style.display = "block";
}

query_Datas();