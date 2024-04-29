const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);


const sequelize = new Sequelize({
    database: 'travel',
    dialect: "postgres",
    username: 'postgres',
    password: 'password'
})

module.exports = sequelize;

const Place = require('./models/place')
const Category = require('./models/category')
const PlacePhoto = require('./models/place_photos')
const User = require('./models/user')


Place.hasMany(PlacePhoto);
PlacePhoto.belongsTo(Place);

Place.belongsTo(Category);
Category.hasMany(Place);

User.belongsToMany(Place, {
    through: 'UserSavedLocation',
    foreignKey: 'userId',
    otherKey: 'locationId'
});

Place.belongsToMany(User, {
    through: 'UserSavedLocation',
    foreignKey: 'locationId',
    otherKey: 'userId'
});
const testCategories = [
    { name: 'Nature', icon: 'nature.png' },
    { name: 'Historical Sites', icon: 'history.png' },
    { name: 'Restaurants', icon: 'restaurant.png' }
];


// const testLocations = [
//     {
//         name: 'SevenRilaLakes', description: 'The Seven Rila Lakes is a group of Bulgarian lakes with а glacial origin located in the Rila Mountain. This is the most visited lake group in the country by both Bulgarian and foreign tourists and one of the most remarkable natural sites on the Balkan Peninsula. The lakes are located in the picturesque cirques in the Damgski area in Northwest Rila Mountain, as they are situated amphitheatrically between 2095 and 2535 meters above sea level. The cirque in which they are located is surrounded by the peaks of Suhi Chal, Harmiyata, and Otovishki peak in Rila. They occupy furrows along the mountain slope and are interconnected with each other through small streams. In the water flow process, small cascades and waterfalls have formed along these streams. All in all, the Seven Rila Lakes are an excellent option for a one-day reality escape trip from the city to the mountains and a great chance to enjoy the magnificent nature. They are one of the One hundred national tourist sites to see in Bulgaria, and in good weather, Rila Monastery will also be waiting nearby.'
//         , coordinates: '42.20166586, 23.318665392', CategoryId: 1
//     },
//     { name: 'RilaMonastery', description: 'A medieval Eastern Orthodox monastery in the Rila Mountains', coordinates: '42.1333,23.3500', CategoryId: 2 },
//     { name: 'Chevermeto', description: 'Traditional Bulgarian restaurant serving delicious local dishes', coordinates: '42.6856,23.3176', CategoryId: 3 }
// ];


const testLocations = [
    {
        name: 'SevenRilaLakes',
        description: 'The Seven Rila Lakes is a group of Bulgarian lakes with а glacial origin located in the Rila Mountain. This is the most visited lake group in the country by both Bulgarian and foreign tourists and one of the most remarkable natural sites on the Balkan Peninsula. The lakes are located in the picturesque cirques in the Damgski area in Northwest Rila Mountain, as they are situated amphitheatrically between 2095 and 2535 meters above sea level. The cirque in which they are located is surrounded by the peaks of Suhi Chal, Harmiyata, and Otovishki peak in Rila. They occupy furrows along the mountain slope and are interconnected with each other through small streams. In the water flow process, small cascades and waterfalls have formed along these streams. All in all, the Seven Rila Lakes are an excellent option for a one-day reality escape trip from the city to the mountains and a great chance to enjoy the magnificent nature. They are one of the One hundred national tourist sites to see in Bulgaria, and in good weather, Rila Monastery will also be waiting nearby.',
        coordinates: '42.20166586, 23.318665392',
        CategoryId: 1
    },
    {
        name: 'RilaMonastery',
        description: 'A medieval Eastern Orthodox monastery in the Rila Mountains',
        coordinates: '42.1333,23.3500',
        CategoryId: 2
    },
    {
        name: 'Chevermeto',
        description: 'Traditional Bulgarian restaurant serving delicious local dishes',
        coordinates: '42.6856,23.3176',
        CategoryId: 3
    },
    {
        name: 'PlovdivRomanTheatre',
        description: 'An ancient amphitheater located in the city of Plovdiv, Bulgaria.',
        coordinates: '42.1354,24.7453',
        CategoryId: 2
    },
    {
        name: 'BanskoSkiResort',
        description: 'A popular ski resort in the Pirin Mountains of southwestern Bulgaria.',
        coordinates: '41.8398,23.4887',
        CategoryId: 1
    },
    {
        name: 'AlexanderNevskyCathedral',
        description: 'A Bulgarian Orthodox cathedral in Sofia, the capital of Bulgaria.',
        coordinates: '42.6977,23.3226',
        CategoryId: 2
    },
    {
        name: 'VitoshaMountain',
        description: 'Vitosha Mountain is a popular destination for hiking, skiing, and outdoor activities near Sofia, Bulgaria.',
        coordinates: '42.6011,23.2861',
        CategoryId: 1
    }
];

const createTestUser = async () => {
    try {
        const testUser = {
            username: 'testuser',
            email: 'test@example.com',
            password: 'testpassword',
            role: 'user'
        };

        const newUser = await User.create(testUser);
        console.log('Test user created:', newUser);
    } catch (error) {
        console.error('Error creating test user:', error);
    }
};

const addTestCategories = async () => {
    try {
        await Category.bulkCreate(testCategories);
        console.log('Test categories added successfully');
    } catch (error) {
        console.error('Error adding test categories:', error);
    }
};

const addTestLocations = async () => {
    try {
        await Place.bulkCreate(testLocations);
        console.log('Test locations added successfully');
        await seedImages();
    } catch (error) {
        console.error('Error adding test locations:', error);
    }

};

async function seedImages() {
    try {
        const imageDir = path.join(__dirname, 'seeders', 'images');
        const files = fs.readdirSync(imageDir);

        for (const file of files) {
            const imagePath = path.join(imageDir, file);
            const imageData = await readFileAsync(imagePath);
            const fileNameParts = file.split('_');
            console.log(imageData)
            const placeName = fileNameParts[0];
            const imageNumber = parseInt(fileNameParts[1]);
            const place = await Place.findOne({ where: { name: placeName } });

            if (place) {
                await PlacePhoto.create({
                    photo: imageData,
                    PlaceId: place.id
                });

                console.log(`Image ${file} added successfully for place ${placeName}`);
            } else {
                console.log(`Place with name ${placeName} not found`);
            }
        }

        console.log('All images added successfully');
    } catch (error) {
        console.error('Error adding images:', error);
    }
}

sequelize.sync({ force: true })
    .then(async () => {
        console.log('Database synchronized successfully.');

        const categoriesCount = await Category.count();

        if (categoriesCount === 0) {
            await addTestCategories();
        }

        const placesCount = await Place.count();

        if (placesCount === 0) {
            await addTestLocations();
        }

        await createTestUser();

    })
    .catch(error => {
        console.error('Error synchronizing database:', error);
    });


module.exports = sequelize;