# taskNFQ

#Apie

Atliktos 1, 2 dalys ir paliesta 3 dalis
Tinklapis skirtas ligoninės klientams administruoti, pašalinti, specialistams juos aptarnauti,
švieslentei rodyti klientų laukiančių eilėje sąrašą ir lankytojo puslapis, kur lankytojas gali pamatyti 
tik jam skirtą laiką, tereikia įvesti unikalų kodą gautą registracijos metu.

#Administracijos puslapis

Galimybė pridėti papildomus klientus. Pridėjus klientus juos išsaugoti į localStorage. Jei klientų failo nepavyks nuskaityti, puslapyje atsiras užrašas, jog nepavyko. Papildomus klientus pridėjus į localStorage, jie sėkmingai bus patalpinti ir išsaugoti.

#Švieslentės puslapis

Galima matyti pirmus 4 klientus pas specialistą, rodomas numeris eilėje, vardas(vardą galima irašyti iškart su pavarde, pavyzdinis fialas tik su vardu), unikalus numeris kliento ir laikas kiek liko laukti aukščiausiai eilėje esančiam klientui pas specialistą

#Specialisto puslapis

Leidžia filtruoti klientų duomenis pagal specialistą, leidžia klientus aptarnauti ir rodo laiką per kiek jis aptarnautas,
jei vietoj laiko yra simbolis "-", tai reiškia, kad klientas atšaukė savo registracija.
Taip pat vietoj numerio klientas numeris pakkeičiamas simboliu "-", nes jis aptranutas.

#Lankytojo puslapis

Leidžia surasti, pagal unikalu numeri klientą, pamatyti jo duomenis ir laukimo laiką, atnaujinama kas 5s.
Leidža atšaukti registraciją