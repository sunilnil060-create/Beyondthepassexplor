'use strict';
/* ── TICKER BAR ──────────────────────────────────────── */
(function () {
  const bar     = document.getElementById('tickerBar');
  const content = document.getElementById('tickerContent');
  if (!bar || !content) return;

  // duplicate items so the -50% loop is seamless regardless of content length
  content.innerHTML += content.innerHTML;
})();

/* ── ROLE HELPERS (shared across all pages) ─────────── */
  function currentUser() {
    try { return JSON.parse(sessionStorage.getItem('rnv_session') || 'null'); }
    catch { return null; }
  }
  function isLoggedIn() {
    return !!currentUser();
  }
  function isAdmin() {
    const u = currentUser();
    return !!u && u.role === 'admin';
  }
  // Expose globally so other pages (admin-dashboard.html etc.) can use them
  window.AuthHelpers = { currentUser, isLoggedIn, isAdmin };
/* ── DATA ────────────────────────────────────────────── */
const TOURS = [
 { id:1, origin:'india', badge:'Group Departure', title:'Bhutan Group Tour — Durga Puja Special', desc:'A fixed group departure covering Phuentsholing, Thimphu, Punakha and Paro — ideal for solo travelers, families or small groups who want to travel together.', img:'tour/p1.jpg', days:7, nights:6, people:'Up to 15', rating:4.8, reviews:52, includes:['Private/Group Vehicle','Hotel Stay (Twin Sharing)','Daily Breakfast & Dinner','SDF & Permits Assistance'],
      itinerary:[
        {day:'Day 1',title:'ARRIVAL AT BAGDOGRA AIRPORT / NJP RAILWAYSTATION – TRANSFER TO PHUENTSHOLING',desc:'Discover the best of the Andaman Islands with this 5 Nights 6 Days tour package by Denzong Leisure. From the historic Cellular Jail in Port Blair to the world-famous Radhanagar Beach in Havelock and the scenic attractions of Neil Island, this package combines adventure, relaxation, and natural beauty. With premium accommodations, cruise transfers, sightseeing tours, and personalized assistance included, it is an ideal choice for families, couples, and groups seeking a hassle-free Andaman vacation.'},
        {day:'Day 2',title:'Drive to Thimphu',desc:'After breakfast and completion of immigration formalities, you will be transferred to Thimphu (178 KMS / 06 HRS / 2134Mts /7000Fts), the capital of Bhutan. Thimphu lies in a beautiful valley, sprawling up a hillside on the west bank of the Thimphu Chhu River and has a total area of about 1,809 sq. kms. Evening at leisure. Be sure to sink your teeth into momo kopi (steam dumplings filled with finely chopped cabbage, onions, cheese and butter). Visitors can enjoy a relaxing walk in the valley. Overnight at Thimphu.'},
        {day:'Day 3',title:'DAY TRIP TO WANGDUE /PUNKAHA',desc:'After early breakfast drive (70 kms / 2 hrs) to Wangduephodrang, with a stop en route for tea at Dochu La Pass (3,100 meters), where on a clear day you can get spectacular views of the Himalayas. In Wangdue, stop at Mehsina village & visit Chime Lhakhang - The Temple of Fertility built in 15th century by Lama Drukpa Kinley. (This monk is popularly known as the Divine Madman for his philosophy, “Salvation through sex”), Chendebji chorten, Wangduephodrang Dzong, Punakha Dzong & Suspension Bridge. Later back to Thimphu. Overnight at Thimphu.'},
        {day:'Day 4',title:'HIMPHU CITY TOUR – TRANSFER TO PARO',desc:'After breakfast start Thimphu sightseeing visit the Indigenous hospital where traditional old art of healing is still practiced, Art & Craft School, National Library, Royal goldsmith workshop and Handicraft centers. Visit the Memorial Chorten built in the memory of the late King Jigme Dorji Wangchuck, 15th Century Changangkha monastery, Motithang mini zoo to see the rare "Takin" national animal of Bhutan and drive further down with good view of the Thimphu valley. Visit the new Drupthob nunnery temple. Later transfer to Paro. Its take approx 1.5hrs to reach.  Overnight stay at Paro.'},
        {day:'Day 5',title:'TIGER NEST HIKING OR: DAY TRIP TO CHELE LA PASS',desc:'After breakfast excursion to Taktshang Monastery (2 - 3hrs hike):  It is one of the most famous of Bhutan’s monasteries, perched on the side of a cliff 900m above the Paro valley floor. It is said that Guru Rinpoche arrived here on the back of a tigress and meditated at this monastery and hence it is called ‘Tiger’s Nest’. This site has been recognised as a most sacred place and visited by Shabdrung Ngawang Namgyal in 1646 and now visited by all Bhutanese at least once in their lifetime. On 19 April, 1998, a fire severely damaged the main structure of building but now this Bhutanese jewel has been restored to its original splendour'},
        {day:'Day 6',title:'PARO CITY TOUR - TRANSFER TO PHUENTSHOLING',desc:'After Breakfast check out from Paro hotel & start Paro City Tour visit the historic ruins of the Drukgyal Dzong, built in 1647.  Then proceed to Ta Dozong (National museum), Kyichu Lakhang & Ringpung Monastery. Check in at Paro Hotel. Later transfer to Phuentsholing for your return journey to India. Its take approx 5 hrs to reach. Evening free for leisure. Overnight stay at Phuentsholing.'},
        {day:'Day 7',title:'TRANSFER TO BAGDOGRA AIRPORT / NJP RAILWAY STATION',desc:'Transfer to Phuentsholing/airport for onward journey.'}
      ]
    },
    { id:2, origin:'india', badge:'Popular', title:'Bhutan Tour Package from Kolkata', desc:'A well-rounded Bhutan circuit covering Thimphu and Paro, designed for travelers flying or driving in from Kolkata.', img:'tour/p2.jpg', days:6, nights:5, people:'Up to 10', rating:4.7, reviews:41, includes:['Private Vehicle & Driver','Hotel Stay (Twin Sharing)','Daily Breakfast & Dinner','SDF & Permits Assistance'],
      itinerary:[
        {day:'Day 1',title:'Pick up from Hasimara. Transfer to Thimphu [170km / 05 Hrs drive]',desc:'For your Bhutan Honeymoon Tour, meet and greet upon arrival at Hasimara Railway Station or Paro Airport and transfer to Thimphu, the capital of Bhutan, which lies at an elevation of 2300 m. Visitors can enjoy a relaxing walk in the valley in the evening. Overnight at Hotel in Thimphu'},
        {day:'Day 2',title:'Thimphu - Sightseeing',desc:'After a sumptuous breakfast proceeds for morning sightseeing - visit the Indigenous Hospital where traditional old art of healing is still practiced, Art and Craft school, National library, Royal goldsmith workshop, and Handicraft centers. Afternoon visit the Memorial Chorten built in the memory of the late King Jigme Dorji Wangchuck, 15-century Changangkha monastery, Motithang mini zoo to see the rare "Takin" national animal of Bhutan and drive further down with a good view of the Thimphu Valley. Visit the new Drupthob nunnery temple and have free time in the market. Overnight at Hotel in Thimphu.'},
        {day:'Day 3',title:'Early morning transfer to Punakha / Wangdue Sightseeing [70 km–2.30 hrs drive]',desc:'Morning drive to Wangduephodrang, with a stop en route for tea at Dochu La Pass (3,100 meters), where on a clear day you can get spectacular views of the Himalayas. In Wangdue, stop at Mehsina village and visit Chime Lhakhang - The Temple of Fertility built in the 15th century by Lama Drukpa Kinley. (This monk is popularly known as the Devine madman for his philosophy, Salvation through sex). Afternoon drive to Punakha, the former capital of Bhutan visits Punakha Dzong, which is noteworthy both for being one of the most beautiful dzongs in Bhutan and also for having been built by the first Shabdrung in 1637. Overnight at Hotel in Punakha.'},
        {day:'Day 4',title:'Morning transfer to Paro [143 kms/4 hrs]. Half-Day Sightseeing at Paro',desc:'After breakfast transfer to Paro (Approx 2-4 hrs), covering some on-way sightseeing. Every turn on the way comes with a surprise and a scenic view of the mountain and nature. Visit the historic ruins of the Drukgyal Dzong, built-in 1647. Also visit Ta Dzong, one of the finest natural museums in South Asia. Rinpung Dzong which is in the same location as Ta Dzong, was built-in 1645 to defend the valley against Tibetan Invaders. Nya-Mey Zam or “the bridge with no fish” is the bridge that connects Paro Town to the dzong. It is one of the finest specimens in Bhutan and locals believe that if one sees a fish in the river, it is an ill omen. Paro main street features shops on both sides, all crammed with brasswares, silk, and cotton scarves, incense sticks, silver filigree jewelry, gho (Bhutanese National Dress for Men) which can be matched with elaborately embroidered boots, Kira (wrap-around sarong worn for Bhutanese Women) and prayer flags that one could string across any open space to seek blessings for loved ones and friends. Overnight at Hotel in Paro.'},
        {day:'Day 5',title:'Paro - Full Day Sightseeing',desc:'After breakfast drive 12kms north of Paro to visit Taktshang: or "Tiger’s Nest" which is one of the most famous places to visit in Bhutan and one of the holiest sites in Bhutan. It is perched on a steep granite cliff at 2950 meters overlooking northern Paro valley. The place is especially venerated because of its association with Guru Rimpoche and is believed that more merit is gained if we meditate even for a minute in Tasktshang than many months in other places. It will take about 3-5hrs to hike to the monastery (One way ). Overnight at Hotel in Paro'},
        {day:'Day 6',title:'Drop to Hasimara Railway Station (150 kms/2.30 hrs) - Onward Connection',desc:'After breakfast start for Hasimara. Tour ends with sweet memories.'}
      ]
    },
    { id:3, origin:'india', badge:'Popular', title:'Bhutan Tour Package from Mumbai', desc:'The classic Thimphu–Paro circuit, tailored for travelers connecting via Mumbai.', img:'tour/p3.webp', days:6, nights:5, people:'Up to 10', rating:4.7, reviews:37, includes:['Private Vehicle & Driver','Hotel Stay (Twin Sharing)','Daily Breakfast & Dinner','SDF & Permits Assistance'],
      itinerary:[
  {day:'Day 1',title:'Arrival & Capital Transfer',desc:'For your Bhutan Honeymoon Tour, meet and greet upon arrival at Hasimara Railway Station or Paro Airport and transfer to Thimphu, the capital of Bhutan, which lies at an elevation of 2300 m. Visitors can enjoy a relaxing walk in the valley in the evening. Overnight at Hotel in Thimphu'},
  {day:'Day 2',title:'Thimphu Full-Day Sightseeing',desc:'After a sumptuous breakfast proceeds for morning sightseeing - visit the Indigenous Hospital where traditional old art of healing is still practiced, Art and Craft school, National library, Royal goldsmith workshop, and Handicraft centers. Afternoon visit the Memorial Chorten built in the memory of the late King Jigme Dorji Wangchuck, 15-century Changangkha monastery, Motithang mini zoo to see the rare "Takin" national animal of Bhutan and drive further down with a good view of the Thimphu Valley. Visit the new Drupthob nunnery temple and have free time in the market. Overnight at Hotel in Thimphu.'},
  {day:'Day 3',title:'Scenic Drive to Wangduephodrang & Punakha',desc:'Morning drive to Wangduephodrang, with a stop en route for tea at Dochu La Pass (3,100 meters), where on a clear day you can get spectacular views of the Himalayas. In Wangdue, stop at Mehsina village and visit Chime Lhakhang - The Temple of Fertility built in the 15th century by Lama Drukpa Kinley. (This monk is popularly known as the Devine madman for his philosophy, Salvation through sex). Afternoon drive to Punakha, the former capital of Bhutan visits Punakha Dzong, which is noteworthy both for being one of the most beautiful dzongs in Bhutan and also for having been built by the first Shabdrung in 1637. Overnight at Hotel in Punakha.'},
  {day:'Day 4',title:'Transfer to Paro & Town Exploration',desc:'After breakfast transfer to Paro (Approx 2-4 hrs), covering some on-way sightseeing. Every turn on the way comes with a surprise and a scenic view of the mountain and nature. Visit the historic ruins of the Drukgyal Dzong, built-in 1647. Also visit Ta Dzong, one of the finest natural museums in South Asia. Rinpung Dzong which is in the same location as Ta Dzong, was built-in 1645 to defend the valley against Tibetan Invaders. Nya-Mey Zam or “the bridge with no fish” is the bridge that connects Paro Town to the dzong. It is one of the finest specimens in Bhutan and locals believe that if one sees a fish in the river, it is an ill omen. Paro\'s main street features shops on both sides, all crammed with brasswares, silk, and cotton scarves, incense sticks, silver filigree jewelry, gho (Bhutanese National Dress for Men) which can be matched with elaborately embroidered boots, Kira (wrap-around sarong worn for Bhutanese Women) and prayer flags that one could string across any open space to seek blessings for loved ones and friends. Overnight at Hotel in Paro.'},
  {day:'Day 5',title:'Tiger’s Nest (Taktshang) Monastery Hike',desc:'After breakfast drive 12kms north of Paro to visit Taktshang: or "Tiger’s Nest" which is one of the most famous places to visit in Bhutan and one of the holiest sites in Bhutan. It is perched on a steep granite cliff at 2950 meters overlooking northern Paro valley. The place is especially venerated because of its association with Guru Rimpoche and is believed that more merit is gained if we meditate even for a minute in Tasktshang than many months in other places. It will take about 3-5hrs to hike to the monastery (One way ). Overnight at Hotel in Paro'},
  {day:'Day 6',title:'Departure',desc:'After breakfast start for Hasimara. Tour ends with sweet memories.'}
]
    },
    { id:4, origin:'india', badge:'Popular', title:'Bhutan Tour Package from Bangalore', desc:'A comfortable Thimphu–Punakha–Paro circuit designed for travelers from Bangalore.', img:'tour/p4.jpg', days:6, nights:5, people:'Up to 10', rating:4.6, reviews:29, includes:['Private Vehicle & Driver','Hotel Stay (Twin Sharing)','Daily Breakfast & Dinner','SDF & Permits Assistance'],
      itinerary:[
  {
    day: 'Day 01',
    title: 'Pick up from Hasimara. Transfer to Thimphu [170km / 05 Hrs drive]',
    desc: 'For your Bhutan Honeymoon Tour, meet and greet upon arrival at Hasimara Railway Station or Paro Airport and transfer to Thimphu, the capital of Bhutan, which lies at an elevation of 2300 m. Visitors can enjoy a relaxing walk in the valley in the evening. Overnight at Hotel in Thimphu'
  },
  {
    day: 'Day 02',
    title: 'Thimphu - Sightseeing',
    desc: 'After a sumptuous breakfast proceeds for morning sightseeing - visit the Indigenous Hospital where traditional old art of healing is still practiced, Art and Craft school, National library, Royal goldsmith workshop, and Handicraft centers. Afternoon visit the Memorial Chorten built in the memory of the late King Jigme Dorji Wangchuck, 15-century Changangkha monastery, Motithang mini zoo to see the rare "Takin" national animal of Bhutan and drive further down with a good view of the Thimphu Valley. Visit the new Drupthob nunnery temple and have free time in the market. Overnight at Hotel in Thimphu.'
  },
  {
    day: 'Day 03',
    title: 'Early morning transfer to Punakha / Wangdue Sightseeing [70 km–2.30 hrs drive]',
    desc: 'Morning drive to Wangduephodrang, with a stop en route for tea at Dochu La Pass (3,100 meters), where on a clear day you can get spectacular views of the Himalayas. In Wangdue, stop at Mehsina village and visit Chime Lhakhang - The Temple of Fertility built in the 15th century by Lama Drukpa Kinley. (This monk is popularly known as the Devine madman for his philosophy, Salvation through sex). Afternoon drive to Punakha, the former capital of Bhutan visits Punakha Dzong, which is noteworthy both for being one of the most beautiful dzongs in Bhutan and also for having been built by the first Shabdrung in 1637. Overnight at Hotel in Punakha.'
  },
  {
    day: 'Day 04',
    title: 'Morning transfer to Paro [143 kms/4 hrs]. Half-Day Sightseeing at Paro',
    desc: 'After breakfast transfer to Paro (Approx 2-4 hrs), covering some on-way sightseeing. Every turn on the way comes with a surprise and a scenic view of the mountain and nature. Visit the historic ruins of the Drukgyal Dzong, built-in 1647. Also visit Ta Dzong, one of the finest natural museums in South Asia. Rinpung Dzong which is in the same location as Ta Dzong, was built-in 1645 to defend the valley against Tibetan Invaders. Nya-Mey Zam or “the bridge with no fish” is the bridge that connects Paro Town to the dzong. It is one of the finest specimens in Bhutan and locals believe that if one sees a fish in the river, it is an ill omen. Paro\'s main street features shops on both sides, all crammed with brasswares, silk, and cotton scarves, incense sticks, silver filigree jewelry, gho (Bhutanese National Dress for Men) which can be matched with elaborately embroidered boots, Kira (wrap-around sarong worn for Bhutanese Women) and prayer flags that one could string across any open space to seek blessings for loved ones and friends. Overnight at Hotel in Paro.'
  },
  {
    day: 'Day 05',
    title: 'Paro - Full Day Sightseeing',
    desc: 'After breakfast drive 12kms north of Paro to visit Taktshang: or "Tiger’s Nest" which is one of the most famous places to visit in Bhutan and one of the holiest sites in Bhutan. It is perched on a steep granite cliff at 2950 meters overlooking northern Paro valley. The place is especially venerated because of its association with Guru Rimpoche and is believed that more merit is gained if we meditate even for a minute in Tasktshang than many months in other places. It will take about 3-5hrs to hike to the monastery (One way ). Overnight at Hotel in Paro'
  },
  {
    day: 'Day 06',
    title: 'Drop to Hasimara Railway Station (150 kms/2.30 hrs) - Onward Connection',
    desc: 'After breakfast start for Hasimara. Tour ends with sweet memories.'
  }
]
    },
    { id:5, origin:'india', badge:'Best Seller', title:'Bhutan Special 8-Day Group Package', desc:'An extended group itinerary covering Phuentsholing, Thimphu, Punakha and Paro at a relaxed pace.', img:'tour/p5.png', days:8, nights:7, people:'Up to 15', rating:4.8, reviews:58, includes:['Group/Private Vehicle','Hotel Stay (Twin Sharing)','Daily Breakfast & Dinner','SDF & Permits Assistance'],
      itinerary:[
  {
    day: 'DAY 1',
    title: 'ARRIVAL AT BAGDOGARA / NJP –TRANSFER TO PHUENTSHOLING',
    desc: 'On arrival at Bagdogra Airport - meet and greet by our local representative - transferred to Phuentsholing (Approx 180km / 3-4hrs drive). Phuentsholing (298Mts / 977Fts) is a small town at the Indo-Bhutan border. Evening at your own leisure. Overnight at Phuentsholing.'
  },
  {
    day: 'DAY 2',
    title: 'PHUENTSHOLING –TRANSFER TO THIMPHU',
    desc: 'After breakfast you will be transfer to Thimphu (Approx 155km / 5hrs drive) via Chukha - Thimphu lies at an elevation of 2300m. Thimphu lies in a beautiful valley, sprawling up a hillside on the west bank of the Thimphu Chhu River and has a total area of about 1,809 sq. kms. Evening at your own leisure. Visitors can enjoy relaxing walk in the valley at evening. Be sure to sink your teeth into momo kopi, steam dumplings filled with finely chopped cabbage, onions, cheese and butter. Overnight at Thimphu.'
  },
  {
    day: 'DAY 3',
    title: 'THIMPHU CITY TOUR',
    desc: 'After breakfast go for Thimphu City Tour Covering -Art & Craft school, National Institute of Traditional Medicine, National library, Buddha Dordenma statue, Bhutan Simply Museum, Folk and Heritage Museum, BBS Tower, Motithang mini zoo to see the rare "Takin" national animal of Bhutan and drive further down with good view of the Thimphu valley. Visit the new Drupthob nunnery temple and free time in the market. Overnight at Thimphu.'
  },
  {
    day: 'DAY 4',
    title: 'THIMPHU – PUNAKHA/WANGDUE -VIA DOUCHALA PASS',
    desc: 'After breakfast day excursion to Punakha/Wangdue (Approx 70 kms / 2hrs) Enroot visit Simtokha Dzong proceed to Wangduephodrang, with a stop en-route for tea at Dochu La Pass (3,100 meters), where on a clear day you can get spectacular views of the Himalayas. In Wangdue Have your lunch and in afternoon drive to Punakha, the former capital of Bhutan, and visit Punakha Dzong (Optional and entry fees on direct payment basis) , which is noteworthy both for being one of the most beautiful dzongs in Bhutan and also for having been built by the first Shabdrung in 1637. Also visit the Punakha Suspension bridge - The second longest suspension bridge in Bhutan , its perche cover the Mo – chhu and Po Chhu river and is about 160-180meters in length –its one of the oldest bridge in the world that connects Punkaha Dzong to the rest of the valley - Evening back to Thimphu - Leisure - Overnight at Thimphu.'
  },
  {
    day: 'DAY 5',
    title: 'TRANSFER TO PARO- PARO SIGHTSEING',
    desc: 'Early breakfast check-out & transfer to Paro, (Approx 50km / 2hrs drive) covering some on way sightseeing. Every turn on the way comes with surprise and scenic view of the mountain and nature. Visit the historic ruins of the Drukgyal Dzong, built in 1647. Also visit the Paro airport view point, Reach Paro & Paro local sightseeing – covering Dungtse Lhankhang, Nya-mey Zam, UgyenPelri Palace - Check in - Leisure - Overnight at Paro.'
  },
  {
    day: 'DAY 6',
    title: 'EX PARO – CHELE-LA PASS',
    desc: 'After Breakfast proceed to visit Chelela Pass. Chele-la (pass), at an elevation 3,988 meters is considered to be one of the highest motorable passes in Bhutan. About an hour\'s drive along a thickly forested road, is this Pass-a botanical paradise. The pass provides stunning views of the sacred mountain Jomolhari and Jichu Drake. It is also marked by hundreds of prayer flags fluttering in the wind. Here, visitors can see cascades of wild roses; purple and yellow primulas; and swathes of deep blue iris covering the forest floor. The top of the pass bloom with rhododendrons in a variety of colours-pale pink, deep pink, burntorange, mauve, white and scarlet. - Back to resort / hotel – Evening at your own leisure - Overnight at Paro.'
  },
  {
    day: 'DAY 7',
    title: 'PARO TO PHUENTSHOLING TRANSFER',
    desc: 'After breakfast check out of the hotel and transfer to Phuentsholing (Approx 155km / 5 hrs drive). Phuentsholing (298Mts / 977Fts) is a small town at the Indo-Bhutan border - leisure. Overnight at Phuentsholing'
  },
  {
    day: 'DAY 8',
    title: 'PHUENTSHOLING TO NJP RLY STATTION / BAGDOGRA AIRPORT DROP',
    desc: 'After breakfast check out of the hotel and drop to NJP Railway Station / Bagdogra Airport - Service ends with sweet memories.'
  }
]
    },
    { id:6, origin:'india', badge:'Popular', title:'Bhutan Tour Package from Chennai', desc:'A Thimphu–Punakha–Paro circuit designed for travelers connecting via Chennai.', img:'tour/p6.jpg', days:6, nights:5, people:'Up to 10', rating:4.6, reviews:26, includes:['Private Vehicle & Driver','Hotel Stay (Twin Sharing)','Daily Breakfast & Dinner','SDF & Permits Assistance'],
      itinerary:[
  {
    day: 'Day 01',
    title: 'Pick up from Hasimara. Transfer to Thimphu [170km / 05 Hrs drive]',
    desc: 'For your Bhutan Honeymoon Tour, meet and greet upon arrival at Hasimara Railway Station or Paro Airport and transfer to Thimphu, the capital of Bhutan, which lies at an elevation of 2300 m. Visitors can enjoy a relaxing walk in the valley in the evening. Overnight at Hotel in Thimphu'
  },
  {
    day: 'Day 02',
    title: 'Thimphu - Sightseeing',
    desc: 'After a sumptuous breakfast proceeds for morning sightseeing - visit the Indigenous Hospital where traditional old art of healing is still practiced, Art and Craft school, National library, Royal goldsmith workshop, and Handicraft centers. Afternoon visit the Memorial Chorten built in the memory of the late King Jigme Dorji Wangchuck, 15-century Changangkha monastery, Motithang mini zoo to see the rare "Takin" national animal of Bhutan and drive further down with a good view of the Thimphu Valley. Visit the new Drupthob nunnery temple and have free time in the market. Overnight at Hotel in Thimphu.'
  },
  {
    day: 'Day 03',
    title: 'Early morning transfer to Punakha / Wangdue Sightseeing [70 km–2.30 hrs drive]',
    desc: 'Morning drive to Wangduephodrang, with a stop en route for tea at Dochu La Pass (3,100 meters), where on a clear day you can get spectacular views of the Himalayas. In Wangdue, stop at Mehsina village and visit Chime Lhakhang - The Temple of Fertility built in the 15th century by Lama Drukpa Kinley. (This monk is popularly known as the Devine madman for his philosophy, Salvation through sex). Afternoon drive to Punakha, the former capital of Bhutan visits Punakha Dzong, which is noteworthy both for being one of the most beautiful dzongs in Bhutan and also for having been built by the first Shabdrung in 1637. Overnight at Hotel in Punakha.'
  },
  {
    day: 'Day 04',
    title: 'Morning transfer to Paro [143 kms/4 hrs]. Half-Day Sightseeing at Paro',
    desc: 'After breakfast transfer to Paro (Approx 2-4 hrs), covering some on-way sightseeing. Every turn on the way comes with a surprise and a scenic view of the mountain and nature. Visit the historic ruins of the Drukgyal Dzong, built-in 1647. Also visit Ta Dzong, one of the finest natural museums in South Asia. Rinpung Dzong which is in the same location as Ta Dzong, was built-in 1645 to defend the valley against Tibetan Invaders. Nya-Mey Zam or “the bridge with no fish” is the bridge that connects Paro Town to the dzong. It is one of the finest specimens in Bhutan and locals believe that if one sees a fish in the river, it is an ill omen. Paro\'s main street features shops on both sides, all crammed with brasswares, silk, and cotton scarves, incense sticks, silver filigree jewelry, gho (Bhutanese National Dress for Men) which can be matched with elaborately embroidered boots, Kira (wrap-around sarong worn for Bhutanese Women) and prayer flags that one could string across any open space to seek blessings for loved ones and friends. Overnight at Hotel in Paro.'
  },
  {
    day: 'Day 05',
    title: 'Paro - Full Day Sightseeing',
    desc: 'After breakfast drive 12kms north of Paro to visit Taktshang: or "Tiger’s Nest" which is one of the most famous places to visit in Bhutan and one of the holiest sites in Bhutan. It is perched on a steep granite cliff at 2950 meters overlooking northern Paro valley. The place is especially venerated because of its association with Guru Rimpoche and is believed that more merit is gained if we meditate even for a minute in Tasktshang than many months in other places. It will take about 3-5hrs to hike to the monastery (One way ). Overnight at Hotel in Paro'
  },
  {
    day: 'Day 06',
    title: 'Drop to Hasimara Railway Station (150 kms/2.30 hrs) - Onward Connection',
    desc: 'After breakfast start for Hasimara. Tour ends with sweet memories.'
  }
 ]
    },
    
  ];

