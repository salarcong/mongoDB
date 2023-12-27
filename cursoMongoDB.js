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
            'address.postalCode': 1112
         },
         {
            'address.number': 10
         }
      ]
   }
)



//Obtener la primera referencia de los usuarios con codigo postal y referencias

