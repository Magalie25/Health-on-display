const pdfList = [
    // Panneaux 1
    { id: "pdf001", title: "No_9_Feeding_Babies_and_Young_Children", url: "https://www.spc.int/digitallibrary/get/jyhih", category: "Family and health /La famille en santé", decade: "2010s", theme: "family" },
    { id: "pdf002", title: "Family and Health and Healthy living display pannel", url: "https://www.spc.int/digitallibrary/get/utkna", category: "Healthy Living/ Hygiène de vie", decade: "2010s", theme: "healthy" },
    { id: "pdf003", title: "A Child when we are ready", url: "https://www.spc.int/digitallibrary/get/meazi", category: "Healthy Living/ Hygiène de vie", decade: "2010s", theme: "healthy" },
    { id: "pdf004", title: "Affiche MNT (1) - This is how diabetes starts", url: "https://www.spc.int/digitallibrary/get/x63ms", category: "Healthy Living/ Hygiène de vie", decade: "2010s", theme: "healthy" },
    { id: "pdf005", title: "Affiche MNT (2) - Don't give in to diabetes", url: "https://www.spc.int/digitallibrary/get/sbnwo", category: "Healthy Living/ Hygiène de vie", decade: "2010s", theme: "healthy" },
    { id: "pdf006", title: "Affiche MNT (4) - Don't give in to diabetes", url: "https://www.spc.int/digitallibrary/get/9gk5c", category: "Healthy Living/ Hygiène de vie", decade: "2010s", theme: "healthy" },
    { id: "pdf007", title: "Akisalo omw uochow_OL", url: "https://www.spc.int/digitallibrary/get/j7px4", category: "Healthy Living/ Hygiène de vie", decade: "2010s", theme: "healthy" },
    { id: "pdf008", title: "Blood pressure check_ENG", url: "https://www.spc.int/digitallibrary/get/6h5wz", category: "Healthy Living/ Hygiène de vie", decade: "2010s", theme: "healthy" },
    { id: "pdf009", title: "Breast feeding our nation's best investment", url: "https://www.spc.int/digitallibrary/get/i9hg7", category: "Family and health /La famille en santé", decade: "2010s", theme: "family" },
    { id: "pdf010", title: "Chokukkun a nafoch_OL", url: "https://www.spc.int/digitallibrary/get/xfhjg", category: "Healthy Living/ Hygiène de vie", decade: "2010s", theme: "healthy" },
    { id: "pdf011", title: "Edik tonal eo am_OL", url: "https://www.spc.int/digitallibrary/get/j63vz", category: "Healthy Living/ Hygiène de vie", decade: "2010s", theme: "healthy" },
    { id: "pdf012", title: "Elap tonal eo am_OL", url: "https://www.spc.int/digitallibrary/get/mzr4k", category: "Family and health /La famille en santé", decade: "2010s", theme: "family" },
    { id: "pdf013", title: "Every child a wanted child_ENG", url: "https://www.spc.int/digitallibrary/get/2gmz2", category: "Family and health /La famille en santé", decade: "2010s", theme: "family" },
    { id: "pdf014", title: "Exercising regularly", url: "https://www.spc.int/digitallibrary/get/tz5qx", category: "Family and health /La famille en santé", decade: "2010s", theme: "family" },
    { id: "pdf015", title: "Good food for the baby - 1 to 3 months_ENG", url: "https://www.spc.int/digitallibrary/get/wt7ux", category: "Family and health /La famille en santé", decade: "2010s", theme: "family" },
    { id: "pdf016", title: "Good food for the baby - 4 to 6 months_ENG", url: "https://www.spc.int/digitallibrary/get/m7cxm", category: "Healthy Living/ Hygiène de vie", decade: "2010s", theme: "healthy" },
    { id: "pdf017", title: "Good food for the baby - 6 to 12 months_ENG", url: "https://www.spc.int/digitallibrary/get/3u8ps", category: "Healthy Living/ Hygiène de vie", decade: "2010s", theme: "healthy" },
    { id: "pdf018", title: "Jined Ilo Kobo_OL", url: "https://www.spc.int/digitallibrary/get/o7mwd", category: "Healthy Living/ Hygiène de vie", decade: "2010s", theme: "healthy" },
    { id: "pdf019", title: "Live Healthy Stay Healthy - Pacific guideline", url: "https://www.spc.int/digitallibrary/get/tq4zi", category: "Healthy Living/ Hygiène de vie", decade: "2010s", theme: "healthy" },
    { id: "pdf020", title: "Live Healthy Stay Healthy - Pacific guidelines for healthy living", url: "https://www.spc.int/digitallibrary/get/ozsjt", category: "Healthy Living/ Hygiène de vie", decade: "2010s", theme: "healthy" },
    { id: "pdf021", title: "Look fit, be healthy_ENG", url: "https://www.spc.int/digitallibrary/get/qy2xn", category: "Healthy Living/ Hygiène de vie", decade: "2010s", theme: "healthy" },
    { id: "pdf022", title: "Meeting_house_of_the_Pacific", url: "https://www.spc.int/digitallibrary/get/qzhad", category: "Healthy Living/ Hygiène de vie", decade: "2010s", theme: "healthy" },
    { id: "pdf023", title: "A child when we are ready", url: "https://www.spc.int/digitallibrary/get/meazi", category: "Family and health /La famille en santé", decade: "2010s", theme: "family" },
    { id: "pdf024", title: "Aron tararuaakin te aoraki ae te tioka", url: "https://www.spc.int/digitallibrary/get/7e5oz", category: "Family and health /La famille en santé", decade: "2010s", theme: "family" },
    { id: "pdf025", title: "Te amwarake ao te aoraki ae te tioka", url: "https://www.spc.int/digitallibrary/get/isq4t", category: "Family and health /La famille en santé", decade: "2010s", theme: "family" },
    { id: "pdf026", title: "Aron tutuoan raoiroin te aoraki ae te tioka", url: "https://www.spc.int/digitallibrary/get/divxc", category: "Family and health /La famille en santé", decade: "2010s", theme: "family" },
    { id: "pdf027", title: "Tararua raoi waem", url: "https://www.spc.int/digitallibrary/get/wgbv6", category: "Family and health /La famille en santé", decade: "2010s", theme: "family" },
    { id: "pdf028", title: "Tera te aroraki ae te tioka", url: "https://www.spc.int/digitallibrary/get/zz9kb", category: "Healthy Living/ Hygiène de vie", decade: "2010s", theme: "healthy" },
    { id: "pdf029", title: "Kanganga ake a kona n reke man te aoraki ar te tioka", url: "https://www.spc.int/digitallibrary/get/boxtw", category: "Healthy Living/ Hygiène de vie", decade: "2010s", theme: "healthy" },
    { id: "pdf030", title: "Prevent high blood pressure - Comment éviter l'hypertension_FR", url: "https://www.spc.int/digitallibrary/get/a73z9", category: "Healthy Living/ Hygiène de vie", decade: "2010s", theme: "healthy" },
    { id: "pdf098", title: "Kanikinaen te aoraki ae te tioka", url: "https://www.spc.int/digitallibrary/get/29zpz", category: "Healthy Living/ Hygiène de vie", decade: "2010s", theme: "healthy" },
    { id: "pdf032", title: "Prevent high blood pressure - Puipui e gagao toto tokoluga_OL", url: "https://www.spc.int/digitallibrary/get/6hzzg", category: "Healthy Living/ Hygiène de vie", decade: "2010s", theme: "healthy" },
    { id: "pdf033", title: "Prevent high blood pressure - Puipuia mai le mai suka_OL", url: "https://www.spc.int/digitallibrary/get/9zvuu", category: "Healthy Living/ Hygiène de vie", decade: "2010s", theme: "healthy" },
    { id: "pdf034", title: "Stay fit, be healthy, stay slim - Helt em i nambawan_OL", url: "https://www.spc.int/digitallibrary/get/zqghc", category: "Healthy Living/ Hygiène de vie", decade: "2010s", theme: "healthy" },
    { id: "pdf035", title: "Stay fit, be healthy, stay slim - Kia moua e tino malolo_OL", url: "https://www.spc.int/digitallibrary/get/tmskz", category: "Healthy Living/ Hygiène de vie", decade: "2010s", theme: "healthy"},
    { id: "pdf036", title: "Stay fit, be healthy, stay slim - Restez en bonne santé_FR", url: "https://www.spc.int/digitallibrary/get/ysg3r", category: "Healthy Living/ Hygiène de vie", decade: "2010s", theme: "healthy"},
    { id: "pdf037", title: "Stay fit, be healthy, stay slim_ENG", url: "https://www.spc.int/digitallibrary/get/4qag6", category: "Healthy Living/ Hygiène de vie", decade: "2010s", theme: "healthy"},
    { id: "pdf038", title: "Susu bilong mama em i nambawan_OL", url: "https://www.spc.int/digitallibrary/get/42jdi", category: "Healthy Living/ Hygiène de vie", decade: "2010s", theme: "healthy"},
    
    // Panneaux 2
    { id: "pdf099", title: "Infectious diseases display pannel", url: "https://www.spc.int/digitallibrary/get/v5vtz", category: "Infectious diseases/ Maladies infectieuses", decade: "2010s", theme: "infectious" },
    { id: "pdf031", title: "Dengue-Zika-Chikungunya-Recognising the symptoms", url: "https://www.spc.int/digitallibrary/get/cnc5f", category: "Infectious diseases/ Maladies infectieuses", decade: "2010s", theme: "infectious" },
    { id: "pdf039", title: "Conseils Sanitaires Guam FestPac French-1", url: "https://www.spc.int/digitallibrary/get/z36pn", category: "Infectious diseases/ Maladies infectieuses", decade: "2010s", theme: "infectious" },
    { id: "pdf040", title: "Lutte contre la Filariose", url: "https://www.spc.int/digitallibrary/get/fsrb3", category: "Infectious diseases/ Maladies infectieuses", decade: "2010s", theme: "infectious" },
    { id: "pdf041", title: "Contact Precautions", url: "https://www.spc.int/digitallibrary/get/2g67v", category: "Infectious diseases/ Maladies infectieuses", decade: "2010s", theme: "infectious" },
    { id: "pdf042", title: "Droplet Precautions", url: "https://www.spc.int/digitallibrary/get/x4jm3", category: "Infectious diseases/ Maladies infectieuses", decade: "2010s", theme: "infectious" },
    { id: "pdf043", title: "Airborne Precautions", url: "https://www.spc.int/digitallibrary/get/dpd8e", category: "Infectious diseases/ Maladies infectieuses", decade: "2010s", theme: "infectious" },
    { id: "pdf044", title: "Contact and Droplet Precautions", url: "https://www.spc.int/digitallibrary/get/94z4z", category: "Infectious diseases/ Maladies infectieuses", decade: "2010s", theme: "infectious" },
    { id: "pdf045", title: "Affiche-toux-FR", url: "https://www.spc.int/digitallibrary/get/tstva", category: "Infectious diseases/ Maladies infectieuses", decade: "2010s", theme: "infectious" },
    { id: "pdf046", title: "COUGH POSTER-Marshall_Is", url: "https://www.spc.int/digitallibrary/get/fzs9k", category: "Infectious diseases/ Maladies infectieuses", decade: "2020s", theme: "infectious" },
    { id: "pdf047", title: "COUGH POSTER-NAURU", url: "https://www.spc.int/digitallibrary/get/k5xpv", category: "Infectious diseases/ Maladies infectieuses", decade: "2010s", theme: "infectious" },
    { id: "pdf048", title: "Don't take the rik, wear a condom ill1_ENG", url: "https://www.spc.int/digitallibrary/get/4uokb", category: "Infectious diseases/ Maladies infectieuses", decade: "2010s", theme: "infectious" },
    { id: "pdf049", title: "Don't take the rik, wear a condom ill2_ENG", url: "https://www.spc.int/digitallibrary/get/9oqy6", category: "Infectious diseases/ Maladies infectieuses", decade: "2010s", theme: "infectious" },
    { id: "pdf050", title: "Tips to keep you safe and healthy during and after the mini games!", url: "https://www.spc.int/digitallibrary/get/9faim", category: "Infectious diseases/ Maladies infectieuses", decade: "2010s", theme: "infectious" },
    { id: "pdf051", title: "Me'a ke fai pea mole kita pikisia i te ta'i mahaki", url: "https://www.spc.int/digitallibrary/get/k47xq", category: "Infectious diseases/ Maladies infectieuses", decade: "2010s", theme: "infectious" },
    { id: "pdf052", title: "Fight the bite - Stop mosquito breeding_ENG", url: "https://www.spc.int/DigitalLibrary/Doc/PHD/Surveillance_and_response/Poster/poster_fight_the_bite_protect_yourself_against_mosquito_Tuvalu_Eng.html", category: "Infectious diseases/ Maladies infectieuses", decade: "2010s", theme: "infectious" },
    { id: "pdf053", title: "Posters coronavirus Futunien", url: "https://www.spc.int/digitallibrary/get/uarp6", category: "Infectious diseases/ Maladies infectieuses", decade: "2010s", theme: "infectious" },
    { id: "pdf054", title: "How to wash your hands Tuvalu", url: "https://www.spc.int/digitallibrary/get/dyvqz", category: "Infectious diseases/ Maladies infectieuses", decade: "2010s", theme: "infectious" },
    { id: "pdf055", title: "Lavez-vous les mains", url: "https://www.spc.int/digitallibrary/get/y5y5p", category: "Infectious diseases/ Maladies infectieuses", decade: "2010s", theme: "infectious" },
    { id: "pdf056", title: "Love with care (1)_ENG", url: "https://www.spc.int/digitallibrary/get/38nmi", category: "Infectious diseases/ Maladies infectieuses", decade: "2010s", theme: "infectious" },
    { id: "pdf057", title: "Ne mordez pas à l'hameçon, mettez un préservatif", url: "https://www.spc.int/digitallibrary/get/j6bnn", category: "Infectious diseases/ Maladies infectieuses", decade: "2010s", theme: "infectious" },
    { id: "pdf058", title: "Ne prenez pas de risque, mettez un préservatif", url: "https://www.spc.int/digitallibrary/get/5eihn", category: "Infectious diseases/ Maladies infectieuses", decade: "2010s", theme: "infectious" },
    { id: "pdf059", title: "Prevent black & white striped mosquito from breeding", url: "https://www.spc.int/digitallibrary/get/mdmke", category: "Infectious diseases/ Maladies infectieuses", decade: "2010s", theme: "infectious" },
    { id: "pdf060", title: "Risk of Aids for travelers", url: "https://www.spc.int/digitallibrary/get/cf97t", category: "Infectious diseases/ Maladies infectieuses", decade: "2010s", theme: "infectious" },
    { id: "pdf061", title: "Sequence for putting on PPE", url: "https://www.spc.int/digitallibrary/get/8tica", category: "Infectious diseases/ Maladies infectieuses", decade: "2010s", theme: "infectious" },
    { id: "pdf062", title: "Série illustration filariose", url: "https://www.spc.int/digitallibrary/get/4t4wk", category: "Infectious diseases/ Maladies infectieuses", decade: "2010s", theme: "infectious" },
    { id: "pdf063", title: "Pour gagner protège-toi VIH - Female Poster", url: "https://www.spc.int/digitallibrary/get/8oxbn", category: "Infectious diseases/ Maladies infectieuses", decade: "2020s", theme: "infectious" },
    { id: "pdf064", title: "Pour gagner protège-toi VIH - Male Poster", url: "https://www.spc.int/digitallibrary/get/zkq95", category: "Infectious diseases/ Maladies infectieuses", decade: "2020s", theme: "infectious" },
    { id: "pdf065", title: "Tips to prevent covid-19 FSM", url: "https://www.spc.int/digitallibrary/get/zxyaj", category: "Infectious diseases/ Maladies infectieuses", decade: "2020s", theme: "infectious" },
    { id: "pdf066", title: "Totokoa reken te aoraki_OL", url: "https://www.spc.int/digitallibrary/get/cv45s", category: "Infectious diseases/ Maladies infectieuses", decade: "2020s", theme: "infectious" },
    { id: "pdf067", title: "WASH YOUR HANDS- NIUEAN-2011", url: "https://www.spc.int/digitallibrary/get/gi6t3", category: "Infectious diseases/ Maladies infectieuses", decade: "2020s", theme: "infectious" },
    { id: "pdf068", title: "Wash your hands poster-Fiji", url: "https://www.spc.int/digitallibrary/get/tcya6", category: "Infectious diseases/ Maladies infectieuses", decade: "2020s", theme: "infectious" },
    { id: "pdf069", title: "You can't change your past but you can change your future", url: "https://www.spc.int/digitallibrary/get/72h95", category: "Infectious diseases/ Maladies infectieuses", decade: "2010s", theme: "infectious" },
    { id: "pdf070", title: "Zika & Pregnancy", url: "https://www.spc.int/digitallibrary/get/c9yhn", category: "Infectious diseases/ Maladies infectieuses", decade: "2010s", theme: "infectious" },
    
    // Panneaux 3
    { id: "pdf099", title: "Combatting addiction and eat well display pannel", url: "https://www.spc.int/digitallibrary/get/x6g2w", category: "Combatting addictions/ Combattre les addictions", decade: "2010s", theme: "addictions" },
    { id: "pdf071", title: "Don't smoke Poster", url: "https://www.spc.int/digitallibrary/get/9vgis", category: "Combatting addictions/ Combattre les addictions", decade: "2010s", theme: "addictions" },
    { id: "pdf072", title: "Alcohol is dangerous flipchart", url: "https://www.spc.int/digitallibrary/get/wey9v", category: "Combatting addictions/ Combattre les addictions", decade: "2010s", theme: "addictions" },
    { id: "pdf073", title: "Binge drinking destroys", url: "https://www.spc.int/digitallibrary/get/ir2rz", category: "Combatting addictions/ Combattre les addictions", decade: "2010s", theme: "addictions" },
    { id: "pdf074", title: "Alcohol is dangerous - Koe mena kelea e kava", url: "https://www.spc.int/digitallibrary/get/xokun", category: "Combatting addictions/ Combattre les addictions", decade: "2010s", theme: "addictions" },
    { id: "pdf075", title: "Alcohol is dangerous - L'alcool est dangereux", url: "https://www.spc.int/digitallibrary/get/3mqgg", category: "Combatting addictions/ Combattre les addictions", decade: "2010s", theme: "addictions" },
    { id: "pdf076", title: "Alcohol is dangerous - Rerevaki ni yaqona ni vavalagi", url: "https://www.spc.int/digitallibrary/get/hzovq", category: "Combatting addictions/ Combattre les addictions", decade: "2010s", theme: "addictions" },
    { id: "pdf077", title: "Alcohol is dangerous - ENG", url: "https://www.spc.int/digitallibrary/get/dx65r", category: "Combatting addictions/ Combattre les addictions", decade: "2010s", theme: "addictions" },
    { id: "pdf078", title: "Alcohol is dangerous_OL", url: "https://www.spc.int/digitallibrary/get/o74n9", category: "Combatting addictions/ Combattre les addictions", decade: "2010s", theme: "addictions" },
    { id: "pdf079", title: "Boardgame - Village", url: "https://www.spc.int/digitallibrary/get/9tzic", category: "Combatting addictions/ Combattre les addictions", decade: "2010s", theme: "addictions" },
    { id: "pdf080", title: "Casse-têtes d'hier, casse-vies d'aujourd'hui", url: "https://www.spc.int/digitallibrary/get/7guny", category: "Combatting addictions/ Combattre les addictions", decade: "2010s", theme: "addictions" },
    { id: "pdf081", title: "Drink less alcohol_ENG", url: "https://www.spc.int/digitallibrary/get/5ybva", category: "Combattre les addicions", decade: "2010s", theme: "addictions" },
    { id: "pdf082", title: "Food groups - Ai se meaai mai vasega e 3 i aso uma", url: "https://www.spc.int/digitallibrary/get/883oq", category: "Eat well/ Bien se nourrir", decade: "2010s", theme: "nutrition" },
    { id: "pdf083", title: "Fruit & Veg poster_Atoll Food - Healthy food", url: "https://www.spc.int/digitallibrary/get/gdxiv", category: "Eat well/ Bien se nourrir", decade: "2010s", theme: "nutrition" },
    { id: "pdf084", title: "Fruit & Veg poster_Kaikai bilong ples i nambawan_OL", url: "https://www.spc.int/digitallibrary/get/zjmp8", category: "Eat well/ Bien se nourrir", decade: "2010s", theme: "nutrition" },
    { id: "pdf085", title: "Grow more food around your house", url: "https://www.spc.int/digitallibrary/get/was84", category: "Eat well/ Bien se nourrir", decade: "2010s", theme: "nutrition" },
    { id: "pdf086", title: "Island Food - naturally the best", url: "https://www.spc.int/digitallibrary/get/6pucu", category: "Eat well/ Bien se nourrir", decade: "2010s", theme: "nutrition" },
    { id: "pdf087", title: "Ko te pia", url: "https://www.spc.int/digitallibrary/get/tjq25", category: "Combatting addictions/ Combattre les addictions", decade: "2010s", theme: "addictions" },
    { id: "pdf088", title: "My Healthy Meal", url: "https://www.spc.int/digitallibrary/get/m93za", category: "Eat well/ Bien se nourrir", decade: "2010s", theme: "nutrition" },
    { id: "pdf089", title: "Pacific Nutrition Bingo", url: "https://www.spc.int/digitallibrary/get/4dte8", category: "Eat well/ Bien se nourrir", decade: "2010s", theme: "nutrition" },
    { id: "pdf090", title: "Prevent lung cancer_ENG", url: "https://www.spc.int/digitallibrary/get/zzngp", category: "Combatting addictions/ Combattre les addictions", decade: "2010s", theme: "addictions" },
    { id: "pdf091", title: "Smoking kills banner Nauru", url: "https://www.spc.int/digitallibrary/get/znvhe", category: "Combatting addictions/ Combattre les addictions", decade: "2010s", theme: "addictions" },
    { id: "pdf092", title: "What's in my food, hidden fat", url: "https://www.spc.int/digitallibrary/get/tsjnp", category: "Eat well/ Bien se nourrir", decade: "2010s", theme: "nutrition" },
    { id: "pdf093", title: "What's in my food, hidden salt", url: "https://www.spc.int/digitallibrary/get/24vei", category: "Eat well/ Bien se nourrir", decade: "2010s", theme: "nutrition" },
    { id: "pdf094", title: "What's in my food, hidden sugar", url: "https://www.spc.int/digitallibrary/get/tw9mw", category: "Eat well/ Bien se nourrir", decade: "2010s", theme: "nutrition" },
    { id: "pdf095", title: "TABAC français", url: "https://www.spc.int/digitallibrary/get/tr9ti", category: "Combatting addictions/ Combattre les addictions", decade: "2010s", theme: "addictions" },
    { id: "pdf096", title: "TABAC futunien", url: "https://www.spc.int/digitallibrary/get/tt4az", category: "Combatting addictions/ Combattre les addictions", decade: "2010s", theme: "addictions" },
    { id: "pdf097", title: "TABAC wallisien", url: "https://www.spc.int/digitallibrary/get/ji2nf", category: "Combatting addictions/ Combattre les addictions", decade: "2010s", theme: "addictions" }
];