const DESTINATIONS = [
  { name:'Paro', region:'West Bhutan', img:'images/Paro.jpg', },
  { name:'Thimphu', region:'Capital City', img:'images/Thimpu-Bhutan.webp', },
  { name:'Punakha', region:'Central Bhutan', img:'tour/raft.jpg',  },
  { name:'Bumthang', region:'Spiritual Heartland', img:'images/Bumthang-Dzong-.jpg', },
  { name:'Phobjikha', region:'Black Crane Valley', img:'images/Phobjikha-Village-Bhutan.avif', },
  { name:'Haa Valley', region:'Remote West', img:'images/Haa.jpg',}
];

const CARS = [
  { type:'Economy', name:'Toyota Corolla', img:'images/2024-toyota-corolla-banner.avif', seats:'1–3 Seats', ac:'Full AC', driver:'Licensed Guide', price:65 },
  { type:'4WD / SUV', name:'Toyota Land Cruiser', img:'images/2024-toyota-land-cruiser.avif', seats:'1–5 Seats', ac:'Full AC', driver:'Expert Guide', price:110 },
  { type:'Minibus', name:'Hiace Minivan', img:'images/hiace bus.jpg', seats:'6–12 Seats', ac:'Full AC', driver:'Senior Guide', price:150 },
  { type:'Luxury', name:'Creta', img:'images/creta.png', seats:'1–4 Seats', ac:'Climate Control', driver:'Personal Guide', price:195 }
];


