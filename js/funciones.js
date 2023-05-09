// Cambia la imagen a subir en nuevo producto
    document.getElementById('imagen').addEventListener('change', (event) => {
        console.log('console');
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.onload = function(event) {
            var img = document.getElementById('imgFile');
            img.src= event.target.result;
            img.style = 'display: block; height: 50px; width: 50px; margin-left: 27.5%;';
        }
        reader.readAsDataURL(file);
    });


   
function llenadoCampos(valor){
    if (valor == 'producto'){
        var bdCategoria = new PouchDB("tiendita_Categoria");
        // console.log('llenadoCampos');
        bdCategoria.allDocs({include_docs: true}).then(function(documentos){
            for (var i = 0; i < documentos.rows.length; i++) {
                var element = documentos.rows[i].doc;
                var option = document.createElement("option");
                option.value = element.categoria;
                option.text = element.categoria;
                document.getElementById('categoria').add(option);
            }
        });
    }
}