import AsyncStorage from '@react-native-async-storage/async-storage';

async function addPlaceToSavedPlaces(placeId) {
    try {
        const authToken = await AsyncStorage.getItem('authToken');
        if (!authToken) {
            console.error('Authorization token not found');
            return;
        }

        const response = await fetch('http://localhost3333/user/saved-places', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify({ placeId }),
        });

        if (response.ok) {
            console.log('The location has been successfully added to saved');
        } else {
            const errorData = await response.json();
            console.error('Error when adding places to saved!:', errorData.error);
        }
    } catch (error) {
        console.error('Error executing the request:', error);
    }
}

export default addPlaceToSavedPlaces;