// state
let selectedDecade = 'all';
let selectedTheme = 'all';
let searchTerm = '';

function buildFilterButtonHandlers() {
    document.querySelectorAll('#decadeFilters .filter-btn').forEach(btn=>{
        btn.addEventListener('click', ()=>{
            // toggle active
            document.querySelectorAll('#decadeFilters .filter-btn').forEach(b=>b.classList.remove('active'));
            btn.classList.add('active');
            selectedDecade = btn.dataset.decade;
            applyFilters();
        });
    });
    document.querySelectorAll('#themeFilters .filter-btn').forEach(btn=>{
        btn.addEventListener('click', ()=>{
            document.querySelectorAll('#themeFilters .filter-btn').forEach(b=>b.classList.remove('active'));
            btn.classList.add('active');
            selectedTheme = btn.dataset.theme;
            applyFilters();
        });
    });
    
    const input = document.getElementById('searchInput');
    if (input) {
        input.addEventListener('input', e=>{
            searchTerm = e.target.value.trim().toLowerCase();
            applyFilters();
        });
    }
    const clearBtn = document.getElementById('clearSearch');
    if (clearBtn) {
        clearBtn.addEventListener('click', ()=>{
            const inp = document.getElementById('searchInput');
            if (inp) inp.value = '';
            searchTerm = '';
            applyFilters();
        });
    }
}

