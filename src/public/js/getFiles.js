async function getData() {

    //const response = await fetch('/api/files');  //Da error

    const response = await fetch(`/api/files`, {
                method: 'get'
            })
    const data = await response.json();
    console.log(data);

    //Mostramos los datos recibidos y los imprimimos en el documento:

    for (item of data.imagenEncontrada) {
        
        const root = document.createElement('div');
        const card = document.createElement('div');
        const cardBody = document.createElement('div');

        const titpro = document.createElement('h4');
        const imagen = document.createElement('img');
        //const titulo = document.createElement('h3');
        const descripcion = document.createElement('h6');
        const fecha = document.createElement('small');
  
        titpro.className = 'text-success ma-2';
        card.className = 'card mb-3 text-center';
        cardBody.className = 'card-body';
        imagen.className = 'img-fluid';
        descripcion.className = 'mt-2';
        
        titpro.textContent = 'Proyecto ' + item.title;
        //titulo.textContent = item.title;
        descripcion.textContent = item.description;
        const dateString = new Date(item.date).toLocaleString();    //Convertir formato fecha
        fecha.textContent = dateString;
        imagen.src = './images/' + item.image;

        //Añadir los distintos elementos
        //cardBody.append(titpro, imagen, titulo, descripcion, fecha);
        cardBody.append(titpro, imagen, descripcion, fecha);
        card.append(cardBody);
        root.append(card);
        document.getElementById('portfolio').append(root);

    }
}

getData();