const REVIEWS = [
  { stars:5, text:"Our driver-guide Sonam was extraordinary — he didn't just show us Bhutan, he let us feel it. Every stop felt personal and unhurried.", name:'Amelia Richards', location:'London, UK', trip:'Paro & Thimphu · 5 Days', img:'https://randomuser.me/api/portraits/women/32.jpg' },
  { stars:5, text:'Ridge & Valley arranged everything flawlessly. The Thimphu Tshechu festival was beyond anything I could have imagined — life-changing.', name:'Marcus Chen', location:'Singapore', trip:'Festival Tour · 6 Days', img:'https://randomuser.me/api/portraits/men/45.jpg' },
  { stars:5, text:'The Jomolhari trek was challenging but the guides kept us safe and motivated every step of the way. Worth every penny.', name:'Sophie Müller', location:'Munich, Germany', trip:'Jomolhari Trek · 12 Days', img:'https://randomuser.me/api/portraits/women/68.jpg' },
  { stars:5, text:'As a solo traveler I felt completely safe and cared for. The farmhouse stays in Bumthang were my highlight — authentic and warm.', name:'Priya Mehta', location:'Mumbai, India', trip:'Bumthang Valley · 8 Days', img:'https://randomuser.me/api/portraits/women/44.jpg' },
  { stars:5, text:"Best travel investment I've ever made. Attention to detail — from room preferences to dietary needs — was remarkable.", name:"James O'Brien", location:'Boston, USA', trip:'Punakha Circuit · 6 Days', img:'https://randomuser.me/api/portraits/men/22.jpg' },
  { stars:5, text:'We came for a week and left wanting a month more. Ridge & Valley turned Bhutan from a dream into our most cherished memory.', name:'Yuki Tanaka', location:'Tokyo, Japan', trip:'Druk Path Trek · 7 Days', img:'https://randomuser.me/api/portraits/women/12.jpg' }
];

/* ═══════════════════════════════════════════════════
   GUEST REVIEWS — persistent store (localStorage)
════════════════════════════════════════════════════ */
const ReviewStore = (function () {
  const KEY = 'btpe_guest_reviews';
  function getUserReviews() {
    try { return JSON.parse(localStorage.getItem(KEY) || '[]'); }
    catch { return []; }
  }
  function saveUserReviews(arr) {
    localStorage.setItem(KEY, JSON.stringify(arr));
  }
  function addReview(review) {
    const arr = getUserReviews();
    arr.unshift(review); // newest first
    saveUserReviews(arr);
    return arr;
  }
  function getAll() {
    // guest-submitted reviews shown first, seed reviews after
    return getUserReviews().concat(REVIEWS);
  }
  function getStats() {
    const all = getAll();
    if (!all.length) return { avg: 0, count: 0 };
    const total = all.reduce((sum, r) => sum + r.stars, 0);
    return { avg: total / all.length, count: all.length };
  }
  return { addReview, getAll, getStats };
})();


const EVENTS = [
  { date:'Aug 20–21', name:'Ura Matsutake Festival', loc:'Bumthang' },
  { date:'Sep 5', name:'Tour of the Dragon', loc:'National Highway' },
  { date:'Sep 21–23', name:'Thimphu Tshechu', loc:'Thimphu' },
  { date:'Sep 24–26', name:'Gangtey Tshechu', loc:'Phobjikha' },
  { date:'Oct 10–12', name:'Jambay Lhakhang Festival', loc:'Bumthang' }
];

/* ── HELPERS ─────────────────────────────────────────── */
function stars(n) {
  return Array.from({ length: Math.floor(n) }, () => '<i class="fa-solid fa-star"></i>').join('');
}
function fmt(n) { return n.toLocaleString('en-US'); }

/* Builds full Overview/Itinerary/Payment content for any tour.
   Uses the tour's own data if present, otherwise generates
   sensible defaults from its existing fields so every card works. */
function getTourContent(t) {
  return {
    gallery: t.gallery && t.gallery.length ? t.gallery : [{ img: t.img, tag: t.title }],
    overview: t.overview || t.desc,
    highlights: t.highlights || t.includes || [],
    itinerary: t.itinerary || [
      { day: 1, title: 'Arrival & Welcome', blocks: [
        { heading: 'Arrive & Transfer', text: 'Your guide and driver meet you on arrival and transfer you to your first stop.' }
      ]},
      { day: t.days, title: 'Departure', blocks: [
        { heading: 'End of Trip', text: 'Transfer to the airport for your onward flight.' }
      ]}
    ],
    payment: t.payment || {
      terms: ['The approval of tourists VISA is contingent on the full payment of the tour', 'Flight ticket payment is subject to the Ticketing Time Limit issued by the airlines'],
      cancellation: ['30 to 15 days prior to arrival – 20% of the total tour cost will be levied as cancellation fee', '14 to 7 days prior to arrival – 50% of the tour cost will be levied as cancellation fee', 'Less than a week prior to arrival – 100% cancellation charge will be levied as cancellation fee'],
      flightCancellation: 'Subject to the cancellation terms of the Airline.',
      reschedule: 'There are no charges for rescheduling your trip. However the minimum daily tariff, hotel rates, and airline charges are subject to change depending on your new travelling dates.'
    },
    includes: t.includes || [],
    excludes: t.excludes || ['Flights to and from Bhutan', 'Personal expense/shopping', 'Travel insurance', 'Tips for guide and driver']
  };
}

/* ── PRELOADER ───────────────────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const pre = document.getElementById('preloader');
    if (pre) pre.classList.add('gone');
  }, 2200);
});

/* ── HEADER SCROLL ───────────────────────────────────── */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
});

