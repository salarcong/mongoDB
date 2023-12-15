//1ra opcion - Lista
var autor = {
    nombre: 'Stephen King',
    nacionalidad: 'Estadounidense',
    libros: [
        {
            titulo: 'It',
            fechaLanzamiento: 1986
        },
        {
            titulo: 'El resplandor',
            fechaLanzamiento: 1977
        },
        {
            titulo: 'Misery',
            fechaLanzamiento: 1987
        }
    ]
}

//2da opcion - llaves foraneas -> ObjectsId
var autor = {
    nombre: 'Stephen King',          
    nacionalidad: 'Estadounidense'
}

db.autores.insertOne(autor)
ObjectId('657b77ffbdb4d97e6897520c')

var libro1 = {
    titulo: 'It',
    fechaLanzamiento: 1986,
    autor_id: ObjectId('657b77ffbdb4d97e6897520c')
}

var libro2 = {
    titulo: 'El resplandor',
    fechaLanzamiento: 1977,
    autor_id: ObjectId('657b77ffbdb4d97e6897520c')
}

var libro3 = {
    titulo: 'Misery',
    fechaLanzamiento: 1987,
    autor_id: ObjectId('657b77ffbdb4d97e6897520c')
}

db.libros.insertMany(
    [libro1, libro2, libro3]
)

//Crear indices
db.libros.createIndex(
    {autor_id: 1}
)

db.libros.getIndexes()


//$lookup -> join
db.autores.insertMany(
    [
        {nombre: 'J.k Rowling', nacionalidad: 'Britanica'},
        {nombre: 'George R. R. Martin', nacionalidad: 'Estadounidense'}
    ]
)

db.libros.insertMany(
    [
        {
            titulo: 'Hatty Potter y la piedra filosofal',
            fechaLanzamiento: 1997,
            autor_id: ObjectId('657b829dbdb4d97e68975210')
        },
        {
            titulo: 'Hatty Potter y El prisionero de Azkaban',
            fechaLanzamiento: 1999,
            autor_id: ObjectId('657b829dbdb4d97e68975210')
        }    
    ]
)

//Obtener todos los autores con su correspondiente listado de libros - $lookup
db.autores.aggregate(
    [
        {
            $lookup: {
                from: 'libros',
                localField: '_id',
                foreignField: 'autor_id',
                as: 'listadoLibros'
            }
        }
    ]
).pretty()

//Obtener todos los autores que posean por lo menos un libro
db.autores.aggregate(
    [
        {
            $lookup: {
                from: 'libros',
                localField: '_id',
                foreignField: 'autor_id',
                as: 'listadoLibros'
            }
        },
        {
            $match: {
                listadoLibros: {
                    $ne: []
                }
            }
        },
        {
            $project: {
                _id: false, nombre: true
            }
        }
    ]
).pretty()

db.autores.aggregate(
    [
        {
            $lookup: {
                from: 'libros',
                localField: '_id',
                foreignField: 'autor_id',
                as: 'listadoLibros'
            }
        },
        {
            $unwind: '$listadoLibros'
        }
    ]
).pretty()

//operador unwind
db.autores.aggregate(
    [
        {
            $lookup: {
                from: 'libros',
                localField: '_id',
                foreignField: 'autor_id',
                as: 'listadoLibros'
            }
        },
        {
            $unwind: '$listadoLibros'
        },
        {
            $project: {
                nombre: true,
                libro: '$listadoLibros'
            }
        }
    ]
).pretty()

//Plan de ejecucion
db.autores.find(
    {
        nombre: 'Stephen King'
    }
).explain()

db.autores.find(
    {
        nombre: 'Stephen King'
    }
).explain('executionStats')
