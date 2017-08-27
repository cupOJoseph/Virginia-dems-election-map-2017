
for (var key in candidates) {
    var Ltwitterlink = "https://twitter.com/" + candidates[key]["Twitter"];
    var Lsitelink = candidates[key]["Website"];
    var Lfacebooklink = candidates[key]["Facebook"];
    var Lfirst = candidates[key]["First"];
    var Llast = candidates[key]["Last"];
    var Limg_link = candidates[key]["Photo"];

    var Lchallenger;

    if(candidates[key]["chal"] == "c"){
        Lchallenger = "(Challenger)";
    }else{
        Lchallenger = "(Incumbent)";
    }

    var list_element = `
    <div id="can${key}" class="col list_el">

        <div class="holder">    <h3>District ${key}</h3></div>
           <img id="sm_candidate_img" src="${Limg_link}" alt="No image available.">
           <h3 ><span id="Lour_candidate_is">${Lfirst} ${Llast} ${Lchallenger}</span></h3>
           <span  class="candidate-website"><a href="${Lsitelink}" target="_blank" class="prim">Website</a></span> <span class="candidate-facebook"><a href="${Lfacebooklink}" target="_blank" class="prim">Facebook</a></span> <span class="candidate-twitter">
              <a href="${Ltwitterlink}" target="_blank" class="prim">Twitter</a></span>

              <hr>
     </div>`;


    $("#can-list").append(list_element);
}
