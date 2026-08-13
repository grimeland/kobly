export type District = {
  /** Slug uten norske tegn: grunerlokka, sondre-nordstrand, st-hanshaugen, ostensjo. */
  slug: string;
  name: string;
  /** Kort setning under H1. */
  lead: string;
  /** To redaksjonelle avsnitt med lokal teksture. Unike per bydel. */
  intro: [string, string];
  /** Kjente nabolag og områder i bydelen. */
  areas: string[];
  /** Typisk boligmasse. */
  housing: string;
  /** Den flytterelevante detaljen som skiller bydelen fra naboene. */
  movingTip: { title: string; body: string };
  metaDescription: string;
};

export const DISTRICTS: District[] = [
  {
    slug: "alna",
    name: "Alna",
    lead: "Groruddalens sørside, med blokker, borettslag og Norges største godsterminal som nabo.",
    intro: [
      "Alna strekker seg fra Teisen i vest til Furuset i øst, og boligmassen er i stor grad blokker og rekkehus reist mellom 1960 og 1980. Det betyr romslige planløsninger, brede oppganger og heis i de fleste høyblokkene, noe som gjør flyttingen enklere enn i indre by. Til gjengjeld er mange av borettslagene organisert med felles innkjørsel og begrenset stopptid rett utenfor inngangen.",
      "Bydelen er godt dekket av T-banens linje 1 og 2, og Strømsveien og Østre Aker vei gir flyttebilene rask tilkomst fra E6. De fleste byråene som jobber i Groruddalen har lager på Alnabru, som ligger i bydelen, og det korter ned kjøretiden hvis du trenger mellomlagring mellom to overtakelser.",
    ],
    areas: ["Furuset", "Lindeberg", "Trosterud", "Haugerud", "Teisen", "Alnabru"],
    housing: "Blokker og rekkehus i borettslag, hovedsakelig fra 1960- og 70-tallet",
    movingTip: {
      title: "Meld fra til styret om flyttedagen",
      body: "De fleste borettslagene på Alna har regler for hvor lenge en flyttebil kan stå ved inngangen, og noen krever at heisen bookes på forhånd. En telefon til styret et par uker før sparer deg for en dyr ventetime på flyttedagen.",
    },
    metaDescription:
      "Skal du flytte til eller fra Alna? Få 3 uforpliktende tilbud fra kvalitetssjekkede flyttebyråer som kjenner Furuset, Lindeberg og Haugerud.",
  },
  {
    slug: "bjerke",
    name: "Bjerke",
    lead: "Fra nye leilighetskvartaler på Løren til etterkrigsborettslag på Veitvet.",
    intro: [
      "Bjerke er bydelen med størst kontrast i boligmasse. Løren og Økern er bygget ut på 2010- og 2020-tallet med moderne leilighetsbygg, felles takterrasser og parkeringskjellere, mens Veitvet, Linderud og Årvoll består av borettslag fra 1950- og 60-tallet. Flyttebehovet ser helt ulikt ut i de to delene av bydelen.",
      "Bor du på Løren, er selve flyttingen ofte enkel: bred heis, korte avstander og innendørs lasting. Utfordringen er høydebegrensningen i garasjenedkjørslene, som gjør at en stor flyttebil ikke kommer inn. Da må byrået laste fra gateplan, og det tar lengre tid enn folk regner med.",
    ],
    areas: ["Løren", "Økern", "Veitvet", "Linderud", "Årvoll", "Refstad"],
    housing: "Nyere leilighetsbygg på Løren og Økern, borettslag fra etterkrigstiden ellers",
    movingTip: {
      title: "Sjekk høyden i garasjenedkjøringen",
      body: "Nybyggene på Løren har typisk 2,0 til 2,2 meter fri høyde i garasjen. En vanlig flyttebil er over tre meter. Si fra om dette når du henter inn tilbud, så prises jobben riktig fra start.",
    },
    metaDescription:
      "Flyttebyrå i Bjerke: få 3 gratis tilbud fra byråer som kjenner Løren, Økern, Veitvet og Årvoll. Uforpliktende og ferdig på to minutter.",
  },
  {
    slug: "frogner",
    name: "Frogner",
    lead: "Store leiligheter i bygårder fra århundreskiftet, med alt det innebærer av trapper.",
    intro: [
      "Frogner har Oslos mest påkostede boligmasse fra 1890- til 1910-tallet. Leilighetene er store, takhøyden er fire meter, og trappene er brede og staselige. Men mange av gårdene mellom Skillebekk, Uranienborg og Frognerparken mangler heis, og der det finnes heis, er den ofte en original som verken tar en sofa eller to personer med bæresele.",
      "Legg til at flere av leilighetene inneholder ting som krever spesialhåndtering: flygel, tunge antikvitetsmøbler, speil og kunst. Byråer som jobber mye på Frogner tar dette på befaring før de gir pris, og det er som regel verdt de tjue minuttene det tar.",
    ],
    areas: ["Majorstuen", "Skillebekk", "Uranienborg", "Bygdøy", "Frognerparken", "Briskeby"],
    housing: "Store leiligheter i bygårder fra 1890 til 1910, samt villaer på Bygdøy",
    movingTip: {
      title: "Be om befaring når du har verdifullt innbo",
      body: "Flygel, antikviteter og kunst påvirker både pris og forsikringsbehov. Et byrå som har sett tingene på forhånd, gir et tilbud som holder, og du unngår diskusjonen om hva som var inkludert.",
    },
    metaDescription:
      "Flyttebyrå på Frogner: få 3 tilbud gratis fra byråer med erfaring fra bygårder uten heis, flygeltransport og verdifullt innbo.",
  },
  {
    slug: "gamle-oslo",
    name: "Gamle Oslo",
    lead: "Trehusidyll på Kampen og Vålerenga, glassfasader i Bjørvika, alt innenfor samme bydel.",
    intro: [
      "Gamle Oslo rommer to helt ulike flyttesituasjoner. På Kampen og Vålerenga står små trehus og lave arbeiderbygårder i smale gater der en stor flyttebil rett og slett ikke kommer frem. Der løses jobben ofte med mindre biler og flere turer, og det bør stå i tilbudet du får.",
      "I Bjørvika, på Ensjø og langs Grønland er situasjonen motsatt: moderne bygg med varemottak, lastesone og heis som må bookes i forkant hos driftsavdelingen. Der er selve bæringen enkel, men logistikken krever at noen har gjort avtalene på forhånd.",
    ],
    areas: ["Grønland", "Tøyen", "Kampen", "Vålerenga", "Ensjø", "Bjørvika"],
    housing: "Trehus og arbeiderbygårder på Kampen og Vålerenga, nye leilighetsbygg i Bjørvika og på Ensjø",
    movingTip: {
      title: "Book vareheisen i nybyggene",
      body: "I Barcode og på Ensjø må vareheis og lastesone reserveres, ofte flere dager i forveien. Uten booking risikerer du at flyttelasset står i gata mens noen leter etter en vaktmester.",
    },
    metaDescription:
      "Flyttebyrå i Gamle Oslo: 3 gratis tilbud fra byråer som kjenner Kampen, Tøyen, Grønland og Bjørvika. Uforpliktende.",
  },
  {
    slug: "grorud",
    name: "Grorud",
    lead: "Bydelen der Romsås ligger bilfritt på toppen og resten ligger langs T-banen.",
    intro: [
      "Grorud er preget av utbyggingen på 1960- og 70-tallet, med blokker på Ammerud, Rødtvet og Kalbakken. Boligene er romslige og oppgangene brede, og de fleste høyblokkene har heis som takler både sofa og kjøleskap uten problemer.",
      "Romsås skiller seg ut. Området ble bygget bilfritt, med parkering i felles P-hus og gangveier inn til blokkene. Det gir et rolig bomiljø, men også en bæreavstand fra bil til inngangsdør som kan være over hundre meter. Byråer som kjenner Romsås tar med seg ekstra tralle og regner inn tiden.",
    ],
    areas: ["Ammerud", "Rødtvet", "Kalbakken", "Romsås", "Grorud sentrum", "Nordtvet"],
    housing: "Blokker og rekkehus fra 1960- og 70-tallet, i stor grad borettslag",
    movingTip: {
      title: "Regn med bæreavstand på Romsås",
      body: "Bilfrie Romsås betyr at flyttebilen må stå i P-huset eller ved gangveien. Si fra om hvilken blokk du bor i når du ber om tilbud, så byrået kan prise bæreavstanden riktig.",
    },
    metaDescription:
      "Flyttebyrå i Grorud: få 3 tilbud gratis fra byråer som kjenner Ammerud, Rødtvet og bilfrie Romsås.",
  },
  {
    slug: "grunerlokka",
    name: "Grünerløkka",
    lead: "Fire etasjer, ingen heis og en gate der det aldri er ledig parkering.",
    intro: [
      "Grünerløkka er Oslos tettest bebygde bydel, og boligmassen består nesten utelukkende av bygårder i fire og fem etasjer fra 1880- til 1900-tallet. De færreste har heis. Det betyr at antall etasjer er den enkeltfaktoren som påvirker prisen mest når du henter inn tilbud, ofte med tjue til tretti prosent mellom første og fjerde etasje.",
      "Den andre utfordringen er gata. Rundt Birkelunden, Sofienberg og Thorvald Meyers gate er gateparkeringen full døgnet rundt, og flyttebilen må enten stå i kollektivfelt eller på fortauet. Seriøse byråer søker Bymiljøetaten om dispensasjon i forkant. Spør om det er inkludert når du sammenligner tilbud.",
    ],
    areas: ["Birkelunden", "Sofienberg", "Dælenenga", "Rodeløkka", "Nedre Løkka", "Torshovdalen"],
    housing: "Bygårder i fire og fem etasjer fra 1880 til 1900, de fleste uten heis",
    movingTip: {
      title: "Avklar parkering før flyttedagen",
      body: "Dispensasjon for flyttebil søkes hos Bymiljøetaten og bør være på plass noen dager i forveien. Uten den risikerer bilen bot, og du betaler for tiden sjåføren bruker på å flytte den.",
    },
    metaDescription:
      "Flyttebyrå på Grünerløkka: 3 gratis tilbud fra byråer som er vant til bygårder uten heis og trang gateparkering.",
  },
  {
    slug: "nordre-aker",
    name: "Nordre Aker",
    lead: "Hagebyer, studentboliger og Nydalens leilighetsbygg i samme bydel.",
    intro: [
      "Nordre Aker spenner fra Ullevål hageby med sine vernede rekkehus, via studentbyene på Sogn og Kringsjå, til de store leilighetsprosjektene i Nydalen og på Storo. Flyttingen ser ulik ut i hver av dem, og det er verdt å være tydelig om hvor du bor når du ber om tilbud.",
      "I hagebyene er husene små og trappene bratte, og mange av gatene er så smale at bilen må stå et stykke unna. I Nydalen er alt tilrettelagt med vareheis og lastesone. Studentbyene har egne regler for inn- og utflytting, og de faller ofte på faste datoer der alle flytter samtidig.",
    ],
    areas: ["Ullevål hageby", "Tåsen", "Kringsjå", "Sogn", "Nydalen", "Storo"],
    housing: "Rekkehus i hagebyer, studentboliger og nyere leilighetsbygg i Nydalen",
    movingTip: {
      title: "Studentflytting skjer på de samme dagene",
      body: "Rundt semesterstart flytter alle på Sogn og Kringsjå i samme uke. Bestill byrå tidlig, eller legg flyttingen et par dager utenfor toppen, så får du både bedre pris og flere ledige datoer.",
    },
    metaDescription:
      "Flyttebyrå i Nordre Aker: få 3 tilbud gratis fra byråer som kjenner Ullevål hageby, Tåsen, Nydalen og studentbyene.",
  },
  {
    slug: "nordstrand",
    name: "Nordstrand",
    lead: "Utsikt over fjorden, og bratte bakker mellom bilen og inngangsdøra.",
    intro: [
      "Nordstrand er villabydelen på Oslos østside, med eneboliger og tomannsboliger fra Ekeberg i nord til Ljan i sør. Mange av husene ligger i skrånende terreng med utsikt mot fjorden, og det er nettopp høydeforskjellen som gjør flyttingen her annerledes enn i resten av byen.",
      "Innkjørslene er ofte bratte og smale, og fra parkeringsplassen til inngangsdøra kan det være en trapp på tjue trinn gjennom hagen. Om vinteren kommer is i tillegg. Lambertseter og Karlsrud skiller seg ut med blokkbebyggelse fra 1950-tallet, der flyttingen er langt mer rett frem.",
    ],
    areas: ["Ljan", "Bekkelaget", "Ekeberg", "Lambertseter", "Karlsrud", "Sæter"],
    housing: "Eneboliger og tomannsboliger i skrånende terreng, blokker på Lambertseter",
    movingTip: {
      title: "Beskriv adkomsten, ikke bare adressen",
      body: "En bratt innkjørsel og tjue trappetrinn gjennom hagen er reelt merarbeid. Nevn det når du henter inn tilbud, så slipper du prisjustering på selve flyttedagen.",
    },
    metaDescription:
      "Flyttebyrå på Nordstrand: 3 gratis tilbud fra byråer som er vant til bratte innkjørsler på Ljan, Bekkelaget og Ekeberg.",
  },
  {
    slug: "sagene",
    name: "Sagene",
    lead: "Arbeiderbyens bygårder langs Akerselva, mange av dem uten heis.",
    intro: [
      "Sagene ble bygget for arbeiderne ved fabrikkene langs Akerselva, og bygårdene fra 1890- til 1930-tallet står fortsatt tett i Torshov, Bjølsen og Iladalen. Leilighetene er jevnt over mindre enn på Frogner, men trappene er de samme: smale, svingete og uten heis.",
      "Bydelen har hatt en kraftig oppgradering av borettslagene de siste tiårene, og flere gårder har fått installert heis i bakgården. Det er verdt å sjekke hva som gjelder i din oppgang før du henter inn tilbud, for det utgjør flere tusen kroner på prisen.",
    ],
    areas: ["Torshov", "Bjølsen", "Iladalen", "Sandaker", "Åsen", "Lilleborg"],
    housing: "Bygårder fra 1890 til 1930, mange oppgraderte borettslag",
    movingTip: {
      title: "Finn ut om oppgangen har fått heis",
      body: "Flere Sagene-borettslag har ettermontert heis i bakgården de siste årene. Vet du at den finnes, og at den er stor nok for møbler, får du raskere og rimeligere tilbud.",
    },
    metaDescription:
      "Flyttebyrå på Sagene: få 3 tilbud gratis fra byråer som kjenner Torshov, Bjølsen og bygårdene langs Akerselva.",
  },
  {
    slug: "st-hanshaugen",
    name: "St. Hanshaugen",
    lead: "Sentrumsnært, tett trafikkert og fullt av små leiligheter.",
    intro: [
      "St. Hanshaugen ligger som en ring rundt parken med samme navn, og strekker seg fra Bislett og Fagerborg til Ila og Adamstuen. Boligmassen er bygårder fra rundt år 1900, og andelen små leiligheter er høy. Det betyr mange flyttinger, ofte med kort varsel og lite innbo.",
      "Utfordringen her er trafikken. Gatene rundt Bislett, Ullevålsveien og Waldemar Thranes gate har trikk, bussfelt og gjennomgangstrafikk, og en flyttebil som står feil skaper kø umiddelbart. De fleste byråene legger derfor flyttinger i dette området utenom rushtiden, og du får ofte bedre pris hvis du kan flytte midt på dagen.",
    ],
    areas: ["Bislett", "Fagerborg", "Adamstuen", "Ila", "Lindern", "Stensparken"],
    housing: "Bygårder fra rundt 1900, høy andel små leiligheter",
    movingTip: {
      title: "Unngå rushtiden",
      body: "Trikketraseer og bussfelt gjør flytting mellom klokka sju og ni krevende her. Legger du flyttingen til midt på dagen, går den raskere, og timeprisen slår ut i din favør.",
    },
    metaDescription:
      "Flyttebyrå på St. Hanshaugen: 3 gratis tilbud fra byråer som kjenner Bislett, Fagerborg og Adamstuen.",
  },
  {
    slug: "stovner",
    name: "Stovner",
    lead: "Groruddalens nordligste bydel, med god plass rundt blokkene.",
    intro: [
      "Stovner ligger øverst i Groruddalen, med Vestli som endestasjon på T-banens linje 5. Boligene er i hovedsak blokker og rekkehus fra 1970-tallet, bygget med romslige uteområder og god avstand mellom byggene. For flytting er det stort sett gode nyheter: parkering rett ved inngangen og heis i de fleste høyblokkene.",
      "Avstanden fra sentrum er den viktigste prisfaktoren her. Flytter du innad i bydelen eller videre nordover i Groruddalen, er kjøretiden kort. Skal du til indre by, bør du regne med at byrået tar betalt for tilkjøring, og det er verdt å sammenligne tilbud nettopp på det punktet.",
    ],
    areas: ["Vestli", "Fossum", "Haugenstua", "Rommen", "Tokerud", "Stovner senter"],
    housing: "Blokker og rekkehus fra 1970-tallet med god plass rundt byggene",
    movingTip: {
      title: "Sammenlign tilkjøringstillegget",
      body: "Byråer priser kjøringen til Groruddalen ulikt. Når du får tre tilbud på samme flytting, ser du raskt hvem som har lagt inn et stort tillegg og hvem som ikke har det.",
    },
    metaDescription:
      "Flyttebyrå på Stovner: få 3 tilbud gratis fra byråer som kjører Vestli, Haugenstua og Rommen til fast pris.",
  },
  {
    slug: "sondre-nordstrand",
    name: "Søndre Nordstrand",
    lead: "Oslos sørligste bydel, med rekkehus, lave blokker og mye grønt mellom husene.",
    intro: [
      "Søndre Nordstrand omfatter Holmlia, Mortensrud, Bjørndal og Prinsdal, og ble i stor grad bygget ut på 1970- og 80-tallet. Boligene er en blanding av rekkehus, terrassehus og lave blokker, ofte organisert i store borettslag med felles parkering et stykke fra inngangen.",
      "Terrassehusene er den lokale spesialiteten. De ligger i skrånende terreng med inngang fra ulike nivåer, og det er ikke alltid åpenbart hvilken vei som er kortest inn til leiligheten. Et byrå som har vært der før, vet hvilken side av bygget de skal kjøre til, og det sparer en halvtime på flyttedagen.",
    ],
    areas: ["Holmlia", "Mortensrud", "Bjørndal", "Prinsdal", "Hauketo", "Klemetsrud"],
    housing: "Rekkehus, terrassehus og lave blokker fra 1970- og 80-tallet",
    movingTip: {
      title: "Forklar hvilket nivå inngangen ligger på",
      body: "I terrassehusene på Holmlia og Bjørndal kan samme adresse ha adkomst fra to sider. Beskriv hvilken vei som fører til din dør, så finner ikke flyttebilen feil side av bygget.",
    },
    metaDescription:
      "Flyttebyrå i Søndre Nordstrand: 3 gratis tilbud fra byråer som kjenner Holmlia, Mortensrud og Bjørndal.",
  },
  {
    slug: "ullern",
    name: "Ullern",
    lead: "Villaveier på Ullernåsen og kontorbygg og nybygg på Skøyen.",
    intro: [
      "Ullern deles naturlig i to. Oppe på Ullernåsen, Montebello og Bestum ligger villaene fra mellomkrigstiden, med hager, garasjer og god plass til en flyttebil i innkjørselen. Nede på Skøyen er det moderne leilighetsbygg og kontorer, med lastesoner og vareheis.",
      "Skøyen er dessuten et av Oslos største kontorområder, og mange av byråene som dekker Ullern tar både privatflytting og bedriftsflytting. Det er en fordel hvis du flytter hjemmekontoret med deg, eller skal ha noe mellomlagret mens du pusser opp.",
    ],
    areas: ["Skøyen", "Ullernåsen", "Montebello", "Bestum", "Lilleaker", "Sollerud"],
    housing: "Villaer fra mellomkrigstiden på åsen, nyere leilighetsbygg på Skøyen",
    movingTip: {
      title: "Villaflytting går raskere enn du tror",
      body: "Med bil i innkjørselen og inngang på bakkeplan er bæringen kort, og mange byråer priser dette lavere per kubikkmeter enn en leilighet i fjerde etasje. Be om fastpris, så ser du forskjellen.",
    },
    metaDescription:
      "Flyttebyrå i Ullern: få 3 tilbud gratis fra byråer som kjenner Skøyen, Montebello og villaveiene på Ullernåsen.",
  },
  {
    slug: "vestre-aker",
    name: "Vestre Aker",
    lead: "Store eneboliger, lange oppkjørsler og bakker som merkes om vinteren.",
    intro: [
      "Vestre Aker strekker seg oppover mot marka, fra Vinderen og Slemdal til Holmenkollen og Voksen. Boligene er i hovedsak store eneboliger med hage, garasje og kjeller, og det er nettopp volumet som preger flyttingen: en enebolig her rommer gjerne dobbelt så mye som en leilighet i indre by.",
      "Terrenget er den andre faktoren. Oppkjørslene er lange og bratte, og fra november til mars kan de være islagte. Byråer som kjører mye i Vestre Aker har vinterdekk og strøsand i bilen, og de sier fra hvis de mener bilen ikke kommer trygt opp til huset.",
    ],
    areas: ["Vinderen", "Slemdal", "Holmenkollen", "Røa", "Voksen", "Besserud"],
    housing: "Store eneboliger med hage, garasje og kjeller",
    movingTip: {
      title: "Regn med større volum enn du tror",
      body: "Kjeller, loft og garasje utgjør ofte en tredjedel av lasset i en enebolig. Ta en runde i alle tre før du oppgir størrelse, ellers blir bilen for liten og dagen for lang.",
    },
    metaDescription:
      "Flyttebyrå i Vestre Aker: 3 gratis tilbud fra byråer som er vant til eneboliger på Vinderen, Slemdal og Holmenkollen.",
  },
  {
    slug: "ostensjo",
    name: "Østensjø",
    lead: "Femti- og sekstitallets Oslo rundt Østensjøvannet, bygget for barnefamilier.",
    intro: [
      "Østensjø ble bygget ut i tiårene etter krigen, og rekkehusene og lavblokkene på Bøler, Oppsal og Manglerud står fortsatt som de ble tegnet: praktiske planløsninger, egen bod og parkering nær inngangen. Det er en av de enkleste bydelene å flytte i, rent praktisk.",
      "Boden er verdt en egen kommentar. Nesten alle boligene her har kjellerbod eller utebod, og de blir konsekvent glemt når folk anslår hvor mye de eier. Ski, dekk, hagemøbler og malingsspann utgjør fort flere kubikkmeter som ikke var med i tilbudet.",
    ],
    areas: ["Bøler", "Oppsal", "Manglerud", "Skøyenåsen", "Abildsø", "Godlia"],
    housing: "Rekkehus og lavblokker fra 1950- og 60-tallet, de fleste med bod",
    movingTip: {
      title: "Husk boden når du anslår volum",
      body: "Kjellerboden er den vanligste grunnen til at et flyttelass blir større enn planlagt. Åpne den før du fyller ut forespørselen, så blir tilbudene du får treffsikre.",
    },
    metaDescription:
      "Flyttebyrå i Østensjø: få 3 tilbud gratis fra byråer som kjenner Bøler, Oppsal og Manglerud.",
  },
];

export function getDistrict(slug: string): District | undefined {
  return DISTRICTS.find((d) => d.slug === slug);
}