/* ── BACK TO TOP ─────────────────────────────────────── */
const btt = document.getElementById('btt');
if (btt) {
  window.addEventListener('scroll', () => btt.classList.toggle('show', window.scrollY > 500));
  btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ── BURGER ──────────────────────────────────────────── */
const burger = document.getElementById('burger');
const mobOverlay = document.getElementById('mobOverlay');
const mobClose = document.getElementById('mobClose');
if (burger && mobOverlay && mobClose) {
  const openMob = () => { burger.classList.add('open'); mobOverlay.classList.add('open'); document.body.style.overflow = 'hidden'; };
  const closeMob = () => { burger.classList.remove('open'); mobOverlay.classList.remove('open'); document.body.style.overflow = ''; };
  burger.addEventListener('click', openMob);
  mobClose.addEventListener('click', closeMob);
  mobOverlay.addEventListener('click', e => { if (e.target === mobOverlay) closeMob(); });
  document.querySelectorAll('.mob-links a, .mob-cta').forEach(a => a.addEventListener('click', closeMob));
}
/* ── HERO SLIDES DATA & SETUP ─────────────────────────── */
const HERO_SLIDES = [
  { img:'images/23-night.jpg', location:'Thimphu · Bhutan', eyebrow:'Est. 2008 · Licensed Bhutan Operator', title:'Where the<br/><em>Mountains</em><br/>Speak', sub:"Private journeys through Bhutan's sacred valleys, ancient monasteries, and untouched landscapes." },
  { img:'images/1_Dochula_Pass-1.jpg', location:'Dochula Pass · Bhutan', eyebrow:'3,100m Above Sea Level', title:'108 Chortens,<br/><em>One</em><br/>View', sub:'Cross the Himalayan pass where prayer flags meet endless mountain ranges.' },
  { img:'puna.avif', location:'Punakha · Bhutan', eyebrow:'Winter Capital of Bhutan', title:'Where Two<br/><em>Rivers</em><br/>Meet', sub:'Stand before the most beautiful dzong in the kingdom.' },
  { img:'images/Bumthang-Dzong-.jpg', location:'Bumthang · Bhutan', eyebrow:"Bhutan's Spiritual Heartland", title:'Ancient Temples,<br/><em>Quiet</em><br/>Valleys', sub:'Journey east to 7th-century temples and honey farms.' },
  { img:'images/Paro-Taktsang-1.jpg', location:'Paro · Bhutan', eyebrow:"The Kingdom's Icon", title:'Where Faith<br/><em>Clings</em><br/>to Cliffs', sub:"Hike to the Tiger's Nest, perched 900m above the Paro valley floor." },
  { img:'phob.avif', location:'Phobjikha · Bhutan', eyebrow:'7,326m Above Sea Level', title:'Into the<br/><em>High</em><br/>Himalaya', sub:"Trek to the base of one of Bhutan's most sacred peaks." }
];
const HERO_INTERVAL = 4000;

const heroBg     = document.getElementById('heroBg');
const heroTitle  = document.getElementById('heroTitle');

let heroIdx = 0;
let heroTimer = null;
let heroBusy = false;

function buildHeroSlides() {
  if (!heroBg) return;
  heroBg.innerHTML = HERO_SLIDES.map((s, i) =>
    `<div class="hero-bg-slide ${i === 0 ? 'active' : ''}" data-i="${i}" style="background-image:url(${s.img})"></div>`
  ).join('');
}

function updateHeroText(newIdx) {
  if (!heroTitle) return;
  const s = HERO_SLIDES[newIdx];
  const name = s.location.split('·')[0].trim();
  heroTitle.classList.add('hero-text-fade', 'out');
  setTimeout(() => {
    heroTitle.textContent = name;
    heroTitle.classList.remove('out');
  }, 350);
}
/* ── HERO CARDS — SLIDING STACK ───────────────────────── */
const heroCardsBox    = document.getElementById('heroThumbs'); // this is now the TRACK
const heroProgressBar = document.getElementById('heroProgressBar');
const heroCounter     = document.getElementById('heroCounter');
const heroPrevBtn     = document.getElementById('heroPrev');
const heroNextBtn     = document.getElementById('heroNext');
const CARDS_VISIBLE = 3;
const CARDS_BUFFER  = 2;

function cardMarkup(idx, isActive) {
  const s = HERO_SLIDES[idx];
  const parts = s.location.split('·');
  return `
    <div class="hero-card ${isActive ? 'is-active' : ''}" data-i="${idx}">
      <img src="${s.img}" alt="${s.location}" loading="lazy"/>
      <div class="hero-card-veil"></div>
      <div class="hero-card-text">
        <div class="hero-card-region">${parts[1] ? parts[1].trim() : ''}</div>
        <div class="hero-card-name">${parts[0].trim()}</div>
      </div>
    </div>`;
}

function renderHeroCards() {
  if (!heroCardsBox) return;
  let html = '';
  const total = CARDS_VISIBLE + CARDS_BUFFER;
  for (let n = 0; n < total; n++) {
    const idx = (heroIdx + n) % HERO_SLIDES.length;
    html += cardMarkup(idx, n === CARDS_VISIBLE - 1);
  }
  heroCardsBox.innerHTML = html;
  heroCardsBox.classList.remove('sliding');
  heroCardsBox.style.transform = 'translateX(0)';
  heroCardsBox.querySelectorAll('.hero-card').forEach(el => {
    el.addEventListener('click', () => {
      if (heroBusy) return;
      goToHero(parseInt(el.dataset.i));
    });
  });
  if (heroCounter) heroCounter.textContent = String(heroIdx + 1).padStart(2, '0');
}

function startProgress() {
  if (!heroProgressBar) return;
  heroProgressBar.style.transition = 'none';
  heroProgressBar.style.width = '0%';
  void heroProgressBar.offsetWidth;
  heroProgressBar.style.transition = `width ${HERO_INTERVAL}ms linear`;
  heroProgressBar.style.width = '100%';
}

function goToHero(targetIdx) {
  if (!heroCardsBox) return;
  if (heroBusy) return;
  heroBusy = true;
  clearTimeout(heroTimer);

  // figure out how many steps to slide (supports both next and jump-to-click)
  let steps = targetIdx - heroIdx;
  if (steps <= 0) steps += HERO_SLIDES.length;
  if (steps > CARDS_VISIBLE + CARDS_BUFFER - 1) steps = 1; // fallback: too far, just cut

  const firstCard  = heroCardsBox.querySelector('.hero-card');
  const secondCard = heroCardsBox.querySelectorAll('.hero-card')[1];
  const step = (firstCard && secondCard)
    ? secondCard.getBoundingClientRect().left - firstCard.getBoundingClientRect().left
    : 130;
  const shiftPx = steps * step;

  updateHeroText(targetIdx);
  document.querySelectorAll('.hero-bg-slide').forEach(el => {
    const isTarget = parseInt(el.dataset.i) === targetIdx;
    if (isTarget) {
      el.style.animation = 'none';
      void el.offsetWidth;
      el.style.animation = '';
    }
    el.classList.toggle('active', isTarget);
  });

  heroCardsBox.classList.add('sliding');
  heroCardsBox.style.transform = `translateX(-${shiftPx}px)`;

  setTimeout(() => {
    heroIdx = targetIdx;
    renderHeroCards();
    startProgress();
    heroBusy = false;
    heroTimer = setTimeout(autoAdvance, HERO_INTERVAL);
  }, 720);
}

function autoAdvance() {
  goToHero((heroIdx + 1) % HERO_SLIDES.length);
}

heroPrevBtn?.addEventListener('click', () => {
  clearTimeout(heroTimer);
  goToHero((heroIdx - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
});
heroNextBtn?.addEventListener('click', () => {
  clearTimeout(heroTimer);
  goToHero((heroIdx + 1) % HERO_SLIDES.length);
});

buildHeroSlides();
renderHeroCards();
startProgress();
heroTimer = setTimeout(autoAdvance, HERO_INTERVAL);

/* ── COUNTER ─────────────────────────────────────────── */
let countersGone = false;
const heroObs = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !countersGone) {
    countersGone = true;
    setTimeout(() => {
      document.querySelectorAll('.hs-n').forEach(el => {
        const target = parseInt(el.dataset.target);
        const start = performance.now();
        const dur = 1800;
        (function update(now) {
          const p = Math.min((now - start) / dur, 1);
          el.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * target).toLocaleString('en-US');
          if (p < 1) requestAnimationFrame(update);
          else el.textContent = target.toLocaleString('en-US');
        })(start);
      });
    }, 800);
  }
});
const heroSec = document.getElementById('home');
if (heroSec) heroObs.observe(heroSec);

/* ── RENDER TOURS ────────────────────────────────────── */
function renderTours(filter = 'all') {
  const grid = document.getElementById('toursGrid');
  if (!grid) return;
  const items = filter === 'all' ? TOURS : TOURS.filter(t => t.type === filter);
  grid.innerHTML = items.map(t => `
    <div class="tour-card fade-in" data-id="${t.id}">
      <div class="tc-img">
        <img src="${t.img}" alt="${t.title}" loading="lazy"/>
        <span class="tc-badge">${t.badge}</span>
        <button class="tc-fav" aria-label="Wishlist"><i class="fa-regular fa-heart"></i></button>
      </div>
      <div class="tc-body">
        <div class="tc-type">${t.type}</div>
        <h3>${t.title}</h3>
        <p>${t.desc}</p>
        <div class="tc-meta">
          <span><i class="fa-regular fa-calendar"></i> ${t.days}D / ${t.nights}N</span>
          <span><i class="fa-solid fa-users"></i> ${t.people}</span>
          <span><i class="fa-solid fa-star"></i> ${t.rating} (${t.reviews})</span>
        </div>
        <div class="tc-foot">
  <button class="tc-book full" data-id="${t.id}">View Details</button>
</div>
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('.tc-fav').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      btn.classList.toggle('liked');
      btn.querySelector('i').className = btn.classList.contains('liked') ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
      showToast(btn.classList.contains('liked') ? 'Saved to wishlist' : 'Removed from wishlist');
    });
  });

  grid.querySelectorAll('.tc-book, .tour-card').forEach(el => {
    el.addEventListener('click', e => {
      if (e.target.closest('.tc-fav')) return;
      const id = parseInt(el.dataset.id || el.closest('.tour-card')?.dataset.id);
      const tour = TOURS.find(t => t.id === id);
      if (tour) openTourModal(tour);
    });
  });
  observeFadeIns();
}

const tourFilters = document.getElementById('tourFilters');
if (tourFilters) {
  tourFilters.querySelectorAll('.fr-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      tourFilters.querySelectorAll('.fr-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderTours(btn.dataset.f);
    });
  });
}
renderTours();

/* ── TOUR MODAL (full-screen, tabbed) ─────────────────── */
function openTourModal(tour) {
  const c = getTourContent(tour);
  let galleryIdx = 0;

  const includesHtml = c.includes.length
    ? `<ul class="mt-yes">${c.includes.map(i => `<li><i class="fa-solid fa-circle-check"></i> ${i}</li>`).join('')}</ul>`
    : '';
  const excludesHtml = c.excludes.length
    ? `<ul class="mt-no">${c.excludes.map(i => `<li><i class="fa-solid fa-circle-xmark"></i> ${i}</li>`).join('')}</ul>`
    : '';

  document.getElementById('modalBody').innerHTML = `
    <div class="mt-gallery">
      <img id="mtGalleryImg" src="${c.gallery[0].img}" alt="${tour.title}"/>
      <div class="mt-gallery-tag" id="mtGalleryTag">${c.gallery[0].tag}</div>
      ${c.gallery.length > 1 ? `
        <div class="mt-gallery-nav">
          <button id="mtPrev" aria-label="Previous image"><i class="fa-solid fa-chevron-left"></i></button>
          <button id="mtNext" aria-label="Next image"><i class="fa-solid fa-chevron-right"></i></button>
        </div>` : ''}
    </div>

    <div class="mt-head">
      <div class="mt-type">${tour.type}</div>
      <h2>${tour.title}</h2>
      <div class="mt-meta">
        <span><i class="fa-regular fa-calendar"></i> ${tour.days} Days / ${tour.nights} Nights</span>
        <span><i class="fa-solid fa-users"></i> ${tour.people}</span>
        <span><i class="fa-solid fa-star"></i> ${tour.rating} (${tour.reviews} reviews)</span>
      </div>
    </div>

    <div class="mt-tabs">
      <button class="mt-tab active" data-tab="overview">Overview</button>
      <button class="mt-tab" data-tab="itinerary">Itinerary</button>
      <button class="mt-tab" data-tab="payment">Payment & Cancellation Policy</button>
    </div>

    <div class="mt-body">
      <div class="mt-main">

        <div class="mt-panel active" data-panel="overview">
          <h4>Tour Overview</h4>
          <p>${c.overview}</p>
          ${c.highlights.length ? `
            <h4>Tour Highlights</h4>
            <div class="mt-chips">${c.highlights.map(h => `<span>${h}</span>`).join('')}</div>
          ` : ''}
        </div>

        <div class="mt-panel" data-panel="itinerary">
          <h4>Daily Itinerary for ${tour.title} (${tour.days} Days)</h4>
          ${c.itinerary.map((d, i) => `
            <div class="mt-day ${i === 0 ? 'open' : ''}">
              <div class="mt-day-head">
                <span class="mt-day-num">${d.day}</span>
                <strong>Day ${d.day} — ${d.title}</strong>
                <i class="fa-solid fa-chevron-down"></i>
              </div>
              <div class="mt-day-body">
                <div class="mt-day-inner">
                  ${d.blocks.map(b => `
                    <p><strong>${b.heading}</strong></p>
                    ${b.distance ? `<p style="font-size:0.8rem;color:var(--muted)">${b.distance}</p>` : ''}
                    <p>${b.text}</p>
                    ${b.places ? `<div class="mt-label">Places & Attractions</div><div class="mt-chips">${b.places.map(p => `<span>${p}</span>`).join('')}</div>` : ''}
                    ${b.stay ? `<div class="mt-label">Accommodation Options</div><div class="mt-chips">${b.stay.map(s => `<span>${s}</span>`).join('')}</div>` : ''}
                  `).join('')}
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="mt-panel" data-panel="payment">
          <h4>Payment Terms</h4>
          <ul>${c.payment.terms.map(t => `<li>${t}</li>`).join('')}</ul>
          <h4>Tour Cancellation and Refund Policy</h4>
          <ul>${c.payment.cancellation.map(t => `<li>${t}</li>`).join('')}</ul>
          <h4>Flight Ticket Cancellation and Refund Policy</h4>
          <p>${c.payment.flightCancellation}</p>
          <h4>Rescheduling Tour Dates</h4>
          <p>${c.payment.reschedule}</p>
        </div>

      </div>

      <aside class="mt-side">
  <div class="mt-side-img"><img src="${tour.img}" alt="${tour.title}"/></div>
  <a href="#contact" class="mt-book-btn" onclick="closeModal()">Book This Tour</a>

  ${c.includes.length ? `<h5>Included in this package</h5>${includesHtml}` : ''}
  ${c.excludes.length ? `<h5>Not included</h5>${excludesHtml}` : ''}
</aside>
    </div>
  `;

  /* Tabs */
  document.querySelectorAll('.mt-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.mt-tab').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.mt-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.querySelector(`.mt-panel[data-panel="${btn.dataset.tab}"]`).classList.add('active');
      document.getElementById('modalBody').scrollTo({ top: document.querySelector('.mt-tabs').offsetTop - 20, behavior: 'smooth' });
    });
  });

  /* Itinerary accordion */
  document.querySelectorAll('.mt-day-head').forEach(head => {
    head.addEventListener('click', () => head.closest('.mt-day').classList.toggle('open'));
  });

  /* Gallery prev/next */
  const galleryImg = document.getElementById('mtGalleryImg');
  const galleryTag = document.getElementById('mtGalleryTag');
  function showGallerySlide(i) {
    galleryIdx = (i + c.gallery.length) % c.gallery.length;
    galleryImg.src = c.gallery[galleryIdx].img;
    galleryTag.textContent = c.gallery[galleryIdx].tag;
  }
  document.getElementById('mtPrev')?.addEventListener('click', () => showGallerySlide(galleryIdx - 1));
  document.getElementById('mtNext')?.addEventListener('click', () => showGallerySlide(galleryIdx + 1));

  openModal();
}

