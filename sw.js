
const cache_estatico = 'staticV1';
const cache_dinamico = 'dinamicV1';
const cache_inmutable = 'inmutableV1';

self.addEventListener('install', e => {
    const cacheInstallEstatico = caches.open(cache_estatico).then(cache => {
        return cache.addAll([
            '/',
            'index.html',
   
            'img/No_Image.jpg',
            'img/offline.jpg',
            'img/imgSubir.png',
            'img/icono/faviAlert.ico',

           'icono.ico',
            'js/funciones.js',
            'js/funcionamientoBD.js',
            'js/base.js',
            'js/app.js',
            'js/pouchdb-8.0.1.min.js',
            'pages/Offline.html',
            'pages/about.html',
            'pages/editarProductos.html',
            'pages/nuevaCategoria.html',
            'pages/nuevaLista.html',
            'pages/nuevoProducto.html',
            'pages/verProductos.html',
            'Manifest.json'           
        ]);

    })
    
    
      const cacheInstallimutable= caches.open(cache_inmutable).then(cache=>{

       return cache.add('https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css')
      })
       e.waitUntil(Promise.all([cacheInstallEstatico,cacheInstallimutable]));
    });
    



 self.addEventListener('fetch', e=>{

    const respuesta = new Promise((resolve, reject)=>{

        let rechazada = false;
        const falloUnaVez = ()=>{
         if(rechazada){ 
            if(/\.(png|jpg)$/i.test(e.request.url)){
                resolve(caches.match('img/No_Image.jpg'));
            }
            else{
                reject('No se encontro respuesta')
            }
        }
        else{
            rechazada = true;

        }

    };
    fetch(e.request).then(res =>{
        res.ok? resolve(res): falloUnaVez();

    }).catch(falloUnaVez);

    caches.match(e.request).then(res=>{
        res? resolve(res):falloUnaVez();

        const respuesta = fetch (e.request).then(res=>{

            console.log('fetch',res);
            caches.open(cache_dinamico).then(cache=>{
            cache.put(e.request, res);

            })
            return res.clone();
        }).catch(err=>{
            if(e.request.headers.get('accept').includes('text/html')){
                return caches.match('pages/Offline.html');
            }
        })

    }).catch(falloUnaVez);
}).catch(err=>{
    if(e.request.headers.get('accept').includes('text/html')){
        return caches.match('pages/Offline.html');
    }
})
e.respondWith(respuesta);
})

