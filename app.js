
function toggleMenu() {
  const nav = document.getElementById("navLinks");
  if (nav) nav.classList.toggle("show");
}

document.addEventListener("DOMContentLoaded", function () {
  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(link => {
    if (link.getAttribute("href") === current) {
      link.classList.add("active");
    }
  });

  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    navigator.serviceWorker.register("./service-worker.js")
      .catch(error => console.log("Service Worker:", error));
  }
});

function showMessage(id, message) {
  const box = document.getElementById(id);
  if (box) box.textContent = message;
}

function smartReply() {
  const input = document.getElementById("question");
  const chat = document.getElementById("chatBox");
  if (!input || !chat) return;

  const question = input.value.trim();
  if (!question) {
    input.focus();
    return;
  }

  const user = document.createElement("div");
  user.className = "chat-msg user";
  user.textContent = "أنت: " + question;
  chat.appendChild(user);

  const q = question.toLowerCase();
  let answer = "شكراً لسؤالك! أنا المساعد التجريبي لمنصة SMART EGYPT. يمكنك سؤالي عن التعليم أو الزراعة أو الصحة أو التكنولوجيا أو الحماية.";

  if (q.includes("مرحبا") || q.includes("السلام") || q.includes("اهلا")) {
    answer = "أهلاً بك في SMART EGYPT! كيف يمكنني مساعدتك؟";
  } else if (q.includes("زراع")) {
    answer = "الزراعة الذكية تعتمد على ترشيد المياه ومراقبة التربة واستخدام التقنيات الحديثة. استشر مختصاً زراعياً بشأن المحاصيل والأدوية.";
  } else if (q.includes("تعليم") || q.includes("دراس") || q.includes("مذاكر")) {
    answer = "لتحسين دراستك، قسّم الدرس إلى أجزاء صغيرة، واكتب ملخصاً، ثم اختبر نفسك بالأسئلة.";
  } else if (q.includes("صحة") || q.includes("صحي")) {
    answer = "اهتم بالنوم الجيد والغذاء المتوازن والنشاط البدني. هذه معلومات عامة وليست تشخيصاً أو بديلاً عن الطبيب.";
  } else if (q.includes("حماي") || q.includes("كلمة مرور") || q.includes("اختراق")) {
    answer = "لحماية حساباتك، استخدم كلمة مرور قوية ومختلفة لكل حساب، وفعل المصادقة الثنائية، ولا تشارك رموز التحقق.";
  } else if (q.includes("مصر") || q.includes("مدينة")) {
    answer = "يمكن للتكنولوجيا أن تساعد المدن المصرية من خلال الخدمات الرقمية، وترشيد الطاقة، وتحسين إدارة المرور والمياه.";
  } else if (q.includes("شكرا")) {
    answer = "العفو! يسعدنا وجودك في SMART EGYPT.";
  }

  const bot = document.createElement("div");
  bot.className = "chat-msg bot";
  bot.textContent = "المساعد: " + answer;
  chat.appendChild(bot);

  input.value = "";
  chat.scrollTop = chat.scrollHeight;
}

function calculateWater() {
  const area = Number(document.getElementById("area")?.value);
  const amount = Number(document.getElementById("waterAmount")?.value);

  if (!Number.isFinite(area) || !Number.isFinite(amount) || area <= 0 || amount < 0) {
    showMessage("waterResult", "أدخل مساحة صحيحة وكمية مياه صحيحة.");
    return;
  }

  const result = amount / area;
  showMessage("waterResult", "متوسط كمية المياه لكل متر مربع: " + result.toFixed(2) + " وحدة.\nهذه عملية حسابية فقط وليست توصية بري.");
}

function checkPassword() {
  const password = document.getElementById("passwordCheck")?.value || "";
  const result = document.getElementById("passwordResult");
  if (!result) return;

  if (!password) {
    result.textContent = "اكتب كلمة مرور تجريبية للفحص.";
    return;
  }

  let score = 0;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  let level = ["ضعيفة جداً", "ضعيفة", "متوسطة", "جيدة", "قوية", "قوية جداً"][score];
  result.textContent = "التقييم التقريبي: " + level +
    "\nلا يتم إرسال كلمة المرور إلى أي مكان. لا تستخدم كلمة مرورك الحقيقية في هذا الفحص التجريبي.";
}

function saveNote() {
  const field = document.getElementById("noteText");
  const result = document.getElementById("noteResult");
  if (!field || !result) return;

  const note = field.value.trim();
  if (!note) {
    result.textContent = "اكتب ملاحظتك أولاً.";
    return;
  }

  try {
    localStorage.setItem("smartEgyptNote", note);
    result.textContent = "تم حفظ الملاحظة على هذا الجهاز.";
  } catch (e) {
    result.textContent = "تعذر الحفظ على هذا الجهاز.";
  }
}

function loadNote() {
  const field = document.getElementById("noteText");
  if (!field) return;
  try {
    field.value = localStorage.getItem("smartEgyptNote") || "";
  } catch (e) {}
}

document.addEventListener("DOMContentLoaded", loadNote);