/* ── RENDER DESTINATIONS (overlapping stack) ──────────── */
function renderDestinations() {
  const stack = document.getElementById('destStack');
  if (!stack) return;
  const items = DESTINATIONS.slice(0, 5);
  const centerIdx = Math.floor(items.length / 2);

  stack.innerHTML = items.map((d, i) => `
    <div class="dc-card ${i === centerIdx ? 'is-featured' : ''}">
      <div class="dc-img"><img src="${d.img}" alt="${d.name}" loading="lazy"/></div>
      <div class="dc-body">
        <h3 class="dc-name">${d.name}</h3>
        <p class="dc-loc"><i class="fa-solid fa-location-dot"></i> ${d.region}</p>
        <div class="dc-desc-label">Description</div>
        <p class="dc-desc">Explore ${d.name}, one of Bhutan's most treasured destinations in the ${d.region} region.</p>
        
      </div>
    </div>
  `).join('');
}
renderDestinations();



/* ── RENDER REVIEWS (wave carousel) ───────────────────── */
function renderReviews() {
  const track = document.getElementById('rvTrack');
  const wrap  = document.getElementById('rvCarousel');
  if (!track || !wrap) return;

  const REPS = 4; // duplicate the set for a seamless infinite loop + drag buffer
  let html = '';
  for (let rep = 0; rep < REPS; rep++) {
    REVIEWS.forEach(r => {
      html += `
        <div class="rv-oval">
          <img src="${r.img}" alt="${r.name}" loading="lazy"/>
          <div class="rv-info">
            <div class="rv-stars">${stars(r.stars)}</div>
            <strong>${r.name}</strong>
            <span>${r.trip}</span>
          </div>
        </div>`;
    });
  }
  track.innerHTML = html;

  const cards = Array.from(track.children);
  let cardStep = cards[0].getBoundingClientRect().width + 20; // width + gap
  let setWidth = cardStep * REVIEWS.length;

  let x = 0;
  const SPEED = 0.55;
  let dragging = false;
  let dragStartX = 0;
  let dragStartTX = 0;

  function recalc() {
    cardStep = cards[0].getBoundingClientRect().width + 20;
    setWidth = cardStep * REVIEWS.length;
  }
  window.addEventListener('resize', recalc);

  function applyWave() {
    const rect = wrap.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const halfW = rect.width / 2;
    const AMPLITUDE = 38;
    cards.forEach(card => {
      const cr = card.getBoundingClientRect();
      const dist = (cr.left + cr.width / 2) - centerX;
      const t = Math.min(Math.abs(dist) / halfW, 1);
      const raise = AMPLITUDE * Math.cos(t * Math.PI / 2);
      card.style.transform = `translateY(${-raise}px)`;
    });
  }

  function wrapX() {
    while (x <= -setWidth) x += setWidth;
    while (x > 0) x -= setWidth;
  }

  function frame() {
    if (!dragging) x -= SPEED;
    wrapX();
    track.style.transform = `translateX(${x}px)`;
    applyWave();
    requestAnimationFrame(frame);
  }

  wrap.addEventListener('pointerdown', e => {
    dragging = true;
    wrap.classList.add('dragging');
    dragStartX = e.clientX;
    dragStartTX = x;
    wrap.setPointerCapture(e.pointerId);
  });
  wrap.addEventListener('pointermove', e => {
    if (!dragging) return;
    x = dragStartTX + (e.clientX - dragStartX);
  });
  const endDrag = () => { dragging = false; wrap.classList.remove('dragging'); };
  wrap.addEventListener('pointerup', endDrag);
  wrap.addEventListener('pointerleave', endDrag);
  wrap.addEventListener('pointercancel', endDrag);

  requestAnimationFrame(frame);
}
renderReviews();

/* ── RENDER REVIEWS (continuous slider, live from ReviewStore) ─ */
function renderReviews() {
  const track = document.getElementById('rvTrack');
  const wrap  = document.getElementById('rvCarousel');
  if (!track || !wrap) return;

  const allReviews = ReviewStore.getAll();
  const REPS = 4; // duplicated set for seamless looping + drag buffer
  let html = '';
  for (let rep = 0; rep < REPS; rep++) {
    allReviews.forEach(r => {
      const avatar = r.img || `https://ui-avatars.com/api/?name=${encodeURIComponent(r.name)}&background=0a0a0a&color=fff`;
      html += `
        <div class="rv-card">
          <img class="rv-avatar" src="${avatar}" alt="${r.name}" loading="lazy"/>
          <div class="rv-card-stars">${stars(r.stars)}</div>
          <p class="rv-card-text">"${r.text}"</p>
          <div class="rv-card-name">${r.name}</div>
          <div class="rv-card-trip">${r.location}${r.trip ? ' · ' + r.trip : ''}</div>
        </div>`;
    });
  }
  track.innerHTML = html;

  const cards = Array.from(track.children);
  let cardStep = cards[0].getBoundingClientRect().width + 20;
  let setWidth = cardStep * allReviews.length;

  let x = 0;
  const SPEED = 0.5;
  let dragging = false;
  let dragStartX = 0;
  let dragStartTX = 0;

  function recalc() {
    cardStep = cards[0].getBoundingClientRect().width + 20;
    setWidth = cardStep * allReviews.length;
  }
  window.addEventListener('resize', recalc);

  function wrapX() {
    while (x <= -setWidth) x += setWidth;
    while (x > 0) x -= setWidth;
  }

  function frame() {
    if (!dragging) x -= SPEED;
    wrapX();
    track.style.transform = `translateX(${x}px)`;
    requestAnimationFrame(frame);
  }

  wrap.addEventListener('pointerdown', e => {
    dragging = true;
    wrap.classList.add('dragging');
    dragStartX = e.clientX;
    dragStartTX = x;
    wrap.setPointerCapture(e.pointerId);
  });
  wrap.addEventListener('pointermove', e => {
    if (!dragging) return;
    x = dragStartTX + (e.clientX - dragStartX);
  });
  const endDrag = () => { dragging = false; wrap.classList.remove('dragging'); };
  wrap.addEventListener('pointerup', endDrag);
  wrap.addEventListener('pointerleave', endDrag);
  wrap.addEventListener('pointercancel', endDrag);

  requestAnimationFrame(frame);
}
renderReviews();
/* ── STATS CARD: LIVE REVIEW RATING ───────────────────── */
function renderReviewStats() {
  const { avg, count } = ReviewStore.getStats();
  const numEl   = document.getElementById('avgRatingStat');
  const countEl = document.getElementById('reviewCountStat');
  const starsEl = document.getElementById('avgRatingStars');
  if (numEl)   numEl.textContent = avg.toFixed(1);
  if (countEl) countEl.textContent = count;
  if (starsEl) {
    const full = Math.round(avg);
    starsEl.innerHTML = Array.from({ length: 5 }, (_, i) =>
      `<i class="fa-solid fa-star" style="color:${i < full ? 'var(--black)' : 'var(--border)'};font-size:0.7rem;margin-right:1px;"></i>`
    ).join('');
  }
}
renderReviewStats();
/* ── MODAL ───────────────────────────────────────────── */
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
function openModal() { if (modalOverlay) { modalOverlay.classList.add('open'); document.body.style.overflow = 'hidden'; } }
function closeModal() { if (modalOverlay) { modalOverlay.classList.remove('open'); document.body.style.overflow = ''; } }
window.closeModal = closeModal;
if (modalClose) modalClose.addEventListener('click', closeModal);
if (modalOverlay) modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

/* ── CONTACT FORM ────────────────────────────────────── */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  // Populate "Interested In" with every current tour package
  const interestedSelect = document.getElementById('interestedIn');
  if (interestedSelect) {
    TOURS.forEach(t => {
      const opt = document.createElement('option');
      opt.value = t.title;
      opt.textContent = t.title;
      interestedSelect.appendChild(opt);
    });
    const otherOpt = document.createElement('option');
    otherOpt.value = 'Custom / Not Sure Yet';
    otherOpt.textContent = 'Custom / Not Sure Yet';
    interestedSelect.appendChild(otherOpt);

    interestedSelect.addEventListener('change', () => {
      const customWrap = document.getElementById('customTripWrap');
      if (customWrap) {
        customWrap.style.display = interestedSelect.value === 'Custom / Not Sure Yet' ? 'block' : 'none';
      }
    });
  }

  contactForm.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Sending…'; btn.disabled = true;

    const formData = new FormData(contactForm);

    try {
      const res = await fetch('https://formspree.io/f/xeeyejrd', {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        document.getElementById('cfMsg').textContent = '✓ Message sent! We\'ll reply within 24 hours.';

        // Save a copy for the admin dashboard
        try {
          const interestedRaw = formData.get('interested_in') || '';
          const customTrip = formData.get('custom_trip') || '';
          const interested_in = (interestedRaw === 'Custom / Not Sure Yet' && customTrip)
            ? customTrip
            : interestedRaw;

          const record = {
            first_name: formData.get('first_name') || '',
            last_name:  formData.get('last_name') || '',
            email:      formData.get('email') || '',
            phone:      formData.get('phone') || '',
            arrival_date: formData.get('arrival_date') || '',
            duration:   formData.get('duration') || '',
            interested_in,
            message:    formData.get('message') || '',
            submitted_at: new Date().toISOString()
          };
          const existing = JSON.parse(localStorage.getItem('btpe_trip_requests') || '[]');
          existing.unshift(record);
          localStorage.setItem('btpe_trip_requests', JSON.stringify(existing));
        } catch (storeErr) {
          console.error('Could not save trip request locally:', storeErr);
        }

        contactForm.reset();
      } else {
        document.getElementById('cfMsg').textContent = '✗ Something went wrong. Please try again.';
      }
    } catch (err) {
      document.getElementById('cfMsg').textContent = '✗ Something went wrong. Please try again.';
    }

    btn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
    btn.disabled = false;
    setTimeout(() => document.getElementById('cfMsg').textContent = '', 6000);
  });
}

