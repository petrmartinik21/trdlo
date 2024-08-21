/* eslint-env node */


import { fakerCS_CZ as faker} from '@faker-js/faker'

// const personName = faker.person.fullName()
// const personBio = faker.person.bio()
// console.log(personName)
// console.log(personBio)

import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
 const supabase = createClient( 
    process.env.VITE_SUPABASE_URL,
    process.env.SERVICE_ROLE_KEY
)




const seedTrdlo = async () => {
    
    // const name =  faker.lorem.words(3);
    
    await supabase.from('trdlotwo').insert({
        name: name,
        station: name.toLocaleLowerCase().replace(/ /g, '-'),
        description: faker.lorem.paragraph(),
        solution: faker.lorem.paragraph(),
        status: faker.helpers.arrayElement(['in-progress', 'completed']),
        collaborators: faker.helpers.arrayElements([1,2,3])
    })
}

await seedTrdlo()

