
for (var key in candidates) {
    var Ltwitterlink = "https://twitter.com/" + candidates[key]["Twitter"];
    var Lsitelink = candidates[key]["Website"];
    var Lfacebooklink = candidates[key]["Facebook"];
    var Lfirst = candidates[key]["First"];
    var Llast = candidates[key]["Last"];
    var Limg_link = candidates[key]["Photo"];



    var list_element = `
    <h3  > District ${key}</h3>
    <div class="col">
       <br>
     <h1 ><span id="Lour_candidate_is">${Lfirst} ${Llast}</span></h1>

         <div >
             <img id="candidate_img" src="${Limg_link}" alt="No image available.">
        </div>

        <div class="candidate-info"> <span  class="candidate-website"><a href="${Lsitelink}" target="_blank" class="prim">Website</a></span> <span class="candidate-facebook"><a href="${Lfacebooklink}" target="_blank" class="prim">Facebook</a></span> <span class="candidate-twitter">
           <a href="${Ltwitterlink}" target="_blank" class="prim">Twitter</a></span>
       </div>
       <hr>
    </div>`;

    console.log("made a thing: \n" + list_element );

    $("#can-list").append(list_element);
}