/**
* Initialiser la galerie de PDFs avec prévisualisation iframe
*/
function initPdfGallery() {
    const gallery = document.getElementById('pdfGallery');
    gallery.innerHTML = '';
    pdfList.forEach((pdf, index) => {
        const card = document.createElement('div');
        card.className = 'pdf-card';
        // dataset for filters & search
        card.dataset.decade = pdf.decade || 'unknown';
        card.dataset.theme = pdf.theme || 'unknown';
        card.dataset.id = pdf.id || (`pdf${index}`);
        card.dataset.title = (pdf.title||'').toLowerCase();
        
        card.innerHTML = `
            <div class="pdf-preview-iframe">
                <div class="pdf-loading"></div>
                <iframe src="${pdf.url}#view=FitH" title="${pdf.title}" loading="lazy"></iframe>
            </div>
            <div class="pdf-info">
                <h3>${pdf.title}</h3>
                <p>${pdf.category} – <small class="fr-text">${pdf.decade}</small><small class="en-text" style="display:none;">${pdf.decade}</small></p>
                <a href="javascript:openPdfViewer('${pdf.url}', '${pdf.title}')" class="pdf-link fr-text">
                    Voir le PDF
                </a>
                <a href="${pdf.url}" target="_blank" class="pdf-link external-link fr-text" style="background: var(--pantone-3125);">
                    Ouvrir dans un nouvel onglet
                </a>
            </div>
        `;
        gallery.appendChild(card);
    });
    
    // Attacher les gestionnaires de chargement pour les iframes
    attachIframeLoadHandlers();
    
    buildFilterButtonHandlers();
    applyFilters();
}

