if (navigator.serviceWorker) {
   // console.log("Si tiene Sw");

   navigator.serviceWorker.register('/sw.js');

}



// if (window.caches) {
//    caches.open('Cachev1');
//    //Open crea y abre el cache
//    caches.open('Cachev2');

//    //Sirve ara busacr

//    caches.has('CacheV2').then(console.log);


//    //Elimina el cache
//    caches.delete('Cachev2');

//    caches.has('CacheV2').then(console.log);
//    //busqueda en pluaral busquedad de cachec
//    caches.open('CacheV3').then(cache => {
//       //cache.add('/index.html');
//       //Agrega al cache
//       cache.addAll([
//          '/index.html',  //3
//          'img/hola.png',  //2
//          '/css/style.css'
//       ]).then(()=>{

//          cache.put('index.html', new Response('Index nuevo'));
//          //Agrega algo o sobrescribe algo el put
//       });




//       cache.match('/index.html').then(res => {
//          //busqueda dentro del cache (singular)

//          res.text().then(console.log);
//       })

//       caches.keys().then(key=>{
//          console.log(key);
//       })




//    });




// }

