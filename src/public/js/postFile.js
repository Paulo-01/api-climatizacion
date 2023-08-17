const publicar = document.getElementById('publicar');

//Envio de los datos al servidor -----------------------------------------------------

publicar.onclick = async function() {

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    //Imagen:
    const image = document.getElementById('file-upload');
    let r = (Math.random() + 1).toString(36).substring(2);

    let extension = image.files[0].name.split('.').pop();

    //Se arma el nombre del archivo que sera grabado en MongoDB
    let fileName = r + '.' + extension;

    //Se debe declarar la funcion formData() para poder 
    const formData = new FormData()
    formData.append('myFile', image.files[0], fileName);
    console.log(formData);

    if (description == '' || image == '') {
        alert('No pueden quedar campos vacíos!');
    } else {
        console.log(fileName);
        //Subida del archivo
        imageUpload(formData);
        //Envio de los datos a MongoDB
        postData(title, description, fileName);
        //Redirecciona/Actualiza la pagina Web
        window.location.href = 'index.html';
    }

}

async function imageUpload(formData) {
    await fetch('/api/saveImage', {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        },
        body: formData
    });
}

async function postData(title, description, fileName) {
    const response = await fetch('/api/save', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'title': title,
            'description': description,
            'image': fileName
        })
    });

    const data = await response.json();
    console.log(data);
}