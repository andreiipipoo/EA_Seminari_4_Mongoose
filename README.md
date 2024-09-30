## Enunciat

### Crear dues "Collections":

- **Llibre**: Aquesta col·lecció representa els llibres amb atributs com el títol, l'autor, l'any de publicació, gèneres i una imatge opcional.
- **Biblioteca**: Aquesta col·lecció representa les biblioteques amb atributs com el nom, l'adreça i un correu electrònic opcional.

### Funcions CRUD per a un "Document":

- **Crear**: Crear un nou document a la col·lecció.
- **Llegir**: Llegir documents existents de la col·lecció.
- **Eliminar**: Eliminar un document de la col·lecció.
- **Actualitzar**: Actualitzar un document existent a la col·lecció.
- **Llistar**: Llistar tots els documents de la col·lecció.

### Usar l'Aggregation Pipeline:

Utilitzar l'Aggregation Pipeline per realitzar operacions avançades sobre les dades. [Més informació](https://www.w3schools.com/mongodb/mongodb_aggregations_intro.php)

### Opcional: Enllaç entre les dues Collections:

Implementar un enllaç entre les dues col·leccions utilitzant documents embeguts. [Més informació](https://mongoosejs.com/docs/populate.html)


## Resum d'Implementació Seguint l'Anunciat

### Crear dues "Collections":

- **Llibre**: Aquesta col·lecció representa els llibres amb atributs com el títol, l'autor, l'any de publicació, gèneres i una imatge opcional.
- **Biblioteca**: Aquesta col·lecció representa les biblioteques amb atributs com el nom, l'adreça i un correu electrònic opcional.

### Funcions CRUD per a un "Document":

- **Crear**: S'han creat dues biblioteques i tres llibres associats a les biblioteques.
- **Llegir**: S'han llegit tots els llibres de la col·lecció, mostrant informació sobre cada llibre i el seu autor mitjançant la funció `populate()` per obtenir dades de la col·lecció de biblioteques.
- **Eliminar**: S'ha implementat la funció per eliminar un llibre de la col·lecció.
- **Actualitzar**: S'ha implementat la funció per actualitzar la biblioteca associada a un llibre existent.

### Usar l'Aggregation Pipeline:

S'ha utilitzat l'Aggregation Pipeline per comptar el nombre de llibres per cada biblioteca. Aquesta operació inclou l'ús de `$group` per agrupar els llibres per biblioteca i `$lookup` per obtenir informació detallada sobre les biblioteques associades.

### Opcional: Enllaç entre les dues Collections:

S'ha implementat un enllaç entre les dues col·leccions utilitzant referències (`ref`) per associar cada llibre a la seva biblioteca corresponent, permetent la popularització de les dades.