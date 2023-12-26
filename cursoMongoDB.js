db.users.updateOne(
   {
      name: 'Aldo'
   },
   {
      $set: {
         courses: ['MongoDB', 'SQL', 'Java', 'Rails', 'Rust']
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
         $slice: -1
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