/* ── TOAST ───────────────────────────────────────────── */
function showToast(msg) {
  document.querySelector('.toast')?.remove();
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  t.style.cssText = 'position:fixed;bottom:32px;left:50%;transform:translateX(-50%) translateY(14px);background:#111;color:#fff;padding:12px 26px;border-radius:999px;font-size:0.82rem;font-weight:500;z-index:9999;opacity:0;box-shadow:0 6px 24px rgba(0,0,0,0.2);transition:all 0.3s ease;white-space:nowrap;font-family:Outfit,system-ui,sans-serif;';
  document.body.appendChild(t);
  requestAnimationFrame(() => { t.style.opacity = '1'; t.style.transform = 'translateX(-50%) translateY(0)'; });
  setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateX(-50%) translateY(14px)'; setTimeout(() => t.remove(), 350); }, 2800);
}

/* ── SMOOTH SCROLL ───────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

/* ── FADE OBSERVER ───────────────────────────────────── */
function observeFadeIns() {
  const obs = new IntersectionObserver((entries, o) => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); o.unobserve(entry.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('.fade-in:not(.observed)').forEach((el, i) => {
    el.classList.add('observed');
    el.style.transitionDelay = `${(i % 4) * 70}ms`;
    obs.observe(el);
  });
}

document.querySelectorAll('.trust-item, .sv-card, .cgi-row').forEach((el, i) => {
  el.classList.add('fade-in');
  el.style.transitionDelay = `${i * 60}ms`;
});
observeFadeIns();
setTimeout(observeFadeIns, 100);

/* ── DATE MIN ────────────────────────────────────────── */
const today = new Date().toISOString().split('T')[0];
document.querySelectorAll('input[type="date"]').forEach(inp => inp.setAttribute('min', today));

console.log('Ridge & Valley — Bhutan Travel loaded ✓');

/* ═══════════════════════════════════════════════════
   AUTH SYSTEM
════════════════════════════════════════════════════ */
(function () {
  const USERS_KEY = 'rnv_users';
  const SESSION_KEY = 'rnv_session';
  const GOOGLE_CLIENT_ID = '562402124276-idb4sbfikvgouc4piejugbkkn40a4up8.apps.googleusercontent.com';

  function getUsers() {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '{}');
  }
  function saveUsers(u) {
    localStorage.setItem(USERS_KEY, JSON.stringify(u));
  }
  function getSession() {
    return JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null');
  }
  function saveSession(user) {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
  }
  function clearSession() {
    sessionStorage.removeItem(SESSION_KEY);
  }

  const trigger    = document.getElementById('loginTrigger');
  const popup      = document.getElementById('loginPopup');
  const btnLabel   = document.getElementById('loginBtnLabel');
  const status     = document.getElementById('lpStatus');

  if (!trigger || !popup) return; // this page has no login popup markup (e.g. admin-dashboard.html)

  const panelAuth     = document.getElementById('panel-auth');
  const panelLoggedin = document.getElementById('panel-loggedin');
  const panelSignin   = document.getElementById('panel-signin');
  const panelSignup   = document.getElementById('panel-signup');
  const panelForgot   = document.getElementById('panel-forgot');

  function showStatus(msg, type) {
    status.textContent = msg;
    status.className = 'lp-status ' + type;
    if (type === 'success') setTimeout(() => { status.textContent = ''; }, 4000);
  }
  function clearStatus() { status.textContent = ''; status.className = 'lp-status'; }

  function setErr(id, msg) {
    const el = document.getElementById(id);
    if (el) el.textContent = msg;
    if (msg) {
      const input = el && el.previousElementSibling;
      if (input && input.tagName === 'INPUT') input.classList.add('error');
    }
  }
  function clearErr(id) {
    const el = document.getElementById(id);
    if (el) el.textContent = '';
    const input = el && el.previousElementSibling;
    if (input && input.tagName === 'INPUT') input.classList.remove('error');
  }

  function validateEmail(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }

  function initials(name) {
    return name.trim().split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  }

  function applySession(user) {
    const adminLink = document.getElementById('adminNavLink');
    const adminLinkDesktop = document.getElementById('adminNavLinkDesktop');
    if (user) {
      btnLabel.textContent = user.name.split(' ')[0];
      document.getElementById('lpName').textContent  = user.name;
      document.getElementById('lpEmail').textContent = user.email;
      document.getElementById('lpAvatar').textContent = initials(user.name);
      panelAuth.style.display     = 'none';
      panelLoggedin.style.display = 'block';
      if (adminLink) adminLink.style.display = user.role === 'admin' ? 'inline-block' : 'none';
      if (adminLinkDesktop) adminLinkDesktop.style.display = user.role === 'admin' ? 'inline-block' : 'none';
    } else {
      btnLabel.textContent = 'Login';
      panelAuth.style.display     = 'block';
      panelLoggedin.style.display = 'none';
      if (adminLink) adminLink.style.display = 'none';
      if (adminLinkDesktop) adminLinkDesktop.style.display = 'none';
    }
    // Let other parts of the page (e.g. Plan My Trip form) react instantly
    window.dispatchEvent(new CustomEvent('rnv-session-changed', { detail: user }));
  }

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    popup.classList.toggle('open');
    clearStatus();
  });
  document.addEventListener('click', (e) => {
    if (!popup.contains(e.target) && e.target !== trigger) {
      popup.classList.remove('open');
    }
  });

  document.querySelectorAll('.lp-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.lp-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.dataset.tab;
      panelSignin.style.display = tab === 'signin' ? 'block' : 'none';
      panelSignup.style.display = tab === 'signup' ? 'block' : 'none';
      panelForgot.style.display = 'none';
      clearStatus();
    });
  });

  document.querySelectorAll('[data-switch]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const target = a.dataset.switch;
      document.querySelectorAll('.lp-tab').forEach(b => {
        b.classList.toggle('active', b.dataset.tab === target);
      });
      panelSignin.style.display = target === 'signin' ? 'block' : 'none';
      panelSignup.style.display = target === 'signup' ? 'block' : 'none';
      panelForgot.style.display = 'none';
      clearStatus();
    });
  });

  document.querySelectorAll('.lp-eye').forEach(btn => {
    btn.addEventListener('click', () => {
      const inp = document.getElementById(btn.dataset.target);
      const icon = btn.querySelector('i');
      if (inp.type === 'password') {
        inp.type = 'text';
        icon.className = 'fa-solid fa-eye-slash';
      } else {
        inp.type = 'password';
        icon.className = 'fa-solid fa-eye';
      }
    });
  });

  const suPw  = document.getElementById('su-password');
  const bar   = document.getElementById('su-strength-bar');
  suPw && suPw.addEventListener('input', () => {
    const v = suPw.value;
    let score = 0;
    if (v.length >= 6)  score++;
    if (v.length >= 10) score++;
    if (/[A-Z]/.test(v)) score++;
    if (/[0-9]/.test(v)) score++;
    if (/[^a-zA-Z0-9]/.test(v)) score++;
    const pct   = (score / 5) * 100;
    const color = score <= 1 ? '#e53935' : score <= 3 ? '#fb8c00' : '#2e7d52';
    bar.style.width      = pct + '%';
    bar.style.background = color;
  });

  document.getElementById('siSubmit').addEventListener('click', () => {
    clearErr('si-email-err'); clearErr('si-pw-err'); clearStatus();
    const email = document.getElementById('si-email').value.trim();
    const pw    = document.getElementById('si-password').value;
    let ok = true;

    if (!email)               { setErr('si-email-err', 'Email is required'); ok = false; }
    else if (!validateEmail(email)) { setErr('si-email-err', 'Enter a valid email'); ok = false; }
    if (!pw)                  { setErr('si-pw-err', 'Password is required'); ok = false; }
    if (!ok) return;

    const users = getUsers();
    const user  = users[email];
    if (!user)            { setErr('si-email-err', 'No account found with this email'); return; }
    if (user.pw !== btoa(pw)) { setErr('si-pw-err', 'Incorrect password'); return; }

    const role = user.role || 'customer';
    saveSession({ name: user.name, email, role });
    applySession({ name: user.name, email, role });
    showStatus('Welcome back, ' + user.name.split(' ')[0] + '!', 'success');

    if (role === 'admin') {
      setTimeout(() => { window.location.href = 'admin-dashboard.html'; }, 1200);
    } else {
      setTimeout(() => popup.classList.remove('open'), 1800);
    }
  });

  document.getElementById('suSubmit').addEventListener('click', () => {
    clearErr('su-name-err'); clearErr('su-email-err'); clearErr('su-pw-err'); clearStatus();
    const name  = document.getElementById('su-name').value.trim();
    const email = document.getElementById('su-email').value.trim();
    const pw    = document.getElementById('su-password').value;
    let ok = true;

    if (!name)                { setErr('su-name-err', 'Full name is required'); ok = false; }
    if (!email)               { setErr('su-email-err', 'Email is required'); ok = false; }
    else if (!validateEmail(email)) { setErr('su-email-err', 'Enter a valid email'); ok = false; }
    if (!pw)                  { setErr('su-pw-err', 'Password is required'); ok = false; }
    else if (pw.length < 6)   { setErr('su-pw-err', 'Minimum 6 characters'); ok = false; }
    if (!ok) return;

    const users = getUsers();
    if (users[email]) { setErr('su-email-err', 'Account already exists, sign in instead'); return; }

    users[email] = { name, pw: btoa(pw), role: 'customer' };
    saveUsers(users);
    saveSession({ name, email });
    applySession({ name, email });
    showStatus('Account created! Welcome, ' + name.split(' ')[0] + '!', 'success');
    setTimeout(() => popup.classList.remove('open'), 1800);
  });

  document.getElementById('forgotLink').addEventListener('click', (e) => {
    e.preventDefault();
    panelSignin.style.display = 'none';
    panelForgot.style.display = 'block';
    clearStatus();
  });
  document.getElementById('backToSignin').addEventListener('click', (e) => {
    e.preventDefault();
    panelForgot.style.display = 'none';
    panelSignin.style.display = 'block';
    clearStatus();
  });
  document.getElementById('fpSubmit').addEventListener('click', () => {
    clearErr('fp-err'); clearStatus();
    const email = document.getElementById('fp-email').value.trim();
    if (!email)               { setErr('fp-err', 'Email is required'); return; }
    if (!validateEmail(email)){ setErr('fp-err', 'Enter a valid email'); return; }
    const users = getUsers();
    if (!users[email]) { setErr('fp-err', 'No account found with this email'); return; }
    showStatus('Reset link sent to ' + email, 'success');
    setTimeout(() => {
      panelForgot.style.display = 'none';
      panelSignin.style.display = 'block';
    }, 2500);
  });

  function facebookLogin(btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Connecting...';
    setTimeout(() => {
      const fbUser = {
        name:  'Bhutan Traveler',
        email: 'fb_user_' + Date.now() + '@facebook.com'
      };
      const users = getUsers();
      if (!users[fbUser.email]) {
        users[fbUser.email] = { name: fbUser.name, pw: btoa('fb_oauth') };
        saveUsers(users);
      }
      saveSession(fbUser);
      applySession(fbUser);
      showStatus('Signed in with Facebook!', 'success');
      btn.disabled = false;
      btn.innerHTML = '<i class="fa-brands fa-facebook-f"></i> Continue with Facebook';
      setTimeout(() => popup.classList.remove('open'), 1800);
    }, 1800);
  }
  document.getElementById('fbSignin').addEventListener('click', function () { facebookLogin(this); });
  document.getElementById('fbSignup').addEventListener('click', function () { facebookLogin(this); });

  function decodeJwt(token) {
    const payload = token.split('.')[1];
    const json = decodeURIComponent(
      atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(json);
  }

  function handleGoogleCredential(data) {
    const email = data.email;
    const name  = data.name || email.split('@')[0];

    const users = getUsers();
    if (!users[email]) {
      users[email] = { name, pw: btoa('google_oauth'), role: 'customer' };
      saveUsers(users);
    }
    const role = users[email].role || 'customer';
    saveSession({ name, email, role });
    applySession({ name, email, role });
    showStatus('Signed in with Google!', 'success');

    if (role === 'admin') {
      setTimeout(() => { window.location.href = 'admin-dashboard.html'; }, 1200);
    } else {
      setTimeout(() => popup.classList.remove('open'), 1500);
    }
  }

  let googleTokenClient = null;
  function initGoogle() {
    if (window.google && google.accounts && google.accounts.oauth2) {
      googleTokenClient = google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: 'openid email profile',
        callback: async (tokenResponse) => {
          if (!tokenResponse || !tokenResponse.access_token) {
            showStatus('Google sign-in failed. Please try again.', 'error');
            return;
          }
          try {
            const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
              headers: { Authorization: 'Bearer ' + tokenResponse.access_token }
            });
            const data = await res.json();
            handleGoogleCredential(data);
          } catch (err) {
            showStatus('Google sign-in failed. Please try again.', 'error');
          }
        }
      });
    }
  }
  initGoogle();
  window.addEventListener('load', initGoogle);

  function googleLogin(btn) {
    if (!googleTokenClient) initGoogle();
    if (!googleTokenClient) {
      showStatus('Google sign-in is still loading, please try again in a moment.', 'error');
      return;
    }
    googleTokenClient.requestAccessToken();
  }
  document.getElementById('googleSignin').addEventListener('click', function () { googleLogin(this); });
  document.getElementById('googleSignup').addEventListener('click', function () { googleLogin(this); });

  document.getElementById('si-email').addEventListener('input', function () {
    const v = this.value.trim();
    if (!v) return clearErr('si-email-err');
    validateEmail(v) ? clearErr('si-email-err') : setErr('si-email-err', 'Enter a valid email');
  });
  document.getElementById('si-password').addEventListener('input', function () {
    if (this.value) clearErr('si-pw-err');
  });
  document.getElementById('su-name').addEventListener('input', function () {
    this.value.trim() ? clearErr('su-name-err') : setErr('su-name-err', 'Full name is required');
  });
  document.getElementById('su-email').addEventListener('input', function () {
    const v = this.value.trim();
    if (!v) return setErr('su-email-err', 'Email is required');
    validateEmail(v) ? clearErr('su-email-err') : setErr('su-email-err', 'Enter a valid email');
  });

  document.getElementById('lpLogout').addEventListener('click', () => {
    clearSession();
    applySession(null);
    showStatus('Signed out successfully.', 'success');
    setTimeout(() => popup.classList.remove('open'), 1500);
  });

  /* ── SEED DEFAULT ADMIN (runs once, safe to leave in) ─ */
  (function seedAdmin() {
    const users = getUsers();
    const adminEmail = 'admin@beyondthepass.com';
    if (!users[adminEmail]) {
      users[adminEmail] = { name: 'Site Admin', pw: btoa('ChangeMe123!'), role: 'admin' };
      saveUsers(users);
    }
  })();
  applySession(getSession());
})();

