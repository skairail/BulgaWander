

const express = require('express');
const sequelize = require('./db');
const Place = require('./db/models/place');
const Category = require('./db/models/category');
const corsMiddleware = require('./middleware/cors')
const categoriesRouter = require('./routes/categories');
const locationsRouter = require('./routes/locations');
const User = require('./db/models/user')
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3333;

const SECRET_KEY = "my-jwt";



app.use(corsMiddleware);
app.use(express.json());
app.use('/categories', categoriesRouter);
app.use('/locations', locationsRouter);


function generateAccessToken(username, role) {
    return jwt.sign({ username: username, role: role }, SECRET_KEY, { expiresIn: '1800s' });
}

app.use(express.json());

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username: username } });
        if (user && user.password === password) {
            const accessToken = generateAccessToken(username, user.role);
            res.json({ accessToken: accessToken });
        } else {
            res.status(401).json({ error: 'Invalid username or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/register', async (req, res) => {
    const { username, email, password, role } = req.body;
    try {
        const existingUser = await User.findOne({ where: { username: username } });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const newUser = await User.create({
            username: username,
            email: email,
            password: password,
            role: role
        });

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.post('/user/saved-places', authenticateToken, async (req, res) => {
    const { placeId } = req.body;
    const authHeader = req.headers['authorization'];
    const [, token] = authHeader.split(' ');
    const decodedToken = jwt.verify(token, SECRET_KEY)
    const username = decodedToken.username
    try {

        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }


        const place = await Place.findByPk(placeId);
        if (!place) {
            return res.status(404).json({ error: 'Place not found' });
        }


        await user.addPlace(place);

        res.status(200).json({ message: 'Place added to saved places successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/user/saved-places', authenticateToken, async (req, res) => {
    const authHeader = req.headers['authorization'];
    const [, token] = authHeader.split(' ');
    const decodedToken = jwt.verify(token, SECRET_KEY)
    const username = decodedToken.username

    try {
        const user = await User.findOne({
            where: { username },
            include: [{ model: Place, through: 'UserSavedLocation' }]
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const savedPlaces = user.Places.map(place => ({
            id: place.id,
            name: place.name,
        }));

        res.status(200).json(savedPlaces);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/user/saved-places/:placeId', authenticateToken, async (req, res) => {
    const { placeId } = req.params;
    const authHeader = req.headers['authorization'];
    const [, token] = authHeader.split(' ');

    try {

        const decodedToken = jwt.verify(token, SECRET_KEY);
        const username = decodedToken.username;
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }


        const place = await Place.findByPk(placeId);

        if (!place) {
            return res.status(404).json({ error: 'Place not found' });
        }


        await user.removePlace(place);

        res.status(200).json({ message: 'Place removed from saved places' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});




function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.status(401).json({ error: 'JWT token is required' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.user = user;
        next();
    });
}

app.listen(PORT, () => {

    console.log('Listening on port', PORT);

    console.log('Time:', new Date());

});

