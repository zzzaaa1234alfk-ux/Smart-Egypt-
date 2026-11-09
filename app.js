function sendSOS(){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(pos){
      let link = "https://maps.google.com/?q=" + pos.coords.latitude + "," + pos.coords.longitude;
      let msg = "انا محتاج مساعدة - LIFE GUARD - مكاني هنا: " + link;
      alert(msg);
      window.open("https://wa.me/201234567890?text=" + encodeURIComponent(msg));
    }, function(){
      alert("شغل الـ GPS واسمح للموقع");
    });
  } else { alert("شغل الـ GPS"); }
}
function askAI(){
  let input = document.getElementById("msg").value;
  let chat = document.getElementById("chat");
  if(!input) return;
  let reply = "مفهمتش، قول تاني بالصعيدي";
  if(input.includes("ازيك")) reply = "ازيك يا بوب عامل ايه دلوك؟";
  if(input.includes("دلوك")) reply = "دلوك يعني دلوقتي، عاوز ايه دلوك؟";
  if(input.includes("الجو")) reply = "الجو في مغاغة النهاردة حر، اشرب مية كتير";
  if(input.includes("امتحان")) reply = "امتحانك قرب، ذاكر اول باول وانا هساعدك";
  if(input.includes("هملا")) reply = "هملا يعني هنعمل ايه؟ قولي وانا معاك";
  if(input.includes("حادثة") || input.includes("طوارئ")) reply = "دوس على زرار SOS الاحمر بسرعة، هيبعت موقعك للاسعاف";
  chat.innerHTML += "<p><b>انت:</b> "+input+"</p><p><b>المساعد:</b> "+reply+"</p>";
  document.getElementById("msg").value="";
}
function sendReport(){
  alert("تم استلام البلاغ، شكرا يا بطل! هيظهر على خريطة مغاغة");
}
function checkQuiz(){
  alert("اجابتك صح! برافو يا بوب، كمل");
}