var saveButton=document.getElementById("saveButton");
var input_PersonData=document.getElementById("person_data");
var input_name=document.getElementById("name");
var input_city=document.getElementById("city");
var input_country=document.getElementById("country");





saveButton.onclick=function () {
    if(input_PersonData.value =="" ||input_country.value=="" || input_city.value=="" ||input_name.value==""){
            alert("Please Fill All Required Field");
            return ;
    }else if (input_PersonData.value !=null&&input_country.value!=null&& input_city.value!=null&&input_name.value!=null) {
        saveUser(deleteWhiteSpace(input_PersonData), deleteWhiteSpace(input_name), deleteWhiteSpace(input_city), deleteWhiteSpace(input_country));
        document.location.href = "/";

    }


}


function deleteWhiteSpace(id) {
    return id.value.replace(/ /g,'');
}

function saveUser(personData,name,city,country){
               $.ajax({
                type: "GET",
                url:  "/api/addNew?name="+name+"&city="+city+"&country="+country+"&personData="+personData,
                async: false,
                success: function (data) {
                    alert("Kullanıcı Başarıyla Eklendi!"+data[i]);

                }


            });

}