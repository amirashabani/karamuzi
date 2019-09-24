const url = 'url';

fetch(url)
    .then((resp) => resp.json())
    .then(
        function(data) {
            console.log(data)
        }
    )
    .catch(
        function(error) {
            console.error(error);
        }
    );  