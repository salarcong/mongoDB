var sebastian = {
    nombre: 'Sebastian',
    Apellido: 'Alarcon'
    }

db.datos_usuario.updateOne(
    {id_usuario: '1'},
    {$set: {
        fecha_nacimiento: new Date(2001,10,8)
    }}
)

var desarrollador_web = {
    id_usuario: 1,
    puesto: 'Desarrollador Web',
    area: 'Informatica'
}

var datos1 = {
    id_usuario: 8,
    nombre: 'Luis',
    apellido: 'Nani',
    puesto: 'Asistente de IT',
    fecha_nacimiento: new Date(2000,4,27)
}


db.usuario.insertMany(
    [
        {nombre: 'Esteban', apellido: 'Gonzalez',},
        {nombre: 'Oscar', apellido: 'Alarcon'},
        {nombre: 'Claudia', apellido: 'Gonzalez'},
        {nombre: 'Marco', apellido: 'Nani'},
        {nombre: 'Aldo', apellido: 'Mondragon'},
        {nombre: 'Maria', apellido: 'Sazo'},
    ]
)


db.puesto.insertMany(
    [
        {puesto: 'Desarrollador de software', area: 'Informatica'},
        {puesto: 'Analista de marketing', area: 'Marketing'},
        {puesto: 'Diseñador grafico', area: 'Publicidad'},
        {puesto: 'Diseñador grafico', area: 'Publicidad'},
    ]
)

db.datos_usuario.insertMany(
    [
        {id_usuario: 2, nombre: 'Esteban', apellido: 'Gonzalez', puesto: 'Desarrollador de software', fecha_nacimiento: new Date(2002,12,3)},
        {id_usuario: 3, nombre: 'Oscar', apellido: 'Alarcon', puesto: 'Analista de marketing', fecha_nacimiento: new Date(1998,8,8)},
        {id_usuario: 4, nombre: 'Claudia', apellido: 'Gonzalez', puesto: 'Directora de marketing', fecha_nacimiento: new Date(1895,2,15)},
        {id_usuario: 5, nombre: 'Marco', apellido: 'Nani', puesto: 'Diseñador grafico', fecha_nacimiento: new Date(2002,10,20)},
        {id_usuario: 6, nombre: 'Aldo', apellido: 'Mondragon', puesto: 'Diseñador grafico', fecha_nacimiento: new Date(2001,2,9)},
        {id_usuario: 7, nombre: 'Maria', apellido: 'Sazo', puesto: 'asistente de marketing', fecha_nacimiento: new Date(1997,7,23)},
    ]
)

//-------------------------------------------------------------
db.usuario.insertMany(
    [
        {nombre: 'Esteban', apellido: 'Gonzalez', puestoId: ObjectId('657c6ef818a6e6bb06c058af')},
        {nombre: 'Oscar', apellido: 'Alarcon', puestoId: ObjectId('657c6ef818a6e6bb06c058af')},
        {nombre: 'Claudia', apellido: 'Gonzalez', puestoId: ObjectId('657c6fbc18a6e6bb06c058b3')},
        {nombre: 'Marco', apellido: 'Nani', puestoId: ObjectId('657c6ef818a6e6bb06c058b1')},
        {nombre: 'Aldo', apellido: 'Mondragon', puestoId: ObjectId('657c6ef818a6e6bb06c058b1')},
        {nombre: 'Maria', apellido: 'Sazo', puestoId: ObjectId('657c6ef818a6e6bb06c058b0')},
    ]
)


db.puesto.aggregate(
    [
        {
            $lookup: {
                from: 'usuario',
                localField: '_id',
                foreignField: 'puestoId',
                as: 'usuario'
            }
        },
        {
            $unwind: '$usuario'
        },
        {
            $project: {
                puesto: '$puesto', area: '$area',
                nombre: '$usuario.nombre', apellido: '$usuario.apellido'
            }
        }
    ]
).pretty()


db.puesto.aggregate(
    [
        {
            $lookup: {
                from: 'usuario',
                localField: '_id',
                foreignField: 'puestoId',
                as: 'usuario'
            }
        },
        {
            $unwind: '$usuario'
        }
    ]
).pretty()

db.puesto.aggregate(
    [
        {
            $lookup: {
                from: 'usuario',
                localField: '_id',
                foreignField: 'puestoId',
                as: 'usuario'
            }
        }
    ]
).pretty()
