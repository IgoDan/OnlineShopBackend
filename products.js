const products = [
    {
        id:1,
        name: "Kawa mocna LUCIFER'S ROAST",
        desc: "Bardzo mocna, cierpienie w płynie",
        price: 25,
        image: "https://res.cloudinary.com/det2l5eu2/image/upload/v1687005011/OnlineShop/kawa-mocna_uog9ij.png",
        type: "Kawa"
    },
    {
        id:2,
        name: "Kawa lekka Dallmayr Barista Dolce",
        desc: "Lekka i pożywna dla dzieci i niemowląt",
        price: 30,
        image: "https://res.cloudinary.com/det2l5eu2/image/upload/v1687005011/OnlineShop/kawa-lekka_jfs58q.png",
        type: "Kawa"
    },
    {
        id:3,
        name: "Kawa owocowa FLOW Juicy Fruit",
        desc: "Bratku mniam",
        price: 40,
        image: "https://res.cloudinary.com/det2l5eu2/image/upload/v1687005011/OnlineShop/kawa_owocowa_r7gqdj.png",
        type: "Kawa"
    },
    {
        id:4,
        name: "Kawa BRAZYLIA",
        desc: "Świeżo Palona 100% ARABIKA",
        price: 70,
        image: "https://res.cloudinary.com/det2l5eu2/image/upload/v1687202022/OnlineShop/4_oubpms.jpg",
        type: "Kawa"
    },
    {
        id:5,
        name: "KAWA BRAZILLIANA TOUCANO",
        desc: "Świeżo Palona 200G",
        price: 30,
        image: "https://res.cloudinary.com/det2l5eu2/image/upload/v1687202022/OnlineShop/5_oubmxb.jpg",
        type: "Kawa"
    },
    {
        id:6,
        name: "Kawa INDONEZJA",
        desc: "Świeżo Palona 100% ARABIKA",
        price: 60,
        image: "https://res.cloudinary.com/det2l5eu2/image/upload/v1687202022/OnlineShop/6_e5p4qk.jpg",
        type: "Kawa"
    },
    {
        id:7,
        name: "KAWA PERU Villa Rica",
        desc: "Świeżo Palona 100% ARABIKA",
        price: 70,
        image: "https://res.cloudinary.com/det2l5eu2/image/upload/v1687202022/OnlineShop/7_qmyiob.jpg",
        type: "Kawa"
    },
    {
        id:8,
        name: "KAWA AFRICANA HIMBA",
        desc: "Świeżo Palona 100% ARABIKA",
        price: 70,
        image: "https://res.cloudinary.com/det2l5eu2/image/upload/v1687202022/OnlineShop/8_r49pe7.jpg",
        type: "Kawa"
    },
    {
        id:9,
        name: "Kawa ziarnista KIMBO ESPRESSO CLASSICO",
        desc: "70% ARABIKA",
        price: 40,
        image: "https://res.cloudinary.com/det2l5eu2/image/upload/v1687202023/OnlineShop/9_quwbca.jpg",
        type: "Kawa"
    },
    {
        id:10,
        name: "Kawa ziarnista KIMBO EXTRA CREAM",
        desc: "50% ARABIKA",
        price: 45,
        image: "https://res.cloudinary.com/det2l5eu2/image/upload/v1687202023/OnlineShop/10_zdz3uy.jpg",
        type: "Kawa"
    },
    {
        id:11,
        name: "Kawa ziarnista KIMBO PRESTIGE",
        desc: "Arabika 80 % Robusta 20%",
        price: 65,
        image: "https://res.cloudinary.com/det2l5eu2/image/upload/v1687202023/OnlineShop/11_vdi37i.jpg",
        type: "Kawa"
    },
    {
        Id:12,
        name: "Kawa ZIARNISTA 2kg",
        desc: "Świeżo Palona 100% ARABIKA",
        price: 140,
        image: "https://res.cloudinary.com/det2l5eu2/image/upload/v1687202023/OnlineShop/12_jlvzqp.jpg",
        type: "Kawa"
    },
    {
        Id:13,
        name: "KAWA BRAZYLIA ŚWIEŻA GREEN",
        desc: "100% ARABIKA 6KG",
        price: 100,
        image: "https://res.cloudinary.com/det2l5eu2/image/upload/v1687202024/OnlineShop/13_sdnisd.jpg",
        type: "Kawa"
    },
    {
        Id:14,
        name: "KAWA MEXICANA JAGUAR",
        desc: "Świeżo Palona z Palarni 1KG",
        price: 69,
        image: "https://res.cloudinary.com/det2l5eu2/image/upload/v1687202023/OnlineShop/14_qh4jqz.jpg",
        type: "Kawa"
    },
    {
        Id:15,
        name: "Kawa ziarnista Mieszanka Gdańska",
        desc: "100% Arabica",
        price: 100,
        image: "https://res.cloudinary.com/det2l5eu2/image/upload/v1687202023/OnlineShop/15_rualml.jpg",
        type: "Kawa"
    },
    {
        Id:16,
        name: "Kawa Ziarnista Mieszanka Toruńska",
        desc: "50% Arabica 50% Robusta",
        price: 100,
        image: "https://res.cloudinary.com/det2l5eu2/image/upload/v1687202024/OnlineShop/16_lxfdjs.jpg",
        type: "Kawa"
    },
    {
        Id:17,
        name: "Kawa ziarnista Mieszanka Chełmska",
        desc: "80% Arabica 20% Robusta",
        price: 100,
        image: "https://res.cloudinary.com/det2l5eu2/image/upload/v1687202024/OnlineShop/17_dzqp5m.jpg",
        type: "Kawa"
    },
    {
        Id:18,
        name: "Kawa Ziarnista Mieszanka Szczecińska",
        desc: "40% Arabica 60% Robusta",
        price: 100,
        image: "https://res.cloudinary.com/det2l5eu2/image/upload/v1687202024/OnlineShop/18_ttms0f.jpg",
        type: "Kawa"
    },
    {
        Id:19,
        name: "Kawa ziarnista Mieszanka Wrocławska",
        desc: "50% Arabica 50% Robusta",
        price: 100,
        image: "https://res.cloudinary.com/det2l5eu2/image/upload/v1687202024/OnlineShop/19_bhmdju.jpg",
        type: "Kawa"
    },
    {
        Id:20,
        name: "Kawa ziarnista Mieszanka SKIERNIEWICKA",
        desc: "80% Arabica 20% Robusta",
        price: 100,
        image: "https://res.cloudinary.com/det2l5eu2/image/upload/v1687202025/OnlineShop/20_eh7vwa.jpg",
        type: "Kawa"
    },
    {
        Id:21,
        name: "Kawa ziarnista Mieszanka Rzeszowska",
        desc: "80% Arabica 20% Robusta",
        price: 100,
        image: "https://res.cloudinary.com/det2l5eu2/image/upload/v1687202024/OnlineShop/21_eh4slf.jpg",
        type: "Kawa"
    },
    {
        Id:22,
        name: "Kawa Ziarnista Mieszanka Białostocka",
        desc: "70% Arabica 30% Robusta",
        price: 100,
        image: "https://res.cloudinary.com/det2l5eu2/image/upload/v1687202024/OnlineShop/22_stizga.jpg",
        type: "Kawa"
    },
    {
        Id:23,
        name: "Kawa ziarnista Mieszanka Poznańska",
        desc: "100% Arabica",
        price: 100,
        image: "https://res.cloudinary.com/det2l5eu2/image/upload/v1687202024/OnlineShop/23_ogkyty.jpg",
        type: "Kawa"
    },
    {
        id:24,
        name: "Kawa ziarnista Mieszanka Katowicka",
        desc: "60% Arabica 40% Robusta",
        price: 100,
        image: "https://res.cloudinary.com/det2l5eu2/image/upload/v1687202024/OnlineShop/24_q4fkdd.jpg",
        type: "Kawa"
    },
    {
        Id:25,
        name: "Kawa ziarnista Mieszanka Krakowska",
        desc: "80% Arabica 20% Robusta",
        price: 100,
        image: "https://res.cloudinary.com/det2l5eu2/image/upload/v1687202024/OnlineShop/25_hdnum7.jpg",
        type: "Kawa"
    },
    {
        Id:26,
        name: "Kawa Ziarnista Mieszanka Warszawska",
        desc: "70% Arabica 30% Robusta",
        price: 100,
        image: "https://res.cloudinary.com/det2l5eu2/image/upload/v1687202025/OnlineShop/26_z5nj1n.jpg",
        type: "Kawa"
    },
    {
        Id:27,
        name: "Kawa ziarnista Mieszanka Siedlecka",
        desc: "100% Arabica",
        price: 100,
        image: "https://res.cloudinary.com/det2l5eu2/image/upload/v1687202025/OnlineShop/27_m73dbf.jpg",
        type: "Kawa"
    },
    {
        Id:28,
        name: "Ziarna Kawy w Czekoladzie deserowej",
        desc: "100% Arabica",
        price: 25,
        image: "https://res.cloudinary.com/det2l5eu2/image/upload/v1687202025/OnlineShop/28_w8jgmd.jpg",
        type: "Kawa"
    },
    {
        Id:29,
        name: "Kawa bezkofeinowa Polski Mniszek orzechowa",
        desc: "Kawa mielona",
        price: 25,
        image: "https://res.cloudinary.com/det2l5eu2/image/upload/v1687202025/OnlineShop/29_tmwlza.jpg",
        type: "Kawa"
    },
    {
        Id:30,
        name: "Herbata matcha japońska ",
        desc: "Prefektura: Kyoto, miasto: Uji",
        price: 50,
        image: "https://res.cloudinary.com/det2l5eu2/image/upload/v1687202025/OnlineShop/30_hfefib.jpg",
        type: "Herbata"
    },
    {
        Id:31,
        name: "Herbata JAPOŃSKA SENCHA kagoshima",
        desc: "Herbata zielona Sencha 100%",
        price: 40,
        image: "https://res.cloudinary.com/det2l5eu2/image/upload/v1687202025/OnlineShop/31_cd4agb.jpg",
        type: "Herbata"
    },
    {
        Id:32,
        name: "Zestaw HERBAT KWITNĄCYCH 5 szt",
        desc: "Pudełko na prezent",
        price: 30,
        image: "https://res.cloudinary.com/det2l5eu2/image/upload/v1687202026/OnlineShop/32_dkcvkv.jpg",
        type: "Herbata"
    },
    {
        Id:33,
        name: "HERBATA LIŚCIASTA CZARNA CEJLOŃSKA AHMAD",
        desc: "Bez dodatków",
        price: 35,
        image: "https://res.cloudinary.com/det2l5eu2/image/upload/v1687202026/OnlineShop/33_m7ulbh.jpg",
        type: "Herbata"
    },
    {
        Id:34,
        name: "HERBATA LIŚCIASTA EARL GREY AHMAD",
        desc: "Olejek bergamotowy",
        price: 32,
        image: "https://res.cloudinary.com/det2l5eu2/image/upload/v1687202026/OnlineShop/34_lsplvk.jpg",
        type: "Herbata"
    },
    {
        Id:35,
        name: "Ahmad Tea English Tea No.1",
        desc: "Czarna herbata z subtelną nutą bergamotki",
        price: 25,
        image: "https://res.cloudinary.com/det2l5eu2/image/upload/v1687202026/OnlineShop/35_ewzzyf.jpg",
        type: "Herbata"
    },
    {
        Id:36,
        name: "Ahmad Tea Assam herbata czarna",
        desc: "Herbata czarna Assam",
        price: 25,
        image: "https://res.cloudinary.com/det2l5eu2/image/upload/v1687202026/OnlineShop/36_z0vi8c.jpg",
        type: "Herbata"
    },
    {
        Id:37,
        name: "Ahmad Tea - Raspberry ",
        desc: "Malina herbata czarna",
        price: 20,
        image: "https://res.cloudinary.com/det2l5eu2/image/upload/v1687202026/OnlineShop/37_nuzatv.jpg",
        type: "Herbata"
    },
    {
        Id:38,
        name: "Ahmad Tea Blackcurrant Burst",
        desc: "Herbata czarna czarna porzeczka",
        price: 17,
        image: "https://res.cloudinary.com/det2l5eu2/image/upload/v1687202026/OnlineShop/38_fj1c6w.jpg",
        type: "Herbata"
    },
    {
        Id:39,
        name: "Ahmad Tea Vanilla",
        desc: "Herbata czarna, 1% laska wanilii",
        price: 12,
        image: "https://res.cloudinary.com/det2l5eu2/image/upload/v1687202026/OnlineShop/39_lmgknu.jpg",
        type: "Herbata"
    },
    {
        Id:40,
        name: "Ahmad Tea Slim",
        desc: "Herbata zielona z ziołami",
        price: 10,
        image: "https://res.cloudinary.com/det2l5eu2/image/upload/v1687202023/OnlineShop/40_xsklzr.jpg",
        type: "Herbata"
    }
];

module.exports = products;