/**
* Attacher les gestionnaires d'événements pour les iframes
*/
function attachIframeLoadHandlers() {
    const pdfCards = document.querySelectorAll('.pdf-card .pdf-preview-iframe');
    
    pdfCards.forEach(previewContainer => {
        const iframe = previewContainer.querySelector('iframe');
        const loading = previewContainer.querySelector('.pdf-loading');
        
        if (iframe && loading) {
            // Timeout de sécurité
            const timeoutId = setTimeout(() => {
                loading.classList.add('hidden');
            }, 5000);
            
            // Événement de chargement
            iframe.addEventListener('load', function() {
                clearTimeout(timeoutId);
                loading.classList.add('hidden');
            });
            
            // Événement d'erreur
            iframe.addEventListener('error', function() {
                clearTimeout(timeoutId);
                loading.classList.add('hidden');
            });
        }
    });
}

/**
* Appliquer filtres et recherche
*/
function applyFilters() {
    const gallery = document.getElementById('pdfGallery');
    const cards = gallery.querySelectorAll('.pdf-card');
    cards.forEach(card=>{
        let show = true;
        if (selectedDecade !== 'all' && card.dataset.decade !== selectedDecade) show = false;
        if (selectedTheme !== 'all' && card.dataset.theme !== selectedTheme) show = false;
        if (searchTerm) {
            const inId = card.dataset.id && card.dataset.id.toLowerCase().includes(searchTerm);
            const inTitle = card.dataset.title && card.dataset.title.includes(searchTerm);
            if (!inId && !inTitle) show = false;
        }
        card.style.display = show ? 'block' : 'none';
    });
}

/**
* Ouvrir le visualiseur PDF (existant)
*/
function openPdfViewer(url, title) {
    const container = document.getElementById('pdfViewerContainer');
    const frame = document.getElementById('pdfFrame');
    const titleElement = document.getElementById('pdfTitle');
    
    titleElement.textContent = title;
    frame.src = url;
    container.style.display = 'flex';
    container.classList.add('fullscreen');
    document.body.style.overflow = 'hidden';
}

function closePdfViewer() {
    const container = document.getElementById('pdfViewerContainer');
    const frame = document.getElementById('pdfFrame');
    
    container.style.display = 'none';
    container.classList.remove('fullscreen');
    frame.src = '';
    document.body.style.overflow = 'auto';
}

// keyboard close
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePdfViewer();
});

// init
document.addEventListener('DOMContentLoaded', initPdfGallery);