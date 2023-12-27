db.users.updateOne(
   {
      name: 'Luis'
   },
   {
      $set: {
         courses: ['Git', 'Escritura para programadores', 'Redes']
      }
   }
)


db.users.updateOne(
   {
      name: 'Esteban'
   },
   {
      $set: {
         scores: [8,8,9,8,7]
      }
   }
)

//cuando conocemos el indice
db.users.updateMany(
   {
      scores: {$exists: true}
   },
   {
      $set: {
         'scores.0': 5
      }
   }
)

db.users.find(
   {
      scores: {
         $exists: true
      }
   }
)


//cuando no conocemos el indice
db.users.updateMany(
   {
      scores: {$exists: true},
      scores: 6
   },
   {
      $set: {
         'scores.$': 7
      }
   }
)

//$slice -> position o index

db.users.findOne(
   {
      name: 'Aldo'
   },
   {
      _id: false,
      name: true,
      courses: {
         $slice: 3
      }
   }
)

db.users.findOne(
   {
      name: 'Aldo'
   },
   {
      _id: false,
      name: true,
      courses: {
         $slice: [0, 3]
      }
   }
)

//Obtener todos los usuarios con 5 cursos
db.users.find(
   {
      courses: {
         $size: 3
      }
   }
)

//$where
//Obtener todos los usuarios que posean por lo menos 3 cursos
db.users.find(
   {
      $and: [
         {
            courses: {$exists: true}
         },
         {
            $where: 'this.courses.length >= 3'
         }
      ]
   }
)


db.users.updateOne(
   {
      name: 'Sebastian'
   },
   {
      $set: {
         address: {
            state: 'Guatemala',
            city: 'Guatemala',
            number: 10,
            street: 'Calle numero 1',
            postalCode: 1111,
            references:['Casa color azul','a un costado de una tienda']
         }
      }
   }
)

db.users.updateOne(
   {
      name: 'Marco'
   },
   {
      $set: {
         address: {
            state: 'Puebla',
            city: 'Puebla',
            postalCode: 1112,
         }
      }
   }
)


//obtener todos los usuarios que posean una direccion postal
db.users.find(
   {
      address: {$exists: true}
   }
)

//Obtener todos los usuarios que posean un codigo postal 1111
db.users.find(
   {
      $and:[
         {
            'address.postalCode': 1111
         },
         {
            'address.number': 10
         }
      ]
   }
)



//Obtener la primera referencia de los usuarios con codigo postal y referencias





db.users.updateMany(
   {
      courses: {$exists: true}
   },
   {
      $unset: {
         courses: true
      }
   }
)

db.users.updateOne(
   {
      name: 'Luis'
   },
   {
      $set: {
         courses: [
            {
               title: 'Vue',
               progress: 50,
               completed: false
            },
            {
               title: 'Docker',
               progress: 50,
               completed: false
            }
         ]
      }
   }
)


//$elemMatch
//Obtener todos los usuarios que hayan completado por lo menos un curso
db.users.find(
   {
      courses: {
         $elemMatch: {
            completed: true
         }
      }
   }
)

//Obtener todos los usuarios con un progreso de sus cursos mayor a 80
db.users.find(
   {
      courses: {
         $elemMatch: {
            progress: {$gte: 80}
         }
      }
   }
)


//Obtener el nombre del usuario junto con el titulo de cada uno de sus cursos
db.users.find(
   {
      courses: {$exists: true}
   },
   {
      _id: false,
      name: true,
      'courses.title': true
   }
).pretty()


db.users.updateOne(
   {
      name: 'Luis',
      'courses.title': 'Docker'
   },
   {
      $set: {
         'courses.$.progress': 100,
         'courses.$.completed': true, 
         'courses.$.tutor': {
            'name': 'Cody'
         }
      }
   }
)


db.users.updateOn(
   {
      name: 'Luis',
      'courses.title': 'Docker'
   },
   {
      $set: {
         'courses.$.tutor.name': 'CodigoFacilito'
      }
   }
)


