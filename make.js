window.all_Items = {};
div_Ids = [];
class add_Question{
    static add_Input(id, value, class_Name, placeholder){
        let rid = random_Id(10);
        placeholder = Number(placeholder);
        return [Html_Items.div(rid, Html_Items.inputs(id, value, class_Name, "text", "",`Kérdés ${placeholder+1}`)+Html_Items.button("", "-", "input_Delete_Button", `delete_Input(${window.div_Ids[window.div_Ids.length-1]}, ${placeholder})`), "from_Group"), rid];
    }
    static title_Input(id, value, class_Name, placeholder){
        return Html_Items.div("", Html_Items.inputs(id, ``, class_Name, "text", "",placeholder), "from_Group");
    }
    static html_Datas = "";
    static questions = ""; 
    static question_Div_Id = "";
    static delete_Button(id){
        return Html_Items.button("", "X", "delete_Button", `delete_This(${id})`)    
    }
    static basic(){
        let title_Id = random_Id(13);
        window.div_Ids.push(random_Id(10));
        this.html_Datas = this.delete_Button(window.div_Ids[window.div_Ids.length-1]);
        this.html_Datas += this.title_Input(title_Id, "", "title_Input", "Kérdés");    
        return title_Id;
    }
    static end(){
        this.html_Datas += Html_Items.div(this.question_Div_Id, this.questions, "question_Div");
        this.html_Datas += Html_Items.button("", "+", "add_Button", `add_Input(${window.div_Ids[window.div_Ids.length-1]})`);
        this.html_Datas = Html_Items.div(window.div_Ids[window.div_Ids.length-1], this.html_Datas, "grid_Div");
    }
    static radio_Button_Question(){
        let d = get_Datas();
        let title_Id = this.basic();
        this.question_Div_Id = random_Id(12);
        this.questions = "";
        let ids = [];
        //let html_Datas = e[0];
        for (let i = 0; i<2; i++){
            ids.push([random_Id(12)]);
            let e = this.add_Input(ids[ids.length-1][0], "", "answer", i);;
            this.questions += e[0];
            ids[ids.length-1][1] = e[1];
        }
        this.end();
        element_To_Conteiner(this.html_Datas);
        window.all_Items[window.div_Ids[window.div_Ids.length-1]] = {
            title: title_Id,
            question: ids,
            type : "radiobutton",
            question_Div: this.question_Div_Id
        }
        element_Datas(d);
    }
    static short_Answer(){
        let d = get_Datas();
        let title_Id = this.basic();
        let ids = [random_Id(10)];
        //this.html_Datas += this.add_Input(ids[ids.length-1], "", "answer", `Válasz`);
        //this.html_Datas += Html_Items.div(this.question_Div_Id, this.questions, "question_Div");
        this.html_Datas = Html_Items.div(window.div_Ids[window.div_Ids.length-1], this.html_Datas, "grid_Div");
        element_To_Conteiner(this.html_Datas);
        window.all_Items[window.div_Ids[window.div_Ids.length-1]] = {
            title: title_Id,
            question: [],
            type : "short_Answer",
            question_Div: this.question_Div_Id
        }
        element_Datas(d);
    }
}

function get_Real_Length(array){
    let length = 0;
    for (let i = 0; i < array.length; i++){
        if (array[i] || array[i] == "" ||array[i] == 0){
            length++;
        }
    }
    return length;
}

function add_Input(id){
    let e = get_Datas();
    let question_Div_Id = window.all_Items[id].question_Div;
    rid = random_Id(12);
    datas = add_Question.add_Input(rid, "", "answer", `${window.all_Items[id].question.length}`);
    window.all_Items[id].question.push([rid, datas[1]]);
    console.log(question_Div_Id);
    document.getElementById(question_Div_Id).innerHTML += datas[0];
    element_Datas(e);
}

function delete_This(id){
    delete window.all_Items[id];
    for (let i = 0; i < window.div_Ids.length; i++){
        if (window.div_Ids[i] && window.div_Ids[i] == id){
            delete window.div_Ids[i];
        }
    }
    document.getElementById(id).remove();
}

function delete_Input(id, index){
    console.log(id, index);
    console.log(window.all_Items[id]);
    div_Id = window.all_Items[id].question[index][1];
    delete window.all_Items[id].question[index];
    document.getElementById(div_Id).remove();
}

function element_Datas(all_Values){
    for (let i = 0; i < window.div_Ids.length; i++){
        index = 0
        if (window.div_Ids[i]){
            if (window.all_Items[window.div_Ids[i]].question && all_Values[window.div_Ids[i]]){
            for (let j = 0; j < window.all_Items[window.div_Ids[i]].question.length; j++){
                if (window.all_Items[window.div_Ids[i]].question[j]){
                document.getElementById(window.all_Items[window.div_Ids[i]].question[j][0]).value = all_Values[window.div_Ids[i]].question[index];
                index++;
                }
            }
            document.getElementById(window.all_Items[window.div_Ids[i]].title).value = all_Values[window.div_Ids[i]].title;
        }
    }
    }
}

function add_New(){
    let window = document.getElementById("add_New");
    window.style.display = "block";
}

function close_Window(){
    let window = document.getElementById("add_New");
    window.style.display = "none";
}

function get_Datas(){
    all_Values = {};
    for (let i = 0; i < window.div_Ids.length; i++){
        if (window.div_Ids[i]){
            window.all_Items[window.div_Ids[i]]
            questions = [];
            console.log(window.all_Items[window.div_Ids[i]].question);
            for (let k = 0; k < window.all_Items[window.div_Ids[i]].question.length; k++){
                if (window.all_Items[window.div_Ids[i]].question[k]){
                    questions.push(document.getElementById(window.all_Items[window.div_Ids[i]].question[k][0]).value);
                }
            }
            all_Values[window.div_Ids[i]] = {
                title: document.getElementById(window.all_Items[window.div_Ids[i]].title).value,
                question: questions
            }
            
        }
    }
    return all_Values;
}

function choose(type){
    if (type == "radiobutton"){
        add_Question.radio_Button_Question();
    }
    else if(type == "short_Answer"){
        add_Question.short_Answer();
    }
    let window = document.getElementById("add_New");
    window.style.display = "none";
}

function get_Value(id){
    return document.getElementById(id).value
}

function get_All_Data(){
    let questions_Json = {
        details: {
        title: get_Value("main_Title"),
        description: document.getElementById("description").value
        },
    questions: []
    };
    for (let i = 0; i < window.div_Ids.length; i++){
        if (window.div_Ids[i]){
        json = {
                type: window.all_Items[window.div_Ids[i]].type,
                title: "",
                question: get_Value(window.all_Items[window.div_Ids[i]].title),
                placeholder: get_Value(window.all_Items[window.div_Ids[i]].title)
            }    
            if (window.all_Items[window.div_Ids[i]].type == "radiobutton"){
                json["select"] = [];
                for (let j = 0; j < window.all_Items[window.div_Ids[i]].question.length; j++){
                    if (window.all_Items[window.div_Ids[i]].question[j]){
                        json["select"].push(get_Value(window.all_Items[window.div_Ids[i]].question[j][0]));
                    }
                }
            }
            questions_Json.questions.push(json);
        }
    }
    return JSON.stringify(questions_Json);
}