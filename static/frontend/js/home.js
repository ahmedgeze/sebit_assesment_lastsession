        var dataTableBody=document.getElementById("dataTableBody");
        getTableData("GET","api/getAll");
        var city_list=new Array;
        var clean_city_list=new Array;

        comboboxFill();

         $(document).ready(function() {
            $('#userDataTable').DataTable( {
            "order": [[ 0, "desc" ]]
             } );
        } );

        var personData=document.getElementById("person_data");
        var personName=document.getElementById("name");
        var personCity=document.getElementById("city");
        var personCountry=document.getElementById("country");

        var oldData,oldName,oldCity,oldCountry;
        var newdata,newname,newcity,newcountry;





        var modal = document.getElementById('myModal');
        var span = document.getElementsByClassName("close")[0];

        span.onclick = function() {
            modal.style.display = "none";
        }


        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
             }
            }




        var rows=dataTableBody.getElementsByTagName("tr");
        for(var i=0;i<rows.length;i++){
            rows[i].onclick=function () {
                index_Row=$(this).index();

                oldData=rows[index_Row].cells[0].innerHTML;
                oldName=rows[index_Row].cells[1].innerHTML;
                oldCity=rows[index_Row].cells[2].innerHTML;
                oldCountry=rows[index_Row].cells[3].innerHTML;


                alert("name="+oldName+"\n"+"city="+oldCity+"\n"+"country="+oldCountry+"\n"+"person data="+oldData+"\n"+"Değiştirilecek");


                modal.style.display = "block";

            }
        }

        var saveBtn=document.getElementById("saveButton");
        saveBtn.onclick=function(){



            newdata=personData.value;
            newname=personName.value;
            newcity=personCity.value;
            newcountry=personCountry.value;
            alert(newdata+deleteWhiteSpace(newname)+newcity+newcountry);


            if(newdata==""||newname==""||newcity==""||newcountry==""){
                alert("Please fill all input boxes")

            }else if(newdata>100){
                alert("Please enter under 100")
            }
            else {
                $.ajax({
                type: "GET",
                url:  "/api/update/?old_name="+deleteWhiteSpace(oldName)+"&old_city="+deleteWhiteSpace(oldCity)+"&old_country="+deleteWhiteSpace(oldCountry)+"&old_personData="+deleteWhiteSpace(oldData)+"&name="+deleteWhiteSpace(newname)+"&city="+deleteWhiteSpace(newcity)+"&country="+deleteWhiteSpace(newcountry)+"&personData="+deleteWhiteSpace(newdata),
                async: false,
                success: function (data) {
                        modal.style.display = "none";
                        alert("Succesfully Updated");

                        var sel=document.getElementById("selectCountry");
                        var selectedCountry=sel.options[sel.selectedIndex].value;
                        var inputCity=document.getElementById("inputCity").value;
                        $("#dataTableBody tr").remove();
                        getTableData("GET","api/queryData?city="+deleteWhiteSpace(inputCity)+"&country="+deleteWhiteSpace(selectedCountry));



                }


            });





            }

                        // selectedCountry=document.getElementById("selectCountry").options[selectedCountry.selectedIndex].value;
                        // inputCity=document.getElementById("inputCity").value;











        }











        var selectedCountry=document.getElementById("selectCountry");
        selectCountry.onchange=function () {

            selectedCountryText=selectedCountry.options[selectedCountry.selectedIndex].value;
            $("#dataTableBody tr").remove();
            searchCityAutoComplateArr(selectedCountryText);
            getTableData("GET","api/queryData?city=&country="+selectedCountryText);

            var rows=dataTableBody.getElementsByTagName("tr");
                for(var i=0;i<rows.length;i++){
                rows[i].onclick=function () {
                index_Row=$(this).index();
                oldData=rows[index_Row].cells[0].innerHTML;
                oldName=rows[index_Row].cells[1].innerHTML;
                oldCity=rows[index_Row].cells[2].innerHTML;
                oldCountry=rows[index_Row].cells[3].innerHTML;


                alert(oldName+oldCity+oldCountry+oldData+"Değiştirilecek");


                modal.style.display = "block";

            }
        }

        }

        function deleteWhiteSpace(id) {
            return id.replace(/ /g,'');
        }








        function getTableData(httpMethod,url) {
                    $.ajax({
                type: httpMethod,
                url:  url,
                async: false,
                success: function (data) {

                    var userDataTableReference = document.getElementById("userDataTable").getElementsByTagName('tbody')[0];
                    for (var i = 0; i < data.length; i++) {
                        var singleData = data[i];

                        var newRow = userDataTableReference.insertRow(userDataTableReference.rows.length);

                        var personDataCell=newRow.insertCell(0);
                        var nameCell = newRow.insertCell(1);
                        var cityCell = newRow.insertCell(2);
                        var countryCell = newRow.insertCell(3);


                        var pesondataValue=document.createTextNode(singleData.person_data);
                        var nameValue = document.createTextNode(singleData.person_name);
                        var cityValue = document.createTextNode(singleData.city_name);
                        var countryValue = document.createTextNode(singleData.country_name);

                        personDataCell.appendChild(pesondataValue);
                        nameCell.appendChild(nameValue);
                        cityCell.appendChild(cityValue);
                        countryCell.appendChild(countryValue);









                    }

                }
            });
        }



            function comboboxFill() {
                var country_list=[];
                    $.ajax({
                type: "GET",
                url:  "api/getAll",
                async: false,
                success: function (data) {

                    for (var i = 0; i < data.length; i++) {

                        country_list.push(data[i]['country_name']);
                        city_list.push(data[i]['city_name']);

                    }
                        var cleanCountryList=cleanDuplicatesArray(country_list);
                        clean_city_list=cleanDuplicatesArray(city_list);
                        autoComplateUpdate();
                        selectItemAddOption(cleanCountryList,"selectCountry");

                }

            });}


            function cleanDuplicatesArray(array) {
                var arr = [];
                for(var i = 0; i < array.length; i++) {
                if(!arr.includes(array[i])) {
                arr.push(array[i]);
                    }
                }
                return arr;
             }



            function deleteSelectOption(id) {
                var select = document.getElementById(id);
                var length = select.options.length;
                for (i = 0; i < length; i++) {
                     select.options[i] = null;
                }
            }

            function selectItemAddOption(optionList,tagId) {
                    for (var j = 0 ; j < optionList.length ; j++ ) {

                            $('#'+tagId).append($('<option>', {
                                value: optionList[j],
                                text: optionList[j],


                            }));

                        }

            }


            function autoComplateUpdate(){
              $( function() {
                $( "#inputCity" ).autocomplete({
                  source: clean_city_list
                });
              } );
              }




            function searchCityAutoComplateArr(city) {
                city_list=[];
                clean_city_list=[];


                    $.ajax({
                type: "GET",
                url:  "api/queryData/?city=&country="+city,
                async: false,
                success: function (data) {

                    for (var i = 0; i < data.length; i++) {
                        city_list.push(data[i]['city_name']);

                    }
                        clean_city_list=cleanDuplicatesArray(city_list);
                        autoComplateUpdate();

                }


            });

            }

            var inputCity=document.getElementById("inputCity")
            inputCity.onchange=function () {
                    var selectedCountry_text=document.getElementById("selectCountry").options[selectedCountry.selectedIndex].value
                    // var selectedCity_text=inputCity.value;
                    selectedCity_text=inputCity.value;
                    $("#dataTableBody tr").remove();
                    getTableData("GET","api/queryData?city="+selectedCity_text+"&country="+selectedCountry_text);


                    var rows=dataTableBody.getElementsByTagName("tr");
                        for(var i=0;i<rows.length;i++){
                            rows[i].onclick=function () {
                            index_Row=$(this).index();

                            oldData=rows[index_Row].cells[0].innerHTML;
                            oldName=rows[index_Row].cells[1].innerHTML;
                            oldCity=rows[index_Row].cells[2].innerHTML;
                            oldCountry=rows[index_Row].cells[3].innerHTML;


                            alert(oldName+oldCity+oldCountry+oldData+"Değiştirilecek");


                            modal.style.display = "block";

                                }
                             }




            }



















