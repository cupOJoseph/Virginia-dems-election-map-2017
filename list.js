
for (var key in candidates) {
    var Ltwitterlink = "https://twitter.com/" + candidates[key]["Twitter"];
    var Lsitelink = candidates[key]["Website"];
    var Lfacebooklink = candidates[key]["Facebook"];
    var Lfirst = candidates[key]["First"];
    var Llast = candidates[key]["Last"];
    var Limg_link = candidates[key]["Photo"];

    var Lchallenger;

    if(candidates[key]["chal"] == "c"){
        Lchallenger = "Challenger";
    }else{
        Lchallenger = "Incumbent";
    }

    var list_element = `
    <div id="can1" class="col list_el">

      <div class="district_name" align="center">
          <h3>${Lfirst} ${Llast} - District ${key}</h3>
          <h4>Democratic ${Lchallenger}</h4>
      </div>
      <div class="row">
          <div class="col" align="center">
              <img class="sm_candidate_img" src="${Limg_link}" alt="No image available.">
          </div>
          <div class="col">
              <a href="${Lsitelink}"><button class="link_btn">Website</button></a>
              <a href="${Lfacebooklink}"><button class="link_btn">Facebook</button></a>
              <a href="${Ltwitterlink}"><button class="link_btn">Twitter</button></a>
          </div>


      </div>

   </div>
   <hr>`;

     //if the name is long the lonks will jump down a line. hack fix
     /*if (key == 72 || key == 62) {
         list_element = `
         <div id="can${key}" class="col list_el">

             <div class="holder">    <h3>District ${key}</h3></div>
                <img class="sm_candidate_img" src="${Limg_link}" alt="No image available.">
                <h3 ><span id="Lour_candidate_is">${Lfirst} ${Llast} ${Lchallenger}</span></h3>
                <a href="${Lsitelink}" target="_blank" class="prim">Website</a> | <a href="${Lfacebooklink}" target="_blank" class="prim">Facebook</a> |
                   <a href="${Ltwitterlink}" target="_blank" class="prim">Twitter</a>

                   <hr>
          </div>`;
     }*/


     //sort list by challengers first. And then Incumbents.
     if(candidates[key]["chal"] == "c"){
         $("#challenger-list").append(list_element);
     }else{
         $("#incumbent-list").append(list_element);
     }

}