/* ── RENDER TOUR MOSAIC (homepage only) ───────────────── */
function renderTourMosaic() {
  const grid = document.getElementById('tourMosaic');
  if (!grid) return;

  // Map your 6 tours onto the mosaic: big, small, small, big, small, small
  const bigSlots = [0, 3];
  const items = TOURS.slice(0, 6);

  grid.innerHTML = items.map((t, i) => {
    const isBig = bigSlots.includes(i);
    return `
      <div class="tm-card fade-in ${isBig ? 'tm-big' : ''}" data-id="${t.id}">
        <img src="${t.img}" alt="${t.title}" loading="lazy"/>
        <div class="tm-veil"></div>
        <div class="tm-info">
          <p class="tm-type">${t.type}</p>
          <h3 class="tm-name">${t.title}</h3>
          ${isBig ? `<p class="tm-desc">${t.desc}</p>` : ''}
        </div>
      </div>
    `;
  }).join('');

  grid.querySelectorAll('.tm-card').forEach(el => {
    el.addEventListener('click', () => {
      const id = parseInt(el.dataset.id);
      const tour = TOURS.find(t => t.id === id);
      if (tour) openTourModal(tour);
    });
  });
  observeFadeIns();
}
renderTourMosaic();
/* ═══════════════════════════════════════════════════
   CHATBOT
════════════════════════════════════════════════════ */
(function () {
  const toggle    = document.getElementById('chatToggle');
  const win       = document.getElementById('chatWindow');
  const body      = document.getElementById('chatBody');
  const form      = document.getElementById('chatForm');
  const input     = document.getElementById('chatInput');
  const quickWrap = document.getElementById('chatQuick');
  const iconOpen  = document.getElementById('chatIconOpen');
  const iconClose = document.getElementById('chatIconClose');
  if (!toggle || !win) return;

  let opened = false;

  function addMsg(html, from) {
    const div = document.createElement('div');
    div.className = `chat-msg ${from}`;
    div.innerHTML = html;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
    return div;
  }

  function addSuggestions(options) {
    const div = document.createElement('div');
    div.className = 'chat-suggestions';
    div.innerHTML = options.map((o, i) => `<button type="button" data-i="${i}">${o.label}</button>`).join('');
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
    div.querySelectorAll('button').forEach((btn, i) => {
      btn.addEventListener('click', () => {
        div.querySelectorAll('button').forEach(b => b.disabled = true);
        addMsg(options[i].label, 'user');
        setTimeout(() => addMsg(options[i].reply(), 'bot'), 350);
      });
    });
  }

  function priceRange() {
    const prices = TOURS.map(t => t.price);
    return `US$${Math.min(...prices).toLocaleString()} – US$${Math.max(...prices).toLocaleString()}`;
  }
  function tourListHtml() {
    return `<ul>${TOURS.map(t => `<li><strong>${t.title}</strong> — ${t.days}D/${t.nights}N, from US$${t.price}</li>`).join('')}</ul>`;
  }
  function eventListHtml() {
    return `<ul>${EVENTS.map(e => `<li>${e.date} — ${e.name} (${e.loc})</li>`).join('')}</ul>`;
  }
  function findTourByName(msg) {
    return TOURS.find(t => msg.includes(t.title.toLowerCase())) ||
           TOURS.find(t => t.title.toLowerCase().split(' ').some(w => w.length > 4 && msg.includes(w)));
  }

  /* ── KNOWLEDGE BASE ──────────────────────────────────
     Dynamic entries pull live from TOURS/EVENTS.
     Static entries are drawn from the official 30 Bhutan FAQ. */
  const KB = [
    { label: 'Do I need a visa?',
      kw: ['visa', 'passport', 'entry', 'india', 'bangladesh', 'maldives'],
      reply: () => `Most international travelers need a visa — this is usually arranged by us once your trip is confirmed. Indian citizens can enter with a valid passport or voter ID; Bangladeshi and Maldivian citizens have separate entry requirements. Ask us for specifics on your nationality.`
    },
    { label: 'What is the SDF?',
      kw: ['sdf', 'sustainable', 'development', 'fee', 'hidden', 'extra', 'charges'],
      reply: () => `The Sustainable Development Fee (SDF) is a daily fee charged to most international visitors, supporting sustainable tourism, conservation, healthcare, education, and infrastructure in Bhutan. It's included in every one of our packages — no hidden charges.`
    },
    { label: 'Best time to visit Bhutan',
      kw: ['best', 'time', 'season', 'weather', 'climate', 'when', 'visit'],
      reply: () => `Bhutan can be visited year-round:<ul><li><strong>Spring (Mar–May):</strong> Rhododendrons bloom, pleasant weather</li><li><strong>Autumn (Sep–Nov):</strong> Clear views, major festivals</li><li><strong>Winter (Dec–Feb):</strong> Cool, fewer tourists</li><li><strong>Summer (Jun–Aug):</strong> Green landscapes, occasional rain</li></ul>`
    },
    { label: 'How many days should I spend?',
      kw: ['how many days', 'days', 'duration', 'length', 'long'],
      reply: () => `Most visitors spend 5 to 10 days, enough time to cover Thimphu, Paro, Punakha, and nearby attractions comfortably.`
    },
    { label: 'Can I customize my tour?',
      kw: ['customize', 'custom', 'personalize', 'tailor', 'flexible'],
      reply: () => `Yes — we offer fully customizable itineraries based on your interests, travel dates, budget, and preferred activities. Tell us what you have in mind!`
    },
    { label: 'Must-visit places in Bhutan',
      kw: ['place', 'places', 'destination', 'destinations', 'recommend', 'see', 'must-visit', 'mustvisit'],
      reply: () => `Popular destinations include <strong>Paro</strong>, <strong>Thimphu</strong>, <strong>Punakha</strong>, <strong>Bumthang</strong>, <strong>Phobjikha Valley</strong>, <strong>Haa Valley</strong>, and the iconic <strong>Tiger's Nest Monastery</strong> (Paro Taktsang).`
    },
    { label: 'Is Bhutan safe?',
      kw: ['safe', 'safety', 'crime', 'danger', 'secure'],
      reply: () => `Yes — Bhutan is one of the safest countries in the world for travelers. Crime rates are low, and locals are known for their hospitality.`
    },
    { label: 'What currency is used?',
      kw: ['currency', 'money', 'ngultrum', 'rupee'],
      reply: () => `The Bhutanese currency is the Ngultrum (BTN). Indian Rupees are also widely accepted, except for certain denominations depending on current regulations.`
    },
    { label: 'Can I use credit cards?',
      kw: ['credit card', 'card', 'cash', 'atm', 'payment method'],
      reply: () => `Many hotels, restaurants, and shops in major towns accept credit cards, but carrying some cash is recommended for remote areas.`
    },
    { label: 'What languages are spoken?',
      kw: ['language', 'languages', 'dzongkha', 'english speak'],
      reply: () => `The national language is Dzongkha. English is widely spoken in hotels, restaurants, and by tour guides.`
    },
    { label: 'Is Wi-Fi available?',
      kw: ['wifi', 'wi-fi', 'internet', 'connection'],
      reply: () => `Yes — most hotels provide Wi-Fi, and mobile data is available through local SIM cards.`
    },
    { label: 'Can I buy a local SIM?',
      kw: ['sim', 'sim card', 'mobile data'],
      reply: () => `Yes — visitors can purchase local SIM cards at the airport or in major towns by presenting their passport.`
    },
    { label: 'What should I pack?',
      kw: ['pack', 'packing', 'bring', 'clothes', 'clothing', 'luggage'],
      reply: () => `Bring: comfortable walking shoes, warm clothing (especially in winter), a rain jacket (monsoon season), sunscreen, sunglasses, personal medications, and a power adapter (Type D, F, or G).`
    },
    { label: 'Dress code for temples',
      kw: ['dress code', 'dress', 'wear', 'clothing rule', 'modest'],
      reply: () => `When visiting monasteries, temples, and dzongs: wear modest clothing, cover shoulders and knees, and remove hats before entering religious buildings.`
    },
    { label: "Hiking Tiger's Nest",
      kw: ['tiger', 'taktsang', 'hike', 'hiking'],
      reply: () => `Yes — the hike to Tiger's Nest Monastery takes approximately 4–6 hours round trip depending on your pace. A moderate level of fitness is recommended.`
    },
    { label: 'What is included?',
      kw: ['include', 'includes', 'included', 'inclusive'],
      reply: () => `Most packages include: accommodation, a licensed tour guide, private transportation, sightseeing, entry permits, airport transfers, and meals (varies by package).`
    },
    { label: 'What is not included?',
      kw: ['not included', 'exclude', 'excludes', 'excluded', 'extra cost'],
      reply: () => `Usually not included: international flights, travel insurance, personal expenses, alcoholic beverages, tips, and optional activities.`
    },
    { label: 'Do I need travel insurance?',
      kw: ['insurance', 'medical cover', 'evacuation'],
      reply: () => `Yes — we strongly recommend comprehensive travel insurance covering medical emergencies, trip cancellations, and evacuation.`
    },
    { label: 'Solo travel to Bhutan',
      kw: ['solo', 'alone', 'single traveler', 'by myself'],
      reply: () => `Absolutely — solo travelers are welcome, and we create personalized itineraries for individuals.`
    },
    { label: 'Family vacations',
      kw: ['family', 'kids', 'children', 'child'],
      reply: () => `Yes — Bhutan is excellent for families, offering cultural experiences, nature, wildlife, and easy hiking options.`
    },
    { label: 'Festivals in Bhutan',
      kw: ['festival', 'festivals', 'tshechu', 'drubchen', 'lhakhang drup'],
      reply: () => `Bhutan hosts colorful festivals year-round, including Paro Tshechu, Thimphu Tshechu, Punakha Drubchen, and Jambay Lhakhang Drup. Here's what's coming up:${eventListHtml()}`
    },
    { label: 'Altitude sickness',
      kw: ['altitude', 'sickness', 'high altitude', 'elevation'],
      reply: () => `Some areas sit above 2,500m. Most travelers adjust well, but staying hydrated, resting, and ascending gradually helps minimize altitude-related discomfort.`
    },
    { label: 'Photography rules',
      kw: ['photo', 'photograph', 'photography', 'camera', 'pictures'],
      reply: () => `Photography is generally allowed outside religious buildings but may be restricted inside temples and monasteries — always follow your guide's instructions and posted signs.`
    },
    { label: 'How do I book a tour?',
      kw: ['book', 'booking', 'reserve', 'reservation'],
      reply: () => `Simply contact us through this website, email, or WhatsApp. We'll discuss your plans, customize an itinerary, confirm your booking, and assist with visa arrangements if needed.`
    },
    { label: 'Payment methods',
      kw: ['payment', 'pay', 'bank transfer', 'online payment'],
      reply: () => `We accept international bank transfers and, where available, secure online payments. Full details are shared during the booking process.`
    },
    { label: 'Cancellation policy',
      kw: ['cancel', 'cancellation', 'refund', 'reschedule', 'change booking'],
      reply: () => `Changes and cancellations are subject to our booking policy — 30–15 days before arrival: 20% fee; 14–7 days: 50% fee; under a week: 100% fee. Rescheduling is free, though hotel/airline rates may vary. Contact us as early as possible if plans change.`
    },
    { label: 'Airport transfers',
      kw: ['airport', 'transfer', 'pickup', 'drop-off', 'dropoff'],
      reply: () => `Yes — complimentary airport pickup and drop-off are included in most tour packages.`
    },
    { label: 'Special experiences',
      kw: ['homestay', 'photography tour', 'birdwatching', 'cycling', 'wellness', 'meditation', 'honeymoon', 'luxury'],
      reply: () => `We can arrange cultural experiences, village homestays, trekking adventures, photography tours, birdwatching, cycling tours, wellness & meditation retreats, luxury holidays, and honeymoon packages.`
    },
    { label: 'How far in advance to book?',
      kw: ['advance', 'ahead', 'early', 'how soon'],
      reply: () => `We recommend booking at least 2–3 months in advance, especially for spring or autumn travel when demand is highest.`
    },
    { label: 'Why book with us?',
      kw: ['why book', 'why choose', 'why you', 'why us'],
      reply: () => `We provide experienced local guides, customized itineraries, transparent pricing, reliable support, comfortable transportation, and authentic Bhutanese travel experiences for a memorable journey.`
    },
    { label: 'Tour pricing',
      kw: ['price', 'cost', 'much', 'pricing', 'rate', 'expensive', 'budget'],
      reply: (msg) => {
        const t = findTourByName(msg || '');
        if (t) return `<strong>${t.title}</strong> starts from <strong>US$${t.price}</strong> for ${t.days} days / ${t.nights} nights, per person.`;
        return `Our tours range from ${priceRange()}, depending on duration and season.${tourListHtml()}`;
      }
    },
    { label: 'Our tour packages',
      kw: ['tour', 'package', 'trip', 'itinerary', 'offer'],
      reply: (msg) => {
        const t = findTourByName(msg || '');
        if (t) return `<strong>${t.title}</strong>: ${t.desc} Runs ${t.days} days / ${t.nights} nights, from US$${t.price}.`;
        return `Here are our current tour packages:${tourListHtml()}Ask me about any one by name for more!`;
      }
    },
    { label: 'Trekking routes',
      kw: ['trek', 'trekking', 'camp', 'camping'],
      reply: () => {
        const treks = TOURS.filter(t => t.type === 'trekking' || t.type === 'adventure');
        return `Our trekking/adventure routes:<ul>${treks.map(t => `<li><strong>${t.title}</strong> — ${t.days}D/${t.nights}N, from US$${t.price}</li>`).join('')}</ul>`;
      }
    },
    { label: 'Car hire',
      kw: ['car', 'hire', 'rental', 'vehicle'],
      reply: () => `Private car hire with a licensed driver is included in every tour package. Standalone hire is also possible — ask us in the Contact section.`
    },
    { label: 'Contact us',
      kw: ['whatsapp', 'contact', 'phone', 'call', 'email', 'reach'],
      reply: () => `Reach us on WhatsApp at +975 77 456 789, or use the contact form near the bottom of this page.`
    }
  ];

  function scoreAll(msg) {
    return KB.map(entry => ({
      entry,
      score: entry.kw.filter(k => msg.includes(k)).length
    })).sort((a, b) => b.score - a.score);
  }

  function getResponse(rawMsg) {
    const msg = rawMsg.toLowerCase();
    const ranked = scoreAll(msg);
    const top = ranked[0];
    const second = ranked[1];

    if (!top || top.score === 0) return { type: 'none' };

    // Confident: clear single winner with decent signal
    if (top.score >= 2 && (!second || top.score - second.score >= 2)) {
      return { type: 'answer', html: top.entry.reply(msg) };
    }

    // Ambiguous: weak or close-scoring — offer choices instead of guessing
    const candidates = ranked.filter(r => r.score > 0).slice(0, 3);
    if (candidates.length > 1 || top.score === 1) {
      return { type: 'clarify', options: candidates.map(c => c.entry) };
    }

    return { type: 'answer', html: top.entry.reply(msg) };
  }

  function handleUserMessage(text) {
    if (!text.trim()) return;
    addMsg(text, 'user');
    input.value = '';
    setTimeout(() => {
      const res = getResponse(text);
      if (res.type === 'answer') {
        addMsg(res.html, 'bot');
      } else if (res.type === 'clarify') {
        addMsg(`Did you mean one of these?`, 'bot');
        addSuggestions(res.options);
      } else {
        addMsg(`I don't have an exact answer for that yet — try asking about visas, the SDF, best time to visit, packing, festivals, pricing, or booking. Or reach our team on WhatsApp at +975 77 456 789.`, 'bot');
      }
    }, 450);
  }

  const QUICK_REPLIES = ['Show me all tours', 'What is the SDF?', 'Upcoming festivals', 'How do I book?'];
  function renderQuick() {
    quickWrap.innerHTML = QUICK_REPLIES.map(q => `<button type="button">${q}</button>`).join('');
    quickWrap.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => handleUserMessage(btn.textContent));
    });
  }

  toggle.addEventListener('click', () => {
    opened = !opened;
    win.classList.toggle('open', opened);
    iconOpen.style.display = opened ? 'none' : 'block';
    iconClose.style.display = opened ? 'block' : 'none';
    if (opened && !body.hasChildNodes()) {
      addMsg(`Hi! I'm the Beyond The Pass Exploration assistant. Ask me about tours, pricing, visas, festivals, packing, or booking.`, 'bot');
      renderQuick();
    }
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    handleUserMessage(input.value);
  });
})();
/* ═══════════════════════════════════════════════════
   REVIEW SUBMISSION FORM (review.html only)
════════════════════════════════════════════════════ */
(function () {
  const form = document.getElementById('reviewForm');
  if (!form) return;

  const starPicker = document.getElementById('starPicker');
  const starInput  = document.getElementById('starValue');
  const tripSelect = document.getElementById('reviewTrip');
  const msgEl      = document.getElementById('reviewMsg');

  if (tripSelect) {
    const plainLabel = t => t.title;
    const fullLabel  = t => `${t.title} (${t.days}D/${t.nights}N)`;

    function buildTripOptions(withDuration) {
      tripSelect.innerHTML = '<option value="">Select a tour…</option>' +
        TOURS.map(t => `<option value="${t.title}">${withDuration ? fullLabel(t) : plainLabel(t)}</option>`).join('') +
        '<option value="Other">Other / Custom Trip</option>';
    }

    buildTripOptions(false); // closed state: plain tour name only

    // Show duration only while the dropdown is open / being browsed
    tripSelect.addEventListener('mousedown', () => {
      const current = tripSelect.value;
      buildTripOptions(true);
      tripSelect.value = current;
    });
    tripSelect.addEventListener('focus', () => {
      const current = tripSelect.value;
      buildTripOptions(true);
      tripSelect.value = current;
    });
    // Revert to plain name once a choice is made / dropdown closes
    tripSelect.addEventListener('change', () => {
      const current = tripSelect.value;
      buildTripOptions(false);
      tripSelect.value = current;
      const customWrap = document.getElementById('customTripReviewWrap');
      if (customWrap) customWrap.style.display = current === 'Other' ? 'block' : 'none';
    });
    tripSelect.addEventListener('blur', () => {
      const current = tripSelect.value;
      buildTripOptions(false);
      tripSelect.value = current;
    });
  }

  let selectedStars = 0;
  function renderStarPicker() {
    starPicker.innerHTML = Array.from({ length: 5 }, (_, i) => {
      const n = i + 1;
      const filled = n <= selectedStars;
      return `<i class="fa-solid fa-star" data-n="${n}" style="cursor:pointer;font-size:1.7rem;margin-right:6px;color:${filled ? '#d4af37' : '#ddd'};transition:color 0.15s;"></i>`;
    }).join('');
    starPicker.querySelectorAll('i').forEach(icon => {
      icon.addEventListener('click', () => {
        selectedStars = parseInt(icon.dataset.n);
        starInput.value = selectedStars;
        renderStarPicker();
      });
    });
  }
  renderStarPicker();

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('reviewName').value.trim();
    let trip = tripSelect.value;

    if (trip === 'Other') {
      const customTripInput = document.getElementById('customTripReviewInput');
      const customTrip = customTripInput ? customTripInput.value.trim() : '';
      if (!customTrip) {
        msgEl.style.color = '#e53935';
        msgEl.textContent = 'Please tell us about your trip.';
        return;
      }
      trip = customTrip;
    }

    const text = document.getElementById('reviewText').value.trim();

    if (!name || !trip || !text || !selectedStars) {
      msgEl.style.color = '#e53935';
      msgEl.textContent = 'Please fill in your name, select a trip, choose a rating, and write your review.';
      return;
    }

    ReviewStore.addReview({
      stars: selectedStars,
      text,
      name,
      location: 'Verified Guest',
      trip,
      img: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0a0a0a&color=fff`
    });

    form.style.display = 'none';
    msgEl.style.color = '#2e7d52';
    msgEl.textContent = '✓ Thank you! Your review has been submitted.';
    document.getElementById('googlePrompt').style.display = 'block';
    selectedStars = 0;
  });
})();
